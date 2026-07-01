# New Era iGaming

Plataforma de treinamentos — React + Vite + Tailwind CSS.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:5173

## Editar conteúdo

Todo o site está em `src/App.jsx`. Cada página é um componente separado
dentro do próprio arquivo (Home, Influenciadores, Anuncios, Conteudos,
Marketplace, TiktokLive, WhatsApp, VideoAulas). Basta editar os textos,
títulos e ícones diretamente ali.

Para trocar a imagem central da home, procure o comentário:

```
{/* Placeholder — substitua por: <img src="/sua-imagem.jpg" ... /> */}
```

Coloque sua imagem em `public/sua-imagem.jpg` e troque o bloco placeholder
pelo `<img>` indicado no comentário.

## Publicar na Vercel

### Opção A — pelo site (mais fácil)
1. Suba esta pasta para um repositório no GitHub.
2. Acesse https://vercel.com → **Add New Project**.
3. Importe o repositório.
4. A Vercel detecta automaticamente que é um projeto **Vite** (build
   command `vite build`, output `dist`). Não precisa mudar nada.
5. Clique em **Deploy**.

### Opção B — pelo terminal (Vercel CLI)
```bash
npm install -g vercel
vercel login
vercel
```
Siga as perguntas do terminal (aceite as opções padrão) e ele já publica.
Para subir uma nova versão depois de editar: `vercel --prod`.

## Build de produção
```bash
npm run build
npm run preview
```
