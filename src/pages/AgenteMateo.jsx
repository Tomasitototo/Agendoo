import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";

const AgenteMateo = () => {
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 mb-8"
          >
            <h1 className="text-gray-900 font-extrabold text-6xl lg:text-8xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              Mateo
            </h1>
            <img src="/LogoAgentes.webp" className="w-16 h-16 lg:w-28 lg:h-28 object-contain" />
            <div className="text-gray-900 font-extrabold text-6xl lg:text-8xl tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              IA
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl lg:text-5xl text-[#1B72F0] font-bold mb-8 text-center"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Tu asistente de turnos 24/7
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-xl max-w-2xl mx-auto mb-10"
          >
            Responde consultas, agenda, modifica y cancela turnos por WhatsApp. Sin que vos escribas una sola respuesta.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            href="https://wa.me/5492920543376?text=Quiero%20a%20Mateo%20en%20mi%20negocio"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all shadow-xl shadow-blue-900/20 active:scale-95"
          >
            Quiero a Mateo en mi negocio →
          </motion.a>
        </div>
      </section>

      {/* CHANNELS ANIMATION SECTION */}
      <section className="pt-12 pb-24 bg-[#FFFFFF] overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 text-center max-w-4xl mx-auto mb-20 leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
              El agente que responde mientras vos trabajás. 24/7.
            </h2>
          </motion.div>

          <div className="relative h-[520px] flex items-center justify-center">
            {/* LOGOS AT TOP - Coordinate-aligned for perfect line centering */}
            <div className="absolute top-[-80px] left-0 w-full h-14 z-20 icons-mobile-offset">
              {[
                { x: 135, src: "/LogoAgente1.webp", alt: "Instagram", delay: 0 },
                { x: 300, src: "/LogoAgente2.webp", alt: "WhatsApp", delay: 0.2 },
                { x: 460, src: "/LogoAgente3.webp", alt: "Gmail", delay: 0.4 },
                { x: 620, src: "/Logo.webp", alt: "Agendoo", delay: 0.6 }
              ].map((logo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="absolute w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-3"
                  style={{ left: `${(logo.x / 800) * 100}%`, transform: "translateX(-50%)" }}
                >
                  <img src={logo.src} alt={logo.alt} className="w-8 h-8 object-contain" />
                </motion.div>
              ))}
            </div>

            {/* SVG ANIMATED PATHS */}
            <svg className="absolute top-[-80px] left-0 w-full h-[600px] pointer-events-none z-5" viewBox="0 0 800 600" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad-whatsapp" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#25D366" />
                  <stop offset="100%" stopColor="#1B72F0" />
                </linearGradient>
                <linearGradient id="grad-instagram" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E1306C" />
                  <stop offset="100%" stopColor="#1B72F0" />
                </linearGradient>
                <linearGradient id="grad-gmail" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#EA4335" />
                  <stop offset="100%" stopColor="#1B72F0" />
                </linearGradient>
                <linearGradient id="grad-agendoo" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1B72F0" />
                  <stop offset="100%" stopColor="#1B72F0" />
                </linearGradient>
              </defs>

              {/* x-positions matching the logos exactly */}
              {[
                { x: 160, grad: "instagram" },
                { x: 320, grad: "whatsapp" },
                { x: 480, grad: "gmail" },
                { x: 640, grad: "agendoo" }
              ].map((path, i) => (
                <motion.path
                  key={i}
                  d={`M ${path.x} 28 C ${path.x} 80, 400 90, 400 110`}
                  fill="none"
                  stroke={`url(#grad-${path.grad})`}
                  strokeWidth="1.5"
                  strokeDasharray="400"
                  initial={{ strokeDashoffset: 400 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />
              ))}
            </svg>

            {/* CENTRAL PHONE (Dark Realistic iPhone Mockup) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[250px] h-[500px] z-10" style={{ perspective: "1000px" }}>
              {/* Bezel */}
              <div
                className="relative w-full h-full p-[12px] rounded-[44px]"
                style={{
                  background: "linear-gradient(145deg, #1A1A1A 0%, #2D2D2D 100%)",
                  boxShadow: "0 0 0 1px #000, 0 40px 100px rgba(0,0,0,0.5), 0 15px 30px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.08)"
                }}
              >
                {/* Hardware Buttons - Left side */}
                <div className="absolute left-[-4px] top-[90px] w-[3px] h-[28px] rounded-l-[2px] shadow-[-2px_0_4px_rgba(0,0,0,0.6)]" style={{ background: "#222" }} />
                <div className="absolute left-[-4px] top-[130px] w-[3px] h-[40px] rounded-l-[2px] shadow-[-2px_0_4px_rgba(0,0,0,0.6)]" style={{ background: "#222" }} />
                <div className="absolute left-[-4px] top-[180px] w-[3px] h-[40px] rounded-l-[2px] shadow-[-2px_0_4px_rgba(0,0,0,0.6)]" style={{ background: "#222" }} />

                {/* Hardware Buttons - Right side */}
                <div className="absolute right-[-4px] top-[140px] w-[3px] h-[60px] rounded-r-[2px] shadow-[2px_0_4px_rgba(0,0,0,0.6)]" style={{ background: "#222" }} />

                {/* Screen */}
                <div className="relative w-full h-full bg-black rounded-[38px] overflow-hidden flex flex-col shadow-inner">
                  {/* Dynamic Island - Flush at top */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110px] h-[32px] bg-black rounded-b-[20px] z-30" />

                  {/* WhatsApp Interface */}
                  <div className="flex-1 flex flex-col bg-[#ECE5DD] relative">
                    {/* Header */}
                    <div className="bg-[#075E54] px-4 pt-10 pb-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-bold text-white shadow-sm border border-white/10">M</div>
                      <div className="flex flex-col">
                        <span className="text-white text-[12px] font-bold">Mateo</span>
                        <span className="text-green-300 text-[10px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> en línea
                        </span>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                      {[
                        { text: "¿Tienen turno mañana?", type: "client" },
                        { text: "¡Hola! Sí, a las 18:00 💈", type: "mateo" },
                        { text: "Perfecto, lo reservo", type: "client" },
                        { text: "✅ ¡Listo, confirmado!", type: "mateo" }
                      ].map((msg, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 2 + idx * 0.8, type: "spring", damping: 12 }}
                          className={`relative max-w-[85%] px-3.5 py-2.5 text-[11px] shadow-sm ${msg.type === "client"
                            ? "bg-white text-gray-800 ml-auto rounded-lg rounded-tr-none"
                            : "bg-[#DCF8C6] text-gray-800 mr-auto rounded-lg rounded-tl-none"
                            }`}
                        >
                          {msg.text}
                          {/* Message Tail Mockup */}
                          <div className={`absolute top-0 w-2 h-2 ${msg.type === "client"
                            ? "right-[-4px] bg-white"
                            : "left-[-4px] bg-[#DCF8C6]"
                            }`} style={{ clipPath: msg.type === "client" ? "polygon(0 0, 0% 100%, 100% 0)" : "polygon(100% 0, 100% 100%, 0 0)" }} />
                          <div className="text-[8px] text-gray-400 text-right mt-1 opacity-70">
                            {10 + idx}:{20 + idx * 5}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Footer Mockup */}
                    <div className="p-3 bg-[#F0F0F0] flex items-center gap-2">
                      <div className="flex-1 bg-white rounded-full h-10 px-4 flex items-center text-gray-400 text-[11px]">Escribe un mensaje...</div>
                      <div className="w-10 h-10 rounded-full bg-[#075E54] flex items-center justify-center text-white text-sm">🎤</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING CARDS (Layered) */}
            {[
              { pos: "left-[-20px] top-[15%]", text: "Turno agendado", sub: "Lucas · 18:00", z: 15, icon: "📅" },
              { pos: "left-[-40px] top-[40%]", text: "Cancelación", sub: "Martín · Liberado", z: 5, icon: "❌", opacity: 0.7 },
              { pos: "left-[-10px] top-[62%]", text: "Recordatorio", sub: "Enviado a Julia", z: 15, icon: "🔔" },
              { pos: "right-[-20px] top-[15%]", text: "Disponible", sub: "3 horarios libres", z: 15, icon: "✅" },
              { pos: "right-[-40px] top-[40%]", text: "Respondido", sub: "0.8 segundos", z: 15, icon: "💬" },
              { pos: "right-[-10px] top-[62%]", text: "Reagendado", sub: "Ana · Nuevo turno", z: 5, icon: "🔄", opacity: 0.7 }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                className={`absolute ${card.pos} bg-white border border-gray-200 rounded-[24px] px-5 py-4 min-w-[190px] hidden sm:flex items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)]`}
                style={{ zIndex: card.z }}
                initial={{ opacity: 0, x: card.pos.includes('left') ? -30 : 30 }}
                whileInView={{ opacity: card.opacity ?? 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  y: { duration: 3, repeat: Infinity, delay: idx * 0.5, ease: "easeInOut" },
                  opacity: { duration: 0.5, ease: "easeOut", delay: 0.3 },
                  x: { duration: 0.5, ease: "easeOut", delay: 0.3 }
                }}
              >
                <div className="text-3xl">{card.icon}</div>
                <div>
                  <div className="text-gray-900 text-sm font-bold mb-0.5">{card.text}</div>
                  <div className="text-gray-400 text-xs sm:text-sm font-medium">{card.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* STATS BELOW */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 text-center max-w-2xl mx-auto border-t border-gray-100 pt-12"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { val: "24/7", lbl: "Disponible siempre" },
              { val: "<5seg", lbl: "Tiempo de respuesta" },
              { val: "100%", lbl: "Automático" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>{stat.val}</div>
                <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider">{stat.lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Background glow for the section removed */}
      </section>

      {/* SECCIÓN 1 — RESPUESTAS INMEDIATAS */}
      <section className="py-20 px-6 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs text-blue-600 inline-block mb-4 font-semibold uppercase tracking-wider">
              💬 Respuestas al instante
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Sora', sans-serif" }}>
              Responde antes de que el cliente pierda interés
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Mateo responde en segundos, las 24 horas, los 7 días. Consultas de horarios, precios y disponibilidad, todo resuelto sin que vos estés al teléfono.
            </p>
          </motion.div>

          {/* WhatsApp Mockup 1 */}
          <motion.div
            className="bg-[#111827] rounded-[2.5rem] p-6 border border-gray-100/10 shadow-2xl relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                M
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Mateo</div>
                <div className="text-green-400 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  en línea
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-[#005C4B] text-white text-sm rounded-2xl rounded-br-sm px-4 py-2 max-w-[85%] shadow-sm">
                  Hola! ¿Tienen lugar mañana a las 18hs?
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#1F2C34] text-white text-sm rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%] shadow-sm">
                  ¡Hola! 👋 Sí, mañana a las 18:00 está disponible. ¿Lo reservo a tu nombre?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#005C4B] text-white text-sm rounded-2xl rounded-br-sm px-4 py-2 max-w-[85%] shadow-sm">
                  Sí, soy Lucas
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#1F2C34] text-white text-sm rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%] shadow-sm">
                  ✅ Listo Lucas, turno confirmado para mañana a las 18:00. ¡Nos vemos! 💈
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 2 — GESTIÓN COMPLETA */}
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
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
                M
              </div>
              <div className="text-white font-semibold text-sm">Mateo</div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-[#005C4B] text-white text-sm rounded-2xl rounded-br-sm px-4 py-2 max-w-[85%] shadow-sm">
                  Necesito cancelar mi turno de mañana
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#1F2C34] text-white text-sm rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%] shadow-sm">
                  Sin problema, cancelé tu turno de mañana a las 11:00. ¿Querés que busque otro horario disponible?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#005C4B] text-white text-sm rounded-2xl rounded-br-sm px-4 py-2 max-w-[85%] shadow-sm">
                  Sí, el jueves si hay
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#1F2C34] text-white text-sm rounded-2xl rounded-bl-sm px-4 py-2 max-w-[85%] shadow-sm">
                  El jueves tengo libre a las 10:00, 12:00 y 17:30. ¿Cuál te queda mejor?
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
            <div className="bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs text-blue-600 inline-block mb-4 font-semibold uppercase tracking-wider">
              🔄 Gestión completa
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Sora', sans-serif" }}>
              Cancela, modifica y reagenda sin dramas
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Cuando un cliente necesita cambiar algo, Mateo lo resuelve solo. Verifica disponibilidad, propone horarios y confirma el cambio. Todo registrado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 3 — FEATURES GRID */}
      <section className="py-20 px-6 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-12" style={{ fontFamily: "'Sora', sans-serif" }}>
              Todo lo que hace Mateo
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "📅", title: "Agenda turnos", desc: "Verifica disponibilidad y confirma en segundos." },
              { icon: "❌", title: "Cancela y modifica", desc: "Gestiona cambios sin intervención tuya." },
              { icon: "❓", title: "Responde dudas", desc: "Precios, horarios, servicios — todo al instante." },
              { icon: "👥", title: "Límite por cliente", desc: "Máximo 2 turnos activos por persona." },
              { icon: "💬", title: "Panel de chats", desc: "Ves todas las conversaciones en tiempo real." },
              { icon: "🖐️", title: "Modo manual", desc: "Tomás el control cuando querés vos." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-all cursor-default group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{feature.icon}</div>
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
            Mateo trabaja mientras vos atendés.
          </h2>
          <a
            href="https://wa.me/5492920543376?text=Quiero%20a%20Mateo%20en%20mi%20negocio"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all active:scale-95 shadow-xl shadow-blue-900/10"
          >
            Quiero a Mateo en mi negocio →
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
        @media (max-width: 767px) {
          .icons-mobile-offset {
            transform: translateX(-20px);
          }
        }
      `}} />
    </div>
  );
};

export default AgenteMateo;
