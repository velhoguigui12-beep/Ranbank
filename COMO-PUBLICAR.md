# Como mudar textos e publicar o RanBank

Dá para fazer tudo pelo navegador, sem instalar nada.

## Mudar um texto

1. Abra o repositório no GitHub (ramo **main**).
2. Abra o arquivo (veja a tabela abaixo) e clique no **lápis** (✏️).
3. Use **Ctrl+F** para achar a frase e troque as palavras.
4. Clique em **Commit changes**, escreva em poucas palavras o que mudou e confirme.
5. Abra a aba **Actions**. Em 2 a 3 minutos aparece um ✅ verde em "Publicar site" e o site já está atualizado.

## Onde ficam os textos

| O que mudar | Arquivo |
| --- | --- |
| Site: início, Segurança, Privacidade, Fundação, rodapé | `app/PublicSiteGate.tsx` |
| As 4 telas de celular da página inicial | `app/CalmBank.tsx` |
| Respostas e sugestões da Rani | `app/rani-knowledge.ts` |
| Nomes e cargos do organograma | `app/OrganizationPublicPage.tsx` |
| Página Projetos | `app/ProjectsPublicPage.tsx` |
| Textos de dentro do banco | `app/page.tsx` e a pasta `app/bank/` |
| Cartões (nomes, benefícios, mensagens) | `app/bank/CardCatalog.tsx` |
| Quem tem o Ecocard (número da conta) | `app/bank/cards.ts` |

## Regras para não quebrar

- Mude **só as palavras**, entre aspas `"..."` ou entre `>` e `<`.
- Não apague aspas, `<`, `>`, `{`, `}` nem vírgulas no fim das linhas.
- Faça **uma mudança por vez** e confira o site.

## Se aparecer um ❌ vermelho

Nada foi publicado: o site continua como estava. Clique no ❌ para ver em qual arquivo e linha está o erro, corrija e salve de novo. Para desfazer, abra o commit na aba **Commits** e use **Revert**.

## Como funciona por trás

- **GitHub** guarda o código. **Cloudflare** deixa o site e a API no ar. **Neon** guarda os dados das contas.
- A automação está em `.github/workflows/publicar.yml`: a cada mudança no `main`, ela monta o site e publica na Cloudflare.
- Mudanças só em arquivos `.md` ou na pasta `backend/` não publicam nada.

## Configuração (só uma vez)

A automação precisa de uma "senha de publicação" da Cloudflare, guardada no GitHub.

1. Na Cloudflare: **My Profile → API Tokens → Create Token → Edit Cloudflare Workers → Use template**. Em *Account Resources*, escolha a conta do RanBank; em *Zone Resources*, "All zones". Depois **Continue → Create Token** e copie o código.
2. No GitHub: **Settings → Secrets and variables → Actions → New repository secret**. Nome: `CLOUDFLARE_API_TOKEN`. Cole o código e salve.
3. Na aba **Actions**, abra "Publicar site" e clique em **Run workflow** para testar.

Nunca coloque esse código em arquivos do projeto, em mensagens ou em conversas.

## Publicar pelo computador (opcional)

Com o projeto instalado (`npm install`) e logado na Cloudflare (`npx wrangler login`):

```
npm test
git add -A
git commit -m "o que mudou"
git push
npm run deploy:cloudflare
```
