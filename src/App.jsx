import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate, AnimatePresence } from "framer-motion";
import { CinematicHero } from "./components/cinematic-landing-hero";
import { AnimatedCard } from "./components/AnimatedCard";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import DemoBarberia from "./pages/DemoBarberia";
import BarberiaBooking from "./pages/BarberiaBooking";
import DemoBeauty from "./pages/DemoBeauty";
import BeautyBooking from "./pages/BeautyBooking";
import AgenteMateo from "./pages/AgenteMateo";
import AgenteSofia from "./pages/AgenteSofia";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const PricingSection = lazy(() => import("./components/PricingSection"));
const LogosCarousel = lazy(() => import("./components/LogosCarousel"));

// Utility component for placeholder images
const PlaceholderImage = ({ description }) => (
  <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-[#1B72F0] to-[#0A0A0A] flex items-center justify-center rounded-2xl shadow-lg">
    <span className="text-white text-lg font-medium">[ Imagen: {description} ]</span>
  </div>
);

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



const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "¿En cuánto tiempo está listo mi sistema?",
      a: "En aproximadamente 5 a 7 días hábiles tu sistema está configurado, personalizado con tu marca y listo para recibir reservas."
    },
    {
      q: "¿Necesito saber de tecnología para usarlo?",
      a: "Para nada. El panel es simple e intuitivo. Además te acompañamos en la configuración inicial y te explicamos todo paso a paso."
    },
    {
      q: "¿Funciona con Mercado Pago?",
      a: "Sí, la integración con Mercado Pago está incluida en ambos planes. Tus clientes pagan la seña al momento de reservar y vos recibís el dinero directamente en tu cuenta."
    },
    {
      q: "¿Qué pasa si quiero cancelar?",
      a: "Podés cancelar la suscripción mensual cuando quieras, sin costo ni penalidad."
    },
    {
      q: "¿Puedo tener varios profesionales en mi negocio?",
      a: "Sí, el Plan Premium incluye multi-profesional. Cada uno puede tener sus propios horarios, servicios y foto de perfil. El cliente elige a quién quiere o el sistema asigna automáticamente."
    },
    {
      q: "¿El agente de WhatsApp reemplaza mi atención?",
      a: "El agente responde dudas frecuentes y agenda turnos automáticamente. Si querés tomar el control vos, podés activar el modo manual desde el panel y responder directamente. Todo queda registrado."
    }
  ];

  return (
    <section id="faq" className="bg-[#FFFFFF] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-center font-extrabold text-4xl lg:text-5xl text-gray-900 mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
          Preguntas <span className="font-light italic text-[#1B72F0]">frecuentes</span>
        </h2>
        <p className="text-center text-gray-400 text-base mb-12">
          Si no está tu pregunta, escribinos por WhatsApp.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left flex justify-between items-center px-6 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-gray-900 text-base">{faq.q}</span>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-[#1B72F0] shrink-0 ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
const TestimonialsSection = () => {
  return (
    <section className="bg-[#FFFFFF] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center font-extrabold text-4xl lg:text-5xl text-gray-900 mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
          Negocios que ya trabajan
          <div className="text-[#1B72F0]">con Agendoo</div>
        </h2>
        <p className="text-center text-gray-400 text-base mb-16">
          Lo que dicen los que ya automatizaron su agenda
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 lg:p-10 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-blue-600 flex items-center justify-center text-white font-bold text-2xl">
            M
          </div>
          <div className="font-bold text-gray-900 text-lg mb-1">
            Barbería Monarca
          </div>
          <div className="text-gray-400 text-sm mb-4">
            Matías R. — Dueño
          </div>
          <div className="flex justify-center gap-1 mb-6 text-yellow-400 text-xl">
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
          </div>
          <p className="text-gray-600 text-base leading-relaxed italic max-w-sm mx-auto">
            "Antes perdía horas por semana confirmando turnos por WhatsApp. Con Agendoo los clientes reservan solos y yo me entero cuando ya está pago. No volvería atrás."
          </p>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section id="comenzar" className="bg-[#FFFFFF] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedCard index={0} className="relative overflow-hidden rounded-3xl p-16 lg:p-20 text-center" style={{ background: "linear-gradient(135deg, #1B72F0 0%, #0d5fd4 100%)" }}>

          {/* Círculo decorativo izquierdo */}
          <div
            className="absolute -top-[80px] -left-[80px] w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 65%)" }}
          />

          {/* Círculo decorativo derecho */}
          <div
            className="absolute -bottom-[80px] -right-[80px] w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.20) 0%, transparent 65%)" }}
          />

          <div className="relative z-10">
            <h2 className="font-extrabold text-4xl lg:text-5xl text-white leading-tight mb-8" style={{ fontFamily: "'Sora', sans-serif" }}>
              Menos WhatsApps.<br />
              Más turnos.<br />
              Empezá ahora.
            </h2>
            <div className="space-y-4 mb-10 max-w-lg mx-auto">
              <p className="text-white/90 text-lg">
                De la reserva al cobro, todo automático desde el primer día.
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                Peluqueros, lashistas y barberos de toda Argentina ya dejaron de perseguir clientes por WhatsApp. Sin tarjeta. Cancelá cuando quieras.
              </p>
            </div>

            <div className="flex justify-center flex-wrap">
              <motion.a
                href="https://wa.me/5492920543376?text=Quiero%20empezar%20a%20reservar%20online!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-blue-700 font-bold px-10 py-4 rounded-2xl hover:bg-blue-50 transition-all inline-block"
              >
                Comenzar ahora
              </motion.a>
            </div>
          </div>

        </AnimatedCard>
      </div>
    </section>
  );
};

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('sin');
  useEffect(() => {
    const sectionId = sessionStorage.getItem('scrollTo')
    if (sectionId) {
      sessionStorage.removeItem('scrollTo')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }, [])

  const scrollToPrecios = (e) => {
    e.preventDefault();
    const el = document.querySelector("#precios");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans overflow-x-hidden max-w-full w-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Global smooth scroll */}
      <style>{"html { scroll-behavior: smooth; }"}</style>
      <Navbar isFloating={true} />

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
      <Suspense fallback={null}>
        <LogosCarousel />
      </Suspense>

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
      <section id="sin-vs-con" className="bg-[#FFFFFF] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center font-extrabold text-4xl lg:text-5xl text-gray-900 mb-8 md:mb-12" style={{ fontFamily: "'Sora', sans-serif" }}>
            Sin Agendoo vs. <span className="text-[#1B72F0]">Con Agendoo</span>
          </h2>

          {/* Toggle Mobile */}
          <div className="md:hidden flex justify-center mb-10">
            <div className="bg-[#F3F4F6] p-1 rounded-full inline-flex font-['DM_Sans'] shadow-sm">
              <button 
                onClick={() => setActiveTab('sin')}
                className={`py-2 px-6 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'sin' ? 'bg-[#2B6BFF] text-white shadow-md' : 'text-[#6B7280]'}`}
              >
                Sin Agendoo
              </button>
              <button 
                onClick={() => setActiveTab('con')}
                className={`py-2 px-6 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'con' ? 'bg-[#2B6BFF] text-white shadow-md' : 'text-[#6B7280]'}`}
              >
                Con Agendoo
              </button>
            </div>
          </div>

          {/* Versión Desktop: Grid 2 Columnas */}
          <div className="hidden md:grid grid-cols-2 gap-6">
            {/* CARD SIN AGENDOO (Desktop) */}
            <div className="bg-gray-100 border border-gray-200 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold">✕</div>
                <h3 className="font-bold text-lg text-gray-700 font-['Sora']">Sin Agendoo</h3>
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

            {/* CARD CON AGENDOO (Desktop) */}
            <div className="bg-[#1B72F0] rounded-3xl p-8 shadow-xl shadow-blue-900/10 active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">✓</div>
                <h3 className="font-bold text-lg text-white font-['Sora']">Con Agendoo</h3>
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

          {/* Versión Mobile: Toggle + Animación */}
          <div className="md:hidden relative overflow-hidden min-h-[360px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                initial={{ x: activeTab === 'con' ? 40 : -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: activeTab === 'con' ? -40 : 40, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-full h-full"
              >
                {activeTab === 'sin' ? (
                  <div className="bg-gray-100 border border-gray-200 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500 font-bold">✕</div>
                      <h3 className="font-bold text-lg text-gray-700 font-['Sora']">Sin Agendoo</h3>
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
                ) : (
                  <div className="bg-[#1B72F0] rounded-3xl p-8 shadow-xl shadow-blue-900/10 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                      <h3 className="font-bold text-lg text-white font-['Sora']">Con Agendoo</h3>
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
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      {/* SECCIÓN DEMOS */}
      <section id="demos" className="bg-[#FFFFFF] py-20 px-6">
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
                  image: "/demos/preview-barberia.webp",
                  mobileImage: "/demos/demo-barberia-mobile.webp",
                  placeholderCss: "from-gray-800 to-gray-900",
                  href: "/demo-barberia"
                },
                {
                  badgeText: "Estética & Lash",
                  title: "Demo Beauty",
                  image: "/demos/preview-beauty.webp",
                  mobileImage: "/demos/demo-beauty-mobile.webp",
                  placeholderCss: "from-pink-900 to-gray-900",
                  href: "/demo-beauty"
                }
              ].map((demo, index) => (
                <a
                  key={index}
                  href={demo.href}
                  className="relative overflow-hidden rounded-3xl md:h-80 cursor-pointer group hover:scale-[1.02] hover:shadow-xl transition-all duration-300 bg-gray-100"
                >
                  {/* IMAGEN MOBILE (visible solo en mobile) */}
                  <img
                    src={demo.mobileImage}
                    alt={demo.title}
                    className="md:hidden w-full object-cover rounded-3xl"
                    style={{ aspectRatio: '9/16' }}
                    onError={(e) => e.target.style.display = 'none'}
                  />

                  {/* CAPA 1 — Imagen de fondo (solo desktop) */}
                  <img
                    src={demo.image}
                    alt={demo.title}
                    className="hidden md:block absolute inset-0 w-full h-full object-cover z-0 opacity-100 transition-opacity duration-300"
                    onError={(e) => e.target.style.display = 'none'}
                  />

                  {/* CAPA 2 — Overlay degradado (mobile + desktop) */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* CAPA 3 — Contenido (mobile + desktop) */}
                  <div className="flex absolute bottom-0 left-0 right-0 p-6 justify-between items-end z-20">

                    {/* Lado izquierdo */}
                    <div>
                      <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-white text-xs font-medium mb-3">
                        {demo.badgeText}
                      </span>
                      <h3 className="text-white font-bold text-2xl leading-tight">
                        {demo.title}
                      </h3>
                    </div>

                    {/* Lado derecho — solo desktop */}
                    <div className="hidden md:flex">
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

      <TestimonialsSection />
      <Suspense fallback={null}>
        <PricingSection />
      </Suspense>

      {/* FAQ */}
      <FAQSection />

      {/* CALL TO ACTION */}
      <CTASection />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo-barberia" element={<DemoBarberia />} />
        <Route path="/demo-barberia/turnos" element={<BarberiaBooking />} />
        <Route path="/demo-beauty" element={<DemoBeauty />} />
        <Route path="/demo-beauty/turnos" element={<BeautyBooking />} />
        <Route path="/agente-mateo" element={<AgenteMateo />} />
        <Route path="/agente-sofia" element={<AgenteSofia />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
