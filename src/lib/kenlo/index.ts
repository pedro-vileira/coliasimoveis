/** Kenlo adapter boundary. No endpoint/authentication/field mapping is assumed. */
import type { Property } from '@/types/property';
export type PropertyProvider = { listPublished(): Promise<Property[]>; getBySlug(slug:string): Promise<Property|null> };
export class KenloNotConfiguredError extends Error { constructor(){ super('Integração Kenlo ainda não configurada.'); this.name='KenloNotConfiguredError'; } }
export const kenloProvider: PropertyProvider = { async listPublished(){ throw new KenloNotConfiguredError(); }, async getBySlug(){ throw new KenloNotConfiguredError(); } };
export function normalizeKenloProperty(_raw:unknown): Property { throw new KenloNotConfiguredError(); }
