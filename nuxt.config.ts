// Modelo 02 · Saúde e bem-estar — On Track LP
// Endereço público do site (usado na prévia do WhatsApp/Instagram). Em domínio próprio: LP_URL=https://www.cliente.com.br/
const SITE = process.env.LP_URL || 'https://devagenciaontrack-sys.github.io/lp-modelo-02-ontrack/'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    // GitHub Pages: LP_BASE=/<repo>/ · Vercel/domínio próprio: deixe vazio
    baseURL: process.env.LP_BASE || '/',
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Sua Marca — Cuidado que começa por você',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Atendimento de saúde com tecnologia, escuta e acompanhamento de perto. Agende sua consulta.' },
        { name: 'theme-color', content: '#F3F7F6' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Sua Marca — Cuidado que começa por você' },
        { property: 'og:description', content: 'Atendimento de saúde com tecnologia, escuta e acompanhamento de perto. Agende sua consulta.' },
        { property: 'og:url', content: SITE },
        { property: 'og:image', content: SITE + 'og.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:locale', content: 'pt_BR' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&display=swap' },
        { rel: 'icon', href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='18' fill='%230E3B3F'/%3E%3Cpath d='M10 34h12l5-12 8 22 6-14h13' fill='none' stroke='%237FE3D2' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" },
      ],
    },
  },
})
