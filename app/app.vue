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
  cnpj: '00.000.000/0000-00',
  instagram: '#',
}
const wa = (msg = 'Olá! Quero agendar uma consulta.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`

// horário de atendimento por dia da semana (0 = domingo). null = fechado
const horario: Record<number, [number, number] | null> = { 0: null, 1: [8, 18], 2: [8, 18], 3: [8, 18], 4: [8, 18], 5: [8, 17], 6: [8, 12] }
const respostaWhats = 'em até 1 hora'

const status = ref<{ aberto: boolean, texto: string } | null>(null)
function calcularStatus() {
  const dias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
  const agora = new Date(), d = agora.getDay(), h = agora.getHours() + agora.getMinutes() / 60
  const hj = horario[d]
  if (hj && h >= hj[0] && h < hj[1]) { status.value = { aberto: true, texto: `Aberto agora, até as ${hj[1]}h` }; return }
  for (let i = hj && h < hj[0] ? 0 : 1; i <= 7; i++) {
    const hh = horario[(d + i) % 7]
    if (!hh) continue
    status.value = { aberto: false, texto: `Fechado agora, abre ${i === 0 ? 'hoje' : i === 1 ? 'amanhã' : dias[(d + i) % 7]} às ${hh[0]}h` }
    return
  }
}

onMounted(calcularStatus)

const diferenciais = [
  { t: 'Consulta sem pressa', d: 'Tempo de verdade para ouvir sua história antes de qualquer conduta.', i: 'ear', m: 'relogio' },
  { t: 'Exames na hora certa', d: 'Pedimos só o que muda a decisão. Nada a mais, nada a menos.', i: 'scan', m: 'capsula' },
  { t: 'Retorno pelo celular', d: 'Dúvidas depois da consulta respondidas pelo canal da clínica.', i: 'chat', m: 'celular' },
  { t: 'Plano por escrito', d: 'Você sai com o tratamento explicado e os próximos passos claros.', i: 'doc', m: 'prancheta' },
]
const tratamentos = [
  { t: 'Consulta de avaliação', d: 'Primeira conversa completa: histórico, exame clínico e plano inicial, sem pressa.', dur: '50 min', modo: 'Presencial', img: 'avaliacao.webp' },
  { t: 'Acompanhamento contínuo', d: 'Retornos periódicos para ajustar o tratamento conforme a sua evolução, para você e para a família.', dur: '30 min', modo: 'Presencial ou vídeo', img: 'acompanhamento.webp' },
  { t: 'Check-up preventivo', d: 'Avaliação anual com exames direcionados ao seu perfil e à sua idade.', dur: '60 min', modo: 'Presencial', img: 'checkup.webp' },
  { t: 'Teleconsulta', d: 'Atendimento por vídeo para retornos e orientações, sem sair de casa.', dur: '30 min', modo: 'Por vídeo', img: 'teleconsulta.webp' },
  { t: 'Procedimentos em consultório', d: 'Pequenos procedimentos feitos no próprio consultório, com segurança e conforto.', dur: 'Varia', modo: 'Presencial', img: 'consultorio.webp' },
]
const base = useRuntimeConfig().app.baseURL
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
  { q: 'Preciso levar exames?', a: 'Traga os exames dos últimos 12 meses e a lista dos remédios que você usa. Se não tiver, tudo bem: pedimos o que for preciso.' },
]
const receita = ref(0)

const aberto = ref<number | null>(0)
const trilho = ref<HTMLElement | null>(null)
const mover = (dir: number) => trilho.value?.scrollBy({ left: dir * (trilho.value.clientWidth * 0.8), behavior: 'smooth' })
</script>

<template>
  <div>
    <a class="skip" href="#conteudo">Pular para o conteúdo</a>
    <svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <defs>
        <symbol id="i-ear" viewBox="0 0 24 24"><path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a2.5 2.5 0 0 1-5 0"/><path d="M10 9.5a2 2 0 0 1 4 0"/></symbol>
        <symbol id="i-scan" viewBox="0 0 24 24"><path d="M4 8V5h3M17 5h3v3M20 16v3h-3M7 19H4v-3"/><path d="M4 12h3l2-3 3 6 2-3h6"/></symbol>
        <symbol id="i-chat" viewBox="0 0 24 24"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/></symbol>
        <symbol id="i-doc" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h4"/></symbol>
        <symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M12 2.2a9.7 9.7 0 0 0-8.3 14.7L2.3 21.8l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.5-.4Z"/></symbol>
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

    <main id="conteudo">
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
            <img class="ph ph-portrait hero-img" :src="`${base}fotos/acompanhamento.webp`" width="1200" height="801" alt="Profissional de saúde atendendo uma criança acompanhada da mãe" fetchpriority="high">
            <div class="hero-3d" title="Arraste para girar"><Icone3D tipo="coracao" /></div>
            <div class="atend">
              <p class="atend-status" :class="{ aberto: status?.aberto }"><i />{{ status?.texto || 'Atendimento com hora marcada' }}</p>
              <ul>
                <li><svg><use href="#i-chat" /></svg>Resposta no WhatsApp {{ respostaWhats }}</li>
                <li><svg><use href="#i-scan" /></svg>Teleconsulta para retornos</li>
                <li><svg><use href="#i-doc" /></svg>Plano de cuidado por escrito</li>
              </ul>
              <a :href="wa('Olá! Quero agendar uma consulta.')" target="_blank" rel="noopener">Falar com a recepção</a>
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
              <div class="card-3d"><Icone3D :tipo="d.m" /></div>
              <h3>{{ d.t }}</h3>
              <p>{{ d.d }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- SOBRE -->
      <section class="sec about">
        <div class="wrap about-grid">
          <figure class="about-foto">
            <img class="ph ph-about about-img" :src="`${base}fotos/teleconsulta.webp`" width="1200" height="800" alt="Médico em atendimento por vídeo no consultório" loading="lazy">
            <figcaption class="about-selo"><b>{{ site.registro }}</b><span>Registro ativo no conselho</span></figcaption>
          </figure>
          <div class="about-txt">
            <p class="k">{{ site.especialidade }}</p>
            <h2 class="h2">{{ site.profissional }}</h2>
            <blockquote class="about-frase">“Acredito em medicina feita com tempo, evidência e conversa franca.”</blockquote>
            <p class="bio">Formação em [universidade], residência em [instituição] e mais de [00] anos de atendimento. Cada consulta começa ouvindo a sua história, sem pressa.</p>
            <ul class="formacao">
              <li><span>Graduação</span><b>[Universidade]</b></li>
              <li><span>Residência</span><b>[Instituição]</b></li>
              <li><span>Membro</span><b>[Sociedade médica]</b></li>
            </ul>
            <ul class="creds">
              <li><b>00+</b><span>anos de experiência</span></li>
              <li><b>0.000+</b><span>pacientes atendidos</span></li>
              <li><b>{{ site.nota }}</b><span>nota no Google</span></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- TRATAMENTOS -->
      <section id="tratamentos" class="sec">
        <div class="wrap">
          <div class="tr-head">
            <div><h2 class="h2">Tratamentos</h2><p class="muted">Escolha um para ver como funciona.</p></div>
            <a class="btn btn-line" :href="wa('Olá! Quero saber mais sobre os tratamentos.')" target="_blank" rel="noopener">Tirar dúvida</a>
          </div>
          <div class="tr-vitrine">
            <ul class="tr-lista" role="tablist" aria-label="Tratamentos">
              <li v-for="(t, i) in tratamentos" :key="t.t">
                <button type="button" role="tab" :aria-selected="aberto === i" :class="{ on: aberto === i }" @click="aberto = i">
                  <img :src="`${base}fotos/${t.img}`" width="96" height="64" alt="" loading="lazy">
                  <span><b>{{ t.t }}</b><small>{{ t.dur }} · {{ t.modo }}</small></span>
                </button>
              </li>
            </ul>
            <Transition name="tr" mode="out-in">
              <article :key="aberto ?? 0" class="tr-painel" role="tabpanel">
                <img :src="`${base}fotos/${tratamentos[aberto ?? 0].img}`" width="1200" height="800" :alt="tratamentos[aberto ?? 0].t" loading="lazy">
                <div class="tr-info">
                  <h3>{{ tratamentos[aberto ?? 0].t }}</h3>
                  <p>{{ tratamentos[aberto ?? 0].d }}</p>
                  <dl><div><dt>Duração</dt><dd>{{ tratamentos[aberto ?? 0].dur }}</dd></div><div><dt>Formato</dt><dd>{{ tratamentos[aberto ?? 0].modo }}</dd></div></dl>
                  <a class="btn btn-teal" :href="wa(`Olá! Quero agendar: ${tratamentos[aberto ?? 0].t}.`)" target="_blank" rel="noopener">Agendar este atendimento</a>
                </div>
              </article>
            </Transition>
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
        <div class="wrap">
          <h2 class="h2 faq-tit">Perguntas que chegam ao consultório</h2>
          <div class="faq-grid">
            <div class="rx-abas" role="tablist" aria-label="Perguntas">
              <button v-for="(f, i) in faq" :key="f.q" type="button" role="tab" :aria-selected="receita === i" :class="{ on: receita === i }" @click="receita = i"><span class="rx-n" aria-hidden="true">{{ i + 1 }}</span>{{ f.q }}</button>
            </div>
            <article class="rx" role="tabpanel" aria-live="polite">
              <header class="rx-topo">
                <span><b>{{ site.marca }}</b><small>{{ site.profissional }} · {{ site.especialidade }}</small></span>
                <span class="rx-simbolo" aria-hidden="true">℞</span>
              </header>
              <p class="rx-q">{{ faq[receita].q }}</p>
              <Transition name="rx" mode="out-in"><p :key="receita" class="rx-a">{{ faq[receita].a }}</p></Transition>
              <footer class="rx-assina"><span class="rx-linha" aria-hidden="true" /><span>{{ site.profissional }} · {{ site.registro }}</span></footer>
            </article>
          </div>
          <div class="contato-faixa">
            <div><h3>Fale com a recepção pelo WhatsApp</h3><p>Respondemos em horário comercial. Para urgências, procure um pronto atendimento.</p></div>
            <p class="addr">{{ site.endereco }}<br>{{ site.telefone }}</p>
            <a class="btn btn-wa btn-lg" :href="wa()" target="_blank" rel="noopener"><svg><use href="#i-wa" /></svg> Agendar pelo WhatsApp</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="foot rod">
      <div class="wrap rod-top">
        <div class="rod-brand">
          <b class="rod-logo">{{ site.marca }}</b>
          <p>{{ site.registro }} · Responsável técnico: {{ site.profissional }}</p><p>{{ site.endereco }} · CNPJ {{ site.cnpj }}</p>
        </div>
        <div class="rod-soc">
          <a :href="`https://wa.me/${site.whatsapp}`" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M12 2.2a9.7 9.7 0 0 0-8.3 14.7L2.3 21.8l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.5-.4Z"/></svg></a>
          <a :href="site.instagram" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/></svg></a>
        </div>
      </div>
      <div class="wrap"><div class="rod-bot">
        <span>© {{ new Date().getFullYear() }} {{ site.marca }}. Fotos de ambientação: Harrison Keely, Shixart1985, Intel Free Press e Stethoscopes, via Wikimedia Commons (CC BY e CC BY-SA).</span>
        <a class="rod-credit" href="https://www.ontrackagenciadigital.com.br/" target="_blank" rel="noopener">Desenvolvido por <b>OnTrack Agência Digital</b></a>
      </div></div>
    </footer>

    <a class="fab" :href="wa()" target="_blank" rel="noopener" aria-label="Agendar pelo WhatsApp"><svg><use href="#i-wa" /></svg></a>
  </div>
</template>
