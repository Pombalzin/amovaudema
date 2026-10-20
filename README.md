# Quiz de História — PWA

App de estudos em **PWA** para treinar História: **116 questões** divididas em
**7 assuntos**. Instalável no celular, funciona **offline** e sem dependências
de build.

O diferencial do app é a **aleatorização**: a cada rodada as perguntas são
sorteadas de novo e as alternativas são **montadas na hora** — o app sorteia 3
distratores diferentes entre os disponíveis em cada questão e embaralha tudo.
Ou seja, a resposta certa nunca fica na mesma posição e as opções erradas
nunca são as mesmas duas rodadas seguidas. Não dá para decorar a letra, tem
que saber a matéria.

## Modo sem fim

Além das rodadas de 10, 15, 20, 25 ou todas as questões, existe o **modo sem
fim**: quando a leva de perguntas acaba, o app sorteia uma nova leva e
continua. Só é preciso clicar em **Encerrar e ver resultado** para parar.

## Assuntos

| Assunto | Questões |
|---|---|
| Antiguidade | 19 |
| Mundos Pré-Coloniais | 11 |
| Idade Média | 18 |
| Idade Moderna | 17 |
| Brasil: Colônia e Império | 15 |
| Brasil: República | 16 |
| Mundo Contemporâneo | 20 |

## Recursos

- 116 questões com explicação em cada uma
- Alternativas sorteadas a cada rodada — e de novo a cada "Jogar de novo"
- Modo sem fim, com perguntas e alternativas sempre novas
- Filtro por assunto e por quantidade de questões
- Feedback imediato ao responder, com a explicação da questão
- Resultado com placar, mensagem de desempenho e revisão completa
- Recorde de acertos salvo no navegador, por assunto
- Atalhos de teclado: `1` `2` `3` `4` respondem, `Enter` avança
- Instala como app e abre offline

## Rodando localmente

Service workers só funcionam em `https://` ou `http://localhost`. Como o
projeto é 100% estático, qualquer servidor local serve:

```bash
python3 -m http.server 8080   # http://localhost:8080
npx serve .                    # alternativa com Node
```

Depois abra <http://localhost:8080> no navegador.

> Abrir o `index.html` direto pelo sistema de arquivos (`file://`) **não**
> funciona: o navegador bloqueia o registro do service worker em URLs
> `file://`.

### Testando no celular (opcional)

Para testar em um celular na mesma rede, gere um certificado local:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365 \
  -subj "/CN=localhost" -addext "subjectAltName=DNS:localhost,IP:192.168.0.1"

npx http-server . -p 8080 --ssl --cert cert.pem --key key.pem
```

Acesse `https://<ip-do-computador>:8080` no celular e aceite o certificado
aviso do navegador.

## Estrutura

```
index.html            página inicial (telas de início, quiz e resultado)
css/estilos.css       estilos
js/perguntas.js       banco de 116 questões (resposta + pool de distratores)
js/app.js             sorteio, telas, pontuação, recordes e instalação PWA
manifest.webmanifest  manifesto do PWA
sw.js                 service worker (cache e offline)
icons/                ícones do app (192, 512, maskable, apple-touch, favicon)
```

## Como a aleatorização funciona

Cada questão do banco (`js/perguntas.js`) guarda **a resposta certa** e um
**pool de distratores**:

```js
{
  id: 'ant-01',
  categoria: 'Antiguidade',
  pergunta: 'Quem foi o primeiro imperador de Roma?',
  resposta: 'Augusto (Otávio)',
  distratores: ['Júlio César', 'Nero', 'Trajano', 'Constantino', 'Tibério', 'Pompeu'],
  explicacao: '...',
}
```

A cada exibição (`prepararAlternativas` em `js/app.js`):

1. 3 distratores são **sorteados** do pool;
2. a resposta certa entra na lista;
3. as 4 opções são **embaralhadas** (Fisher-Yates).

Como o pool tem mais de 3 distratores, duas rodadas da mesma questão
normalmente têm combinações diferentes — e a posição da resposta muda sempre.

## Como funciona por baixo

### `sw.js` — service worker

| Recurso | Estratégia | Motivo |
|---|---|---|
| Navegação (HTML) | **network-first**, com fallback para o cache | conteúdo novo aparece na hora, mas a página abre offline |
| CSS / JS / ícones | **stale-while-revalidate** | resposta instantânea do cache, atualizada em segundo plano |

O *app shell* é pré-cacheado na instalação. Caches antigos são descartados na
ativação, e toda resposta servida pelo SW recebe o header
`X-Served-By: service-worker` para facilitar a depuração.

**Ao alterar arquivos do site, troque a `VERSAO` em `sw.js`** (ex.: `v2` →
`v3`) para forçar a limpeza do cache antigo.

### `manifest.webmanifest`

`display: standalone` (abre sem barra do navegador), ícones `any` e
`maskable` (para Android adaptativo), atalhos para os principais assuntos e
`theme_color`/`background_color` pretos para combinar com o tema do site.

## Publicando

São arquivos estáticos — qualquer hosting serve:

- **GitHub Pages**, **Netlify**, **Vercel**, **Cloudflare Pages**
- Necessário **HTTPS** para o service worker funcionar em produção
- O arquivo `.webmanifest` deve ser servido com
  `Content-Type: application/manifest+json`

## Checklist

- [x] Manifesto válido com ícones 192/512 e versões *maskable*
- [x] Service worker registrado e ativo
- [x] App shell pré-cacheado
- [x] Navegação offline funciona
- [x] Imagens e CSS disponíveis offline
- [x] Botão de instalação via `beforeinstallprompt`
- [x] Aviso de nova versão do SW
- [x] `theme-color`, `apple-touch-icon` e tags meta do iOS
- [x] Layout responsivo + `env(safe-area-inset-*)` para telas com notch
- [x] Alternativas novas a cada rodada (pool de distratores sorteado)
- [x] Modo sem fim com renovação automática da leva de perguntas
