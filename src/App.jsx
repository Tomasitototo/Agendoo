import React, { useState, useEffect, useRef } from "react";

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
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 z-50 shadow-sm">
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
  // Refs for animation sections
  const heroRef = useRef(null);
  const dolorRef = useRef(null);
  const propuestaRef = useRef(null);
  const comoFuncionaRef = useRef(null);
  const featuresRef = useRef(null);
  const idealParaRef = useRef(null);
  const preciosRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  // Apply fade-in to each section
  useFadeIn(heroRef);
  useFadeIn(dolorRef);
  useFadeIn(propuestaRef);
  useFadeIn(comoFuncionaRef);
  useFadeIn(featuresRef);
  useFadeIn(idealParaRef);
  useFadeIn(preciosRef);
  useFadeIn(faqRef);
  useFadeIn(ctaRef);

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
      <section id="hero" ref={heroRef} className="pt-24 bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <span className="inline-block bg-[#1B72F0] text-white text-xs font-semibold px-3 py-1 rounded-full">✦ Sistema de turnos online</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A0A0A]" style={{ fontFamily: "'Sora', sans-serif" }}>
              Dejá de perder clientes por turnos que no llegan.
            </h1>
            <p className="text-gray-700 max-w-md">
              Agendoo automatiza tus reservas, cobros y recordatorios para que vos te enfocés en tu negocio.
            </p>
            <div className="flex space-x-4">
              <button className="bg-[#1B72F0] text-white px-6 py-2 rounded-xl hover:bg-[#155ec9] transition-colors" onClick={scrollToPrecios}>
                Ver planes →
              </button>
              <button className="border border-[#1B72F0] text-[#1B72F0] px-6 py-2 rounded-xl hover:bg-[#1B72F0]/10 transition-colors" onClick={scrollToPrecios}>
                Hablar con un asesor
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mb-8 md:mb-0">
            <PlaceholderImage description="mockup del dashboard" />
          </div>
        </div>
      </section>

      {/* SECCIÓN DOLOR */}
      <section id="dolor" ref={dolorRef} className="bg-[#F8FAFC] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#0A0A0A] mb-8">Hoy perdés horas por semana coordinando turnos por WhatsApp.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Clientes que no aparecen y no avisaron", "Turnos anotados en papeles o Excel", "Cobros olvidados y sin confirmación"].map((txt, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center">
                <svg className="h-12 w-12 text-[#1B72F0] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6" /></svg>
                <p className="text-gray-700">{txt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN PROPUESTA */}
      <section id="propuesta" ref={propuestaRef} className="bg-[#0A0A0A] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>Tus clientes reservan solos, 24/7, desde el celular.</h2>
            <p className="text-gray-300 max-w-md">Agendoo simplifica la gestión de turnos, pagos y recordatorios, permitiendo que tu negocio funcione sin interrupciones.</p>
            <ul className="space-y-2">
              {[
                "Reserva online con pago en el momento",
                "Confirmación automática por email",
                "Recordatorios 24hs antes por WhatsApp",
                "Sin llamadas ni mensajes manuales"
              ].map((feat, i) => (
                <li key={i} className="flex items-center">
                  <svg className="h-5 w-5 text-[#1B72F0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <PlaceholderImage description="mockup móvil de reserva" />
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" ref={comoFuncionaRef} className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-8">En 3 pasos, tu negocio listo.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              title: "Configuramos tu sistema",
              desc: "Personalizamos colores, servicios y horarios según tu negocio."
            }, {
              title: "Compartís el link de reserva",
              desc: "Lo ponés en Instagram, WhatsApp o donde quieras."
            }, {
              title: "Los turnos llegan solos",
              desc: "Tu cliente elige, paga y recibe confirmación automática."
            }].map((step, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl shadow-md">
                <div className="text-4xl font-extrabold text-[#1B72F0] mb-4">{i + 1}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES DESTACADAS */}
      <section id="features" ref={featuresRef} className="py-16">
        {/* Bloque A */}
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <PlaceholderImage description="pantalla de pago con Mercado Pago" />
            </div>
            <div className="md:w-1/2 space-y-4">
              <h3 className="text-2xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>Cobros online para eliminar ausencias</h3>
              <p className="text-gray-700">Los negocios que cobran seña reducen hasta un 60% las ausencias. Con Agendoo, el cliente paga en el momento o pierde el turno.</p>
            </div>
          </div>
        </div>
        {/* Bloque B */}
        <div className="bg-[#0A0A0A] text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <PlaceholderImage description="conversación WhatsApp con IA" />
            </div>
            <div className="md:w-1/2 space-y-4">
              <span className="inline-block bg-[#1B72F0] text-white text-xs font-semibold px-2 py-1 rounded-full">Solo en Plan Premium</span>
              <h3 className="text-2xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>Agente de WhatsApp con IA que agenda por vos</h3>
              <p className="text-gray-300">Tu negocio responde preguntas y agenda turnos automáticamente por WhatsApp, incluso a las 3am.</p>
            </div>
          </div>
        </div>
        {/* Bloque C */}
        <div className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <PlaceholderImage description="panel de estadísticas" />
            </div>
            <div className="md:w-1/2 space-y-4">
              <span className="inline-block bg-[#1B72F0] text-white text-xs font-semibold px-2 py-1 rounded-full">Solo en Plan Premium</span>
              <h3 className="text-2xl font-extrabold" style={{ fontFamily: "'Sora', sans-serif" }}>Estadísticas para tomar decisiones</h3>
              <p className="text-gray-700">Visualizá tus ingresos, servicios más solicitados y horarios pico en un dashboard claro. Exportá todo a Excel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* IDEAL PARA */}
      <section id="ideal-para" ref={idealParaRef} className="bg-[#F8FAFC] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-8">Agendoo es ideal para:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {["✂️ Barberías", "💅 Centros estéticos", "🏥 Consultorios", "💆 Spas y masajes", "🎓 Profesores y coaches", "🐾 Veterinarias"].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center">
                <span className="text-3xl mb-2">{item.split(' ')[0]}</span>
                <span className="text-gray-800">{item.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" ref={preciosRef} className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Elegí el plan de tu negocio</h2>
          <p className="text-gray-600 mb-12">Precios en USD. Instalación única + mensualidad.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Básico */}
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
              <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">BÁSICO</span>
              <div className="text-3xl font-extrabold text-[#0A0A0A] mb-2">$400 <span className="text-base font-medium text-gray-600">setup</span></div>
              <div className="text-xl font-medium text-gray-800 mb-4">$40 /mes</div>
              <ul className="text-left space-y-2 mb-6 text-gray-700">
                {[
                  "Reserva online 24/7",
                  "Calendario con disponibilidad en tiempo real",
                  "Pagos con Mercado Pago",
                  "Temporizador de reserva (5 min para pagar)",
                  "Emails automáticos de confirmación",
                  "Sistema de descuentos y promociones",
                  "Bloqueo de fechas (vacaciones, feriados)",
                  "Panel de administración completo",
                  "Diseño personalizado con tu marca",
                  "Dominio personalizado + SSL",
                  "Soporte por WhatsApp en horario laboral"
                ].map((feat, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="h-4 w-4 text-[#1B72F0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <button className="border border-[#1B72F0] text-[#1B72F0] px-4 py-2 rounded-xl hover:bg-[#1B72F0]/10 transition-colors w-full" onClick={scrollToPrecios}>Consultar</button>
            </div>
            {/* Premium */}
            <div className="border-2 border-[#1B72F0] rounded-2xl p-6 shadow-lg">
              <span className="inline-block bg-[#1B72F0] text-white text-xs font-semibold px-2 py-1 rounded-full mb-2">PREMIUM</span>
              <div className="text-3xl font-extrabold text-[#0A0A0A] mb-2">$600 <span className="text-base font-medium text-gray-600">setup</span></div>
              <div className="text-xl font-medium text-gray-800 mb-4">$70 /mes</div>
              <p className="text-gray-700 mb-4">Todo lo del Plan Básico, más:</p>
              <ul className="text-left space-y-2 mb-6 text-gray-700">
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
                  <li key={i} className="flex items-center">
                    <svg className="h-4 w-4 text-[#1B72F0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <button className="bg-[#1B72F0] text-white px-4 py-2 rounded-xl hover:bg-[#155ec9] transition-colors w-full" onClick={scrollToPrecios}>Quiero el Premium</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" ref={faqRef} className="bg-[#F8FAFC] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Preguntas frecuentes</h2>
          <div className="space-y-4">
            <FAQItem question="¿En cuánto tiempo está listo mi sistema?" answer="En aproximadamente 5 a 7 días hábiles tu sistema está configurado y listo para recibir reservas." />
            <FAQItem question="¿Qué necesito para empezar?" answer="Solo tu logo, colores del negocio, lista de servicios y precios. Nosotros nos encargamos del resto." />
            <FAQItem question="¿Funciona con Mercado Pago?" answer="Sí, la integración con Mercado Pago está incluida en ambos planes." />
            <FAQItem question="¿Puedo tener varios empleados o profesionales?" answer="Sí, el Plan Premium incluye gestión multi-profesional donde cada uno tiene sus propios horarios." />
            <FAQItem question="¿Qué pasa si tengo un problema técnico?" answer="Ofrecemos soporte por WhatsApp. El Plan Básico en horario laboral y el Premium los 7 días." />
            <FAQItem question="¿Puedo cambiar de plan después?" answer="Sí, podés hacer upgrade de Básico a Premium cuando quieras, abonando la diferencia." />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta-final" ref={ctaRef} className="bg-[#0A0A0A] text-white py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Tu primer turno online puede ser esta semana.</h2>
          <p className="text-gray-300 mb-8">Configuramos todo por vos. Sin tecnicismos, sin complicaciones.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#1B72F0] text-white px-6 py-3 rounded-xl hover:bg-[#155ec9] transition-colors" onClick={scrollToPrecios}>Quiero mi sistema →</button>
            <a href="https://wa.me/TUNUMERO?text=Hola,%20quiero%20más%20info%20sobre%20Agendoo" className="border border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-[#0A0A0A] transition-colors" target="_blank" rel="noopener noreferrer">Hablar por WhatsApp</a>
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
