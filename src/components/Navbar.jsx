import React, { useState, useEffect } from "react";

const navbarStyles = `
  .btn-shimmer {
    position: relative;
    overflow: hidden;
  }
  .btn-shimmer::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 120%;
    background-color: rgba(255,255,255,0.2);
    top: 50%;
    transform: skewX(30deg) translate(-150%, -50%);
    transition: all 0.5s;
  }
  .btn-shimmer:hover::before {
    transform: skewX(30deg) translate(150%, -50%);
    transition-delay: 0.1s;
  }
  .btn-shimmer:active {
    transform: scale(0.95);
  }
`;
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useHashNavigation } from "../hooks/useHashNavigation";

export const Navbar = ({ isFloating = false }) => {
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [agentesOpen, setAgentesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { goToSection } = useHashNavigation();
  
  const toggle = () => setOpen(!open);
  
  const navClasses = isFloating 
    ? "fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm opacity-0 invisible pointer-events-none transition-none"
    : "fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm transition-all duration-300";

  return (
    <nav id="main-navbar" className={navClasses}>
      <style>{navbarStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <button onClick={() => goToSection('hero')} className="flex items-center space-x-2 focus:outline-none cursor-pointer">
          {!logoError && (
            <img 
              src="/Logo.webp" 
              alt="Logo" 
              className="h-8 w-auto object-contain" 
              onError={() => setLogoError(true)}
            />
          )}
          <span className="font-extrabold text-xl text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>Agendoo</span>
        </button>
        <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
          {/* Dropdown Agentes IA */}
          <div 
            className="relative group py-4"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="flex items-center gap-1 text-gray-600 hover:text-[#1B72F0] transition-colors cursor-pointer outline-none">
              Agentes IA <span className="text-[10px] transition-transform group-hover:rotate-180">▾</span>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[calc(100%-8px)] left-0 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-2 min-w-[300px] z-50 overflow-hidden"
                >
                  {/* ITEM 1: Mateo */}
                  <div 
                    onClick={() => { navigate("/agente-mateo"); setShowDropdown(false); }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                      <img src="/LogoAgentes.webp" alt="Mateo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Mateo · Agente de Gestión</div>
                      <div className="text-gray-400 text-xs mt-0.5">Reserva, modifica y cancela turnos por WhatsApp</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 my-1" />

                  {/* ITEM 2: Sofía */}
                  <div 
                    onClick={() => { navigate("/agente-sofia"); setShowDropdown(false); }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 overflow-hidden p-1.5">
                      <img src="/LogoSofia.webp" alt="Sofía" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Sofía · Agente de Seguimiento</div>
                      <div className="text-gray-400 text-xs mt-0.5">Recordatorios y feedback post-turno</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 my-1" />

                  {/* FOOTER */}
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl text-gray-400 text-xs">
                    <span className="text-[10px]">✦</span> Próximamente más agentes IA
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => goToSection('ideal-para')} className="text-gray-600 hover:text-[#1B72F0] transition-colors cursor-pointer outline-none">Para quién</button>
          <button onClick={() => goToSection('demos')} className="text-gray-600 hover:text-[#1B72F0] transition-colors cursor-pointer outline-none">Demos</button>
          <button onClick={() => goToSection('precios')} className="text-gray-600 hover:text-[#1B72F0] transition-colors cursor-pointer outline-none">Precios</button>
          <button onClick={() => goToSection('faq')} className="text-gray-600 hover:text-[#1B72F0] transition-colors cursor-pointer outline-none">FAQ</button>
          <button onClick={() => goToSection('comenzar')} className="ml-4 bg-[#1B72F0] text-white px-5 py-2.5 rounded-xl hover:bg-[#155ec9] transition-all shadow-md hover:shadow-lg cursor-pointer outline-none btn-shimmer">
            Comenzar ahora
          </button>
        </div>
        <button className="md:hidden focus:outline-none" onClick={toggle} aria-label="Menu">
          <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button 
              className="absolute top-6 right-6 text-gray-400 text-3xl hover:text-gray-900 transition-colors p-2" 
              onClick={() => setOpen(false)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center gap-6 w-full px-8">
              {/* Sección Agentes IA en Mobile - Colapsable */}
              <div className="w-full">
                <div 
                  onClick={() => setAgentesOpen(!agentesOpen)}
                  className="flex items-center gap-1 text-gray-800 text-xl font-medium py-1 cursor-pointer transition-colors justify-center"
                >
                  <span>Agentes IA</span>
                  <motion.span
                    animate={{ rotate: agentesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▾
                  </motion.span>
                </div>
                
                <AnimatePresence>
                  {agentesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: "hidden" }}
                      className="text-left"
                    >
                      <div className="pl-4 border-l-2 border-gray-100 mt-4 space-y-4 pb-2">
                        <a 
                          href="/agente-mateo" 
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 text-gray-600 text-base"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center overflow-hidden p-1">
                            <img src="/LogoAgentes.webp" alt="Mateo" className="w-full h-full object-contain" />
                          </div>
                          <span>Mateo · Gestión de turnos</span>
                        </a>
                        <a 
                          href="/agente-sofia" 
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 text-gray-600 text-base"
                        >
                          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center overflow-hidden p-1">
                            <img src="/LogoSofia.webp" alt="Sofía" className="w-full h-full object-contain" />
                          </div>
                          <span>Sofía · Seguimiento</span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="border-t border-gray-100 my-4 w-full" />
              </div>

              <button onClick={() => { goToSection('ideal-para'); setOpen(false); }} className="text-gray-800 text-xl font-medium hover:text-blue-600 transition-colors cursor-pointer outline-none">Para quién</button>
              <button onClick={() => { goToSection('demos'); setOpen(false); }} className="text-gray-800 text-xl font-medium hover:text-blue-600 transition-colors cursor-pointer outline-none">Demos</button>
              <button onClick={() => { goToSection('precios'); setOpen(false); }} className="text-gray-800 text-xl font-medium hover:text-blue-600 transition-colors cursor-pointer outline-none">Precios</button>
              <button onClick={() => { goToSection('faq'); setOpen(false); }} className="text-gray-800 text-xl font-medium hover:text-blue-600 transition-colors cursor-pointer outline-none">FAQ</button>
            </div>
            <button 
              onClick={() => { goToSection('comenzar'); setOpen(false); }}
              className="mt-4 bg-[#1B72F0] text-white font-bold px-10 py-4 rounded-full text-lg shadow-xl shadow-blue-100 hover:bg-[#155ec9] transition-all text-center cursor-pointer outline-none btn-shimmer"
            >
              Comenzar ahora
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
