import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";

const AgenteSofia = () => {
  return (
    <div className="font-sans overflow-x-hidden bg-[#FFFFFF] min-h-screen text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar isFloating={false} />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] film-grain invert" />
          <div className="absolute inset-0 bg-grid-theme opacity-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* HERO TITLE - LOGOTYPE STYLE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 mb-8"
          >
            <h1 className="text-gray-900 font-extrabold text-6xl lg:text-8xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              Sofía
            </h1>
            <img src="/LogoSofia.webp" className="w-16 h-16 lg:w-28 lg:h-28 object-contain" />
            <div className="text-gray-900 font-extrabold text-6xl lg:text-8xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              IA
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl lg:text-5xl text-purple-600 font-extrabold mb-8 text-center"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            La que nunca olvida un turno
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-xl max-w-2xl mx-auto mb-10"
          >
            Manda recordatorios automáticos 24hs antes y pregunta cómo estuvo el servicio cuando termina. Sin que vos hagas nada.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            href="https://wa.me/5492920543376?text=Quiero%20a%20Sofia%20en%20mi%20negocio"
            className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all shadow-xl shadow-purple-900/20 active:scale-95"
          >
            Quiero a Sofía en mi negocio →
          </motion.a>
        </div>
      </section>

      {/* SECCIÓN 1 — RECORDATORIOS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-purple-50 border border-purple-100 rounded-full px-3 py-1 text-[10px] text-purple-600 inline-block mb-3 font-bold uppercase tracking-widest">
              🔔 RECORDATORIO AUTOMÁTICO
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>
              Tus clientes nunca<br />más olvidan el turno
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Sofía manda un mensaje 24 horas antes de cada turno. Sin que vos lo programes, sin que vos lo recuerdes. Automático siempre.
            </p>
            <div className="space-y-2 mt-6">
              {[
                "Recordatorio 24hs antes de cada turno",
                "Reduce ausencias automáticamente",
                "El cliente confirma o avisa si no va",
                "Sin configuración diaria"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="text-purple-500 font-bold">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* WhatsApp Mockup 1 */}
          <motion.div
            className="bg-[#111827] rounded-[2.5rem] p-6 border border-white/5 shadow-2xl relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                S
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Sofía</div>
                <div className="text-green-400 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  en línea
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="bg-[#1F2C34] text-white text-sm rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%] shadow-sm">
                  📅 Recordatorio: Mañana tenés turno a las 11:00hs en Barbería Monarca con Marcos. ¡Te esperamos! ✂️
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#005C4B] text-white text-sm rounded-2xl rounded-br-sm px-4 py-2 max-w-[85%] shadow-sm">
                  Gracias! Ahí voy 👍
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 2 — POST TURNO */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* WhatsApp Mockup 2 */}
          <motion.div
            className="bg-[#111827] rounded-[2.5rem] p-6 border border-gray-100/10 shadow-2xl lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                S
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Sofía</div>
                <div className="text-green-400 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  en línea
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="bg-[#1F2C34] text-white text-sm rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%] shadow-sm">
                  ¡Hola! ¿Cómo estuvo tu visita de hoy en Barbería Monarca? 😊
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#005C4B] text-white text-sm rounded-2xl rounded-br-sm px-4 py-2 max-w-[85%] shadow-sm">
                  Todo perfecto, muy conforme!
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#1F2C34] text-white text-sm rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%] shadow-sm">
                  ¡Qué bueno! Gracias por tu tiempo. ¡Hasta la próxima! 💈
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-left lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-purple-50 border border-purple-100 rounded-full px-3 py-1 text-xs text-purple-600 inline-block mb-4 font-semibold uppercase tracking-wider">
              ⭐ Feedback automático
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Sora', sans-serif" }}>
              Sabé cómo estuvo cada visita
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Cuando termina el turno, Sofía le escribe al cliente para saber cómo estuvo. Vos recibís el feedback sin pedirlo ni buscarlo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-12" style={{ fontFamily: "'Sora', sans-serif" }}>
              Todo lo que hace Sofía
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🔔", title: "Recordatorio 24hs", desc: "Avisa automáticamente antes de cada turno." },
              { icon: "📉", title: "Reduce ausencias", desc: "Menos olvidos = menos turnos perdidos." },
              { icon: "🗺️", title: "Reseña en Google Maps", desc: "Sofía invita al cliente a reseñar el negocio en Google Maps con el link directo del local." },
              { icon: "📋", title: "Historial completo", desc: "Todas las conversaciones quedan guardadas para que puedas revisarlas cuando quieras." },
              { icon: "📊", title: "Resultados en tu panel", desc: "Ves el feedback de cada cliente." },
              { icon: "⚡", title: "100% automático", desc: "No necesita configuración diaria." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-all cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 text-center bg-[#FFFFFF]">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Sora', sans-serif" }}>
            Sofía trabaja mientras vos descansás.
          </h2>
          <a 
            href="https://wa.me/5492920543376?text=Quiero%20a%20Sofia%20en%20mi%20negocio"
            className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all active:scale-95 shadow-xl shadow-purple-900/10"
          >
            Quiero a Sofía en mi negocio →
          </a>
        </motion.div>
      </section>

      <Footer />

      {/* Global Cinematic Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .film-grain {
          background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
        }
        .bg-grid-theme {
          background-size: 60px 60px;
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
        }
      `}} />
    </div>
  );
};

export default AgenteSofia;
