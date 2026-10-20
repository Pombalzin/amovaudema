# Quiz de Estudos — Geografia e História

App de estudos em PWA com **30 questões** de Geografia e História (15 de cada).
Instalável no celular e funciona **offline**.

O diferencial: as alternativas são **embaralhadas toda vez** que a questão
aparece na tela. A resposta certa nunca fica na mesma posição, então o
estudo é de verdade e não de decorar letra.

## Recursos

- 30 questões (15 Geografia + 15 História), com explicação em cada uma
- Alternativas embaralhadas a cada rodada — e de novo a cada "Jogar de novo"
- Filtro por categoria: todas, só Geografia ou só História
- Feedback imediato ao responder, com a explicação da questão
- Resultado com placar, mensagem de desempenho e revisão completa
- Recorde de acertos salvo no navegador
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
> funciona: o navegador bloqueia o service worker em URLs `file://`.

## Estrutura

```
index.html              interface do quiz
css/estilos.css         estilos
js/perguntas.js         banco com as 30 questões
js/app.js               lógica do quiz (embaralhamento, placar, revisão)
sw.js                   service worker (cache e offline)
manifest.webmanifest    manifesto do PWA
icons/                  ícones do app
```

## Como o embaralhamento funciona

Em `js/app.js`, a função `prepararAlternativas()` sorteia a ordem das quatro
alternativas e `embaralhar()` usa o algoritmo de Fisher-Yates. Isso acontece
dentro de `iniciarQuiz()`, ou seja, **a cada rodada** — inclusive quando o
usuário clica em "Jogar de novo" ou troca a categoria.

Como o embaralhamento muda a ordem, o índice da alternativa correta também
muda. Por isso o app guarda cada alternativa junto com a informação de estar
correta ou não, em vez de confiar numa posição fixa.

As questões também são embaralhadas, então a sequência muda a cada rodada.

## Publicando

São arquivos estáticos — qualquer hosting serve:

- **GitHub Pages**, **Netlify**, **Vercel**, **Cloudflare Pages**
- É preciso **HTTPS** para o service worker funcionar em produção
- O `.webmanifest` deve ser servido como `application/manifest+json`

### Ao alterar os arquivos

Mude a `VERSAO` em `sw.js` (`v1` → `v2`) e faça o push. Sem isso, quem já
instalou o app continua usando a versão antiga em cache.

## Adicionando mais questões

Basta acrescentar um objeto no array `BANCO_DE_QUESTOES` (`js/perguntas.js`):

```js
{
  id: 'geo-16',
  categoria: 'Geografia',       // 'Geografia' ou 'Historia'
  pergunta: 'Qual pergunta?',
  alternativas: ['A', 'B', 'C', 'D'],
  correta: 0,                    // índice da alternativa certa
  explicacao: 'Por que essa é a resposta.',
}
```

O app cuida do resto: embaralha, corrige e mostra a explicação.
