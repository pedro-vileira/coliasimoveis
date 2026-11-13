import type {Metadata} from 'next'; import {notFound} from 'next/navigation'; import Link from 'next/link';
import {demoProperties,getProperty,formatPrice} from '@/lib/properties'; import {PropertyCard} from '@/components/property-card'; import {PropertyGallery} from '@/components/property-gallery';
export function generateStaticParams(){return demoProperties.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=getProperty(slug);return p?{title:p.title,description:p.description,openGraph:{title:p.title,description:p.description,images:[p.image]}}:{}}
export default async function PropertyPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=getProperty(slug);if(!p)notFound();
 const related=demoProperties.filter(item=>item.id!==p.id).slice(0,2);const phone=process.env.WHATSAPP_NUMBER?.replace(/\D/g,'');
 const message=encodeURIComponent(`Olá! Tenho interesse no imóvel ${p.code} e gostaria de receber mais informações.`);
 return <section className="page-shell property-detail">
  <div className="section-marker"><Link href="/imoveis">IMÓVEIS</Link><span>— {p.code}</span></div>
  <div className="detail-heading"><div><p className="eyebrow">{p.type} / {p.transaction} <i>·</i> {p.neighborhood}</p><h1>{p.title}<em>.</em></h1><p>{p.city} — SP</p></div><div className="detail-price">{formatPrice(p.price,p.transaction)}<small>CÓDIGO {p.code}</small></div></div>
  <PropertyGallery images={p.gallery} code={p.code}/>
  <div className="detail-columns"><div><p className="eyebrow">SOBRE O IMÓVEL</p><p className="detail-description">{p.description}</p><p className="demo-note">CADASTRO DEMONSTRATIVO — INFORMAÇÕES SUJEITAS À SUBSTITUIÇÃO PELA BASE OFICIAL.</p></div><div className="spec-grid">{[['Área construída',p.builtArea?`${p.builtArea} m²`:null],['Área do terreno',p.landArea?`${p.landArea} m²`:null],['Quartos',p.bedrooms],['Suítes',p.suites],['Banheiros',p.bathrooms],['Vagas',p.parking],['Tipo',p.type],['Negociação',p.transaction]].filter(x=>x[1]!==null).map(([label,value])=><div className="spec" key={String(label)}><span>{label}</span><strong>{value}</strong></div>)}</div></div>
  <div className="detail-contact"><div><span className="eyebrow">PRÓXIMO PASSO</span><h2>Vamos conversar<br/>sobre este imóvel<span>.</span></h2></div><div>{phone?<a className="button button-dark" href={`https://wa.me/${phone}?text=${message}`} target="_blank" rel="noreferrer">Falar pelo WhatsApp <span>↗</span></a>:<Link className="button button-dark" href="/contato">Tenho interesse neste imóvel <span>↗</span></Link>}</div></div>
  {related.length>0&&<section className="related-properties"><div className="section-heading"><div><div className="section-marker">CONTINUIDADE <span>— OUTROS ESPAÇOS</span></div><h2>Explore também<span>.</span></h2></div><Link href="/imoveis" className="text-link">Ver catálogo ↗</Link></div><div className="related-grid">{related.map(item=><PropertyCard key={item.id} property={item}/>)}</div></section>}
 </section>
}
