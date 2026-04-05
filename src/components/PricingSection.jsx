import React, { useState, useRef, useEffect } from "react";
import { motion, animate } from "framer-motion";
import { AnimatedCard } from "./AnimatedCard";

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
        <div className="flex justify-center mb-12 relative z-10">
          <div className="bg-[#0f4dbd] p-1 rounded-full inline-flex font-['DM_Sans'] shadow-inner border border-white/10">
            <button 
              onClick={() => setIsAnnual(false)}
              className={`py-2 px-6 rounded-full text-sm font-bold transition-all duration-300 ${!isAnnual ? 'bg-white text-[#1B72F0] shadow-md' : 'text-white/70 hover:text-white'}`}
            >
              Mensual
            </button>
            <button 
              onClick={() => setIsAnnual(true)}
              className={`py-2 px-6 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${isAnnual ? 'bg-white text-[#1B72F0] shadow-md' : 'text-white/70 hover:text-white'}`}
            >
              Anual
              <span className="bg-[#22C55E] text-white text-[10px] font-black rounded-full px-2 py-0.5 shadow-sm">
                Ahorrá 15%
              </span>
            </button>
          </div>
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

export default PricingSection;
