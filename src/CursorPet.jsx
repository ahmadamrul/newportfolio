import { useEffect, useRef, useState } from 'react';

const OFFSET_X = 26
const OFFSET_Y = -30
const SPEED = 1.4
const STOP_THRESHOLD = 2
const AXIS_BIAS = 1.25

function CursorPet() {
  const wrapRef = useRef(null)
  const [pose, setPose] = useState('idle')

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { x: pos.x, y: pos.y }
    let rafId
    let facing = 1
    let axis = 'h'
    let currentPose = 'idle'

    function setCurrentPose(value) {
      if (currentPose !== value) {
        currentPose = value
        setPose(value)
      }
    }

    function onMove(e) {
      target.x = e.clientX + OFFSET_X
      target.y = e.clientY + OFFSET_Y
    }

    function loop() {
      const dx = target.x - pos.x
      const dy = target.y - pos.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const isMoving = dist > STOP_THRESHOLD

      if (dist <= SPEED) {
        pos.x = target.x
        pos.y = target.y
      } else {
        pos.x += (dx / dist) * SPEED
        pos.y += (dy / dist) * SPEED
      }

      if (isMoving) {
        const absDx = Math.abs(dx)
        const absDy = Math.abs(dy)

        if (absDx > absDy * AXIS_BIAS) axis = 'h'
        else if (absDy > absDx * AXIS_BIAS) axis = 'v'

        if (dx > 1) facing = 1
        else if (dx < -1) facing = -1

        setCurrentPose(axis === 'h' ? 'run-h' : 'run-v')
      } else {
        setCurrentPose('idle')
      }

      if (wrapRef.current) {
        const flip = currentPose === 'run-h' ? facing : 1
        wrapRef.current.style.transform =
          `translate(${pos.x - 19}px, ${pos.y - 15}px) scaleX(${flip})`
      }
      rafId = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (pose === 'run-h') {
    return (
      <div ref={wrapRef} className="cursor-pet" aria-hidden="true">
        <svg className="cat-sprite cat-running" viewBox="0 0 64 40" width="38" height="30">
          <path className="cat-tail" d="M14 22 Q3 16 7 5" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
          <ellipse cx="30" cy="24" rx="15" ry="8" fill="#fff" />
          <circle cx="47" cy="15" r="8" fill="#fff" />
          <polygon points="42,9 45,2 48,10" fill="#fff" />
          <polygon points="49,9 52,3 53,10" fill="#fff" />
          <rect className="leg leg-a" x="16" y="28" width="4" height="11" rx="2" fill="#fff" />
          <rect className="leg leg-b" x="24" y="28" width="4" height="11" rx="2" fill="#fff" />
          <rect className="leg leg-b" x="36" y="28" width="4" height="11" rx="2" fill="#fff" />
          <rect className="leg leg-a" x="44" y="28" width="4" height="11" rx="2" fill="#fff" />
        </svg>
      </div>
    )
  }

  if (pose === 'run-v') {
    return (
      <div ref={wrapRef} className="cursor-pet" aria-hidden="true">
        <svg className="cat-sprite cat-vertical" viewBox="0 0 40 42" width="38" height="30">
          <ellipse className="cat-tail-vertical" cx="33" cy="27" rx="3.5" ry="9" fill="#fff" transform="rotate(40 33 27)" />
          <ellipse cx="17" cy="26" rx="10" ry="10" fill="#fff" />
          <circle cx="17" cy="12" r="7" fill="#fff" />
          <polygon points="9,9 5,1 13,7" fill="#fff" />
          <polygon points="25,9 29,1 21,7" fill="#fff" />
          <rect className="vleg vleg-a" x="10" y="33" width="4" height="9" rx="2" fill="#fff" />
          <rect className="vleg vleg-b" x="20" y="33" width="4" height="9" rx="2" fill="#fff" />
        </svg>
      </div>
    )
  }

  return (
    <div ref={wrapRef} className="cursor-pet" aria-hidden="true">
      <svg className="cat-sprite cat-idle" viewBox="0 0 40 42" width="38" height="30">
        <ellipse className="cat-tail-idle" cx="33" cy="27" rx="3.5" ry="9" fill="#fff" transform="rotate(40 33 27)" />
        <ellipse cx="17" cy="28" rx="10" ry="11" fill="#fff" />
        <circle cx="17" cy="12" r="7" fill="#fff" />
        <polygon points="9,9 5,1 13,7" fill="#fff" />
        <polygon points="25,9 29,1 21,7" fill="#fff" />
        <ellipse className="paw" cx="12" cy="37" rx="4" ry="3" fill="#fff" />
        <ellipse className="paw" cx="22" cy="37" rx="4" ry="3" fill="#fff" />
      </svg>
    </div>
  )
}

export default CursorPet
