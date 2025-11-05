/* ---------- Dados iniciais (imagens locais já enviadas) ---------- */
const republicas = [
  { nome:"República Tribal", cidade:"Itabira", contato:"", instagram:"https://www.instagram.com/rep.tribal?igsh=MW9iaWNsYjJ5YXhpNg==", capa:"tribal.jpg", genero:"masculina" },
  { nome:"República Monarquia", cidade:"Itabira", contato:"", instagram:"https://www.instagram.com/monarquiaunifei?igsh=Z3phN2R2bnBhNTc=", capa:"monarquia.jpg", genero:"feminina" },
  { nome:"República TetaLambda", cidade:"Itabira", contato:"", instagram:"https://www.instagram.com/reptetalambda?igsh=MTQyZTg2ejl6em02aA==", capa:"tetalambda.jpg", genero:"masculina" },
  { nome:"República Chapanda Mística", cidade:"Itabira", contato:"", instagram:"https://www.instagram.com/chapandamistica?igsh=eGNoZmJ3aGx4dnV6", capa:"chapanda.jpg", genero:"feminina" },
  { nome:"República Toca do Raul", cidade:"Itabira", contato:"", instagram:"https://www.instagram.com/reptocadoraul?igsh=MThha2N3NXF4dm56bA==", capa:"tocaraul.jpg", genero:"masculina" },
  { nome:"República San Juan", cidade:"Itabira",contato:"", instagram:"https://www.instagram.com/repsanjuan?igsh=MWd6N3Z2MHBnNjh0bA==", capa:"sanjuan.jpg", genero:"masculina" },
  { nome:"República Fosso", cidade:"Itabira",contato:"", instagram:"https://www.instagram.com/repfosso_?igsh=NHBlamFlNmkwYXNw", capa:"fosso.jpg", genero:"masculina" },
  { nome:"República MinaMora", cidade:"Itabira",contato:"", instagram:"https://www.instagram.com/republica.minamora", capa:"minamora.jpg", genero:"feminina" },
  { nome:"República Dominicana", cidade:"Itabira", contato:"", instagram:"https://www.instagram.com/republicadominicana", capa:"dominicana.jpg", genero:"feminina" },
  { nome:"República Whiskas", cidade:"Itabira", contato:"", instagram:"https://www.instagram.com/repwhiskas", capa:"whiskas.jpg", genero:"feminina" }
];

/* ---------- DOM ---------- */
const resultadosEl = document.getElementById('resultados');
const buscarBtn = document.getElementById('buscar-btn');
const buscaInput = document.getElementById('buscaNome');
const segButtons = Array.from(document.querySelectorAll('.seg-btn'));

/* ---------- Helpers ---------- */
function instagramUser(link){
  if(!link) return '';
  let user = link.replace("https://www.instagram.com/", "").split("?")[0];
  if(user.endsWith('/')) user = user.slice(0,-1);
  return '@' + user;
}

/* Chip de gênero */
function genderChip(g){
  if(!g) return '';
  const gg = g.toLowerCase();
  if(gg === 'feminina') return `<span class="gender-chip"><span class="g-ico">🚺</span>Feminina</span>`;
  if(gg === 'masculina') return `<span class="gender-chip"><span class="g-ico">🚹</span>Masculina</span>`;
  return `<span class="gender-chip"><span class="g-ico">⚧</span>Mista</span>`;
}

/* ---------- Render ---------- */
function renderList(list){
  resultadosEl.innerHTML = '';
  if(!list || list.length === 0){
    resultadosEl.innerHTML = `<p style="text-align:center; color:var(--muted); padding:20px;">Nenhuma república encontrada.</p>`;
    return;
  }

  list.forEach(rep => {
    const user = instagramUser(rep.instagram);
    const instaIcon = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'><path fill='%230a84ff' d='M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zM12 7.5A4.5 4.5 0 1012 16.5 4.5 4.5 0 0012 7.5zm6.5-2.5a1.1 1.1 0 11.001 2.201A1.1 1.1 0 0118.5 5z'/></svg>";

    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="avatar-wrap">
        <img class="avatar" src="${rep.capa}" alt="${rep.nome}">
      </div>
      <div class="card-content">
        <h3>${rep.nome}</h3>
        <div>${genderChip(rep.genero)}</div>
        <p><strong>Vagas:</strong> ${rep.vagas}</p>
        ${rep.contato ? `<p><strong>Contato:</strong> ${rep.contato}</p>` : ""}
        <p class="insta-line">
          <img src="${instaIcon}" alt="insta" class="mini-icon">
          <a href="${rep.instagram}" target="_blank" rel="noopener noreferrer">Instagram <span class="insta-user">${user}</span></a>
        </p>
      </div>
    `;
    resultadosEl.appendChild(card);
  });
}

/* ---------- Busca + filtros ---------- */
function currentFilter(){ 
  const active = segButtons.find(b => b.classList.contains('active'));
  return active ? active.dataset.filter : 'all';
}

function buscar(){
  const q = (buscaInput.value || '').trim().toLowerCase();
  const filter = currentFilter();
  let list = republicas.slice();

  if(q) list = list.filter(r => (r.nome || '').toLowerCase().includes(q));
  if(filter && filter !== 'all'){
    list = list.filter(r => (r.genero || '').toLowerCase() === filter);
  }

  renderList(list);
}

/* ---------- Segment buttons ---------- */
segButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    segButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed','true');
    buscar();
  });
});

/* ---------- Eventos ---------- */
buscarBtn.addEventListener('click', buscar);
buscaInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') buscar(); });

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderList(republicas);
  const adTop = document.getElementById('ad-top'); if(adTop) adTop.style.display = 'none';
  const adFooter = document.getElementById('ad-footer'); if(adFooter) adFooter.style.display = 'none';
});