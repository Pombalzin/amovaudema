/**
 * Lógica do quiz — Geografia e História.
 *
 * Ponto central do app: as alternativas são embaralhadas TODA VEZ que uma
 * questão aparece na tela. Assim a resposta certa nunca fica na mesma
 * posição e o estudo não vira decoração de letra.
 */

(function () {
  'use strict';

  const ROTULOS = { Geografia: 'Geografia', Historia: 'História' };
  const CHAVE_RECORDE = 'quiz-estudos-recorde';

  const el = {
    telaInicial: document.getElementById('tela-inicial'),
    telaQuiz: document.getElementById('tela-quiz'),
    telaResultado: document.getElementById('tela-resultado'),
    filtro: document.getElementById('filtro-categoria'),
    btnIniciar: document.getElementById('btn-iniciar'),
    btnReiniciar: document.getElementById('btn-reiniciar'),
    btnVoltar: document.getElementById('btn-voltar'),
    progressoTexto: document.getElementById('progresso-texto'),
    barra: document.getElementById('barra-progresso'),
    categoriaBadge: document.getElementById('categoria-badge'),
    perguntaTexto: document.getElementById('pergunta-texto'),
    alternativas: document.getElementById('alternativas'),
    feedback: document.getElementById('feedback'),
    feedbackTitulo: document.getElementById('feedback-titulo'),
    feedbackTexto: document.getElementById('feedback-texto'),
    btnProxima: document.getElementById('btn-proxima'),
    resultadoNumero: document.getElementById('resultado-numero'),
    resultadoTotal: document.getElementById('resultado-total'),
    resultadoMensagem: document.getElementById('resultado-mensagem'),
    resultadoRecorde: document.getElementById('resultado-recorde'),
    revisao: document.getElementById('revisao'),
    btnInstalar: document.querySelector('[data-instalar]'),
    statusConexao: document.querySelector('[data-status]'),
  };

  /* ------------------------------ estado ------------------------------ */

  let questoes = [];        // questões da rodada, já embaralhadas
  let indiceAtual = 0;      // posição dentro da rodada
  let acertos = 0;
  let respostas = [];       // { questao, alternativaEscolhida, acertou }
  let respondida = false;

  /* ---------------------------- utilidades ---------------------------- */

  /** Fisher-Yates: embaralha o array no lugar e devolve. */
  function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
  }

  /**
   * Monta as alternativas de uma questão em ordem aleatória.
   * Guardamos o texto da alternativa correta junto com o índice original,
   * porque embaralhar muda as posições.
   */
  function prepararAlternativas(questao) {
    const itens = questao.alternativas.map((texto, indice) => ({ texto, correta: indice === questao.correta }));
    return embaralhar(itens);
  }

  function mostrarTela(nome) {
    el.telaInicial.hidden = nome !== 'inicial';
    el.telaQuiz.hidden = nome !== 'quiz';
    el.telaResultado.hidden = nome !== 'resultado';
  }

  function lerRecorde() {
    try {
      return parseInt(localStorage.getItem(CHAVE_RECORDE) || '0', 10) || 0;
    } catch (e) {
      return 0;
    }
  }

  function salvarRecorde(valor) {
    try {
      localStorage.setItem(CHAVE_RECORDE, String(valor));
    } catch (e) {
      /* modo privado: ignorar */
    }
  }

  /* ------------------------------ quiz ------------------------------ */

  /** Atalho do manifesto: abre já com a categoria escolhida (?categoria=Geografia). */
  function aplicarCategoriaDaUrl() {
    const parametro = new URLSearchParams(window.location.search).get('categoria');
    if (parametro && ['Geografia', 'Historia', 'todas'].includes(parametro)) {
      el.filtro.value = parametro;
    }
  }

  function iniciarQuiz() {
    const filtro = el.filtro.value;

    let selecionadas = BANCO_DE_QUESTOES.filter(
      (q) => filtro === 'todas' || q.categoria === filtro
    );

    // Embaralha as questões e o gabarito de cada uma.
    questoes = embaralhar(selecionadas.slice()).map((questao) => ({
      ...questao,
      alternativasEmbaralhadas: prepararAlternativas(questao),
    }));

    indiceAtual = 0;
    acertos = 0;
    respostas = [];
    respondida = false;

    mostrarTela('quiz');
    renderizarQuestao();
  }

  function renderizarQuestao() {
    const questao = questoes[indiceAtual];
    respondida = false;

    el.progressoTexto.textContent = `Questão ${indiceAtual + 1} de ${questoes.length}`;
    el.barra.style.width = `${((indiceAtual) / questoes.length) * 100}%`;
    el.categoriaBadge.textContent = ROTULOS[questao.categoria] || questao.categoria;
    el.perguntaTexto.textContent = questao.pergunta;

    el.alternativas.innerHTML = '';
    questao.alternativasEmbaralhadas.forEach((item, i) => {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'alternativa';
      botao.dataset.index = String(i);
      botao.innerHTML =
        `<span class="letra">${String.fromCharCode(65 + i)}</span>` +
        `<span class="texto">${item.texto}</span>`;
      botao.addEventListener('click', () => escolherAlternativa(i));
      el.alternativas.appendChild(botao);
    });

    el.feedback.hidden = true;
    el.btnProxima.hidden = true;
    el.btnProxima.textContent = indiceAtual === questoes.length - 1 ? 'Ver resultado' : 'Próxima questão';
  }

  function escolherAlternativa(indice) {
    if (respondida) return; // já respondeu, não deixa trocar
    respondida = true;

    const questao = questoes[indiceAtual];
    const item = questao.alternativasEmbaralhadas[indice];
    const botoes = el.alternativas.querySelectorAll('.alternativa');

    botoes.forEach((botao, i) => {
      const alt = questao.alternativasEmbaralhadas[i];
      botao.disabled = true;
      if (alt.correta) {
        botao.classList.add('certa');
      } else if (i === indice) {
        botao.classList.add('errada');
      }
    });

    const acertou = item.correta;
    if (acertou) acertos++;
    respostas.push({ questao, correta: acertou, escolhida: item.texto });

    el.feedback.hidden = false;
    el.feedback.classList.toggle('feedback-certo', acertou);
    el.feedback.classList.toggle('feedback-errado', !acertou);
    el.feedbackTitulo.textContent = acertou ? 'Correto!' : 'Não foi dessa vez';
    el.feedbackTexto.textContent = questao.explicacao;

    el.btnProxima.hidden = false;
    el.btnProxima.focus();

    el.barra.style.width = `${((indiceAtual + 1) / questoes.length) * 100}%`;
  }

  function proxima() {
    if (indiceAtual < questoes.length - 1) {
      indiceAtual++;
      renderizarQuestao();
    } else {
      mostrarResultado();
    }
  }

  function mostrarResultado() {
    const total = questoes.length;
    const recordeAnterior = lerRecorde();
    const novoRecorde = acertos > recordeAnterior;

    if (novoRecorde) salvarRecorde(acertos);

    el.resultadoNumero.textContent = String(acertos);
    el.resultadoTotal.textContent = String(total);

    const percentual = Math.round((acertos / total) * 100);
    let mensagem;
    if (percentual === 100) mensagem = 'Perfeito! Domínio total da matéria.';
    else if (percentual >= 80) mensagem = 'Muito bom! Você está quase lá.';
    else if (percentual >= 60) mensagem = 'Bom, mas dá pra melhorar. Revise as explanations.';
    else if (percentual >= 40) mensagem = 'Precisa estudar mais um pouco. Tente de novo!';
    else mensagem = 'Bora revisar? Use a explicação de cada questão abaixo.';

    el.resultadoMensagem.textContent = mensagem;
    el.resultadoRecorde.textContent = novoRecorde
      ? `Novo recorde! ${acertos}/${total}`
      : `Recorde: ${Math.max(acertos, recordeAnterior)}/${total}`;

    // Revisão de todas as questões da rodada.
    el.revisao.innerHTML = '';
    respostas.forEach((r, i) => {
      const item = document.createElement('li');
      item.className = r.correta ? 'revisao-item certa' : 'revisao-item errada';
      item.innerHTML =
        `<span class="revisao-marcador">${r.correta ? '✓' : '✗'}</span>` +
        `<div class="revisao-corpo">` +
        `<p class="revisao-pergunta">${i + 1}. ${r.questao.pergunta}</p>` +
        `<p class="revisao-resposta">Sua resposta: ${r.escolhida}</p>` +
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

  aplicarCategoriaDaUrl();

  document.addEventListener('keydown', (evento) => {
    if (el.telaQuiz.hidden || respondida) return;
    const numero = parseInt(evento.key, 10);
    if (numero >= 1 && numero <= 4) {
      const botao = el.alternativas.querySelectorAll('.alternativa')[numero - 1];
      if (botao) botao.click();
    }
    if (evento.key === 'Enter' || evento.key === ' ') {
      const botao = el.alternativas.querySelectorAll('.alternativa');
      const primeira = [...botao].find((b) => !b.disabled);
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
})();
