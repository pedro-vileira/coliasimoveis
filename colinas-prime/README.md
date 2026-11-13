# Colinas Imóveis Prime

Base inicial do site institucional e catálogo imobiliário, desenvolvido com Next.js App Router, React, TypeScript e Tailwind CSS v4.

## Requisitos
- Node.js 20.9+
- npm
- PostgreSQL (necessário quando a persistência/sincronização real for ativada)

## Rodar localmente
```bash
npm install
cp .env.example .env.local
npm run dev
```
Acesse http://localhost:3000.

## O que já está implementado
- Home editorial responsiva, com paleta off-white `#F3F1EC`, vermelho `#E22400` e preto suave `#111111`.
- Navegação e rodapé compartilhados.
- Catálogo `/imoveis` com busca, filtros por tipo e negociação e ordenação por preço.
- Páginas dinâmicas `/imovel/[slug]` com galeria, dados e metadados.
- Páginas `/sobre` e `/contato`.
- Validação inicial do formulário de contato e rota server-side (o envio real depende de configurar um provedor).
- Sitemap e robots.
- Modelo PostgreSQL/Prisma para imóveis.
- Fronteira de integração Kenlo isolada em `src/lib/kenlo`.

## Importante: dados demonstrativos
Os imóveis e fotografias atuais são exemplos de interface, marcados como demonstrativos. Não são ofertas reais. Remova/substitua esses registros antes de publicar. Nenhuma informação de contato foi inventada.

## Integração Kenlo — pendente de validação
A arquitetura está preparada, mas a integração não está ativa. Antes de implementar, obtenha com a Kenlo a documentação oficial aplicável à conta Colinas, credenciais, método de autenticação, limites, campos, identificador estável do imóvel e regras de publicação/imagens. O projeto não presume endpoints ou formatos. Depois da confirmação, implemente o adapter e a rotina de sincronização (importação inicial, atualizações, despublicação, prevenção de duplicidade e logs).

## Próximas configurações antes de produção
1. Substituir dados e fotos de demonstração por conteúdo autorizado e sincronizado do Kenlo.
2. Confirmar logo oficial, contatos, endereço, redes sociais e domínio.
3. Configurar `NEXT_PUBLIC_SITE_URL`, `WHATSAPP_NUMBER`, `CONTACT_EMAIL` e `DATABASE_URL`.
4. Integrar serviço de e-mail/CRM na rota `src/app/api/contato/route.ts`.
5. Implementar e testar a integração Kenlo com documentação/credenciais oficiais.
6. Rodar `npm run build` e revisar SEO, acessibilidade, LGPD e desempenho antes do deploy.

## Estrutura
```text
src/app                rotas e páginas
src/components         componentes compartilhados
src/lib/properties.ts  provider demonstrativo
src/lib/kenlo          adapter Kenlo (não configurado)
src/types              tipos de domínio
prisma/schema.prisma   modelo de persistência
```
