// "Banco de dados" local só pra simular informações
const EPISODES = [
  {title: 'The DVD', season: 1, url: "https://youtu.be/DOrG7eT3xFc?si=mwH9pb2rE5Gdtv_k"},
  {title: 'The Responsible', season: 2, url:"https://youtu.be/Fu2BjEH4u84?si=hkFk-Gp75h1Mw-bp"},
  {title: 'The Choices', season: 3, url:"https://youtu.be/A3X9ddPaez8?si=ShnD0AdoozXEM8zE"},
  {title: 'The Special', season: 4, url: "https://youtu.be/uM3W04St35c?si=wbZanGynRqrxWqnm"},
  {title: 'The Finale', season: 6, url:""}
];

// Perguntas do trivia
const TRIVIA = [
  {q:'"Eu sou absolutamente normal."', a:'Gumball'},
  {q:'"Isso é cientificamente comprovado."', a:'Anais'},
  {q:'"Vamos inventar um plano perfeito!"', a:'Darwin'}
];

// Seleciona elementos do modal
const modal = document.getElementById('modal');
const triviaQuestion = document.getElementById('trivia-question');
const triviaAnswer = document.getElementById('trivia-answer');

// Abre o modal e sorteia pergunta
document.getElementById('open-trivia').addEventListener('click', ()=>{
  const pick = TRIVIA[Math.floor(Math.random()*TRIVIA.length)]; // escolhe aleatório
  modal.classList.add('open'); // abre modal
  modal.setAttribute('aria-hidden','false');

  triviaQuestion.textContent = pick.q; // mostra pergunta
  triviaQuestion.dataset.answer = pick.a; // salva resposta certa escondida
  triviaAnswer.value = ''; // limpa campo
  document.getElementById('trivia-result').textContent = ''; // limpa resultado
});

// Fecha modal
document.getElementById('close-modal').addEventListener('click', ()=>{
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
});

// Verifica resposta do trivia
document.getElementById('trivia-check').addEventListener('click', ()=>{
  const answer = triviaAnswer.value.trim().toLowerCase();
  const correct = triviaQuestion.dataset.answer.toLowerCase();
  const out = document.getElementById('trivia-result');

  if(!answer){ 
    out.textContent = 'Escreve um palpite.'; 
    return;
  }
  if(answer === correct){
    out.textContent = 'Acertou! 👏';
  } else {
    out.textContent = `Quase — a resposta certa é: ${triviaQuestion.dataset.answer}`;
  }
});

// Carrega episódios quando clicar no botão
document.getElementById('load-episodes').addEventListener('click', ()=>{
  const list = document.getElementById('episode-list');
  list.innerHTML = ''; // limpa lista

  // adiciona todos os episódios
  EPISODES.forEach(ep=>{
    const li = document.createElement('li');
    li.className = 'episode';
    li.innerHTML = `
      <span>${ep.title} <small style="color:var(--muted)">(S${ep.season})</small></span>
      <a class="btn ghost" href="${ep.url || "#"}" target="_blank">Ver</a>
    `;
    list.appendChild(li);
  });
});

// Mini jogo de adivinhar personagem
const GUESS = ['gumball','darwin','anais'];

document.getElementById('guess-btn').addEventListener('click', ()=>{
  const val = document.getElementById('guess-input').value.trim().toLowerCase();
  const out = document.getElementById('guess-result');

  if(!val){
    out.textContent = 'Tenta digitar um nome.';
    return;
  }
  if(GUESS.includes(val)){
    out.textContent = 'Boa! Esse personagem existe aqui.';
  } else {
    out.textContent = 'Não conheço esse personagem — tenta outro nome.';
  }
});

// Botão de alternar tema claro/escuro
let dark = true;
document.getElementById('toggle-theme').addEventListener('click', ()=>{
  dark = !dark; // troca estado

  if(!dark){
    // Tema claro
    document.documentElement.style.setProperty('--bg','#f6fbff');
    document.documentElement.style.setProperty('--card','#ffffff');
    document.documentElement.style.setProperty('--accent','#ff7ab6');
    document.documentElement.style.setProperty('--muted','#4b5563');
    document.body.style.color = '#071427';
  } else {
    // Tema escuro
    document.documentElement.style.setProperty('--bg','#0f1724');
    document.documentElement.style.setProperty('--card','#0b1220');
    document.documentElement.style.setProperty('--accent','#00c2ff');
    document.documentElement.style.setProperty('--muted','#9aa7b2');
    document.body.style.color = '';
  }
});

// Fecha modal com tecla ESC
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }
});

// Carrega automaticamente 2 episódios no início
(function init(){
  const list = document.getElementById('episode-list');

  EPISODES.slice(0,2).forEach(ep=>{
    const li = document.createElement('li');
    li.className = 'episode';
    li.innerHTML = `
      <span>${ep.title} <small style="color:var(--muted)">(S${ep.season})</small></span>
      <a class="btn ghost" href="${ep.url || "#"}" target="_blank">Ver</a>
    `;
    list.appendChild(li);
  });
})();
