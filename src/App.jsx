import { useEffect, useMemo, useState } from 'react';
import { FaEnvelope, FaGamepad, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';
import {
  TbBrain,
  TbBrandBootstrap,
  TbBrandCpp,
  TbBrandCSharp,
  TbBrandCss3,
  TbBrandFlutter,
  TbBrandGit,
  TbBrandHtml5,
  TbBrandMysql,
  TbBrandPhp,
  TbBrandPython,
  TbBrandReact,
  TbBrandUnity,
  TbCode,
} from 'react-icons/tb';
import Starfield from './Starfield'
import CursorPet from './CursorPet'
import './App.css'

const baseUrl = 'https://ahmadamrul.github.io'

const skills = [
  { name: 'Unity', Icon: TbBrandUnity },
  { name: 'C#', Icon: TbBrandCSharp },
  { name: 'C++', Icon: TbBrandCpp },
  { name: 'HTML', Icon: TbBrandHtml5 },
  { name: 'CSS', Icon: TbBrandCss3 },
  { name: 'Bootstrap', Icon: TbBrandBootstrap },
  { name: 'MySQL', Icon: TbBrandMysql },
  { name: 'Git', Icon: TbBrandGit },
  { name: 'PHP', Icon: TbBrandPhp },
  { name: 'CodeIgniter', Icon: TbCode },
  { name: 'React JS', Icon: TbBrandReact },
  { name: 'Flutter', Icon: TbBrandFlutter },
  { name: 'Python', Icon: TbBrandPython },
  { name: 'LLM', Icon: TbBrain },
]

const education = [
  {
    year: '2014 - 2017',
    school: 'SMKN 1 Bondowoso',
    major: 'Software Engineering (RPL)',
  },
  {
    year: '2017 - 2023',
    school: 'Muhammadiyah University of Jember',
    major: 'Information Technology (TI)',
  },
]

const projects = [
  {
    title: 'LaCov (Thesis)',
    image: 'lacov2.png',
    url: 'https://ahmadamrul.itch.io/lacov-the-pandemic',
  },
  {
    title: 'LaCov Gameplay',
    image: 'lacov1.png',
    url: 'https://ahmadamrul.itch.io/lacov-the-pandemic',
  },
  {
    title: 'LaCov Environment',
    image: 'lacov3.png',
    url: 'https://ahmadamrul.itch.io/lacov-the-pandemic',
  },
  {
    title: 'Endless Run',
    image: 'lalarun.jpg',
    url: 'https://ahmadamrul.itch.io/lalarun',
  },
  {
    title: '3D Battle',
    image: 'Battle.png',
    url: 'https://ahmadamrul.itch.io/arenabattletest',
  },
  {
    title: 'Squid Game',
    image: 'squid1.jpg',
    url: 'https://ahmadamrul.itch.io/squidgame',
  },
  {
    title: 'AR Alphabets',
    image: 'AR.jpg',
    url: 'https://ahmadamrul.itch.io/ar-alphabets',
  },
  {
    title: 'Take a Numeric',
    image: 'repo.jpg',
    url: 'https://ahmadamrul.itch.io/take-a-numeric',
  },
  {
    title: 'Horror Game',
    image: 'Hor.png',
    url: 'https://ahmadamrul.itch.io/horror-demo',
  },
  {
    title: 'Turn Based Slime Attack',
    image: 'turnbased12.png',
    url: 'https://ahmadamrul.itch.io/turn-based-slime-attack',
  },
  {
    title: 'Castle Gun Sentinels',
    image: 'castle3.png',
    url: 'https://ahmadamrul.itch.io/castle-gun-sentinels',
  },
]

function App() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const max = scrollHeight - clientHeight
      setProgress(max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('main > section')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      sections.forEach((section) => section.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.code !== 'Space') return

      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return
      if (tag === 'A' || tag === 'BUTTON') return

      e.preventDefault()

      const pages = Array.from(document.querySelectorAll('main > section, .site-footer'))
      const buffer = 4
      const next = pages.find((page) => page.offsetTop > window.scrollY + buffer)

      ;(next || pages[pages.length - 1])?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const latestEducation = useMemo(() => education[education.length - 1], [])

  return (
    <div className="site">
      <Starfield />
      <CursorPet />
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <div className="brand-badge" aria-hidden="true">AA</div>

      <main>
        <section className="hero" id="home">
          <p className="hero-badge">
            <span className="dot" aria-hidden="true"></span>
            Hey, I&apos;m Amrul
          </p>

          <img className="hero-avatar" src={`${baseUrl}/img/me.jpg`} alt="Ahmad Amrul" />

          <p className="hero-kicker">Ahmad &middot;</p>
          <h1 className="hero-name">Amrul</h1>
          <p className="hero-role">Full Stack Developer &amp; Game Developer</p>


          <p className="hero-quote">&ldquo;Stay Hungry, Stay Foolish&rdquo; &mdash; Steve Jobs</p>

          <div className="hero-actions">
            <a href="#portfolio">View Portfolio</a>
            <a className="ghost" href="#contact">Contact Me</a>
          </div>

          <p className="scroll-hint">
            Scroll
            <span aria-hidden="true">&darr;</span>
          </p>
        </section>

        <section className="about" id="about">
          <p className="meta">About me</p>
          <h2>A builder at heart.</h2>

          <div className="about-grid">
            <p className="about-text">
  I am a game enthusiast passionate about pursuing 
  a career as a Game Developer and Game Programmer.
  With proficient skills in Unity Game Engine, 
  I'm ready to create unique gaming experiences.
  When not focused on game development, I enjoy:
  <br />
  - Building web application.
  <br />
  - Exploring AI and creative automation.
</p>
            <dl className="fact-list">
              <div>
                <dt>Location</dt>
                <dd>Bondowoso, Indonesia</dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>{latestEducation.school}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Game Development (Unity)</dd>
              </div>
              <div>
                <dt>Interests</dt>
                <dd>Game Dev &middot; Web Dev &middot; AI</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="skills" id="skills">
          <p className="meta">Technical skills</p>
          <h2>What I work with.</h2>

          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-card" key={skill.name}>
                <skill.Icon aria-hidden="true" />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="portfolio" id="portfolio">
          <p className="meta">Selected work</p>
          <h2>Things I&apos;ve built.</h2>

          <div className="project-list">
            {projects.map((project) => (
              <a className="project-row" href={project.url} target="_blank" rel="noreferrer" key={project.title}>
                <img src={`${baseUrl}/img/${project.image}`} alt={project.title} />
                <div className="project-row-body">
                  <h3>{project.title}</h3>
                  <span>Open project &rarr;</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <p className="meta">Get in touch</p>
          <h2 className="contact-title">
            Let&apos;s build something <em>interactive.</em>
          </h2>
          <p className="contact-subtitle">Open to Unity game projects, web work, and interesting collaborations.</p>

          <div className="contact-grid">
            <a className="contact-pill" href="mailto:ahmadamrulm@gmail.com">
              <FaEnvelope aria-hidden="true" />
              <span>
                <small>Email</small>
                ahmadamrulm@gmail.com
              </span>
            </a>
            <a className="contact-pill" href="tel:+6282139070376">
              <FaPhone aria-hidden="true" />
              <span>
                <small>Phone</small>
                +62 821-3907-0376
              </span>
            </a>
            <a className="contact-pill" href="https://wa.me/6282139070376" target="_blank" rel="noreferrer">
              <FaWhatsapp aria-hidden="true" />
              <span>
                <small>WhatsApp</small>
                +62 821-3907-0376
              </span>
            </a>
            <a className="contact-pill" href="https://ahmadamrul.itch.io/" target="_blank" rel="noreferrer">
              <FaGamepad aria-hidden="true" />
              <span>
                <small>itch.io</small>
                ahmadamrul.itch.io
              </span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>&copy; {new Date().getFullYear()} Ahmad Amrul</span>
      </footer>
    </div>
  )
}

export default App
