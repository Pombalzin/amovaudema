# Daniel Melo — PWA

Portfólio pessoal convertido em **Progressive Web App**: instalável no celular,
com funcionamento offline e sem dependências de build.

## Rodando localmente

Service workers só funcionam em `https://` ou `http://localhost`, então use o
servidor que já vem incluso:

```bash
node serve.js                 # http://localhost:8080
node serve.js --port=3000     # outra porta
```

Depois abra <http://localhost:8080> no navegador.

> Abrir o `index.html` direto pelo sistema de arquivos (`file://`) **não** funciona:
> o navegador bloqueia o registro do service worker em URLs `file://`.

### Testando no celular (opcional)

Para testar em um celular na mesma rede, gere um certificado local:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365 \
  -subj "/CN=localhost" -addext "subjectAltName=DNS:localhost,IP:192.168.0.1"

node serve.js --https --host=0.0.0.0
```

Acesse `https://<ip-do-computador>:8080` no celular e aceite o certificado
aviso do navegador. O `--host=0.0.0.0` permite conexões de outros dispositivos.

## Estrutura

```
index.html            página inicial
Daniel.html           página inicial (duplicata)
sobre-mim.html        sobre mim
contato.html          contato
daniel.css            estilos
app.js                registro do SW + prompt de instalação
sw.js                 service worker (cache e offline)
manifest.webmanifest  manifesto do PWA
serve.js              servidor estático para desenvolvimento
icons/                ícones do app (192, 256, 512, maskable, apple-touch)
favicon-64.png        favicon
danel.jpg             foto de perfil
discord.jpg           ícone do Discord
```

## Como funciona

### `sw.js` — service worker

| Recurso | Estratégia | Motivo |
|---|---|---|
| Navegação (HTML) | **network-first**, com fallback para o cache | conteúdo novo aparece na hora, mas a página abre offline |
| CSS / JS / imagens | **stale-while-revalidate** | resposta instantânea do cache, atualizada em segundo plano |

O *app shell* (13 arquivos) é pré-cacheado na instalação. Caches antigos são
descartados na ativação, e toda resposta servida pelo SW recebe o header
`X-Served-By: service-worker` para facilitar a depuração.

**Ao alterar arquivos do site, troque a `VERSION` em `sw.js`** (ex.: `v1` → `v2`)
para forçar a limpeza do cache antigo.

### `app.js` — registro e instalação

- Registra o SW e avisa quando há uma versão nova disponível
- Captura o evento `beforeinstallprompt` e exibe o botão **Instalar app**
- Mostra o estado online/offline

### `manifest.webmanifest`

`display: standalone` (abre sem barra do navegador), ícones `any` e `maskable`
(para Android adaptativo), atalhos para *Sobre mim* e *Contato*, e
`theme_color`/`background_color` pretos para combinar com o tema do site.

## Publicando

São arquivos estáticos — qualquer hosting serve:

- **GitHub Pages**, **Netlify**, **Vercel**, **Cloudflare Pages**
- Necessário **HTTPS** para o service worker funcionar em produção
- O arquivo `.webmanifest` deve ser servido com
  `Content-Type: application/manifest+json`

## Checklist

- [x] Manifesto válido com ícones 192/256/512 e versões *maskable*
- [x] Service worker registrado e ativo
- [x] App shell pré-cacheado (13 arquivos)
- [x] Navegação offline funciona, inclusive em subpáginas
- [x] Imagens e CSS disponíveis offline
- [x] Botão de instalação via `beforeinstallprompt`
- [x] Aviso de nova versão do SW
- [x] `theme-color`, `apple-touch-icon` e tags meta do iOS
- [x] Layout responsivo + `env(safe-area-inset-*)` para telas com notch
