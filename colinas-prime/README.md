# Colinas Imóveis Prime

Projeto existente evoluído com uma direção editorial de arquitetura e design. Mantém Next.js App Router, React, TypeScript, Tailwind CSS v4, estrutura de dados, rotas, formulário e fronteira de integração Kenlo.

## Visualização sem VS Code

1. Baixe e extraia o ZIP.
2. Abra o terminal do próprio sistema operacional dentro da pasta `colinas-prime` (não é necessário VS Code).
3. Execute `npm install` e depois `npm run dev`.
4. Abra `http://localhost:3000` no navegador.

Para publicar sem instalar editor, envie o projeto para um repositório GitHub pelo próprio site do GitHub e importe-o na Vercel. Configure as variáveis de ambiente antes de produção.

## Redesign aplicado

- Sistema visual editorial com off-white `#F3F1EC`, vermelho `#E22400`, preto suave `#111111`, variações de papel e divisores sutis.
- Geologica como tipografia principal, com hierarquia tipográfica ampliada.
- Home com hero arquitetônico, composição editorial e seções reorganizadas.
- Catálogo redesenhado com busca por texto/código, tipo, negociação, cidade, bairro, faixa de preço, quartos, suítes, área construída, terreno, ordenação, contagem de resultados e paginação.
- Composições assimétricas de imóveis e ficha individual com galeria, especificações, imóveis relacionados e CTA de contato.
- WhatsApp por imóvel gerado a partir de `WHATSAPP_NUMBER`; sem número configurado, o CTA leva ao contato.
- Páginas institucionais e formulário mantidos, com linguagem visual compartilhada.
- Layout responsivo para desktop, tablet e celular, estados de foco e respeito a `prefers-reduced-motion`.

## Funcionalidades e integrações preservadas

- Rotas existentes: `/`, `/imoveis`, `/imovel/[slug]`, `/sobre`, `/contato`.
- Dados e tipos demonstrativos existentes, provider de imóveis, schema Prisma, sitemap e robots.
- API de contato com validação server-side. O envio efetivo ainda depende de configurar um provedor de e-mail/CRM.
- Camada isolada `src/lib/kenlo`. A integração real não está ativa e não foi simulada.

## Dados demonstrativos

Os imóveis e fotografias atuais são exemplos de interface, não ofertas reais. Substitua-os por conteúdo autorizado e sincronizado antes de publicar.

## Integração Kenlo — pendente de validação

A arquitetura está preparada, mas a integração não está ativa. Solicite à Kenlo a documentação oficial aplicável à conta Colinas, credenciais, método de autenticação, limites, campos, identificador estável do imóvel e regras de publicação/imagens. O projeto não presume endpoints ou formatos. Depois da confirmação, implemente o adapter e a rotina de sincronização (importação inicial, atualizações, despublicação, prevenção de duplicidade e logs).

## Configurações antes de produção

1. Substituir dados e fotos demonstrativos por conteúdo autorizado e sincronizado do Kenlo.
2. Confirmar logo oficial, contatos, endereço, redes sociais e domínio.
3. Configurar `NEXT_PUBLIC_SITE_URL`, `WHATSAPP_NUMBER`, `CONTACT_EMAIL` e `DATABASE_URL`.
4. Integrar provedor de envio/CRM na rota `src/app/api/contato/route.ts`.
5. Implementar e testar integração Kenlo com documentação e credenciais oficiais.
6. Instalar dependências e executar `npm run build`; revisar SEO, acessibilidade, LGPD e desempenho antes do deploy.

## Validação desta entrega

A inspeção do código e a atualização dos arquivos foram concluídas. A instalação de dependências excedeu o tempo disponível neste ambiente, então não foi possível executar `npm run build` nem afirmar que o build foi validado. Faça essa verificação no ambiente de deploy após `npm install`.
