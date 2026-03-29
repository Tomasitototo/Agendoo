import React, { useState, useEffect, useRef } from "react";
import { CinematicHero } from "./components/cinematic-landing-hero";
import { AnimatedCarousel } from "./components/logo-carousel";

// Utility component for placeholder images
const PlaceholderImage = ({ description }) => (
  <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-[#1B72F0] to-[#0A0A0A] flex items-center justify-center rounded-2xl shadow-lg">
    <span className="text-white text-lg font-medium">[ Imagen: {description} ]</span>
  </div>
);

// Navbar component with responsive hamburger
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav id="main-navbar" className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center space-x-2" onClick={(e) => handleLinkClick(e, "#hero")}> 
          <img src="/src/assets/Logo.png" alt="Agendoo" className="h-8 w-8" />
          <span className="font-extrabold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>Agendoo</span>
        </a>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#features" onClick={(e) => handleLinkClick(e, "#features")} className="text-gray-800 hover:text-[#1B72F0]">Funcionalidades</a>
          <a href="#precios" onClick={(e) => handleLinkClick(e, "#precios")} className="text-gray-800 hover:text-[#1B72F0]">Precios</a>
          <a href="#contacto" onClick={(e) => handleLinkClick(e, "#contacto")} className="text-gray-800 hover:text-[#1B72F0]">Contacto</a>
          <button className="ml-4 bg-[#1B72F0] text-white px-4 py-2 rounded-xl hover:bg-[#155ec9] transition-colors">
            Quiero mi sistema
          </button>
        </div>
        <button className="md:hidden focus:outline-none" onClick={toggle} aria-label="Menu">
          <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <a href="#features" onClick={(e) => handleLinkClick(e, "#features")} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Funcionalidades</a>
          <a href="#precios" onClick={(e) => handleLinkClick(e, "#precios")} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Precios</a>
          <a href="#contacto" onClick={(e) => handleLinkClick(e, "#contacto")} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Contacto</a>
          <button className="w-full text-left px-4 py-2 bg-[#1B72F0] text-white" onClick={(e) => handleLinkClick(e, "#precios")}>Quiero mi sistema</button>
        </div>
      )}
    </nav>
  );
};

// Simple fade-in animation hook using IntersectionObserver
const useFadeIn = (ref) => {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 }
    );
    node.classList.add("opacity-0", "translate-y-4", "transition", "duration-700");
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
};

// FAQ Accordion component
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button className="w-full text-left flex justify-between items-center" onClick={() => setOpen(!open)}>
        <span className="text-lg font-medium text-gray-800">{question}</span>
        <svg className={`h-5 w-5 transform transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <p className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, "<br/>") }} />
      )}
    </div>
  );
};

const App = () => {
  // Secciones nuevas irán aquí...

  const scrollToPrecios = (e) => {
    e.preventDefault();
    const el = document.querySelector("#precios");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Global smooth scroll */}
      <style>{"html { scroll-behavior: smooth; }"}</style>
      <Navbar />

      {/* HERO */}
      <div id="hero">
        <CinematicHero
          brandName="Agendoo"
          tagline1="Dejá de perder turnos"
          tagline2="que no llegan."
          cardHeading="Tu negocio trabaja solo."
          cardDescription={
            <>
              <span className="text-white font-semibold">Agendoo</span> automatiza 
              tus reservas, cobros y recordatorios para que vos te enfocés 
              en lo que importa: atender a tus clientes.
            </>
          }
          metricValue={247}
          metricLabel="Turnos este mes"
          ctaHeading="Empezá esta semana."
          ctaDescription="Configuramos todo por vos. Sin tecnicismos, sin complicaciones. Tu sistema listo en 5 días."
        />
      </div>

      {/* LOGOS INTEGRADORES */}
      <AnimatedCarousel />

      {/* NUEVAS SECCIONES SE AÑADIRÁN AQUÍ */}
      
      {/* SECCIÓN IDEAL PARA */}
      <section id="ideal-para" className="bg-[#FFFFFF] py-20 px-4 sm:px-6">
        <div className="bg-gray-50 border border-gray-200 rounded-[2rem] p-10 lg:p-14 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* COLUMNA IZQUIERDA */}
            <div>
              <div className="border border-gray-200 bg-gray-50 rounded-full px-4 py-1.5 text-base text-gray-500 inline-flex items-center gap-2 mb-6 shadow-sm">
                <span>📅</span>
                <span>Cualquier rubro con turnos</span>
              </div>
              
              <h2 className="font-extrabold text-5xl lg:text-6xl text-gray-900 leading-tight mb-14" style={{ fontFamily: "'Sora', sans-serif" }}>
                Agendoo es ideal para:
              </h2>
              
              <div className="bg-white border border-gray-200 rounded-2xl px-5 py-3.5 inline-flex items-center gap-3 text-gray-600 text-base shadow-sm">
                <span className="text-xl">💬</span>
                <span className="font-medium">Si atendés clientes con turno, esto está hecho para vos.</span>
              </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 auto-rows-max">
              {[
                { icon: "✂️", name: "Barberías" },
                { icon: "💇", name: "Peluquerías" },
                { icon: "💆", name: "Centros estéticos" },
                { icon: "🦷", name: "Consultorios odontológicos" },
                { icon: "🐾", name: "Veterinarias" },
              ].map((rubro, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 cursor-pointer transition-all duration-300 h-24">
                  <div className="bg-gray-100 rounded-xl w-14 h-14 flex items-center justify-center text-3xl shrink-0">
                    {rubro.icon}
                  </div>
                  <span className="text-gray-800 font-semibold text-sm sm:text-base leading-tight">{rubro.name}</span>
                </div>
              ))}
              
              {/* Tarjeta Destacada */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 cursor-pointer transition-all duration-300 h-24">
                <div className="bg-blue-100 rounded-xl w-14 h-14 flex items-center justify-center text-3xl shrink-0">
                  ✨
                </div>
                <span className="text-[#1B72F0] font-semibold text-sm sm:text-base leading-tight">Y cualquier negocio que trabaje con turnos</span>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* SECCIÓN COMPARATIVA */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center font-extrabold text-4xl lg:text-5xl text-gray-900 mb-12" style={{ fontFamily: "'Sora', sans-serif" }}>
            Sin Agendoo vs. <span className="text-[#1B72F0]">Con Agendoo</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CARD SIN AGENDOO */}
            <div className="bg-gray-100 border border-gray-200 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                  ✕
                </div>
                <h3 className="font-bold text-lg text-gray-700">Sin Agendoo</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Confirmás turnos uno por uno por WhatsApp",
                  "3 de cada 10 clientes no aparecen",
                  "10+ mensajes de WhatsApp para responder dudas",
                  "No sabés cuánto ganaste este mes",
                  "Agendas en papel o en la cabeza"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-400 text-lg mt-0.5 shrink-0">✕</span>
                    <span className="text-gray-500 text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CARD CON AGENDOO */}
            <div className="bg-[#1B72F0] rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
                <h3 className="font-bold text-lg text-white">Con Agendoo</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Tus clientes reservan solos, a cualquier hora",
                  "Cobro de seña automático = Sin ausencias",
                  "Gráficos y métricas con tus ingresos en tiempo real",
                  "Calendario digital en tiempo real",
                  "Te olvidás de contestar por WhatsApp e Instagram"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-white/70 text-lg mt-0.5 shrink-0">✓</span>
                    <span className="text-white/90 text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>
      {/* SECCIÓN DEMOS */}
      <section className="bg-[#FFFFFF] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 lg:p-14">
            
            {/* ENCABEZADO */}
            <div className="mb-10">
              <div className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-500 inline-flex items-center gap-2 mb-4">
                <span>🖥️</span>
                <span>Demos en vivo</span>
              </div>
              <h2 className="font-extrabold text-4xl lg:text-5xl text-gray-900 mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                Así podría verse tu sistema
              </h2>
              <p className="text-gray-400 text-base max-w-xl">
                Elegí una demo y visualizá cómo quedaría tu negocio con un sistema listo para reservar.
              </p>
            </div>

            {/* GRID DE CARDS DE DEMOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  badgeText: "Estilo urbano",
                  title: "Demo Barbería",
                  image: "/demos/preview-barberia.png",
                  placeholderCss: "from-gray-800 to-gray-900",
                  href: "#"
                },
                {
                  badgeText: "Estética & Lash",
                  title: "Demo Beauty",
                  image: "/demos/preview-beauty.png",
                  placeholderCss: "from-pink-900 to-gray-900",
                  href: "#"
                }
              ].map((demo, index) => (
                <a 
                  key={index} 
                  href={demo.href} 
                  className={`relative overflow-hidden rounded-3xl h-80 cursor-pointer group hover:scale-[1.02] hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${demo.placeholderCss}`}
                >
                  {/* CAPA 1 — Imagen de fondo */}
                  <img 
                    src={demo.image} 
                    alt={demo.title} 
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-300" 
                    onError={(e) => e.target.style.display = 'none'}
                  />

                  {/* CAPA 2 — Overlay degradado */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.2)] to-transparent pointer-events-none" />

                  {/* CAPA 3 — Contenido */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end z-20">
                    
                    {/* Lado izquierdo */}
                    <div>
                      <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-white text-xs font-medium mb-3">
                        {demo.badgeText}
                      </span>
                      <h3 className="text-white font-bold text-2xl leading-tight">
                        {demo.title}
                      </h3>
                    </div>

                    {/* Lado derecho */}
                    <div>
                      <div className="bg-white text-gray-900 rounded-full px-5 py-2 font-semibold text-sm flex items-center gap-2 hover:bg-blue-50 transition-colors">
                        Ver demo <span aria-hidden="true">&rarr;</span>
                      </div>
                    </div>

                  </div>
                </a>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-[#0A0A0A] text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img src="/src/assets/Logo.png" alt="Agendoo" className="h-8 w-8" />
            <span className="text-white font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>Agendoo</span>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#features" className="hover:text-white">Funcionalidades</a>
            <a href="#precios" className="hover:text-white">Precios</a>
            <a href="#contacto" className="hover:text-white">Contacto</a>
          </div>
          <div className="text-sm text-gray-500 text-center md:text-right">
            © 2025 Agendoo. Todos los derechos reservados.<br />Desarrollado por Synapse — itssynapse.com
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
