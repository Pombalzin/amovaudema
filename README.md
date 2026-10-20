# Quiz de História

App de estudos em PWA com **116 questões** de História, em 7 assuntos.
Instalável no celular e funciona **offline**.

O diferencial: a cada rodada o app **sorteia perguntas novas** e **monta as
alternativas na hora** — 3 distratores tirados do pool da questão, misturados
com a resposta certa e embaralhados. Ou seja, as alternativas não são só
reordenadas: os textos mudam também. Não dá para decorar a letra, tem que
saber a matéria.

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
- Perguntas e alternativas novas a cada rodada
- Filtro por assunto e por quantidade (10, 15, 20, 25 ou todas)
- **Modo sem fim**: quando acaba a leva, entram perguntas novas automaticamente
- Evita repetir pergunta dentro da mesma sessão
- Feedback imediato ao responder, com a explicação da questão
- Resultado com placar, mensagem de desempenho e revisão completa
- Recorde salvo **por assunto**
- Atalhos de teclado: `1` `2` `3` `4` respondem, `Enter` avança
- Instala como app e abre offline

## Rodando localmente

Service workers só funcionam em `https://` ou `http://localhost`. Qualquer
servidor estático resolve:

```bash
python3 -m http.server 8080
# ou
npx serve .
```

Depois abra <http://localhost:8080>.

> Abrir o `index.html` direto pelo sistema de arquivos (`file://`) **não**
> funciona: o navegador bloqueia o registro do service worker em URLs `file://`.

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
index.html              interface do quiz
css/estilos.css         estilos
js/perguntas.js         banco com as 116 questões
js/app.js               lógica do quiz (sorteio, embaralhamento, placar, revisão)
sw.js                   service worker (cache e offline)
manifest.webmanifest    manifesto do PWA
icons/                  ícones do app
```

## Como o sorteio funciona

Cada questão no `js/perguntas.js` guarda a **resposta certa** e um **pool de
distratores**:

```js
{
  id: 'ant-01',
  categoria: 'Antiguidade',
  pergunta: 'Quem foi o primeiro imperador de Roma?',
  resposta: 'Augusto (Otávio)',
  distratores: ['Júlio César', 'Nero', 'Trajano', 'Constantino', 'Tibério', 'Pompeu'],
  explicacao: 'Otávio...',
}
```

Em `js/app.js`, `prepararAlternativas()` sorteia 3 distratores do pool
(Fisher-Yates) e embaralha o conjunto com a resposta certa. Isso acontece em
`iniciarQuiz()`, ou seja, **a cada rodada** — inclusive em "Jogar de novo" ou
ao trocar de assunto.

Como o pool tem de 4 a 6 distratores por questão, a rodada raramente repete a
mesma combinação. O resultado é uma alternativa diferente a cada tentativa, e
não só a letra mudando de lugar.

`sortearLeva()` cuida de outra coisa: dentro de uma sessão, uma questão só se
repete depois que o app deu a volta em todo o assunto.

## Como funciona por baixo

### `sw.js` — service worker

| Recurso | Estratégia | Motivo |
|---|---|---|
| Navegação (HTML) | **network-first**, com fallback para o cache | conteúdo novo aparece na hora, mas a página abre offline |
| CSS / JS / ícones | **stale-while-revalidate** | resposta instantânea do cache, atualizada em segundo plano |

O *app shell* é pré-cacheado na instalação. Caches antigos são descartados na
ativação, e toda resposta servida pelo SW recebe o header
`X-Served-By: service-worker` para facilitar a depuração.

### `manifest.webmanifest`

`display: standalone` (abre sem barra do navegador), ícones `any` e
`maskable` (para Android adaptativo), atalhos para os principais assuntos e
`theme_color`/`background_color` pretos para combinar com o tema do site.

## Publicando

São arquivos estáticos — qualquer hosting serve:

- **GitHub Pages**, **Netlify**, **Vercel**, **Cloudflare Pages**
- É preciso **HTTPS** para o service worker funcionar em produção
- O `.webmanifest` deve ser servido como `application/manifest+json`

### Ao alterar os arquivos

Mude a `VERSAO` em `sw.js` (hoje `v2` → `v3`) e faça o push. Sem isso, quem já
instalou o app continua usando a versão antiga em cache.

## Adicionando mais questões

Basta acrescentar um objeto no array `BANCO_DE_QUESTOES` (`js/perguntas.js`):

```js
{
  id: 'ant-20',
  categoria: 'Antiguidade',        // precisa constar em CATEGORIAS_HISTORIA
  pergunta: 'Qual pergunta?',
  resposta: 'A resposta certa',
  distratores: ['D1', 'D2', 'D3', 'D4', 'D5'],  // no mínimo 4
  explicacao: 'Por que essa é a resposta.',
}
```

Novos assuntos também precisam entrar em `CATEGORIAS_HISTORIA`, no fim de
`js/perguntas.js` — é essa lista que alimenta o menu de assuntos.

O app cuida do resto: sorteia, embaralha, corrige e mostra a explicação.

## Checklist

- [x] Manifesto válido com ícones 192/512 e versões *maskable*
- [x] Service worker registrado e ativo
- [x] App shell pré-cacheado
- [x] Navegação offline funciona
- [x] Imagens e CSS disponíveis offline
- [x] Botão de instalação via `beforeinstallprompt`
- [x] `theme-color`, `apple-touch-icon` e tags meta do iOS
- [x] Layout responsivo + `env(safe-area-inset-*)` para telas com notch
- [x] Alternativas novas a cada rodada (pool de distratores sorteado)
- [x] Modo sem fim com renovação automática da leva de perguntas
