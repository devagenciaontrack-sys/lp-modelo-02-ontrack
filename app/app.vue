<script setup lang="ts">
// ============ PERSONALIZAÇÃO ============
const site = {
  marca: 'Sua Marca',
  profissional: 'Dra. Nome Sobrenome',
  registro: 'CRM 000000 · RQE 00000',
  especialidade: 'Especialidade médica',
  whatsapp: '5500000000000',
  telefone: '(00) 0000-0000',
  endereco: 'Rua Exemplo, 000 — Bairro, Cidade/UF',
  nota: '4.9',
  avaliacoes: '000 avaliações no Google',
}
const wa = (msg = 'Olá! Quero agendar uma consulta.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`

const diferenciais = [
  { t: 'Consulta sem pressa', d: 'Tempo de verdade para ouvir sua história antes de qualquer conduta.', i: 'ear' },
  { t: 'Exames na hora certa', d: 'Pedimos só o que muda a decisão. Nada a mais, nada a menos.', i: 'scan' },
  { t: 'Retorno pelo celular', d: 'Dúvidas depois da consulta respondidas pelo canal da clínica.', i: 'chat' },
  { t: 'Plano por escrito', d: 'Você sai com o tratamento explicado e os próximos passos claros.', i: 'doc' },
]
const tratamentos = [
  { t: 'Consulta de avaliação', d: 'Primeira conversa completa: histórico, exame clínico e plano inicial. Duração média de 50 minutos.' },
  { t: 'Acompanhamento contínuo', d: 'Retornos periódicos para ajustar o tratamento conforme a sua evolução.' },
  { t: 'Check-up preventivo', d: 'Avaliação anual com exames direcionados ao seu perfil e à sua idade.' },
  { t: 'Teleconsulta', d: 'Atendimento por vídeo para retornos e orientações, sem sair de casa.' },
  { t: 'Procedimentos em consultório', d: 'Pequenos procedimentos realizados no próprio consultório, com segurança.' },
]
const depoimentos = [
  { n: 'Mariana S.', c: 'Paciente desde 2023', t: 'Pela primeira vez saí de uma consulta entendendo exatamente o que eu tinha e o que fazer.' },
  { n: 'Roberto A.', c: 'Check-up anual', t: 'Atendimento pontual, explicação clara e retorno rápido pelo WhatsApp quando precisei.' },
  { n: 'Luciana P.', c: 'Acompanhamento', t: 'Me senti ouvida. O plano por escrito fez toda a diferença no meu tratamento.' },
  { n: 'Carlos M.', c: 'Teleconsulta', t: 'Fiz o retorno por vídeo e foi tão bom quanto o presencial. Recomendo demais.' },
]
const faq = [
  { q: 'Vocês atendem convênio?', a: 'Atendemos particular com emissão de recibo para reembolso. Consulte a lista de convênios pelo WhatsApp.' },
  { q: 'Quanto tempo dura a primeira consulta?', a: 'Em média 50 minutos, para conhecer seu histórico com calma.' },
  { q: 'Posso remarcar?', a: 'Sim, com até 24 horas de antecedência, pelo WhatsApp.' },
  { q: 'Tem teleconsulta?', a: 'Sim, para retornos e orientações. A primeira consulta é preferencialmente presencial.' },
]

const aberto = ref<number | null>(0)
const trilho = ref<HTMLElement | null>(null)
const mover = (dir: number) => trilho.value?.scrollBy({ left: dir * (trilho.value.clientWidth * 0.8), behavior: 'smooth' })
</script>

<template>
  <div>
    <svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <defs>
        <symbol id="i-ear" viewBox="0 0 24 24"><path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a2.5 2.5 0 0 1-5 0"/><path d="M10 9.5a2 2 0 0 1 4 0"/></symbol>
        <symbol id="i-scan" viewBox="0 0 24 24"><path d="M4 8V5h3M17 5h3v3M20 16v3h-3M7 19H4v-3"/><path d="M4 12h3l2-3 3 6 2-3h6"/></symbol>
        <symbol id="i-chat" viewBox="0 0 24 24"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/></symbol>
        <symbol id="i-doc" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h4"/></symbol>
        <symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M12 2.2a9.7 9.7 0 0 0-8.3 14.7L2.3 21.8l5-1.3A9.7 9.7 0 1 0 12 2.2Zm4.4 11.7c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.5-.4Z"/></symbol>
        <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
      </defs>
    </svg>

    <header class="top">
      <div class="wrap top-in">
        <a href="#" class="logo"><span class="logo-dot" />{{ site.marca }}</a>
        <nav class="nav">
          <a href="#cuidado">Cuidado</a><a href="#tratamentos">Tratamentos</a><a href="#depoimentos">Depoimentos</a><a href="#duvidas">Dúvidas</a>
        </nav>
        <a class="btn btn-ink btn-sm" :href="wa()" target="_blank" rel="noopener">Agendar</a>
      </div>
    </header>

    <main>
      <!-- HERO -->
      <section class="hero">
        <svg class="pulse" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 130 H420 l26-64 34 128 30-150 26 86 H760 l18-30 22 44 18-14 H1440" />
        </svg>
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <p class="rating"><b>{{ site.nota }}</b><span class="stars">★★★★★</span>{{ site.avaliacoes }}</p>
            <h1>Saúde que acompanha você de perto, com a tecnologia a favor da escuta.</h1>
            <p class="lead">Consultas sem pressa, exames na medida certa e retorno pelo celular. Um cuidado moderno que começa por entender você.</p>
            <div class="cta-row">
              <a class="btn btn-teal btn-lg" :href="wa()" target="_blank" rel="noopener">Agendar consulta</a>
              <a class="btn btn-line btn-lg" href="#tratamentos">Ver tratamentos</a>
            </div>
          </div>
          <div class="hero-card">
            <div class="ph ph-portrait"><span>Foto do profissional</span></div>
            <div class="slot">
              <p class="slot-k">Próximos horários</p>
              <div class="slot-row"><span>Ter</span><b>09:30</b><b>14:00</b><b class="off">16:30</b></div>
              <div class="slot-row"><span>Qua</span><b>08:00</b><b class="off">11:00</b><b>15:30</b></div>
              <a :href="wa('Olá! Vi um horário disponível no site e quero agendar.')" target="_blank" rel="noopener">Reservar pelo WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <!-- DIFERENCIAIS -->
      <section id="cuidado" class="sec">
        <div class="wrap">
          <h2 class="h2">Um consultório pensado para você sair com respostas.</h2>
          <div class="cards">
            <article v-for="d in diferenciais" :key="d.t" class="card">
              <svg class="card-ic"><use :href="`#i-${d.i}`" /></svg>
              <h3>{{ d.t }}</h3>
              <p>{{ d.d }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- SOBRE -->
      <section class="sec about">
        <div class="wrap about-grid">
          <div class="ph ph-about"><span>Foto no consultório</span></div>
          <div>
            <p class="k">{{ site.especialidade }}</p>
            <h2 class="h2">{{ site.profissional }}</h2>
            <p class="reg">{{ site.registro }}</p>
            <p class="bio">Formação em [universidade], residência em [instituição] e mais de [00] anos de atendimento. Acredito em medicina feita com tempo, evidência e conversa franca.</p>
            <ul class="creds">
              <li><b>00+</b><span>anos de experiência</span></li>
              <li><b>0.000+</b><span>pacientes atendidos</span></li>
              <li><b>Membro</b><span>[Sociedade médica]</span></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- TRATAMENTOS -->
      <section id="tratamentos" class="sec">
        <div class="wrap tr-grid">
          <div>
            <h2 class="h2">Tratamentos</h2>
            <p class="muted">Toque em cada um para ver como funciona.</p>
            <a class="btn btn-teal" :href="wa('Olá! Quero saber mais sobre os tratamentos.')" target="_blank" rel="noopener">Tirar dúvida</a>
          </div>
          <div class="acc">
            <div v-for="(t, i) in tratamentos" :key="t.t" class="acc-item" :class="{ open: aberto === i }">
              <button type="button" :aria-expanded="aberto === i" @click="aberto = aberto === i ? null : i">
                <span class="acc-n">{{ String(i + 1).padStart(2, '0') }}</span>{{ t.t }}<span class="acc-plus" />
              </button>
              <div class="acc-body"><p>{{ t.d }}</p></div>
            </div>
          </div>
        </div>
      </section>

      <!-- DEPOIMENTOS -->
      <section id="depoimentos" class="sec dep">
        <div class="wrap">
          <div class="dep-head">
            <h2 class="h2">Quem já passou por aqui</h2>
            <div class="arrows">
              <button type="button" aria-label="Anterior" @click="mover(-1)"><svg><use href="#i-arrow" /></svg></button>
              <button type="button" aria-label="Próximo" @click="mover(1)"><svg><use href="#i-arrow" /></svg></button>
            </div>
          </div>
          <div ref="trilho" class="rail">
            <figure v-for="d in depoimentos" :key="d.n" class="quote">
              <span class="stars">★★★★★</span>
              <blockquote>“{{ d.t }}”</blockquote>
              <figcaption><b>{{ d.n }}</b>{{ d.c }}</figcaption>
            </figure>
          </div>
          <p class="note">Depoimentos de exemplo — substituir por avaliações reais autorizadas.</p>
        </div>
      </section>

      <!-- FAQ + CONTATO -->
      <section id="duvidas" class="sec">
        <div class="wrap faq-grid">
          <div class="faq">
            <h2 class="h2">Dúvidas rápidas</h2>
            <details v-for="f in faq" :key="f.q"><summary>{{ f.q }}</summary><p>{{ f.a }}</p></details>
          </div>
          <div class="contact">
            <p class="k">Agende agora</p>
            <h3>Fale com a recepção pelo WhatsApp.</h3>
            <p>Respondemos em horário comercial. Para urgências, procure um pronto atendimento.</p>
            <a class="btn btn-wa btn-lg" :href="wa()" target="_blank" rel="noopener"><svg><use href="#i-wa" /></svg> Agendar pelo WhatsApp</a>
            <p class="addr">{{ site.endereco }}<br>{{ site.telefone }}</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="foot">
      <div class="wrap foot-in">
        <span>{{ site.marca }} · {{ site.registro }}</span>
        <span>© {{ new Date().getFullYear() }} · Responsável técnico: {{ site.profissional }}</span>
      </div>
    </footer>

    <a class="fab" :href="wa()" target="_blank" rel="noopener" aria-label="Agendar pelo WhatsApp"><svg><use href="#i-wa" /></svg></a>
  </div>
</template>
