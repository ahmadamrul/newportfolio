import { useEffect, useRef } from 'react';

const STAR_COUNT = 160

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let stars = []
    let shootingStar = null
    let rafId
    let lastTime = performance.now()

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function makeStars() {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        radius: rand(0.4, 1.6),
        baseAlpha: rand(0.25, 0.9),
        twinkleSpeed: rand(0.4, 1.4),
        phase: rand(0, Math.PI * 2),
        drift: rand(2, 10),
      }))
    }

    function maybeSpawnShootingStar() {
      if (!shootingStar && Math.random() < 0.0025) {
        const angle = rand(Math.PI * 0.15, Math.PI * 0.3)
        const speed = rand(9, 14)
        shootingStar = {
          x: rand(width * 0.1, width * 0.7),
          y: rand(0, height * 0.3),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: rand(40, 60),
        }
      }
    }

    function frame(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now
      ctx.clearRect(0, 0, width, height)

      for (const star of stars) {
        star.phase += dt * star.twinkleSpeed
        const twinkle = (Math.sin(star.phase) + 1) / 2
        const alpha = star.baseAlpha * (0.5 + twinkle * 0.5)

        if (!prefersReducedMotion) {
          star.y += dt * star.drift
          if (star.y > height) {
            star.y = -2
            star.x = rand(0, width)
          }
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      }

      if (!prefersReducedMotion) {
        maybeSpawnShootingStar()

        if (shootingStar) {
          shootingStar.x += shootingStar.vx
          shootingStar.y += shootingStar.vy
          shootingStar.life += 1

          const progress = shootingStar.life / shootingStar.maxLife
          const alpha = Math.max(0, 1 - progress)
          const tailX = shootingStar.x - shootingStar.vx * 3.5
          const tailY = shootingStar.y - shootingStar.vy * 3.5

          const gradient = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.6
          ctx.beginPath()
          ctx.moveTo(shootingStar.x, shootingStar.y)
          ctx.lineTo(tailX, tailY)
          ctx.stroke()

          if (shootingStar.life >= shootingStar.maxLife || shootingStar.y > height || shootingStar.x > width) {
            shootingStar = null
          }
        }
      }

      rafId = requestAnimationFrame(frame)
    }

    resize()
    makeStars()
    rafId = requestAnimationFrame(frame)

    function onResize() {
      resize()
      makeStars()
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}

export default Starfield
