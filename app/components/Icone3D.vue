<script setup lang="ts">
// Ilustração 3D leve (Zdog) para os diferenciais. Balança devagar e pode ser girada arrastando.
// Só anima quando está visível na tela; fica parada para quem prefere menos movimento.
const props = defineProps<{ tipo: 'relogio' | 'capsula' | 'celular' | 'prancheta' | 'coracao' }>()
const canvas = ref<HTMLCanvasElement | null>(null)
let parar = () => {}

const C = { teal: '#0E3B3F', teal2: '#15565B', mint: '#7FE3D2', soft: '#E2F5F1', branco: '#FFFFFF', cinza: '#C9D6D4' }

onMounted(async () => {
  const el = canvas.value
  if (!el) return
  const { default: Zdog } = await import('zdog')
  const TAU = Zdog.TAU
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const lado = el.clientWidth
  el.width = lado * dpr
  el.height = lado * dpr
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches
  let arrastando = false
  const illo = new Zdog.Illustration({
    element: el,
    zoom: (lado / 72) * dpr,
    dragRotate: true,
    rotate: { x: -0.25, y: 0.5 },
    onDragStart: () => { arrastando = true },
    onDragEnd: () => { arrastando = false },
  })

  if (props.tipo === 'relogio') {
    new Zdog.Cylinder({ addTo: illo, diameter: 44, length: 7, stroke: false, color: C.branco, backface: C.teal2 })
    new Zdog.Ellipse({ addTo: illo, diameter: 44, stroke: 4, color: C.teal, translate: { z: 3.6 } })
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU
      new Zdog.Shape({ addTo: illo, translate: { x: Math.sin(a) * 16, y: -Math.cos(a) * 16, z: 4 }, stroke: i % 3 === 0 ? 3 : 1.6, color: i % 3 === 0 ? C.teal : C.cinza })
    }
    new Zdog.Shape({ addTo: illo, path: [{ x: 0, y: 0 }, { x: 0, y: -12 }], translate: { z: 5 }, stroke: 3, color: C.teal })
    new Zdog.Shape({ addTo: illo, path: [{ x: 0, y: 0 }, { x: 9, y: 4 }], translate: { z: 5.5 }, stroke: 3, color: C.mint })
    new Zdog.Shape({ addTo: illo, translate: { z: 6 }, stroke: 5, color: C.teal })
    new Zdog.Cylinder({ addTo: illo, diameter: 6, length: 5, translate: { y: -25 }, rotate: { x: TAU / 4 }, stroke: false, color: C.teal })
  }

  if (props.tipo === 'capsula') {
    const capsula = new Zdog.Group({ addTo: illo, rotate: { z: -TAU / 8 } })
    const metade = (cor: string, lado: number) => {
      new Zdog.Cylinder({ addTo: capsula, diameter: 20, length: 18, translate: { x: lado * 9 }, rotate: { y: TAU / 4 }, stroke: false, color: cor })
      new Zdog.Hemisphere({ addTo: capsula, diameter: 20, translate: { x: lado * 18 }, rotate: { y: lado * TAU / 4 }, stroke: false, color: cor, backface: cor })
    }
    metade(C.teal, -1)
    metade(C.mint, 1)
    new Zdog.Ellipse({ addTo: capsula, diameter: 20, rotate: { y: TAU / 4 }, stroke: 1.2, color: C.branco })
    for (const [x, y, z] of [[-26, -18, 6], [24, 20, -4], [-14, 24, 10]]) new Zdog.Shape({ addTo: illo, translate: { x, y, z }, stroke: 3.5, color: C.mint })
  }

  if (props.tipo === 'celular') {
    new Zdog.Box({ addTo: illo, width: 28, height: 50, depth: 5, stroke: false, color: C.teal, frontFace: C.teal, rearFace: C.teal2, leftFace: C.teal2, rightFace: C.teal2, topFace: C.teal2, bottomFace: C.teal2 })
    new Zdog.RoundedRect({ addTo: illo, width: 22, height: 40, cornerRadius: 3, translate: { z: 2.7 }, stroke: 1, fill: true, color: C.soft })
    for (const [y, w] of [[-10, 14], [-5, 10], [0, 12]]) new Zdog.Shape({ addTo: illo, path: [{ x: -w / 2, y }, { x: w / 2, y }], translate: { x: -1, z: 3.2 }, stroke: 2, color: C.cinza })
    const balao = new Zdog.Group({ addTo: illo, translate: { x: 15, y: -18, z: 14 } })
    new Zdog.RoundedRect({ addTo: balao, width: 22, height: 14, cornerRadius: 5, stroke: 2, fill: true, color: C.mint })
    new Zdog.Shape({ addTo: balao, path: [{ x: -6, y: 6 }, { x: -9, y: 11 }, { x: -2, y: 6 }], stroke: 2, fill: true, color: C.mint })
    for (const x of [-5, 0, 5]) new Zdog.Shape({ addTo: balao, translate: { x, z: 1.5 }, stroke: 2.6, color: C.teal })
  }

  if (props.tipo === 'prancheta') {
    new Zdog.Box({ addTo: illo, width: 38, height: 48, depth: 3, stroke: false, color: C.teal2, frontFace: C.teal2, rearFace: C.teal })
    new Zdog.Rect({ addTo: illo, width: 30, height: 38, translate: { y: 3, z: 2 }, stroke: 1, fill: true, color: C.branco })
    for (const [y, w] of [[-6, 20], [0, 16], [6, 20], [12, 12]]) new Zdog.Shape({ addTo: illo, path: [{ x: -w / 2, y }, { x: w / 2, y }], translate: { x: -2, z: 2.6 }, stroke: 2, color: C.cinza })
    new Zdog.Shape({ addTo: illo, path: [{ x: -10, y: -12 }, { x: -7, y: -9 }, { x: -2, y: -15 }], translate: { z: 2.8 }, stroke: 2.4, color: C.mint, closed: false })
    new Zdog.RoundedRect({ addTo: illo, width: 16, height: 7, cornerRadius: 2, translate: { y: -24, z: 3 }, stroke: 2, fill: true, color: C.teal })
  }

  let orbita: any = null
  if (props.tipo === 'coracao') {
    // coração "estofado": contorno grosso e preenchido, com profundidade em camadas
    const caminho = [{ x: 0, y: -8 }, { bezier: [{ x: -4, y: -18 }, { x: -22, y: -16 }, { x: -20, y: -2 }] }, { bezier: [{ x: -18, y: 8 }, { x: -6, y: 14 }, { x: 0, y: 20 }] }, { bezier: [{ x: 6, y: 14 }, { x: 18, y: 8 }, { x: 20, y: -2 }] }, { bezier: [{ x: 22, y: -16 }, { x: 4, y: -18 }, { x: 0, y: -8 }] }]
    for (const [z, cor] of [[-4, C.teal], [-2, C.teal2], [0, C.teal2], [2, C.teal2], [4, '#1E7A80']]) new Zdog.Shape({ addTo: illo, path: caminho, translate: { z }, stroke: 6, fill: true, color: cor })
    new Zdog.Shape({ addTo: illo, path: [{ x: -9, y: -10 }, { bezier: [{ x: -14, y: -11 }, { x: -16, y: -6 }, { x: -15, y: -3 }] }], translate: { z: 8 }, stroke: 3, color: 'rgba(255,255,255,.55)', closed: false })
    // linha de batimento na frente do coração
    new Zdog.Shape({ addTo: illo, path: [{ x: -16, y: 2 }, { x: -7, y: 2 }, { x: -4, y: -6 }, { x: 0, y: 9 }, { x: 4, y: -2 }, { x: 7, y: 2 }, { x: 16, y: 2 }], translate: { z: 8 }, stroke: 2.4, color: C.mint, closed: false })
    // órbita com um ponto girando
    orbita = new Zdog.Group({ addTo: illo, rotate: { x: TAU / 2.6 } })
    new Zdog.Ellipse({ addTo: orbita, diameter: 64, stroke: 1, color: 'rgba(14,59,63,.25)' })
    new Zdog.Shape({ addTo: orbita, translate: { x: 32 }, stroke: 5, color: C.mint })
    new Zdog.Shape({ addTo: orbita, translate: { x: -32 }, stroke: 3.5, color: C.teal2 })
  }

  let t = Math.random() * 6
  let visivel = false
  let quadro = 0
  const desenhar = () => {
    if (!arrastando && !reduzido) { t += 0.012; illo.rotate.y = 0.5 + Math.sin(t) * 0.55; if (orbita) orbita.rotate.z += 0.02 }
    illo.updateRenderGraph()
    quadro = visivel ? requestAnimationFrame(desenhar) : 0
  }
  illo.updateRenderGraph()
  if (reduzido) return
  const io = new IntersectionObserver(([e]) => {
    visivel = e.isIntersecting
    if (visivel && !quadro) quadro = requestAnimationFrame(desenhar)
  })
  io.observe(el)
  parar = () => { io.disconnect(); cancelAnimationFrame(quadro) }
})
onBeforeUnmount(() => parar())
</script>

<template>
  <canvas ref="canvas" class="icone3d" aria-hidden="true" />
</template>

<style scoped>
.icone3d{ display:block; width:100%; aspect-ratio:1; cursor:grab; touch-action:pan-y; }
.icone3d:active{ cursor:grabbing; }
</style>
