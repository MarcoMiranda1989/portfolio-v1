import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Briefcase, Code, BookOpen, Layers, Globe, Paintbrush, Braces, Coffee, Database, Beaker, FileType, Palette, Phone, Server, Flame } from 'lucide-react';
import profilePic from './assets/profile-pic.jpg';
import escuelaImg from './assets/escuela.jpg';
import apiMusic from './assets/api-music.png';
import btwProyect from './assets/btw-proyect.png';
import pegasoProyect from './assets/pegaso-proyect.png';

const mosaicos = [
  { id: 1, label: "Acerca de mi", icon: User, color: "#2D3F54", classes: "col-span-1 md:col-span-2 lg:row-span-2 min-h-[200px] md:min-h-0 bg-dark-slate" },
  { id: 2, label: "experiencia", icon: Briefcase, color: "#1DBD8E", classes: "col-span-1 lg:col-span-2 min-h-[150px] md:min-h-0 bg-mint" },
  { id: 3, label: "proyectos", icon: Code, color: "#3C93FA", classes: "col-span-1 min-h-[150px] md:min-h-0 bg-sky" },
  { id: 4, label: "estudios", icon: BookOpen, color: "#028183", classes: "col-span-1 lg:row-span-2 min-h-[150px] md:min-h-0 bg-petrol" },
  { id: 5, label: "stack", icon: Layers, color: "#004C94", classes: "col-span-1 md:col-span-2 min-h-[150px] md:min-h-0 bg-navy" },
  { id: 6, label: "contacto", icon: Mail, color: "#00D4C6", classes: "col-span-1 min-h-[150px] md:min-h-0 bg-turquoise" },
];

export const App = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [copiedMsg, setCopiedMsg] = useState('');

  const handleCopy = (text, msg) => {
    navigator.clipboard.writeText(text);
    setCopiedMsg(msg);
    setTimeout(() => setCopiedMsg(''), 2000);
  };

  const selectedMosaic = useMemo(() => mosaicos.find(m => m.id === selectedId), [selectedId]);

  return (
    <div className="w-full min-h-screen md:h-screen bg-white relative overflow-hidden">
      
      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 h-full border-b border-r border-dark-slate">
        {mosaicos.map((m) => (
          <motion.div
            key={m.id}
            layoutId={`card-${m.id}`}
            onClick={() => setSelectedId(m.id)}
            className={`${m.classes} border-t border-l border-dark-slate flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-dark-slate hover:text-white`}
          >
            <span className="flex items-center gap-3 text-xl md:text-2xl lg:text-3xl text-white tracking-wide uppercase">
              <m.icon size={24} className="shrink-0" />
              {m.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* CAPA DE EXPANSIÓN */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-dark-slate/60 backdrop-blur-sm"
            />

            <motion.div
              key={`modal-${selectedId}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 200, mass: 0.8 }}
              style={{
                backgroundColor: selectedMosaic?.color,
                borderColor: selectedMosaic?.color,
                boxShadow: `10px 10px 0px 0px ${selectedMosaic?.color}`,
              }}
              className="w-full h-full max-w-5xl max-h-[85vh] border-4 p-8 relative z-10 flex flex-col text-white"
            >
              {/* BOTÓN DE CERRAR ESTILIZADO */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(null);
                }}
                className="absolute top-4 right-8 z-20 group p-2 flex items-center justify-center transition-all"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <span className="absolute h-0.5 w-full bg-white rotate-45 group-hover:rotate-[135deg] transition-transform duration-300" />
                  <span className="absolute h-0.5 w-full bg-white -rotate-45 group-hover:rotate-[45deg] transition-transform duration-300" />
                </div>
              </button>

              <div className="flex flex-col items-center justify-center h-full">
                {selectedId === 1 ? (
                  <div className="scrollable-content flex flex-col items-center w-full h-full overflow-y-auto pr-2">
                    <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter">Acerca de mí</h2>
                    <div className="h-1 w-20 bg-white mb-6" />
                    <div className="flex flex-col items-center text-center max-w-lg px-4 pb-8">
                      <div className="w-24 h-24 rounded-full border-2 border-white/30 overflow-hidden mb-5 shrink-0">
                        <img src={profilePic} alt="Marco Antonio Miranda" className="w-full h-full object-cover object-top" />
                      </div>
                      <h3 className="text-2xl font-bold mb-1">Marco Antonio Miranda</h3>
                      <span className="text-sm font-medium text-white/70 mb-4">Fullstack Developer</span>
                      <p className="text-sm md:text-base leading-relaxed text-white/90 mb-8">
                        Desarrollador fullstack de México especializado en aplicaciones web rápidas y escalables. Convierto ideas complejas en productos digitales ultra rápidos, desde la lógica del servidor hasta la experiencia del usuario.
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <a href="https://github.com/MarcoMiranda1989" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 border-2 border-white rounded-lg hover:bg-white/20 transition-colors text-white font-medium text-sm">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                          GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/marco-antonio-maqueda-miranda" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 border-2 border-white rounded-lg hover:bg-white/20 transition-colors text-white font-medium text-sm">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          LinkedIn
                        </a>
                        <a href="mailto:marco.miranda131989@gmail.com" className="flex items-center gap-2 px-5 py-2.5 border-2 border-white rounded-lg hover:bg-white/20 transition-colors text-white font-medium text-sm">
                          <Mail size={20} /> Gmail
                        </a>
                      </div>
                    </div>
                  </div>
                ) : selectedId === 5 ? (
                  <>
                    <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Stack</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-4xl px-4">
                      {[
                        { name: "HTML", icon: Globe },
                        { name: "CSS", icon: Paintbrush },
                        { name: "JS", icon: Braces },
                        { name: "TS", icon: FileType },
                        { name: "Java", icon: Coffee },
                        { name: "Tailwind", icon: Palette },
                        { name: "MySQL", icon: Database },
                        { name: "Postgres", icon: Database },
                        { name: "Mongo", icon: Database },
                        { name: "Selenium", icon: Beaker },
                      ].map((tech) => (
                        <div
                          key={tech.name}
                          className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors"
                        >
                          <tech.icon size={28} className="text-white" />
                          <span className="text-sm font-semibold text-white/90 uppercase tracking-wide">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : selectedId === 6 ? (
                  <>
                    <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Contacto</h2>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                      <button onClick={(e) => { e.stopPropagation(); handleCopy('5645525133', '¡Celular copiado!'); }} className="flex items-center justify-center gap-3 w-full px-6 py-3.5 border-2 border-white rounded-xl hover:bg-white/20 transition-colors text-white font-medium text-lg">
                        <Phone size={22} /> Copiar celular
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleCopy('marco.miranda131989@gmail.com', '¡Correo copiado!'); }} className="flex items-center justify-center gap-3 w-full px-6 py-3.5 border-2 border-white rounded-xl hover:bg-white/20 transition-colors text-white font-medium text-lg">
                        <Mail size={22} /> Copiar correo
                      </button>
                      <a href="https://www.linkedin.com/in/marco-antonio-maqueda-miranda" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full px-6 py-3.5 border-2 border-white rounded-xl hover:bg-white/20 transition-colors text-white font-medium text-lg">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                      </a>
                    </div>
                  </>
                ) : selectedId === 2 ? (
                  <>
                    <div className="scrollable-content flex flex-col items-center w-full h-full overflow-y-auto pr-2">
                      <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter">Experiencia</h2>
                      <div className="h-1 w-20 bg-white mb-8" />
                      <div className="w-full max-w-3xl px-2 space-y-8 pb-8 text-left">
                        <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                            <h3 className="text-xl font-bold">Qualita</h3>
                            <span className="text-sm text-white/70">CDMX, México</span>
                          </div>
                          <p className="text-base font-semibold text-white/90">Becario tester Jr</p>
                          <span className="inline-block text-sm text-white/50 mb-4">Junio 2022 – Febrero 2023</span>
                          <ul className="space-y-3">
                            <li className="flex gap-3 text-sm leading-relaxed text-white/85">
                              <span className="mt-1.5 h-1.5 w-1.5 min-w-1.5 rounded-full bg-white/60 shrink-0" />
                              Diseñé y desarrollé matrices de trazabilidad en Azure DevOps, vinculando requerimientos funcionales de la plataforma de seguros con casos de prueba, incrementando la cobertura en un 15%.
                            </li>
                            <li className="flex gap-3 text-sm leading-relaxed text-white/85">
                              <span className="mt-1.5 h-1.5 w-1.5 min-w-1.5 rounded-full bg-white/60 shrink-0" />
                              Colaboré en la ejecución diaria de ciclos de sprint, implementando scripts iniciales en Selenium para automatizar la validación de flujos básicos, asegurando la integridad de los entregables.
                            </li>
                          </ul>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                            <h3 className="text-xl font-bold">Freelance</h3>
                            <span className="text-sm text-white/70">CDMX, México</span>
                          </div>
                          <p className="text-base font-semibold text-white/90">Desarrollador Web</p>
                          <span className="inline-block text-sm text-white/50 mb-4">Marzo 2025</span>
                          <ul className="space-y-3">
                            <li className="flex gap-3 text-sm leading-relaxed text-white/85">
                              <span className="mt-1.5 h-1.5 w-1.5 min-w-1.5 rounded-full bg-white/60 shrink-0" />
                              Desarrollé una Landing Page interactiva y responsiva utilizando React JS y Tailwind CSS, enfocada en la adquisición de clientes y la presentación de un producto digital (o servicio).
                            </li>
                            <li className="flex gap-3 text-sm leading-relaxed text-white/85">
                              <span className="mt-1.5 h-1.5 w-1.5 min-w-1.5 rounded-full bg-white/60 shrink-0" />
                              Implementé requisitos funcionales y de diseño detallados (equivalentes a especificaciones), asegurando la correcta visualización y funcionalidad en diversos dispositivos y navegadores (cross-browser compatibility).
                            </li>
                            <li className="flex gap-3 text-sm leading-relaxed text-white/85">
                              <span className="mt-1.5 h-1.5 w-1.5 min-w-1.5 rounded-full bg-white/60 shrink-0" />
                              Ejecuté pruebas funcionales automatizadas utilizando Selenium para validar la compatibilidad cross-browser y el correcto funcionamiento de componentes interactivos.
                            </li>
                            <li className="flex gap-3 text-sm leading-relaxed text-white/85">
                              <span className="mt-1.5 h-1.5 w-1.5 min-w-1.5 rounded-full bg-white/60 shrink-0" />
                              Utilicé herramientas de control de versiones (Git) y gestioné las tareas y el progreso del proyecto a través de una plataforma (por ejemplo, Trello o Jira/Azure DevOps), documentando el estado del desarrollo en cada iteración/entrega (sprint simulado).
                            </li>
                          </ul>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                            <h3 className="text-xl font-bold">Centro Académico Vanguardia</h3>
                            <span className="text-sm text-white/70">CDMX, México</span>
                          </div>
                          <p className="text-base font-semibold text-white/90">Docente</p>
                          <span className="inline-block text-sm text-white/50 mb-4">Agosto 2019 – Actualidad</span>
                          <p className="text-sm leading-relaxed text-white/85">
                            Imparto clases en diversas áreas de ciencias y tecnología, tales como matemáticas, física, programación y desarrollo web. Desarrollo planes de estudio personalizados para estudiantes de diferentes niveles educativos, fomentando un ambiente de aprendizaje.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : selectedId === 3 ? (
                  <div className="scrollable-content flex flex-col items-center w-full h-full overflow-y-auto pr-2">
                    <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter">Proyectos</h2>
                    <div className="h-1 w-20 bg-white mb-6" />
                    <div className="w-full max-w-3xl px-2 space-y-6 pb-8">
                      <div className="bg-white/10 rounded-xl p-6 border border-white/30 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/10 transition-all duration-300">
                        <div className="w-full h-40 rounded-lg overflow-hidden mb-4 border border-white/10 shadow-lg shadow-black/20">
                          <img src={apiMusic} alt="API RESTFUL de Canciones" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">API RESTFUL de Canciones, álbumes y artistas</h3>
                        <p className="text-sm text-white/80 leading-relaxed mb-4">
                          API RESTFUL con Node.js, Express, PostgreSQL y Prisma para gestionar canciones, álbumes y artistas, diseñada para ser consumida por aplicaciones frontend.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium"><Code size={13} /> React</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium"><Braces size={13} /> JS</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium"><Server size={13} /> Node</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium"><Database size={13} /> PostgreSQL</span>
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-6 border border-white/30 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/10 transition-all duration-300">
                        <div className="w-full h-40 rounded-lg overflow-hidden mb-4 border border-white/10 shadow-lg shadow-black/20">
                          <img src={btwProyect} alt="BTW Shopping Web" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">BTW Shopping Web</h3>
                        <p className="text-sm text-white/80 leading-relaxed mb-4">
                          Sitio web de visualización y apartado de productos desarrollado para facilitar la experiencia de selección y apartado de productos disponibles.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium"><Code size={13} /> React</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium"><Braces size={13} /> JS</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium"><Palette size={13} /> Tailwind</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium"><Flame size={13} /> Firebase</span>
                        </div>
                        <a href="https://btw-lili-app.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-white/30 rounded-lg hover:bg-white/20 transition-colors text-white text-sm">
                          <Globe size={16} /> Visitar sitio
                        </a>
                      </div>
                      <div className="bg-white/10 rounded-xl p-6 border border-white/30 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/10 transition-all duration-300">
                        <div className="w-full h-40 rounded-lg overflow-hidden mb-4 border border-white/10 shadow-lg shadow-black/20">
                          <img src={pegasoProyect} alt="Pegaso Web" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Pegaso Web</h3>
                        <p className="text-sm text-white/80 leading-relaxed mb-4">
                          Programa creado para la planeación de viajes en familia o individuales, donde se puede crear una ruta de viaje con vuelos, traslados, hoteles, actividades y manejo de gastos para facilitar los pagos entre integrantes.
                        </p>
                        <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-3">
                          <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
                          Trabajado con metodología ágil Kanban y Scrum
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium"><Code size={13} /> React</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium"><Braces size={13} /> JS</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium"><Palette size={13} /> Tailwind</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-medium"><Flame size={13} /> Firebase</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectedId === 4 ? (
                  <div className="scrollable-content flex flex-col items-center w-full h-full overflow-y-auto pr-2">
                    <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter">Estudios</h2>
                    <div className="h-1 w-20 bg-white mb-8" />
                    <div className="w-full max-w-3xl px-2 space-y-6 pb-8">
                      <div className="bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors">
                        <div className="w-full h-32 rounded-lg overflow-hidden mb-4 border border-white/10">
                          <img src={escuelaImg} alt="ESCUELA SUPERIOR DE CÓMPUTO" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                          <h3 className="text-xl font-bold">ESCUELA SUPERIOR DE CÓMPUTO</h3>
                          <span className="text-sm text-white/70">CDMX, México</span>
                        </div>
                        <p className="text-base font-semibold text-white/90">Ingeniería en Sistemas Computacionales</p>
                        <span className="inline-block text-sm text-white/50 mb-4">Enero 2020 – Trunca</span>
                        <p className="text-sm leading-relaxed text-white/85">
                          Formación en ciencias de la computación con enfoque en desarrollo de software, arquitectura de sistemas, bases de datos y metodologías ágiles. Participación en proyectos integradores y desarrollo de soluciones tecnológicas.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">
                      {selectedMosaic?.label}
                    </h2>
                    <div className="h-1 w-20 bg-white mb-6" />
                    <p className="text-center max-w-md text-lg leading-tight">
                      Contenido próximamente.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {copiedMsg && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 bg-dark-slate text-white rounded-xl shadow-2xl border border-white/20 text-sm font-medium"
        >
          {copiedMsg}
        </motion.div>
      )}
    </div>
  );
};

export default App;