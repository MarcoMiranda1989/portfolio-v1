import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Briefcase, Code, BookOpen, Layers, Globe, Paintbrush, Braces, Coffee, Database, Beaker, FileType, Palette, Phone } from 'lucide-react';

export const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const mosaicos = [
    { id: 1, label: "Acerca de mi", icon: User, color: "#2D3F54", classes: "col-span-1 md:col-span-2 lg:row-span-2 min-h-[200px] md:min-h-0 bg-dark-slate" },
    { id: 2, label: "experiencia", icon: Briefcase, color: "#1DBD8E", classes: "col-span-1 lg:col-span-2 min-h-[150px] md:min-h-0 bg-mint" },
    { id: 3, label: "proyectos", icon: Code, color: "#3C93FA", classes: "col-span-1 min-h-[150px] md:min-h-0 bg-sky" },
    { id: 4, label: "estudios", icon: BookOpen, color: "#028183", classes: "col-span-1 lg:row-span-2 min-h-[150px] md:min-h-0 bg-petrol" },
    { id: 5, label: "stack", icon: Layers, color: "#004C94", classes: "col-span-1 md:col-span-2 min-h-[150px] md:min-h-0 bg-navy" },
    { id: 6, label: "contacto", icon: Mail, color: "#00D4C6", classes: "col-span-1 min-h-[150px] md:min-h-0 bg-turquoise" },
  ];

  const selectedMosaic = mosaicos.find(m => m.id === selectedId);

  return (
    <div className="w-full min-h-screen md:h-screen bg-white relative overflow-hidden">
      
      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 h-full border-b border-r border-dark-slate">
        {mosaicos.map((m) => (
          <motion.div
            key={m.id}
            layoutId={`card-${m.id}`}
            onClick={() => setSelectedId(m.id)}
            whileHover={{ backgroundColor: "#2D3F54", color: "#fff" }}
            className={`${m.classes} border-t border-l border-dark-slate flex items-center justify-center cursor-pointer transition-colors duration-300`}
          >
            <motion.span className="flex items-center gap-3 text-xl md:text-2xl lg:text-3xl text-white tracking-wide uppercase">
              <span className="text-white">{React.createElement(m.icon, { size: 24 })}</span>
              {m.label}
            </motion.span>
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
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
                className="absolute top-4 right-4 group p-2 flex items-center justify-center transition-all"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <span className="absolute h-0.5 w-full bg-white rotate-45 group-hover:rotate-[135deg] transition-transform duration-300" />
                  <span className="absolute h-0.5 w-full bg-white -rotate-45 group-hover:rotate-[45deg] transition-transform duration-300" />
                </div>
              </button>

              <div className="flex flex-col items-center justify-center h-full">
                {selectedId === 1 ? (
                  <>
                    <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Acerca de mí</h2>
                    <div className="h-1 w-20 bg-white mb-6" />
                    <p className="text-center max-w-md text-lg leading-tight mb-8">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-white rounded-lg hover:bg-white/20 transition-colors text-white font-medium">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        GitHub
                      </button>
                      <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-white rounded-lg hover:bg-white/20 transition-colors text-white font-medium">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                      </button>
                      <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-white rounded-lg hover:bg-white/20 transition-colors text-white font-medium">
                        <Mail size={20} /> Gmail
                      </button>
                    </div>
                  </>
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
                      <button className="flex items-center justify-center gap-3 w-full px-6 py-3.5 border-2 border-white rounded-xl hover:bg-white/20 transition-colors text-white font-medium text-lg">
                        <Phone size={22} /> Copiar celular
                      </button>
                      <button className="flex items-center justify-center gap-3 w-full px-6 py-3.5 border-2 border-white rounded-xl hover:bg-white/20 transition-colors text-white font-medium text-lg">
                        <Mail size={22} /> Copiar correo
                      </button>
                      <button className="flex items-center justify-center gap-3 w-full px-6 py-3.5 border-2 border-white rounded-xl hover:bg-white/20 transition-colors text-white font-medium text-lg">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        Contactar LinkedIn
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">
                      {selectedMosaic?.label}
                    </h2>
                    <div className="h-1 w-20 bg-white mb-6" />
                    <p className="text-center max-w-md text-lg leading-tight">
                      Detalles técnicos del proyecto. Como Engineering Student, puedes documentar aquí tus procesos de testing y QA.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;