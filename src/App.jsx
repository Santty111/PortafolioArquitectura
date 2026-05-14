import { useState, useEffect, useRef } from "react";

const projects = [
  { id: 1, num: "01", title: "JARDÍN DE FUEGOS", subtitle: "ESCUELA DE GASTRONOMÍA / RESTAURANTE", year: "2024", location: "Quito, Ecuador", desc: "Una propuesta arquitectónica que busca devolverle vida y actividad a la intersección de la Av. Luis Tufiño y la calle Gualaquiza, integrando una escuela de gastronomía, un restaurante y una cafetería.", tags: ["Diseño Arquitectónico", "Taller V", "Segundo Lugar"], gradient: "linear-gradient(135deg, #2d1810 0%, #8b1a1a 40%, #1a0a0a 100%)" },
  { id: 2, num: "02", title: "SUMA +", subtitle: "CENTRO CULTURAL — PROYECTO DE TITULACIÓN", year: "2026", location: "Quito, Ecuador", desc: "La propuesta responde a la necesidad de articular el equipamiento educativo con el barrio mediante una arquitectura permeable que fortalezca la vida cultural, el encuentro social y el sentido de pertenencia colectiva.", tags: ["Tesis", "Centro Cultural", "Colegio Rumipamba"], gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" },
  { id: 3, num: "03", title: "GREENSTAR", subtitle: "DISEÑO PAISAJÍSTICO / PASANTÍAS", year: "2025", location: "Quito, Ecuador", desc: "Diseño paisajístico para terraza rooftop concebido como un paisaje lúdico contemporáneo de formas orgánicas y fluidas, con césped sintético, colinas de caucho y materiales suaves.", tags: ["Paisajismo", "Kid Zone", "Rooftop"], gradient: "linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #0a1a0a 100%)" },
  { id: 4, num: "04", title: "AGUIRRE Y LUZURIAGA", subtitle: "CONSTRUCTORA — EXPERIENCIA PROFESIONAL", year: "2025", location: "Quito · Latacunga", desc: "Supervisión de obra, diseño arquitectónico y coordinación técnica en proyectos de vivienda multifamiliar y plazas comerciales.", tags: ["Construcción", "Supervisión", "Pasantías"], gradient: "linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #0a0a0a 100%)" },
  { id: 5, num: "05", title: "TEATRO POLITÉCNICA", subtitle: "DIBUJO ESTILO HATCHING — LÁPIZ DIGITAL", year: "2025", location: "Quito, Ecuador", desc: "Dibujo en técnica de hatching que resalta la riqueza arquitectónica y la expresividad volumétrica del edificio mediante trazos lineales que transmiten fuerza y carácter.", tags: ["Hatching", "Ilustración", "Arte Digital"], gradient: "linear-gradient(135deg, #2a1a10 0%, #4a3020 50%, #1a0a00 100%)" },
];

const experience = [
  { role: "Residente de Obra", project: "Almendáriz — Pifo", tasks: "Supervisión de instalaciones eléctricas e hidrosanitarias, fundición de contrapiso, corrección de tuberías" },
  { role: "Residente de Obra", project: "Kennedy", tasks: "Supervisión estructural de vigas, fundición de losa, replanteo arquitectónico, mampostería" },
  { role: "Diseño Arquitectónico", project: "Latacunga — Plaza Comercial", tasks: "Diseño de plaza comercial 1200m², plantas, instalaciones, renders de presentación" },
  { role: "Diseño Arquitectónico", project: "Norma — Vivienda Multifamiliar", tasks: "Diseño de vivienda 310m², plantas arquitectónicas, renders exteriores" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s` }}>
      {children}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", background: "#0a0a0a", color: "#f5f0eb", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; }
        ::selection { background: #8b1a1a; color: #f5f0eb; }
        .nav-link { position: relative; cursor: pointer; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #777; transition: color 0.4s; }
        .nav-link:hover { color: #f5f0eb; }
        .project-card { cursor: pointer; position: relative; overflow: hidden; transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .project-card:hover { transform: scale(1.02); }
        .project-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%); }
        .line { height: 1px; background: linear-gradient(90deg, transparent, #333, transparent); }
        .glow { position: absolute; width: 600px; height: 600px; border-radius: 50%; filter: blur(120px); opacity: 0.07; pointer-events: none; }
        .menu-overlay { position: fixed; inset: 0; background: rgba(10,10,10,0.97); z-index: 50; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(20px); }
        .exp-card { border: 1px solid #1a1a1a; padding: 2.5rem; transition: all 0.5s; background: #0f0f0f; }
        .exp-card:hover { border-color: #333; background: #111; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes lineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .hero-title { font-size: clamp(3rem, 12vw, 10rem); font-weight: 800; letter-spacing: -0.03em; line-height: 0.9; }
        .section-title { font-size: clamp(2rem, 5vw, 4rem); font-weight: 700; letter-spacing: -0.02em; }
        .mono { font-family: 'Space Mono', monospace; }
        .serif { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      {/* ═══ NAVIGATION ═══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, padding: "1.5rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", mixBlendMode: "difference" }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 4, cursor: "pointer" }} onClick={() => scrollTo("home")}>
          STUDIO RUMI
        </div>
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }} className="hidden md:flex">
          {["works", "experience", "sketches", "about"].map(s => (
            <span key={s} className="nav-link" onClick={() => scrollTo(s)}>{s}</span>
          ))}
        </div>
        <div style={{ cursor: "pointer", fontSize: 11, letterSpacing: 3 }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "CLOSE" : "MENU"}
        </div>
      </nav>

      {/* ═══ MOBILE MENU ═══ */}
      {menuOpen && (
        <div className="menu-overlay" style={{ animation: "fadeIn 0.4s ease" }}>
          <div style={{ textAlign: "center" }}>
            {["home", "works", "experience", "sketches", "about"].map((s, i) => (
              <div key={s} style={{ marginBottom: "2rem", animation: `slideUp 0.6s ease ${i * 0.1}s both` }}>
                <span style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 700, cursor: "pointer", letterSpacing: -1, transition: "opacity 0.3s" }} onClick={() => scrollTo(s)}
                  onMouseEnter={e => e.target.style.opacity = 0.4} onMouseLeave={e => e.target.style.opacity = 1}>
                  {s.toUpperCase()}
                </span>
              </div>
            ))}
            <div style={{ marginTop: "3rem", display: "flex", gap: "2rem", justifyContent: "center" }}>
              <a href="https://www.instagram.com/paul_withlake/" target="_blank" rel="noreferrer" className="nav-link">Instagram</a>
              <a href="https://www.linkedin.com/in/paul-conlago-35bb59336" target="_blank" rel="noreferrer" className="nav-link">LinkedIn</a>
            </div>
          </div>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section id="home" style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "3rem", position: "relative", overflow: "hidden" }}>
        <div className="glow" style={{ background: "#8b1a1a", top: "10%", right: "20%" }} />
        <div className="glow" style={{ background: "#1a3a5c", bottom: "20%", left: "10%" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(30,20,15,0.8) 0%, #0a0a0a 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ animation: "slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" }}>
            <p className="mono" style={{ fontSize: 11, letterSpacing: 4, color: "#666", marginBottom: "1.5rem" }}>ARCHITECTURE PORTFOLIO — QUITO, ECUADOR</p>
            <h1 className="hero-title">STUDIO<br/>RUMI</h1>
          </div>
          <div style={{ animation: "slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <p className="serif" style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", color: "#777", maxWidth: 400, fontStyle: "italic", fontWeight: 300 }}>
              Arquitectura contemporánea,<br/>pensada para quien la habita.
            </p>
            <p className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "#444" }}>SCROLL ↓</p>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #222, transparent)", animation: "lineGrow 2s ease 1s both", transformOrigin: "left" }} />
      </section>

      {/* ═══ SELECTED WORKS ═══ */}
      <section id="works" style={{ padding: "8rem 2.5rem 4rem" }}>
        <Reveal>
          <p className="mono" style={{ fontSize: 10, letterSpacing: 4, color: "#555", marginBottom: "1rem" }}>01 — SELECTED WORKS</p>
          <h2 className="section-title">Proyectos<br/>Seleccionados</h2>
        </Reveal>

        <div style={{ marginTop: "5rem", display: "grid", gap: "1.5rem" }}>
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <div className="project-card" onClick={() => setSelectedProject(selectedProject === p.id ? null : p.id)}
                style={{ background: p.gradient, height: selectedProject === p.id ? "auto" : "clamp(250px, 40vw, 450px)", borderRadius: 0, position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <div style={{ position: "relative", zIndex: 2, padding: "2.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <span className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.3)" }}>{p.num} — {p.year}</span>
                      <h3 style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: -1, marginTop: "0.5rem" }}>{p.title}</h3>
                      <p style={{ fontSize: 12, letterSpacing: 2, color: "rgba(255,255,255,0.5)", marginTop: "0.3rem" }}>{p.subtitle}</p>
                    </div>
                    <span className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{p.location}</span>
                  </div>

                  {selectedProject === p.id && (
                    <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", animation: "slideUp 0.6s ease" }}>
                      <p className="serif" style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", maxWidth: 700, fontWeight: 300 }}>{p.desc}</p>
                      <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                        {p.tags.map(t => (
                          <span key={t} className="mono" style={{ fontSize: 9, letterSpacing: 2, padding: "0.4rem 0.8rem", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section id="experience" style={{ padding: "8rem 2.5rem" }}>
        <Reveal>
          <p className="mono" style={{ fontSize: 10, letterSpacing: 4, color: "#555", marginBottom: "1rem" }}>02 — PROFESSIONAL EXPERIENCE</p>
          <h2 className="section-title">Experiencia<br/>Profesional</h2>
          <p className="serif" style={{ fontSize: "1.1rem", color: "#555", marginTop: "1.5rem", maxWidth: 500, fontStyle: "italic", fontWeight: 300 }}>
            Supervisión de obra, coordinación técnica y diseño arquitectónico en proyectos reales.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: "1px", marginTop: "4rem", background: "#1a1a1a" }}>
          {experience.map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="exp-card">
                <span className="mono" style={{ fontSize: 9, letterSpacing: 3, color: "#444" }}>0{i + 1}</span>
                <h4 style={{ fontSize: "1.3rem", fontWeight: 600, marginTop: "1rem", letterSpacing: -0.5 }}>{e.role}</h4>
                <p style={{ fontSize: 13, color: "#8b1a1a", marginTop: "0.5rem", fontWeight: 500 }}>{e.project}</p>
                <p style={{ fontSize: 13, color: "#555", marginTop: "1rem", lineHeight: 1.7 }}>{e.tasks}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div style={{ marginTop: "4rem", padding: "3rem", border: "1px solid #1a1a1a" }}>
            <p className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "#444", marginBottom: "1rem" }}>COMPETENCIAS TÉCNICAS</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
              {[["SketchUp", "90%"], ["Illustrator", "90%"], ["AutoCAD", "80%"], ["D5 Render", "80%"], ["Revit", "70%"], ["Photoshop", "70%"]].map(([name, pct]) => (
                <div key={name} style={{ minWidth: 120 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, color: "#888" }}>{name}</span>
                    <span className="mono" style={{ fontSize: 10, color: "#444" }}>{pct}</span>
                  </div>
                  <div style={{ height: 2, background: "#1a1a1a", width: 120 }}>
                    <div style={{ height: 2, background: "#8b1a1a", width: pct, transition: "width 1.5s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ SKETCHES ═══ */}
      <section id="sketches" style={{ padding: "8rem 2.5rem" }}>
        <Reveal>
          <p className="mono" style={{ fontSize: 10, letterSpacing: 4, color: "#555", marginBottom: "1rem" }}>03 — HAND SKETCHES</p>
          <h2 className="section-title">Dibujo<br/>Arquitectónico</h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ marginTop: "4rem", background: "linear-gradient(135deg, #1a1510 0%, #2a1f15 50%, #0f0a05 100%)", padding: "4rem 3rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, #fff 2px, #fff 3px)" }} />
            <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "3rem", alignItems: "center" }}>
              <div>
                <p className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "#555", marginBottom: "1rem" }}>TEATRO POLITÉCNICA</p>
                <p className="serif" style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "#8a7e73", lineHeight: 1.8, fontWeight: 300, fontStyle: "italic" }}>
                  Dibujo en técnica de hatching que busca resaltar la riqueza arquitectónica y la expresividad volumétrica del edificio. La representación enfatiza la textura, la luz y la sombra mediante trazos lineales.
                </p>
                <p className="mono" style={{ fontSize: 10, color: "#444", marginTop: "2rem", letterSpacing: 3 }}>LÁPIZ DIGITAL · 2025</p>
              </div>
              <div style={{ aspectRatio: "4/3", background: "linear-gradient(135deg, #2a1f15, #1a1510)", border: "1px solid #2a2015", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "#333" }}>HATCHING ARTWORK</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ padding: "8rem 2.5rem 4rem" }}>
        <Reveal>
          <p className="mono" style={{ fontSize: 10, letterSpacing: 4, color: "#555", marginBottom: "1rem" }}>04 — ABOUT</p>
          <h2 className="section-title">Paúl Conlago</h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: "4rem", marginTop: "4rem" }}>
          <Reveal delay={0.1}>
            <div>
              <p className="serif" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", lineHeight: 2, color: "#777", fontWeight: 300, fontStyle: "italic" }}>
                Estudio arquitectura porque me gusta imaginar cómo un simple trazo en un papel puede transformarse en un espacio que la gente use, viva y recuerde. Siempre he creído que la arquitectura no empieza cuando se levanta una pared, sino mucho antes: cuando escuchas lo que un lugar tiene que decir y entiendes lo que las personas esperan de él.
              </p>
              <p style={{ fontSize: 14, color: "#555", marginTop: "2rem", lineHeight: 1.8 }}>
                Creo en una arquitectura honesta, pensada para las personas y consciente de su entorno.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <div style={{ marginBottom: "2.5rem" }}>
                <p className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "#444", marginBottom: "0.8rem" }}>EDUCACIÓN</p>
                <p style={{ fontSize: 14, color: "#888" }}>Universidad Indoamérica — Arquitectura</p>
                <p style={{ fontSize: 13, color: "#555" }}>2020 — 2025</p>
              </div>

              <div style={{ marginBottom: "2.5rem" }}>
                <p className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "#444", marginBottom: "0.8rem" }}>IDIOMAS</p>
                <p style={{ fontSize: 14, color: "#888" }}>Español Nativo · Inglés B2</p>
              </div>

              <div style={{ marginBottom: "2.5rem" }}>
                <p className="mono" style={{ fontSize: 10, letterSpacing: 3, color: "#444", marginBottom: "0.8rem" }}>CONTACTO</p>
                <p style={{ fontSize: 14, color: "#888" }}>arqconlago@gmail.com</p>
                <p style={{ fontSize: 13, color: "#555" }}>Quito, Ecuador</p>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", marginTop: "2rem" }}>
                <a href="https://www.instagram.com/paul_withlake/" target="_blank" rel="noreferrer" style={{ fontSize: 12, letterSpacing: 2, color: "#666", textDecoration: "none", borderBottom: "1px solid #333", paddingBottom: 2, transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = "#f5f0eb"} onMouseLeave={e => e.target.style.color = "#666"}>
                  INSTAGRAM
                </a>
                <a href="https://www.linkedin.com/in/paul-conlago-35bb59336" target="_blank" rel="noreferrer" style={{ fontSize: 12, letterSpacing: 2, color: "#666", textDecoration: "none", borderBottom: "1px solid #333", paddingBottom: 2, transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = "#f5f0eb"} onMouseLeave={e => e.target.style.color = "#666"}>
                  LINKEDIN
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: "4rem 2.5rem 2rem", borderTop: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: -1 }}>STUDIO RUMI</p>
            <p className="serif" style={{ fontSize: 14, color: "#444", fontStyle: "italic", marginTop: "0.3rem" }}>Architecture Portfolio</p>
          </div>
          <p className="mono" style={{ fontSize: 9, letterSpacing: 3, color: "#333" }}>© 2025 PAÚL CONLAGO</p>
        </div>
      </footer>
    </div>
  );
}
