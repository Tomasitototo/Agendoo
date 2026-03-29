import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate, AnimatePresence } from "framer-motion";
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
  const [logoError, setLogoError] = useState(false);
  const toggle = () => setOpen(!open);
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav id="main-navbar" className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm opacity-0 invisible pointer-events-none transition-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center space-x-2" onClick={(e) => handleLinkClick(e, "#hero")}>
          {!logoError && (
            <img 
              src="/Logo.webp" 
              alt="Logo" 
              className="h-8 w-auto object-contain" 
              onError={() => setLogoError(true)}
            />
          )}
          <span className="font-extrabold text-xl text-gray-900" style={{ fontFamily: "'Sora', sans-serif" }}>Agendoo</span>
        </a>
        <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
          <a href="#ideal-para" onClick={(e) => handleLinkClick(e, "#ideal-para")} className="text-gray-600 hover:text-[#1B72F0] transition-colors">Para quién</a>
          <a href="#demos" onClick={(e) => handleLinkClick(e, "#demos")} className="text-gray-600 hover:text-[#1B72F0] transition-colors">Demos</a>
          <a href="#precios" onClick={(e) => handleLinkClick(e, "#precios")} className="text-gray-600 hover:text-[#1B72F0] transition-colors">Precios</a>
          <a href="#faq" onClick={(e) => handleLinkClick(e, "#faq")} className="text-gray-600 hover:text-[#1B72F0] transition-colors">FAQ</a>
          <button onClick={(e) => handleLinkClick(e, "#comenzar")} className="ml-4 bg-[#1B72F0] text-white px-5 py-2.5 rounded-xl hover:bg-[#155ec9] transition-all shadow-md hover:shadow-lg active:scale-95">
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
            {/* Botón de cerrar (X) */}
            <button 
              className="absolute top-6 right-6 text-gray-400 text-3xl hover:text-gray-900 transition-colors p-2" 
              onClick={() => setOpen(false)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Links Centrados */}
            <div className="flex flex-col items-center gap-6">
              <a href="#ideal-para" onClick={(e) => handleLinkClick(e, "#ideal-para")} className="text-gray-800 text-2xl font-medium hover:text-blue-600 transition-colors">Para quién</a>
              <a href="#demos" onClick={(e) => handleLinkClick(e, "#demos")} className="text-gray-800 text-2xl font-medium hover:text-blue-600 transition-colors">Demos</a>
              <a href="#precios" onClick={(e) => handleLinkClick(e, "#precios")} className="text-gray-800 text-2xl font-medium hover:text-blue-600 transition-colors">Precios</a>
              <a href="#faq" onClick={(e) => handleLinkClick(e, "#faq")} className="text-gray-800 text-2xl font-medium hover:text-blue-600 transition-colors">FAQ</a>
            </div>

            {/* Botón "Comenzar ahora" */}
            <button 
              className="mt-4 bg-[#1B72F0] text-white font-bold px-10 py-4 rounded-full text-lg shadow-xl shadow-blue-100 hover:bg-[#155ec9] active:scale-95 transition-all" 
              onClick={(e) => handleLinkClick(e, "#comenzar")}
            >
              Comenzar ahora
            </button>
          </motion.div>
        )}
      </AnimatePresence>
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

const Counter = ({ from, to }) => {
  const nodeRef = useRef(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(from, to, {
      duration: 0.8,
      onUpdate(value) {
        node.textContent = value.toFixed(0);
      },
    });
    return () => controls.stop();
  }, [from, to]);
  return <span ref={nodeRef} />;
};

const BackgroundEffects = () => (
  <>
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  </>
);

const AnimatedCard = ({ children, index, className, style = {} }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        ...style,
      }}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="precios" className="bg-[#1B72F0] py-24 relative overflow-x-hidden max-w-full w-full">
      <BackgroundEffects />
      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full max-w-full">
        <h2 className="text-center font-extrabold text-4xl lg:text-5xl text-white mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
          Precios claros <br className="hidden sm:block" />
          <span className="font-light italic">sin letra chica</span>
        </h2>
        <p className="text-center text-white/70 text-base mb-10">
          Sin comisiones. Tu facturación es 100% tuya.
        </p>

        {/* TOGGLE MENSUAL / ANUAL */}
        <div className="flex justify-center items-center gap-4 mb-12 relative z-10">
          <span className={`font-semibold transition-colors duration-200 ${!isAnnual ? "text-white" : "text-white/70"}`}>Mensual</span>
          <button
            className="w-16 h-8 flex items-center bg-white/20 rounded-full p-1 cursor-pointer outline-none"
            onClick={() => setIsAnnual(!isAnnual)}>
            <motion.div
              className="w-6 h-6 bg-white rounded-full shadow-sm"
              animate={{ x: isAnnual ? 32 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`relative font-semibold flex items-center transition-colors duration-200 ${isAnnual ? "text-white" : "text-white/70"}`}>
            Anual
            {isAnnual && (
              <motion.span
                initial={{ opacity: 0, x: -20, y: "-50%" }}
                animate={{ opacity: 1, x: 0, y: "-50%" }}
                className="absolute left-[calc(100%+8px)] top-1/2 bg-green-400 text-green-900 text-xs font-bold rounded-full px-2 py-0.5 whitespace-nowrap"
              >
                Ahorrá 15%
              </motion.span>
            )}
          </span>
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">

          {/* CARD BÁSICO */}
          <AnimatedCard index={0} className="max-w-md w-full mx-auto bg-white/10 border border-white/20 backdrop-blur-sm rounded-3xl p-8 text-white flex flex-col h-full">
            <div className="self-start bg-white/15 border border-white/20 rounded-full px-3 py-1 text-xs font-semibold text-white mb-4">
              BÁSICO
            </div>
            <div className="text-white/60 text-sm mb-1">USD $400 setup único</div>
            <div className="text-5xl font-extrabold text-white">
              $<Counter from={!isAnnual ? 34 : 40} to={isAnnual ? 34 : 40} /> <span className="text-2xl font-normal text-white/60">/mes</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mt-2 mb-4">
              Ideal para quienes recién arrancan o quieren probar la herramienta.
            </p>
            <div className="border-t border-white/20 my-6"></div>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Reserva online 24/7",
                "Calendario con disponibilidad en tiempo real",
                "Pagos con Mercado Pago",
                "Temporizador de reserva (5 min para pagar)",
                "Emails automáticos de confirmación",
                "Sistema de descuentos y promociones",
                "Bloqueo de fechas",
                "Panel de administración completo",
                "Diseño personalizado con tu marca",
                "Dominio personalizado + SSL",
                "Soporte por WhatsApp en horario laboral"
              ].map((feat, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 5, transition: { type: "spring", stiffness: 400 } }}
                >
                  <span className="text-green-400 shrink-0 mt-0.5">✓</span>
                  <span className="text-white/80 text-sm">{feat}</span>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="https://wa.me/5492920543376?text=Quiero%20empezar%20a%20reservar%20online%20con%20el%20plan%20Básico!"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-2xl text-center font-semibold bg-white/15 border border-white/30 text-white hover:bg-white/25 transition-all duration-200 mt-auto">
              Comenzar ahora
            </motion.a>
          </AnimatedCard>

          {/* CARD PREMIUM */}
          <AnimatedCard index={1} className="relative max-w-md w-full mx-auto bg-white rounded-3xl p-8 text-gray-900 shadow-[0_25px_60px_rgba(0,0,0,0.25)] flex flex-col h-full">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1 whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
              <span>⭐</span> EL FAVORITO DE LOS NEGOCIOS
            </div>
            <div className="self-start bg-blue-600 text-white rounded-full px-3 py-1 text-xs font-semibold mb-4">
              PREMIUM
            </div>
            <div className="text-gray-400 text-sm mb-1">USD $600 setup único</div>
            <div className="text-5xl font-extrabold text-gray-900">
              $<Counter from={!isAnnual ? 60 : 70} to={isAnnual ? 60 : 70} /> <span className="text-2xl font-normal text-gray-400">/mes</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mt-2 mb-4">
              Perfecto para profesionales o negocios que quieren destacarse.
            </p>
            <div className="border-t border-gray-100 my-6"></div>
            <div className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">
              Todo lo del Plan Básico, más:
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Multi-profesional (varios empleados)",
                "Sistema de usuarios con historial",
                "Programa de fidelización con puntos",
                "Gestión de inventario con alertas de stock",
                "Estadísticas completas + exportación a Excel",
                "Agente de WhatsApp con IA (OpenAI)",
                "Panel de chats de WhatsApp en el dashboard",
                "Turnos por WhatsApp identificados visualmente",
                "Soporte prioritario 7 días/semana"
              ].map((feat, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ x: 5, transition: { type: "spring", stiffness: 400 } }}
                >
                  <span className="text-blue-500 shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-600 text-sm">{feat}</span>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="https://wa.me/5492920543376?text=Quiero%20empezar%20a%20reservar%20online%20con%20el%20plan%20Premium!"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-2xl text-center font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 mt-auto">
              Comenzar ahora
            </motion.a>
          </AnimatedCard>

        </div>

        {/* BANNER GARANTÍA */}
        <div className="mt-8 bg-white/10 border border-white/20 rounded-2xl p-6 text-center backdrop-blur-sm">
          <div className="text-2xl mb-2">🛡️</div>
          <div className="text-white font-bold text-base mb-1">
            Garantía de satisfacción
          </div>
          <p className="text-white/70 text-sm">
            Si en los primeros 30 días no estás conforme, cancelamos la suscripción sin costo.
          </p>
        </div>

      </div>
    </section>
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

const App = () => {
  // Secciones nuevas irán aquí...

  const scrollToPrecios = (e) => {
    e.preventDefault();
    const el = document.querySelector("#precios");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans overflow-x-hidden max-w-full w-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
      <section id="sin-vs-con" className="bg-[#FFFFFF] py-20">
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
                  image: "/preview-barberia.webp",
                  placeholderCss: "from-gray-800 to-gray-900",
                  href: "#"
                },
                {
                  badgeText: "Estética & Lash",
                  title: "Demo Beauty",
                  image: "/preview-beauty.webp",
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

      {/* SECCIÓN TESTIMONIOS */}
      <section className="bg-[#FFFFFF] py-20">
        <div className="max-w-5xl mx-auto px-6">
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
      <PricingSection />

      {/* FAQ */}
      <FAQSection />

      {/* CALL TO ACTION */}
      <CTASection />

      {/* FOOTER */}
      <footer id="footer" className="bg-[#0A0A0A] pt-16 relative flex flex-col justify-between">
        
        {/* CONTENIDO SUPERIOR */}
        <div className="flex flex-col md:flex-row justify-between items-start px-12 pb-12 border-b border-white/10 z-10 w-full max-w-7xl mx-auto">
          
          {/* LADO IZQUIERDO */}
          <div className="mb-10 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <img src="/Logo.webp" alt="Agendoo" className="h-8" />
              <div className="text-white font-bold text-xl" style={{ fontFamily: "'Sora', sans-serif" }}>Agendoo</div>
            </div>
            <p className="text-white/40 text-sm mt-2 max-w-xs">
              Tu sistema de turnos online,<br />
              listo para trabajar mientras vos descansás.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="https://www.instagram.com/synapse.ok/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://wa.me/5492920543376" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>

          {/* LADO DERECHO */}
          <div className="flex flex-col text-left md:text-right space-y-3 mt-8 md:mt-0">
            <a href="#ideal-para" className="text-white/50 text-sm hover:text-white transition-colors">Ideal para</a>
            <a href="#sin-vs-con" className="text-white/50 text-sm hover:text-white transition-colors">Sin vs Con</a>
            <a href="#demos" className="text-white/50 text-sm hover:text-white transition-colors">Demos</a>
            <a href="#precios" className="text-white/50 text-sm hover:text-white transition-colors">Precios</a>
            <a href="#faq" className="text-white/50 text-sm hover:text-white transition-colors">FAQ</a>
            <a href="#comenzar" className="text-white/50 text-sm hover:text-white transition-colors">Comenzar ahora</a>
            <a href="https://itssynapse.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm transition-colors mt-2">
              Desarrollado por Synapse &rarr;
            </a>
          </div>
        </div>

        {/* TEXTO GIGANTE Y COPYRIGHT */}
        <div className="relative overflow-hidden w-full h-[120px] flex items-end justify-center">
          {/* FADE SUPERIOR */}
          <div className="absolute top-0 left-0 right-0 h-[60px] pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, #0A0A0A 0%, transparent 100%)" }} />
          
          <h1 className="m-0 p-0 pl-8 font-extrabold text-[rgba(255,255,255,0.04)] whitespace-nowrap select-none tracking-[-0.02em] leading-none w-full" style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(80px, 15vw, 180px)", transform: "translateY(20px)" }}>
            Agendoo
          </h1>
          
          {/* LÍNEA FINAL */}
          <div className="absolute bottom-4 w-full text-center text-white/20 text-xs z-20">
            © 2025 Agendoo. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
