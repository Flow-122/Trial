import { useEffect, useRef, useState } from 'react'
import './App.css'

const gearTeeth = Array.from({ length: 18 }, (_, index) => index * 20)
const CURRENT_LOCATION = "Bondo / Siaya, Kenya"

const pages = [
  {
    id: 'about',
    title: 'About Me',
    kicker: 'A LITTLE ABOUT ME',
  },
  {
    id: 'skills',
    title: 'Skills',
    kicker: 'TOOLS OF THE TRADE',
  },
  {
    id: 'projects',
    title: 'Projects',
    kicker: 'SELECTED BUILDS',
  },
  {
    id: 'experience',
    title: 'Experience & Education',
    kicker: 'THE JOURNEY SO FAR',
  },
  {
    id: 'contact',
    title: 'Contacts',
    kicker: 'OPEN A CONVERSATION',
  },
  {
    id: 'closing',
    title: 'Until Next Time',
    kicker: 'A FINAL NOTE',
  },
]

const skillGroups = [
  {
    title: 'Frontend',
    icon: 'code',
    skills: [
      ['HTML', 'code'],
      ['CSS', 'layers'],
      ['JavaScript', 'spark'],
      ['React', 'atom'],
    ],
  },
  {
    title: 'Backend & Database',
    icon: 'database',
    skills: [
      ['Node.js', 'server'],
      ['PostgreSQL', 'database'],
      ['Prisma ORM', 'layers'],
    ],
  },
  {
    title: 'Tools & Workflow',
    icon: 'terminal',
    skills: [
      ['Git', 'branch'],
      ['GitHub', 'repository'],
      ['VS Code', 'editor'],
      ['Linux / Bash', 'terminal'],
    ],
  },
]

const projects = [
  {
    title: 'Worldloom',
    type: 'FLAGSHIP PROJECT',
    description: 'An interactive travel map and trip-planning tour guide for discovering destinations around the globe.',
    art: 'worldloom',
    tags: ['Travel map', 'Trip planning', 'Interactive'],
    demoUrl: 'https://worldloom1.onrender.com',
    repoUrl: 'https://github.com/sheryle-florence-akinyi/worldloom1',
    searchTerm: 'Worldloom',
  },
  {
    title: 'Developer Portfolio',
    type: 'PERSONAL PROJECT',
    description: 'A book-inspired portfolio made to bring my work, learning, and story together.',
    art: 'portfolio',
    tags: ['React', 'CSS', 'Portfolio'],
    demoUrl: '/',
    searchTerm: 'portfolio',
  },
  {
    title: 'Attachment Builds',
    type: 'IN PROGRESS',
    description: 'A growing collection of real-world web and database work from my industrial attachment.',
    art: 'upcoming',
    tags: ['Full stack', 'Learning', 'Coming soon'],
    searchTerm: 'attachment',
  },
]

function Icon({ name, className = '' }) {
  const paths = {
    code: <><path d="m8 6-5 6 5 6M16 6l5 6-5 6M14 4l-4 16" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    spark: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" /><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" /></>,
    atom: <><circle cx="12" cy="12" r="2" /><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(35 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-35 12 12)" /></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
    server: <><rect x="4" y="4" width="16" height="7" rx="2" /><rect x="4" y="14" width="16" height="7" rx="2" /><path d="M8 7.5h.01M8 17.5h.01M12 7.5h5M12 17.5h5" /></>,
    branch: <><circle cx="7" cy="5" r="2" /><circle cx="7" cy="19" r="2" /><circle cx="17" cy="16" r="2" /><path d="M7 7v10M7 9c0 5 10 2 10 5" /></>,
    repository: <><path d="M5 4h13a2 2 0 0 1 2 2v13H7a2 2 0 0 1-2-2V4Z" /><path d="M5 17a2 2 0 0 1 2-2h13M9 8h7M9 11h5" /></>,
    editor: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8h18M7 6h.01M10 6h.01M8 12l-2 2 2 2M12 16h4" /></>,
    terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
    cap: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c3.5 2.8 8.5 2.8 12 0v-5M22 9v6" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    network: <><circle cx="12" cy="5" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><path d="m11 7-5 9m7-9 5 9M7 18h10" /></>,
    pin: <><path d="M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
  }

  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.spark}
    </svg>
  )
}

function PortraitPhoto() {
  return (
    <div className="portrait-frame">
      <img src="/portrait-closeup.png" alt="Sheryle Florence Akinyi" />
    </div>
  )
}

function ProjectArtwork({ type }) {
  if (type === 'worldloom') {
    return (
      <svg className="project-art" viewBox="0 0 160 112" aria-hidden="true">
        <circle cx="82" cy="57" r="37" fill="#263d3d" stroke="#ad9368" strokeWidth="1.2" />
        <ellipse cx="82" cy="57" rx="17" ry="37" fill="none" stroke="#a9b8a5" strokeOpacity=".6" />
        <path d="M47 48c20 8 49 8 70 0M47 66c20-8 49-8 70 0" fill="none" stroke="#a9b8a5" strokeOpacity=".55" />
        <path d="M60 39 69 34l7 3 3 7-6 4-2 8-8-2-4-7ZM92 60l9-4 8 4 1 8-7 4-2 9-9-2-3-7Z" fill="#bd9865" fillOpacity=".85" />
        <path d="M39 79c15-25 34-32 51-25s27 7 39-12" fill="none" stroke="#e0bf86" strokeWidth="1.5" strokeDasharray="3 4" />
        <circle cx="40" cy="79" r="3" fill="#f1d49d" /><circle cx="129" cy="42" r="3" fill="#f1d49d" />
        <path d="M19 18h18M123 92h18" stroke="#ddc59c" strokeOpacity=".6" />
      </svg>
    )
  }

  if (type === 'portfolio') {
    return (
      <svg className="project-art" viewBox="0 0 160 112" aria-hidden="true">
        <rect x="26" y="15" width="108" height="72" rx="5" fill="#24302f" stroke="#b49b70" />
        <path d="M36 28h48M36 35h32" stroke="#d3c09d" strokeOpacity=".7" strokeWidth="2" />
        <circle cx="104" cy="54" r="22" fill="#313a36" stroke="#9e845c" />
        <circle cx="104" cy="54" r="13" fill="none" stroke="#c3a879" strokeWidth="2" />
        <path d="M82 97h-4l-5 7h54l-5-7h-4" fill="#8f7955" />
        <path d="m99 54 4-5 4 3 4-5" fill="none" stroke="#e0c58f" strokeWidth="2" />
      </svg>
    )
  }

  return (
    <svg className="project-art" viewBox="0 0 160 112" aria-hidden="true">
      <path d="m80 16 31 18v42l-31 18-31-18V34l31-18Z" fill="#273634" stroke="#b49b70" />
      <path d="m80 16 31 18-31 18-31-18 31-18ZM49 34v42l31 18V52L49 34ZM111 34v42L80 94V52l31-18Z" fill="#46554a" fillOpacity=".76" stroke="#c4aa78" strokeOpacity=".8" />
      <path d="M80 52v42M49 34l31 18 31-18" fill="none" stroke="#e0c58f" strokeOpacity=".7" />
      <circle cx="24" cy="87" r="3" fill="#d2b27a" /><circle cx="134" cy="23" r="3" fill="#d2b27a" />
    </svg>
  )
}

function AboutContent() {
  return (
    <div className="about-layout">
      <div className="profile-block">
        <PortraitPhoto />
        <div className="profile-copy">
          <span className="profile-overline">BUILDER · LEARNER · CREATOR</span>
          <h3>Sheryle<br />Florence Akinyi</h3>
          <p>3rd-year Computer Science student<br />Level 6 · Eldoret National Polytechnic</p>
        </div>
      </div>
      <div className="currently-card">
        <span className="currently-label"><span className="status-dot" /> CURRENTLY</span>
        <strong>Software Development Attaché</strong>
        <span>Siaya Community Digital Hub</span>
        <p>Building full-stack digital experiences with a team solving real-world needs.</p>
      </div>
      <div className="builder-strip">
        <div><Icon name="layers" /><span>Make ideas<br />real</span></div>
        <div><Icon name="spark" /><span>Curious by<br />default</span></div>
        <div><Icon name="code" /><span>Build · test<br />· learn</span></div>
      </div>
    </div>
  )
}

function SkillsContent() {
  return (
    <div className="skills-groups">
      {skillGroups.map((group, index) => (
        <section className="skill-group" key={group.title}>
          <div className="skill-group-heading">
            <span className="skill-group-icon"><Icon name={group.icon} /></span>
            <h3>{group.title}</h3>
            <span className="skill-group-index">0{index + 1}</span>
          </div>
          <div className="skill-list">
            {group.skills.map(([skill, icon]) => (
              <span className="skill-pill" key={skill} tabIndex={0}>
                <Icon name={icon} />
                {skill}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function ProjectsContent() {
  return (
    <div className="project-gallery">
      {projects.map((project) => {
        const demoHref = project.demoUrl || `mailto:hello@sheryle.dev?subject=${encodeURIComponent(`Request a live demo: ${project.title}`)}`
        const repoHref = project.repoUrl || `https://github.com/search?q=user%3Asheryle-florence-akinyi+${encodeURIComponent(project.searchTerm)}&type=repositories`

        return (
          <article className={`project-card project-card-${project.art}`} key={project.title}>
            <div className="project-art-wrap"><ProjectArtwork type={project.art} /></div>
            <div className="project-details">
              <span className="project-type">{project.type}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className="project-actions">
                <a
                  href={demoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={project.demoUrl ? `Open ${project.title}` : 'Request a live demo by email'}
                >
                  Live Demo <span aria-hidden="true">↗</span>
                </a>
                <a href={repoHref} target="_blank" rel="noopener noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function ExperienceContent() {
  return (
    <div className="timeline">
      <article className="timeline-item">
        <span className="timeline-node"><Icon name="briefcase" /></span>
        <div className="timeline-card">
          <span className="timeline-date"><span className="status-dot" /> CURRENT · INDUSTRIAL ATTACHMENT</span>
          <h3>Software Development Attaché</h3>
          <strong>Siaya Community Digital Hub</strong>
          <p>Collaborating on real-world web applications and database architecture.</p>
          <div className="timeline-callout"><Icon name="code" /><span>Full-stack delivery · Team collaboration · Practical problem-solving</span></div>
        </div>
      </article>
      <article className="timeline-item">
        <span className="timeline-node"><Icon name="cap" /></span>
        <div className="timeline-card">
          <span className="timeline-date">ACADEMIC TRACK · 3RD YEAR</span>
          <h3>Computer Science · Level 6</h3>
          <strong>Eldoret National Polytechnic</strong>
          <p>Growing a strong foundation in software development and computing.</p>
          <div className="timeline-callout"><Icon name="spark" /><span>Curiosity in class, translated into thoughtful work in the real world.</span></div>
        </div>
      </article>
    </div>
  )
}

function ContactContent() {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const subject = `Portfolio message from ${formData.get('name')}`
    const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`
    window.location.href = `mailto:hello@sheryle.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="contact-layout">
      <div className="contact-cards">
        <a className="contact-card" href="mailto:hello@sheryle.dev">
          <span className="contact-icon"><Icon name="mail" /></span>
          <span><small>EMAIL</small><strong>hello@sheryle.dev</strong></span>
          <span className="contact-arrow" aria-hidden="true">↗</span>
        </a>
        <a className="contact-card" href="https://github.com/sheryle-florence-akinyi" target="_blank" rel="noreferrer">
          <span className="contact-icon"><Icon name="repository" /></span>
          <span><small>GITHUB</small><strong>sheryle-florence-akinyi</strong></span>
          <span className="contact-arrow" aria-hidden="true">↗</span>
        </a>
        <a
          className="contact-card"
          href="https://www.linkedin.com/search/results/people/?keywords=Sheryle%20Florence%20Akinyi"
          target="_blank"
          rel="noreferrer"
          title="Search LinkedIn for Sheryle Florence Akinyi"
        >
          <span className="contact-icon"><Icon name="network" /></span>
          <span><small>LINKEDIN</small><strong>Find me on LinkedIn</strong></span>
          <span className="contact-arrow" aria-hidden="true">↗</span>
        </a>
        <div className="location-tag"><Icon name="pin" /><span>{CURRENT_LOCATION}</span></div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-heading">
          <span>HAVE SOMETHING IN MIND?</span>
          <p>Send a note and let’s start a conversation.</p>
        </div>
        <label>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Jane Doe" required />
        </label>
        <label>
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" placeholder="jane@example.com" required />
        </label>
        <label>
          <span>Your message</span>
          <textarea name="message" rows="3" placeholder="Tell me a little about it..." required />
        </label>
        <button className="contact-submit" type="submit">Prepare email <span aria-hidden="true">↗</span></button>
        <small className="contact-form-note">Opens your email app to send — your message stays yours.</small>
      </form>
    </div>
  )
}

function ClosingWheelGraphic() {
  return (
    <svg className="closing-wheel-icon" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="closing-wheel-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#272b27" />
          <stop offset="0.24" stopColor="#756147" />
          <stop offset="0.5" stopColor="#383a34" />
          <stop offset="0.74" stopColor="#806b4c" />
          <stop offset="1" stopColor="#252824" />
        </linearGradient>
        <radialGradient id="closing-wheel-hub" cx="35%" cy="28%" r="80%">
          <stop offset="0" stopColor="#79694e" />
          <stop offset="0.52" stopColor="#393a33" />
          <stop offset="1" stopColor="#20231f" />
        </radialGradient>
      </defs>
      <g className="closing-wheel-teeth">
        {gearTeeth.map((rotation) => (
          <g key={rotation} transform={`rotate(${rotation} 50 50)`}>
            <rect x="43" y="3" width="14" height="23" rx="1.5" />
          </g>
        ))}
      </g>
      <circle className="closing-wheel-body" cx="50" cy="50" r="43" fill="url(#closing-wheel-face)" />
      <circle className="closing-wheel-rim-shadow" cx="50" cy="50" r="37" />
      <circle className="closing-wheel-rim" cx="50" cy="50" r="34" />
      <circle className="closing-wheel-ring" cx="50" cy="50" r="27" />
      <circle className="closing-wheel-hub" cx="50" cy="50" r="18" fill="url(#closing-wheel-hub)" />
      <circle className="closing-wheel-hole" cx="50" cy="50" r="10" />
    </svg>
  )
}

function ClosingWheel({ onLock, onLockComplete, isLocking, overlay = false }) {
  if (overlay) {
    return (
      <div className="closing-lock-overlay" aria-hidden="true">
        <ClosingWheelGraphic />
      </div>
    )
  }

  return (
    <button
      className={`closing-lock-control${isLocking ? ' is-locking' : ''}`}
      type="button"
      onMouseEnter={onLock}
      onFocus={onLock}
      onClick={onLock}
      onAnimationEnd={(event) => {
        if (event.animationName === 'closing-wheel-lock') onLockComplete(event)
      }}
      aria-label="Hover the wheel to lock and close the book"
      disabled={isLocking}
    >
      <ClosingWheelGraphic />
      <span>Hover the wheel to lock &amp; close</span>
    </button>
  )
}

function BackCover({ onFlipToFront, onOpen, isBusy }) {
  return (
    <div className="back-cover-content">
      <p className="back-cover-blurb">
        Crafted with curiosity, code &amp; care.
      </p>
      <button
        className="back-cover-gear-button"
        type="button"
        onMouseEnter={onOpen}
        onFocus={onOpen}
        onClick={onOpen}
        aria-label="Re-open Book"
        disabled={isBusy}
      >
        <ClosingWheelGraphic />
        <span>Re-open Book</span>
      </button>
      <button
        className="cover-flip-button back-cover-flip-button"
        type="button"
        onClick={onFlipToFront}
        disabled={isBusy}
      >
        Flip to Front Cover <span aria-hidden="true">↺</span>
      </button>
    </div>
  )
}

function ClosingContent({ onLock, onLockComplete, isLocking }) {
  return (
    <div className="closing-content">
      <span className="closing-mark"><Icon name="spark" /></span>
      <p className="closing-message">Thanks for turning these pages.</p>
      <p className="closing-copy">Every good idea starts somewhere. I’m looking forward to learning, building, and seeing what comes next.</p>
      <div className="colophon-rule" />
      <span className="colophon-name">Sheryle Florence Akinyi</span>
      <span className="colophon-note">Made with curiosity, code &amp; care.</span>
      <ClosingWheel onLock={onLock} onLockComplete={onLockComplete} isLocking={isLocking} />
    </div>
  )
}

function PageContent({ page, pageNumber, onLock, onLockComplete, isClosing, isLocking }) {
  const content = {
    about: <AboutContent />,
    skills: <SkillsContent />,
    projects: <ProjectsContent />,
    experience: <ExperienceContent />,
    contact: <ContactContent />,
    closing: <ClosingContent onLock={onLock} onLockComplete={onLockComplete} isLocking={isLocking || isClosing} />,
  }[page.id]

  return (
    <div className={`portfolio-page-content page-content-${page.id}`}>
      <div className="page-topline">
        <span>{page.kicker}</span>
        <span>{String(pageNumber).padStart(2, '0')}</span>
      </div>
      <h2>{page.title}</h2>
      <div className="page-rule" />
      {content}
      <span className="page-corner" aria-hidden="true" />
    </div>
  )
}

function Gear({ className, delay, label, onUnlock }) {
  const gradientId = `steel-${label}`

  return (
    <svg
      className={`gear ${className}`}
      viewBox="0 0 220 220"
      aria-hidden="true"
      style={{ '--build-delay': `${delay}ms` }}
    >
      <defs>
        <linearGradient id={`${gradientId}-teeth`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#79684e" />
          <stop offset="0.2" stopColor="#373832" />
          <stop offset="0.42" stopColor="#756147" />
          <stop offset="0.62" stopColor="#292c28" />
          <stop offset="0.82" stopColor="#62533d" />
          <stop offset="1" stopColor="#202320" />
        </linearGradient>
        <linearGradient id={`${gradientId}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#272b27" />
          <stop offset="0.2" stopColor="#65563f" />
          <stop offset="0.4" stopColor="#33352f" />
          <stop offset="0.58" stopColor="#786448" />
          <stop offset="0.78" stopColor="#393a34" />
          <stop offset="1" stopColor="#222522" />
        </linearGradient>
        <radialGradient id={`${gradientId}-hub`} cx="35%" cy="28%" r="80%">
          <stop offset="0" stopColor="#79694e" />
          <stop offset="0.34" stopColor="#353730" />
          <stop offset="0.68" stopColor="#5c4d39" />
          <stop offset="1" stopColor="#20231f" />
        </radialGradient>
        <pattern
          id={`${gradientId}-brush`}
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-32)"
        >
          <path d="M0 0H5" stroke="#c1a477" strokeOpacity="0.16" strokeWidth="0.6" />
        </pattern>
        <filter
          id={`${gradientId}-stamp`}
          x="-20%"
          y="-20%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="shadow-blur" />
          <feOffset in="shadow-blur" dx="3" dy="4" result="shadow-offset" />
          <feFlood floodColor="#0d100e" floodOpacity="0.78" result="shadow-color" />
          <feComposite in="shadow-color" in2="shadow-offset" operator="in" result="drop-shadow" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="inner-blur" />
          <feOffset in="inner-blur" dx="3" dy="4" result="inner-offset" />
          <feComposite in="SourceAlpha" in2="inner-offset" operator="out" result="inner-shadow-alpha" />
          <feFlood floodColor="#121512" floodOpacity="0.82" result="inner-shadow-color" />
          <feComposite in="inner-shadow-color" in2="inner-shadow-alpha" operator="in" result="inner-shadow" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.8" result="highlight-blur" />
          <feOffset in="highlight-blur" dx="-2" dy="-2" result="highlight-offset" />
          <feComposite in="SourceAlpha" in2="highlight-offset" operator="out" result="highlight-alpha" />
          <feFlood floodColor="#c4a575" floodOpacity="0.42" result="highlight-color" />
          <feComposite in="highlight-color" in2="highlight-alpha" operator="in" result="inner-highlight" />
          <feMerge>
            <feMergeNode in="drop-shadow" />
            <feMergeNode in="inner-shadow" />
            <feMergeNode in="inner-highlight" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle className="gear-socket" cx="110" cy="110" r="81" />
      <circle className="gear-socket-rim" cx="110" cy="110" r="82" />
      <path className="gear-socket-highlight" d="M53 53a80 80 0 0 1 114 0" />
      <g
        className="gear-spin"
        filter={`url(#${gradientId}-stamp)`}
        onMouseEnter={onUnlock}
      >
        <g className="gear-teeth">
          {gearTeeth.map((rotation, index) => (
            <g key={rotation} transform={`rotate(${rotation} 110 110)`}>
              <rect
                className="gear-tooth"
                style={{ animationDelay: `${delay + index * 30}ms` }}
                x="96"
                y="3"
                width="28"
                height="38"
                rx="2"
                fill={`url(#${gradientId}-teeth)`}
              />
            </g>
          ))}
        </g>

        <circle className="gear-body" cx="110" cy="110" r="79" fill={`url(#${gradientId}-face)`} />
        <circle className="gear-brush" cx="110" cy="110" r="77" fill={`url(#${gradientId}-brush)`} />
        <circle className="gear-rim-shadow" cx="110" cy="110" r="72" />
        <circle className="gear-rim" cx="110" cy="110" r="68" />
        <circle className="gear-ring-shadow" cx="110" cy="110" r="59" />
        <circle className="gear-ring" cx="110" cy="110" r="56" />
        <circle className="gear-hub" cx="110" cy="110" r="34" fill={`url(#${gradientId}-hub)`} />
        <circle className="gear-hub-edge" cx="110" cy="110" r="28" />
        <circle className="gear-hole" cx="110" cy="110" r="23" />
        <circle className="gear-hole-edge" cx="110" cy="110" r="19" />
      </g>
    </svg>
  )
}

function App() {
  const [bookIsOpen, setBookIsOpen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [closingWheelIsLocking, setClosingWheelIsLocking] = useState(false)
  const [closedCover, setClosedCover] = useState('front')
  const [coverFlipDirection, setCoverFlipDirection] = useState(null)
  const [gearsAreUnlocking, setGearsAreUnlocking] = useState(false)
  const [gearsArePulsing, setGearsArePulsing] = useState(false)
  const [activeSpread, setActiveSpread] = useState(0)
  const [turningTo, setTurningTo] = useState(null)
  const openingTimer = useRef(null)
  const pulseTimer = useRef(null)
  const pulseFrame = useRef(null)
  const openingStarted = useRef(false)

  useEffect(() => () => {
    if (openingTimer.current !== null) {
      window.clearTimeout(openingTimer.current)
    }
    if (pulseTimer.current !== null) {
      window.clearTimeout(pulseTimer.current)
    }
    if (pulseFrame.current !== null) {
      window.cancelAnimationFrame(pulseFrame.current)
    }
  }, [])

  function pulseGears() {
    if (openingStarted.current || bookIsOpen) return

    if (pulseTimer.current !== null) {
      window.clearTimeout(pulseTimer.current)
    }
    if (pulseFrame.current !== null) {
      window.cancelAnimationFrame(pulseFrame.current)
    }

    setGearsArePulsing(false)
    pulseFrame.current = window.requestAnimationFrame(() => {
      pulseFrame.current = null
      setGearsArePulsing(true)
      pulseTimer.current = window.setTimeout(() => {
        setGearsArePulsing(false)
        pulseTimer.current = null
      }, 900)
    })
  }

  function unlockBook() {
    if (openingStarted.current || bookIsOpen) return

    openingStarted.current = true
    setGearsAreUnlocking(true)
    openingTimer.current = window.setTimeout(() => {
      setGearsAreUnlocking(false)
      setIsOpening(true)
      openingTimer.current = null
    }, 800)
  }

  function finishOpening(event) {
    if (event.target !== event.currentTarget) return

    if (event.animationName === 'cover-lift' || event.animationName === 'cover-open-from-back') {
      setIsOpening(false)
      setBookIsOpen(true)
    }

    if (event.animationName === 'cover-close-to-back') {
      setIsClosing(false)
      setBookIsOpen(false)
      setActiveSpread(0)
      setClosedCover('back')
      openingStarted.current = false
    }
  }

  function flipClosedCover(direction, event) {
    event.stopPropagation()
    if (bookIsOpen || isOpening || isClosing || coverFlipDirection || closedCover === direction) return

    setClosedCover(direction)
    setCoverFlipDirection(direction)
  }

  function finishCoverFlip(event) {
    if (event.target !== event.currentTarget) return
    if (event.animationName !== 'cover-flip-to-front' && event.animationName !== 'cover-flip-to-back') return
    setCoverFlipDirection(null)
  }

  function closeBook() {
    if (isClosing) return
    setClosingWheelIsLocking(false)
    setTurningTo(null)
    setIsClosing(true)
  }

  function lockBookWithWheel() {
    if (isClosing || closingWheelIsLocking) return

    setClosingWheelIsLocking(true)
  }

  function finishWheelLock(event) {
    if (event.animationName !== 'closing-wheel-lock') return
    closeBook()
  }

  function turnSpread(direction) {
    if (turningTo !== null) return

    const targetSpread = activeSpread + direction
    const spreadCount = pages.length / 2
    if (targetSpread < 0 || targetSpread >= spreadCount) return
    setTurningTo({ spread: targetSpread, direction })
  }

  function finishPageTurn(event) {
    if (event.target !== event.currentTarget || !turningTo) return

    const expectedAnimation = turningTo.direction > 0
      ? 'page-turn-forward'
      : 'page-turn-backward'
    if (
      event.animationName !== expectedAnimation
      && event.animationName !== `mobile-spread-turn-${turningTo.direction > 0 ? 'forward' : 'backward'}`
    ) return

    setActiveSpread(turningTo.spread)
    setTurningTo(null)
  }

  return (
    <main className={`portfolio-opening${bookIsOpen ? ' book-is-open' : ''}`}>
      {(bookIsOpen || isOpening) && (
        <div className="book-underlay" aria-hidden={!bookIsOpen || isClosing} inert={isClosing}>
          <section className="portfolio-book" aria-label="Sheryle's portfolio flipbook">
            <div className="book-toolbar">
              <span className="book-wordmark">SHERYLE FLORENCE AKINYI</span>
              <button
                className="close-book-button"
                type="button"
                onClick={closeBook}
              >
                <span aria-hidden="true">←</span> Close Book
              </button>
            </div>
            <div className="book-object">
              <div className="book-cover-back" aria-hidden="true" />
              <div className="book-page-edges" aria-hidden="true" />
              <div
                className={`book-spread${turningTo ? ` is-turning ${turningTo.direction > 0 ? 'turning-forward' : 'turning-backward'}` : ''}${isClosing ? ' is-closing' : ''}`}
                onAnimationEnd={finishPageTurn}
              >
                <article className="book-page book-page-left">
                  <PageContent page={pages[activeSpread * 2]} pageNumber={activeSpread * 2 + 1} onLock={lockBookWithWheel} onLockComplete={finishWheelLock} isClosing={isClosing} isLocking={closingWheelIsLocking} />
                </article>
                <div className="book-gutter" aria-hidden="true" />
                <article className="book-page book-page-right">
                  <PageContent page={pages[activeSpread * 2 + 1]} pageNumber={activeSpread * 2 + 2} onLock={lockBookWithWheel} onLockComplete={finishWheelLock} isClosing={isClosing} isLocking={closingWheelIsLocking} />
                </article>
                {turningTo && (
                  <>
                    <article
                      className={`turn-underlay${turningTo.direction > 0 ? ' turn-underlay-right' : ' turn-underlay-left'}`}
                      aria-hidden="true"
                      inert
                    >
                      {turningTo.direction > 0 ? (
                        <PageContent
                          page={pages[turningTo.spread * 2 + 1]}
                          pageNumber={turningTo.spread * 2 + 2}
                          onLock={lockBookWithWheel}
                          onLockComplete={finishWheelLock}
                          isClosing={isClosing}
                          isLocking={closingWheelIsLocking}
                        />
                      ) : (
                        <PageContent
                          page={pages[turningTo.spread * 2]}
                          pageNumber={turningTo.spread * 2 + 1}
                          onLock={lockBookWithWheel}
                          onLockComplete={finishWheelLock}
                          isClosing={isClosing}
                          isLocking={closingWheelIsLocking}
                        />
                      )}
                    </article>
                  <div
                    className={`page-turner${turningTo.direction < 0 ? ' turn-backward' : ' turn-forward'}`}
                    onAnimationEnd={finishPageTurn}
                    aria-hidden="true"
                    inert
                  >
                    <div className="turning-face turning-front">
                      {turningTo.direction > 0 ? (
                        <PageContent
                          page={pages[activeSpread * 2 + 1]}
                          pageNumber={activeSpread * 2 + 2}
                          onLock={lockBookWithWheel}
                          onLockComplete={finishWheelLock}
                          isClosing={isClosing}
                          isLocking={closingWheelIsLocking}
                        />
                      ) : (
                        <PageContent
                          page={pages[turningTo.spread * 2 + 1]}
                          pageNumber={turningTo.spread * 2 + 2}
                          onLock={lockBookWithWheel}
                          onLockComplete={finishWheelLock}
                          isClosing={isClosing}
                          isLocking={closingWheelIsLocking}
                        />
                      )}
                    </div>
                    <div className="turning-face turning-back">
                      {turningTo.direction > 0 ? (
                        <PageContent
                          page={pages[turningTo.spread * 2]}
                          pageNumber={turningTo.spread * 2 + 1}
                          onLock={lockBookWithWheel}
                          onLockComplete={finishWheelLock}
                          isClosing={isClosing}
                          isLocking={closingWheelIsLocking}
                        />
                      ) : (
                        <PageContent
                          page={pages[activeSpread * 2]}
                          pageNumber={activeSpread * 2 + 1}
                          onLock={lockBookWithWheel}
                          onLockComplete={finishWheelLock}
                          isClosing={isClosing}
                          isLocking={closingWheelIsLocking}
                        />
                      )}
                    </div>
                  </div>
                  </>
                )}
                {isClosing && activeSpread !== pages.length / 2 - 1 && (
                    <ClosingWheel isLocking overlay />
                )}
                <button
                  className="book-edge book-edge-left"
                  onClick={() => turnSpread(-1)}
                  disabled={activeSpread === 0 || turningTo !== null}
                  aria-label="Turn to the previous page"
                />
                <button
                  className="book-edge book-edge-right"
                  onClick={() => turnSpread(1)}
                  disabled={activeSpread === pages.length / 2 - 1 || turningTo !== null}
                  aria-label="Turn to the next page"
                />
                <div className="book-controls">
                  <button
                    className="page-turn-button"
                    onClick={() => turnSpread(-1)}
                    disabled={activeSpread === 0 || turningTo !== null}
                  >
                    <span aria-hidden="true">←</span> Previous
                  </button>
                  <span className="page-number">
                    {String(activeSpread + 1).padStart(2, '0')} / {String(pages.length / 2).padStart(2, '0')}
                  </span>
                  <button
                    className="page-turn-button"
                    onClick={() => turnSpread(1)}
                    disabled={activeSpread === pages.length / 2 - 1 || turningTo !== null}
                  >
                    Next <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {(!bookIsOpen || isClosing) && (
        <div
          className={`closed-cover-scene${closedCover === 'back' && !isClosing ? ' show-back' : ''}${coverFlipDirection ? ` is-flipping-${coverFlipDirection}` : ''}${isClosing ? ' is-closing' : ''}`}
          onAnimationEnd={finishCoverFlip}
        >
          <div className="closed-book-pages" aria-hidden="true" />
          {coverFlipDirection && (
            <div className={`cover-transition-pages is-flipping-${coverFlipDirection}`} aria-hidden="true">
              {Array.from({ length: 7 }, (_, index) => (
                <span
                  className="cover-transition-page"
                  key={index}
                  style={{
                    '--fan-angle': `${-54 + index * 18}deg`,
                    '--page-delay': `${index * 20}ms`,
                  }}
                />
              ))}
            </div>
          )}
          {!isClosing && (
            <div
              className={`intro-cover${isOpening && closedCover === 'front' ? ' is-opening' : ''}`}
              onAnimationEnd={finishOpening}
              onClick={pulseGears}
              aria-hidden={isOpening || closedCover !== 'front'}
              inert={isOpening || closedCover !== 'front'}
            >
              <div className="cover-endpaper" aria-hidden="true" />
              <div className="opening-content">
                <p className="opening-eyebrow">PORTFOLIO <span>—</span> IN THE MAKING</p>
                <div
                  className={`gear-stage${gearsAreUnlocking ? ' is-unlocking' : ''}${gearsArePulsing ? ' is-pulsing' : ''}`}
                  role="img"
                  aria-label="Three interlocking silver gears assembling and turning"
                >
                  <Gear className="gear-large" delay={0} label="large" onUnlock={unlockBook} />
                  <Gear className="gear-medium" delay={0} label="medium" onUnlock={unlockBook} />
                  <Gear className="gear-small" delay={0} label="small" onUnlock={unlockBook} />
                </div>
                <h1 className="opening-name" aria-label="Sheryle Florence Akinyi">
                  <span aria-hidden="true">Sheryle</span>
                  <span aria-hidden="true">Florence</span>
                  <span aria-hidden="true">Akinyi</span>
                </h1>
                <p className="opening-caption">Thoughtful work, built from the ground up.</p>
                <p className="gear-hint">Hover over the wheels to turn the key.</p>
                <button
                  className="open-book-button"
                  type="button"
                  aria-label="Hover over the gears to open the book"
                >
                  Open a Book <span aria-hidden="true">↗</span>
                </button>
              </div>
              {!isOpening && (
                <button
                  className="cover-flip-button front-cover-flip-button"
                  type="button"
                  onClick={(event) => flipClosedCover('back', event)}
                  disabled={coverFlipDirection !== null}
                >
                  Flip to Back Cover <span aria-hidden="true">↻</span>
                </button>
              )}
            </div>
          )}
          <div
            className={`back-cover-face${isClosing ? ' is-closing' : ''}${isOpening && closedCover === 'back' ? ' is-opening-from-back' : ''}`}
            onAnimationEnd={finishOpening}
            aria-hidden={closedCover !== 'back' && !isClosing}
            inert={closedCover !== 'back' && !isClosing}
          >
            <div className="cover-endpaper" aria-hidden="true" />
            <BackCover
              onFlipToFront={(event) => flipClosedCover('front', event)}
              onOpen={unlockBook}
              isBusy={isOpening || isClosing || coverFlipDirection !== null}
            />
          </div>
        </div>
      )}
    </main>
  )
}

export default App
