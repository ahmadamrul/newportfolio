import { useMemo, useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import './App.css'


const baseUrl = 'https://ahmadamrul.github.io'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

const skills = [
  { name: 'Unity', icon: 'unity-69.svg' },
  { name: 'Bootstrap', icon: 'bootstrap-4.svg' },
  { name: 'C++', icon: 'c.svg' },
  { name: 'CodeIgniter', icon: 'codeigniter.svg' },
  { name: 'Git', icon: 'git-icon.svg' },
  { name: 'HTML', icon: 'html-1.svg' },
  { name: 'MySQL', icon: 'mysql-3.svg' },
  { name: 'PHP', icon: 'php-1.svg' },
  { name: 'CSS', icon: 'css-3.svg' },
  { name: 'C#', icon: 'c--4.svg' },
]

const education = [
  {
    year: '2014 - 2017',
    school: 'SMKN 1 Bondowoso',
    major: 'Software Engineering (RPL)',
  },
  {
    year: '2017 - 2023',
    school: 'Universitas Muhammadiyah Jember',
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [query, setQuery] = useState('')

  const filteredProjects = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    if (!keyword) {
      return projects
    }

    return projects.filter((project) => project.title.toLowerCase().includes(keyword))
  }, [query])

  return (
    <div className={darkMode ? 'site dark' : 'site'} data-theme={darkMode ? 'dark' : 'light'}>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="icon-button"
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="hamburger"></span>
          </button>

          <a className="brand" href="#home" aria-label="Back to home">
            <strong>Ahmad Amrul</strong>
          </a>

          <form className="search-box" role="search" onSubmit={(event) => event.preventDefault()}>
            <span className="search-icon" aria-hidden="true"></span>
            <input
              type="search"
              placeholder="Filter project..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>

          <div className="header-actions">
            <button
              className="icon-button"
              type="button"
              aria-label={darkMode ? 'Light mode' : 'Dark mode'}
              onClick={() => setDarkMode((isDark) => !isDark)}
            >
              <span className={darkMode ? 'mode-icon sun' : 'mode-icon moon'} aria-hidden="true"></span>
            </button>
            <a className="profile-chip" href="#about">
              <img src={`${baseUrl}/img/me.jpg`} alt="Ahmad Amrul" />
            </a>
          </div>
        </div>
      </header>

      <div className={menuOpen ? 'drawer open' : 'drawer'} aria-hidden={!menuOpen}>
        <button className="drawer-backdrop" type="button" onClick={() => setMenuOpen(false)}>
          <span className="sr-only">Close menu</span>
        </button>
        <aside className="drawer-panel" aria-label="Side menu">
          <div className="drawer-profile">
            <img className="avatar" src={`${baseUrl}/img/me.jpg`} alt="Ahmad Amrul" />
            <div>
              <p>PORTFOLIO</p>
              <h2>Ahmad Amrul</h2>
            </div>
          </div>

          <nav className="drawer-nav">
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>

        </aside>
      </div>

      <main className="main-wrap">
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="meta">Hi there</p>
            <h1>
              I'm <span>Ahmad Amrul</span>
            </h1>
            <p>
              Game enthusiast and Game Developer focused on Unity gameplay programming,
              creative systems, and interactive experiences.
            </p>
            <blockquote>Stay Hungry, Stay Foolish - Steve Jobs</blockquote>
            <div className="hero-actions">
              <a href="#portfolio">View Portfolio</a>
              <a href="#contact">Contact Me</a>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-title">
            <p className="meta">About me</p>
            <h2>Game Developer, Game Programmer, and web creator.</h2>
          </div>
          <p className="about-copy">
            I am a game enthusiast, and this passion drives me to pursue a career in the
            game industry as a Game Developer, especially as a Game Programmer. With
            proficient skills in Unity Game Engine, I am ready to be involved in creative
            game development that delivers unique experiences for players. When stuck on
            game development, I also enjoy creating websites in my spare time.
          </p>
          <div className="about-education" aria-label="Educational background">
            <p className="meta">Education</p>
            <div className="timeline">
              {education.map((item) => (
                <article className="timeline-item" key={item.school}>
                  <span>{item.year}</span>
                  <h3>{item.school}</h3>
                  <p>{item.major}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section skills-section">
          <div className="section-title">
            <p className="meta">Skills</p>
            <h2>Tools and technologies</h2>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <article className="skill-card" key={skill.name}>
                <img src={`${baseUrl}/img/svg/${skill.icon}`} alt="" />
                <span>{skill.name}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section portfolio-section" id="portfolio">
          <div className="section-title row-title">
            <div>
              <p className="meta">Portfolio</p>
              <h2>Selected game projects</h2>
            </div>
            <a href="https://ahmadamrul.itch.io/" target="_blank" rel="noreferrer">
              Visit itch.io
            </a>
          </div>

          <div className="project-grid">
            {filteredProjects.map((project) => (
              <a className="project-card" href={project.url} target="_blank" rel="noreferrer" key={project.title}>
                <img src={`${baseUrl}/img/${project.image}`} alt={project.title} />
                <div>
                  <h3>{project.title}</h3>
                  <span>Open project</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-title">
            <p className="meta">Contact</p>
            <h2>Let's build something interactive.</h2>
          </div>
          <div className="contact-grid">
            <a href="mailto:ahmadamrulm@gmail.com">ahmadamrulm@gmail.com</a>
            <a href="tel:+6282139070376">+6282139070376</a>
            <a href="https://ahmadamrul.itch.io/" target="_blank" rel="noreferrer">
              ahmadamrul.itch.io
            </a>
            <span>Bondowoso, Indonesia</span>
          </div>
        </section>
      </main>

      <a
  className="whatsapp-float"
  href="https://wa.me/6282139070376"
  target="_blank"
  rel="noreferrer"
>
  <FaWhatsapp size={20} />
</a>
    </div>
  )
}

export default App
