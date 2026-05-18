import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Opcional: npm install lucide-react
// import { X } from 'lucide-react'; 

export const App = () => {
  const [selectedId, setSelectedId] = useState(null);

  const mosaicos = [
    { id: 1, label: "Proyecto 1", classes: "col-span-1 md:col-span-2 lg:row-span-2 min-h-[200px] md:min-h-0" },
    { id: 2, label: "2", classes: "col-span-1 lg:col-span-2 min-h-[150px] md:min-h-0" },
    { id: 3, label: "3", classes: "col-span-1 min-h-[150px] md:min-h-0" },
    { id: 4, label: "4", classes: "col-span-1 lg:row-span-2 min-h-[150px] md:min-h-0" },
    { id: 5, label: "5", classes: "col-span-1 md:col-span-2 min-h-[150px] md:min-h-0" },
    { id: 6, label: "6", classes: "col-span-1 min-h-[150px] md:min-h-0" },
  ];

  return (
    <div className="w-screen min-h-screen md:h-screen bg-white relative overflow-hidden">
      
      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 h-full border-b border-r border-black">
        {mosaicos.map((m) => (
          <motion.div
            key={m.id}
            layoutId={`card-${m.id}`}
            onClick={() => setSelectedId(m.id)}
            whileHover={{ backgroundColor: "#000", color: "#fff" }}
            className={`${m.classes} bg-gray-200 border-t border-l border-black flex items-center justify-center cursor-pointer transition-colors duration-300`}
          >
            <motion.span className="font-bold">{m.label}</motion.span>
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
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              layoutId={`card-${selectedId}`}
              className="w-full h-full max-w-5xl max-h-[85vh] bg-gray-100 border-4 border-black p-8 relative z-10 flex flex-col shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
            >
              {/* BOTÓN DE CERRAR ESTILIZADO */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Evita conflictos de clics
                  setSelectedId(null);
                }}
                className="absolute top-4 right-4 group p-2 flex items-center justify-center transition-all"
              >
                {/* La "X" hecha con líneas para control total del diseño */}
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <span className="absolute h-0.5 w-full bg-black rotate-45 group-hover:rotate-[135deg] transition-transform duration-300" />
                  <span className="absolute h-0.5 w-full bg-black -rotate-45 group-hover:rotate-[45deg] transition-transform duration-300" />
                </div>
              </button>

              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">
                   Proyecto {selectedId}
                </h2>
                <div className="h-1 w-20 bg-black mb-6" />
                <p className="text-center max-w-md text-lg leading-tight">
                  Detalles técnicos del proyecto. Como Engineering Student, puedes documentar aquí tus procesos de testing y QA.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;