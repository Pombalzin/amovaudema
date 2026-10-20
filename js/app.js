/**
 * Lógica do quiz — História.
 *
 * Duas coisas acontecem a cada rodada:
 *
 *   1. as QUESTÕES são sorteadas aleatoriamente do banco (nunca repetem na
 *      mesma rodada);
 *   2. as ALTERNATIVAS são montadas na hora: o app sortea 3 distratores
 *      diferentes do pool de cada questão e embaralha tudo, então a resposta
 *      certa muda de posição a cada exibição e as opções erradas nunca são
 *      as mesmas duas vezes seguidas.
 *
 * No "modo sem fim" a fila se renova sozinha quando acaba, com perguntas
 * novas e alternativas novas, indefinidamente.
 */

(function () {
  'use strict';

  const CHAVE_RECORDE = 'quiz-historia-recorde';
  const QUANTIDADES = [10, 15, 20, 25, 0]; // 0 = todas
  const TOTAL_ALTERNATIVAS = 4;

  const el = {
    telaInicial: document.getElementById('tela-inicial'),
    telaQuiz: document.getElementById('tela-quiz'),
    telaResultado: document.getElementById('tela-resultado'),
    filtro: document.getElementById('filtro-categoria'),
    filtroQuantidade: document.getElementById('filtro-quantidade'),
    modoInfinito: document.getElementById('modo-infinito'),
    btnIniciar: document.getElementById('btn-iniciar'),
    btnReiniciar: document.getElementById('btn-reiniciar'),
    btnVoltar: document.getElementById('btn-voltar'),
    btnProxima: document.getElementById('btn-proxima'),
    btnEncerrar: document.getElementById('btn-encerrar'),
    progressoTexto: document.getElementById('progresso-texto'),
    barra: document.getElementById('barra-progresso'),
    categoriaBadge: document.getElementById('categoria-badge'),
    perguntaTexto: document.getElementById('pergunta-texto'),
    alternativas: document.getElementById('alternativas'),
    feedback: document.getElementById('feedback'),
    feedbackTitulo: document.getElementById('feedback-titulo'),
    feedbackTexto: document.getElementById('feedback-texto'),
    resultadoNumero: document.getElementById('resultado-numero'),
    resultadoTotal: document.getElementById('resultado-total'),
    resultadoMensagem: document.getElementById('resultado-mensagem'),
    resultadoRecorde: document.getElementById('resultado-recorde'),
    revisao: document.getElementById('revisao'),
    btnInstalar: document.querySelector('[data-instalar]'),
    statusConexao: document.querySelector('[data-status]'),
  };

  /* ------------------------------ estado ------------------------------ */

  let fila = [];          // questões da rodada, já com alternativas sorteadas
  let indiceAtual = 0;    // posição dentro da fila
  let acertos = 0;        // acertos da rodada atual
  let respondidas = 0;    // total de perguntas respondidas nesta sessão
  let respostas = [];     // histórico para a tela de revisão
  let respondida = false; // se a questão atual já foi respondida
  let modoInfinito = false;
  let usadasNaSessao = new Set();
  let encerradoPeloUsuario = false;

  /* ---------------------------- utilidades ---------------------------- */

  /** Fisher-Yates: embaralha o array no lugar e devolve. */
  function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
  }

  /** Sorteia n elementos do array, sem repetir. */
  function sortear(lista, n) {
    return embaralhar(lista.slice()).slice(0, n);
  }

  /**
   * Monta as alternativas de uma questão do zero.
   * A resposta certa entra na lista e os distratores são sorteados entre os
   * que sobraram — por isso duas rodadas da MESMA questão têm alternativas
   * diferentes.
   */
  function prepararAlternativas(questao) {
    const quantosDistratores = TOTAL_ALTERNATIVAS - 1;
    const distratores = sortear(questao.distratores, quantosDistratores);

    const itens = [{ texto: questao.resposta, correta: true }].concat(
      distratores.map((texto) => ({ texto, correta: false }))
    );

    return embaralhar(itens);
  }

  function mostrarTela(nome) {
    el.telaInicial.hidden = nome !== 'inicial';
    el.telaQuiz.hidden = nome !== 'quiz';
    el.telaResultado.hidden = nome !== 'resultado';
  }

  /* ------------------------------ recordes ------------------------------ */

  function lerRecorde(categoria) {
    try {
      const bruto = localStorage.getItem(`${CHAVE_RECORDE}:${categoria}`);
      if (!bruto) return null;
      const dados = JSON.parse(bruto);
      return dados && typeof dados.acertos === 'number' ? dados : null;
    } catch (e) {
      return null;
    }
  }

  function salvarRecorde(categoria, acertos, total) {
    try {
      localStorage.setItem(
        `${CHAVE_RECORDE}:${categoria}`,
        JSON.stringify({ acertos, total, em: new Date().toISOString() })
      );
    } catch (e) {
      /* modo privado: ignorar */
    }
  }

  /* ------------------------- tela inicial ------------------------- */

  /** Monta o seletor de assuntos com a contagem de cada um. */
  function montarFiltroCategorias() {
    el.filtro.innerHTML = '';

    const total = BANCO_DE_QUESTOES.length;
    const todas = document.createElement('option');
    todas.value = 'todas';
    todas.textContent = `Todos os assuntos (${total})`;
    el.filtro.appendChild(todas);

    CATEGORIAS_HISTORIA.forEach((categoria) => {
      const quantidade = BANCO_DE_QUESTOES.filter((q) => q.categoria === categoria).length;
      const opcao = document.createElement('option');
      opcao.value = categoria;
      opcao.textContent = `${categoria} (${quantidade})`;
      el.filtro.appendChild(opcao);
    });
  }

  /** Monta o seletor de quantidade, respeitando o tamanho do assunto escolhido. */
  function montarFiltroQuantidade() {
    const categoria = el.filtro.value;
    const disponiveis =
      categoria === 'todas'
        ? BANCO_DE_QUESTOES.length
        : BANCO_DE_QUESTOES.filter((q) => q.categoria === categoria).length;

    el.filtroQuantidade.innerHTML = '';
    QUANTIDADES.forEach((n) => {
      if (n !== 0 && n > disponiveis) return;
      const opcao = document.createElement('option');
      opcao.value = String(n);
      opcao.textContent = n === 0 ? `Todas (${disponiveis})` : `${n} questões`;
      if (n === 15 || (n === 0 && disponiveis < 10)) opcao.selected = true;
      el.filtroQuantidade.appendChild(opcao);
    });
  }

  /** Atalho do manifesto: abre já com o assunto escolhido (?assunto=...). */
  function aplicarCategoriaDaUrl() {
    const params = new URLSearchParams(window.location.search);
    const parametro = params.get('assunto') || params.get('categoria');
    if (parametro && [...el.filtro.options].some((o) => o.value === parametro)) {
      el.filtro.value = parametro;
    }
  }

  /* ------------------------------ quiz ------------------------------ */

  /** Questões do assunto selecionado. */
  function questoesDoAssunto() {
    const categoria = el.filtro.value;
    return BANCO_DE_QUESTOES.filter((q) => categoria === 'todas' || q.categoria === categoria);
  }

  /**
   * Sorteia a próxima leva de perguntas, evitando repetir as que já
   * apareceram nesta sessão (quando ainda há questões sobrando).
   */
  function sortearLeva(quantidade) {
    const disponiveis = questoesDoAssunto();
    let candidatas = disponiveis.filter((q) => !usadasNaSessao.has(q.id));

    // Se já demos a volta, aceita repetir — melhor repetir do que travar.
    if (candidatas.length < quantidade) candidatas = disponiveis.slice();

    const sorteadas = sortear(candidatas, Math.min(quantidade, candidatas.length));
    return sorteadas.map((questao) => {
      usadasNaSessao.add(questao.id);
      return { ...questao, alternativas: prepararAlternativas(questao) };
    });
  }

  function iniciarQuiz() {
    const categoria = el.filtro.value;
    const opcao = el.filtroQuantidade.value;
    modoInfinito = el.modoInfinito ? el.modoInfinito.checked : false;
    encerradoPeloUsuario = false;

    const totalDisponivel = questoesDoAssunto().length;
    const quantidade = opcao === '0' ? totalDisponivel : Math.min(parseInt(opcao, 10), totalDisponivel);

    fila = sortearLeva(quantidade);
    indiceAtual = 0;
    acertos = 0;
    respostas = [];
    respondida = false;

    mostrarTela('quiz');
    renderizarQuestao();
  }

  function renderizarQuestao() {
    const questao = fila[indiceAtual];
    respondida = false;

    if (modoInfinito) {
      el.progressoTexto.textContent = `Questão ${respondidas + 1} · ${respondidas} respondidas`;
    } else {
      el.progressoTexto.textContent = `Questão ${indiceAtual + 1} de ${fila.length}`;
    }

    const progresso = modoInfinito
      ? (respondidas % 10) / 10
      : indiceAtual / Math.max(fila.length, 1);
    el.barra.style.width = `${Math.min(progresso, 1) * 100}%`;

    el.categoriaBadge.textContent = questao.categoria;
    el.perguntaTexto.textContent = questao.pergunta;

    el.alternativas.innerHTML = '';
    questao.alternativas.forEach((item, i) => {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'alternativa';
      botao.dataset.index = String(i);
      botao.innerHTML =
        `<span class="letra">${String.fromCharCode(65 + i)}</span>` +
        `<span class="texto"></span>`;
      botao.querySelector('.texto').textContent = item.texto;
      botao.addEventListener('click', () => escolherAlternativa(i));
      el.alternativas.appendChild(botao);
    });

    el.feedback.hidden = true;
    el.btnProxima.hidden = true;
    el.btnProxima.textContent = 'Próxima questão';
    if (el.btnEncerrar) el.btnEncerrar.hidden = !modoInfinito;
  }

  function escolherAlternativa(indice) {
    if (respondida) return; // já respondeu, não deixa trocar
    respondida = true;

    const questao = fila[indiceAtual];
    const item = questao.alternativas[indice];
    const botoes = el.alternativas.querySelectorAll('.alternativa');

    botoes.forEach((botao, i) => {
      const alt = questao.alternativas[i];
      botao.disabled = true;
      if (alt.correta) {
        botao.classList.add('certa');
      } else if (i === indice) {
        botao.classList.add('errada');
      }
    });

    const acertou = item.correta;
    if (acertou) acertos++;
    respondidas++;
    respostas.push({
      questao,
      correta: acertou,
      escolhida: item.texto,
      alternativas: questao.alternativas.map((a) => a.texto),
    });

    el.feedback.hidden = false;
    el.feedback.classList.toggle('feedback-certo', acertou);
    el.feedback.classList.toggle('feedback-errado', !acertou);
    el.feedbackTitulo.textContent = acertou ? 'Correto!' : 'Não foi dessa vez';
    el.feedbackTexto.textContent = questao.explicacao;

    el.btnProxima.hidden = false;
    el.btnProxima.textContent =
      !modoInfinito && indiceAtual === fila.length - 1 ? 'Ver resultado' : 'Próxima questão';
    el.btnProxima.focus();

    if (modoInfinito) {
      el.progressoTexto.textContent = `Questão ${respondidas} · ${respondidas} respondidas`;
      el.barra.style.width = `${((respondidas % 10) / 10) * 100}%`;
    } else {
      el.barra.style.width = `${((indiceAtual + 1) / fila.length) * 100}%`;
    }
  }

  function proxima() {
    if (indiceAtual < fila.length - 1) {
      indiceAtual++;
      renderizarQuestao();
      return;
    }

    if (modoInfinito && !encerradoPeloUsuario) {
      // A fila acabou: monta uma nova leva com perguntas e alternativas novas.
      const tamanho = fila.length || 10;
      fila = sortearLeva(tamanho);
      indiceAtual = 0;
      renderizarQuestao();
      return;
    }

    mostrarResultado();
  }

  function mostrarResultado() {
    const total = respondidas;
    if (total === 0) {
      mostrarTela('inicial');
      return;
    }

    const categoria = el.filtro.value;
    const percentual = Math.round((acertos / total) * 100);
    const recordeAnterior = lerRecorde(categoria);
    const recordePercentual = recordeAnterior
      ? Math.round((recordeAnterior.acertos / recordeAnterior.total) * 100)
      : 0;
    const novoRecorde = percentual > recordePercentual;

    if (novoRecorde) salvarRecorde(categoria, acertos, total);

    el.resultadoNumero.textContent = String(acertos);
    el.resultadoTotal.textContent = String(total);

    let mensagem;
    if (percentual === 100) mensagem = 'Perfeito! Domínio total da matéria.';
    else if (percentual >= 80) mensagem = 'Muito bom! Você está quase lá.';
    else if (percentual >= 60) mensagem = 'Bom, mas dá pra melhorar. Veja as explicações.';
    else if (percentual >= 40) mensagem = 'Precisa estudar mais um pouco. Tente de novo!';
    else mensagem = 'Bora revisar? Use a explicação de cada questão abaixo.';

    el.resultadoMensagem.textContent = mensagem;
    el.resultadoRecorde.textContent = novoRecorde
      ? `Novo recorde! ${acertos}/${total}`
      : recordeAnterior
        ? `Recorde: ${recordeAnterior.acertos}/${recordeAnterior.total}`
        : '';

    // Revisão de todas as questões respondidas.
    el.revisao.innerHTML = '';
    respostas.forEach((r, i) => {
      const item = document.createElement('li');
      item.className = r.correta ? 'revisao-item certa' : 'revisao-item errada';
      item.innerHTML =
        `<span class="revisao-marcador">${r.correta ? '✓' : '✗'}</span>` +
        `<div class="revisao-corpo">` +
        `<p class="revisao-pergunta">${i + 1}. ${r.questao.pergunta}</p>` +
        `<p class="revisao-resposta">Sua resposta: ${r.escolhida}</p>` +
        `<p class="revisao-resposta">Resposta certa: ${r.questao.resposta}</p>` +
        `<p class="revisao-explicacao">${r.questao.explicacao}</p>` +
        `</div>`;
      el.revisao.appendChild(item);
    });

    mostrarTela('resultado');
    el.btnReiniciar.focus();
  }

  /* ----------------------------- eventos ----------------------------- */

  el.btnIniciar.addEventListener('click', iniciarQuiz);
  el.btnReiniciar.addEventListener('click', iniciarQuiz);
  el.btnVoltar.addEventListener('click', () => mostrarTela('inicial'));
  el.btnProxima.addEventListener('click', proxima);

  if (el.btnEncerrar) {
    el.btnEncerrar.addEventListener('click', () => {
      encerradoPeloUsuario = true;
      mostrarResultado();
    });
  }

  el.filtro.addEventListener('change', montarFiltroQuantidade);

  document.addEventListener('keydown', (evento) => {
    if (el.telaQuiz.hidden || respondida) return;
    const numero = parseInt(evento.key, 10);
    if (numero >= 1 && numero <= TOTAL_ALTERNATIVAS) {
      const botao = el.alternativas.querySelectorAll('.alternativa')[numero - 1];
      if (botao) botao.click();
    }
    if (evento.key === 'Enter' || evento.key === ' ') {
      const botoes = [...el.alternativas.querySelectorAll('.alternativa')];
      const primeira = botoes.find((b) => !b.disabled);
      if (primeira) {
        evento.preventDefault();
        primeira.click();
      }
    }
  });

  /* -------------------------- instalação PWA -------------------------- */

  let promptInstalacao = null;

  window.addEventListener('beforeinstallprompt', (evento) => {
    evento.preventDefault();
    promptInstalacao = evento;
    if (el.btnInstalar) el.btnInstalar.hidden = false;
  });

  if (el.btnInstalar) {
    el.btnInstalar.addEventListener('click', () => {
      if (!promptInstalacao) return;
      promptInstalacao.prompt();
      promptInstalacao.userChoice.then(() => {
        promptInstalacao = null;
        el.btnInstalar.hidden = true;
      });
    });
  }

  window.addEventListener('appinstalled', () => {
    promptInstalacao = null;
    if (el.btnInstalar) el.btnInstalar.hidden = true;
  });

  /* ---------------------------- status online ---------------------------- */

  function atualizarStatus() {
    if (!el.statusConexao) return;
    const online = navigator.onLine;
    el.statusConexao.textContent = online ? 'Online' : 'Offline — usando o cache';
    el.statusConexao.dataset.state = online ? 'online' : 'offline';
  }

  window.addEventListener('online', atualizarStatus);
  window.addEventListener('offline', atualizarStatus);
  atualizarStatus();

  /* ---------------------------- service worker ---------------------------- */

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch((erro) => {
        console.warn('Não foi possível registrar o service worker:', erro);
      });
    });
  }

  /* ------------------------------ início ------------------------------ */

  montarFiltroCategorias();
  aplicarCategoriaDaUrl();
  montarFiltroQuantidade();
})();
