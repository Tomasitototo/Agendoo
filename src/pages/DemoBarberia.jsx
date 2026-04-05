import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Calendar, Images, ChevronDown, MapPin } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const DemoBarberia = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'signup'
  const [passwordValue, setPasswordValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [openSection, setOpenSection] = useState(null);

  const passwordReqs = {
    length: passwordValue.length >= 8,
    upper: /[A-Z]/.test(passwordValue),
    lower: /[a-z]/.test(passwordValue),
    number: /[0-9]/.test(passwordValue),
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const images = [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200",
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1200",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1200"
  ];

  return (
    <div className="min-h-screen font-['DM_Sans'] bg-[#FAF7F2] text-[#1A1A1A]">
      {/* SECCIÓN 1 — NAVBAR (Desktop - Hidden) */}
      <nav className="hidden bg-[#2C1810] px-6 py-4 justify-between items-center sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src="/logo-barberia.webp"
            alt="Logo Barbería Monarca"
            className="hidden md:block w-10 h-10 object-contain"
          />
          <span className="hidden md:block text-white font-semibold text-lg font-['Playfair_Display'] tracking-wide underline decoration-yellow-800" onClick={() => navigate('/')}>
            Barbería Monarca
          </span>
        </div>

        <div className="hidden md:flex gap-3">
          <button
            onClick={() => {
              setAuthTab('login');
              setAuthModalOpen(true);
            }}
            className="border border-white/30 text-white/80 rounded-full px-4 py-2 text-sm hover:bg-white/10 transition-colors"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => navigate('/demo-barberia/turnos')}
            className="bg-[#8B6914] text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-yellow-700 transition-colors shadow-lg shadow-yellow-900/20"
          >
            Reservar turno
          </button>
        </div>
      </nav>

      {/* SECCIÓN 2 — PERFIL DE NEGOCIO (Estilo Inmersivo) */}
      <section className="w-full max-w-none px-0">
        {/* Banner con Logo Superpuesto */}
        <div className="relative">
          {/* Profile Icon - Fixed on Scroll (All views) */}
          <div className="fixed top-6 right-6 z-[60]" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-black/5 active:scale-95 transition-transform"
            >
              <UserCircle size={24} color="#2C1810" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-[#FAF7F2] rounded-2xl shadow-2xl border border-black/10 overflow-hidden z-[60]"
                >
                  <button
                    onClick={() => {
                      setAuthTab('login');
                      setAuthModalOpen(true);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left py-4 px-5 text-sm font-bold text-[#2C1810] hover:bg-black/5 transition-colors"
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={() => {
                      setAuthTab('signup');
                      setAuthModalOpen(true);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left py-4 px-5 text-sm font-bold text-[#2C1810] hover:bg-black/5 border-t border-black/5 transition-colors"
                  >
                    Registrarse
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <img
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200"
            alt="Barbería Banner"
            className="w-full h-40 md:h-64 object-cover shadow-lg"
          />

          {/* Logo Superpuesto */}
          <div className="max-w-3xl mx-auto px-6 relative">
            <div className="absolute -bottom-10 left-6 z-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-24 h-24 rounded-2xl bg-[#2C1810] border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center font-bold text-white text-3xl"
              >
                <img
                  src="/logo-barberia.webp"
                  alt="Logo"
                  className="w-full h-full object-cover scale-110"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bloque de Información Centrado */}
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-left">
          <h1 className="font-['Playfair_Display'] font-bold text-4xl text-gray-900">
            Barbería Monarca
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-yellow-500 text-sm">
              {"⭐".repeat(5)}
            </div>
            <span className="text-gray-400 text-sm font-medium">4.9 (127 reseñas en Google)</span>
          </div>

          <p className="mt-2 text-gray-400 text-sm">
            📍 Bahía Blanca, Buenos Aires
          </p>

          <div className="md:hidden mt-6 flex justify-center gap-4 px-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#2C1810] text-white shadow-md transition-all hover:opacity-90 active:scale-95"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://wa.me/5492914000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#2C1810] text-white shadow-md transition-all hover:opacity-90 active:scale-95"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>

          <div className="md:hidden mt-4 px-2">
            <button
              onClick={() => navigate('/demo-barberia/turnos')}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#2C1810] text-white py-4 font-['DM_Sans'] shadow-lg transition-transform active:scale-[0.98]"
            >
              <Calendar size={20} />
              <span className="font-bold">Reservar turno</span>
            </button>
          </div>

          {/* Botón Galería Colapsable - Mobile */}
          <div className="md:hidden mt-4 px-2">
            <button
              onClick={() => setOpenSection(openSection === 'galeria' ? null : 'galeria')}
              className="flex items-center justify-between w-full rounded-xl border border-[#8B6914] bg-transparent text-[#2C1810] py-4 px-4 font-['DM_Sans'] transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <Images size={20} />
                <span className="font-bold">Galería</span>
              </div>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${openSection === 'galeria' ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {openSection === 'galeria' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-3">
                    {/* Imagen Grande */}
                    <div
                      onClick={() => setLightbox(images[0])}
                      className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 cursor-pointer"
                    >
                      <img
                        src={images[0]}
                        alt="Barber Shop Style"
                        className="h-48 object-cover w-full"
                      />
                    </div>
                    {/* Grid 2x2 */}
                    <div className="grid grid-cols-2 gap-3">
                      {images.slice(1).map((src, i) => (
                        <div
                          key={i}
                          onClick={() => setLightbox(src)}
                          className="rounded-2xl overflow-hidden shadow-md border border-gray-100 cursor-pointer"
                        >
                          <img
                            src={src}
                            alt={`Barber detail ${i}`}
                            className="h-32 object-cover w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Botón Mapa Colapsable - Mobile */}
          <div className="md:hidden mt-4 px-2">
            <button
              onClick={() => setOpenSection(openSection === 'mapa' ? null : 'mapa')}
              className="flex items-center justify-between w-full rounded-xl border border-[#8B6914] bg-transparent text-[#2C1810] py-4 px-4 font-['DM_Sans'] transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span className="font-bold">¿Cómo llegar?</span>
              </div>
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${openSection === 'mapa' ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {openSection === 'mapa' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4">
                    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144!2d-62.2689!3d-38.7183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2zMzjCsDQzJzA2LjAiUyA2MsKwMTYnMDguMCJX!5e0!3m2!1ses!2sar!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación Barbería Monarca Mobile"
                      ></iframe>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="hidden md:block mt-6 text-[#6B5744] text-lg leading-relaxed font-medium">
            Barbería tradicional con estilo.
            Cortes clásicos y modernos, atención personalizada
            y ambiente único en el corazón de Bahía Blanca.
          </p>
        </div>
      </section>

      {/* SECCIÓN 4 — GALERÍA DE CARDS (Desktop) */}
      <section className="hidden md:block w-full max-w-none px-4 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          {/* Columna Izquierda — Imagen Alta */}
          <div className="col-span-1 md:row-span-2 h-full">
            <div
              onClick={() => setLightbox(images[0])}
              className="rounded-2xl overflow-hidden h-full shadow-lg border border-gray-100 cursor-pointer group"
            >
              <img
                src={images[0]}
                alt="Barber Shop Style"
                className="h-full min-h-[420px] object-cover w-full group-hover:scale-[1.08] transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>

          {/* Columna Derecha — Grid 2x2 */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-3">
            {images.slice(1).map((src, i) => (
              <div
                key={i}
                onClick={() => setLightbox(src)}
                className="rounded-2xl overflow-hidden shadow-md border border-gray-100 cursor-pointer group"
              >
                <img
                  src={src}
                  alt={`Barber detail ${i}`}
                  className="h-48 md:h-64 object-cover w-full group-hover:scale-[1.08] transition-transform duration-500 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 5 — CARD CTA TURNO (Desktop) */}
      <section className="hidden md:block w-full px-4 pt-12 pb-12">
        <div className="bg-[#2C1A0E] rounded-[2.5rem] p-12 lg:p-20 text-center shadow-2xl relative overflow-hidden border border-[#3D2515]">
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Reservá tu turno online
            </h2>

            <p className="text-white/60 text-base lg:text-xl mb-10 max-w-lg mx-auto font-medium leading-relaxed">
              Sin llamadas. Sin esperas. <br className="hidden sm:block" />
              Elegí el día y horario que más te convenga.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/demo-barberia/turnos')}
              className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold text-base lg:text-lg px-12 py-5 rounded-2xl transition-all shadow-xl shadow-black/40"
            >
              Sacar turno ahora →
            </motion.button>
          </div>

          {/* Decorative hint of light */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* SECCIÓN 6 — GOOGLE MAPS COMO CARD (Desktop) */}
      <section className="hidden md:block w-full bg-[#FAF7F2] pb-12">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h3 className="text-gray-900 font-semibold text-xl mb-1 flex items-center gap-2">
            <span>📍</span> Dónde encontrarnos
          </h3>
          <p className="text-gray-400 text-sm font-medium">
            Av. Alem 500, Bahía Blanca, Buenos Aires
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="w-full h-[500px] rounded-3xl overflow-hidden border border-gray-200 shadow-[0_12px_48px_rgba(0,0,0,0.08)] bg-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144!2d-62.2689!3d-38.7183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2zMzjCsDQzJzA2LjAiUyA2MsKwMTYnMDguMCJX!5e0!3m2!1ses!2sar!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Barbería Monarca"
            ></iframe>
          </div>
        </div>
      </section>

      {/* MODAL AUTH */}
      <AnimatePresence>
        {authModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAuthModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2.5rem] w-full max-w-sm p-8 relative shadow-2xl overflow-hidden"
            >
              {/* BOTÓN CERRAR */}
              <button
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors z-10"
              >
                ✕
              </button>

              {/* TABS */}
              <div className="flex gap-6 mb-8 border-b border-gray-100">
                <button
                  onClick={() => { setAuthTab('login'); setPasswordValue(''); }}
                  className={`pb-3 text-sm font-bold transition-all border-b-2 ${authTab === 'login' ? 'text-yellow-700 border-yellow-700' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => { setAuthTab('signup'); setPasswordValue(''); }}
                  className={`pb-3 text-sm font-bold transition-all border-b-2 ${authTab === 'signup' ? 'text-yellow-700 border-yellow-700' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                >
                  Registrarse
                </button>
              </div>

              {authTab === 'login' ? (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key="login-tab"
                >
                  <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display'] mb-2">Bienvenido de nuevo</h2>
                  <p className="text-gray-400 text-xs mb-8">Ingresá tus credenciales para continuar.</p>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">✉️</span>
                        <input
                          type="email" placeholder="tu@email.com"
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:border-yellow-700 focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contraseña</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">🔒</span>
                        <input
                          type="password" placeholder="••••••••"
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:border-yellow-700 focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-4 rounded-2xl mt-8 shadow-lg shadow-yellow-900/20 transition-all font-['DM_Sans']"
                  >
                    Iniciar sesión
                  </motion.button>

                  <p className="text-center text-sm text-gray-400 mt-6">
                    ¿No tenés cuenta? {' '}
                    <button onClick={() => setAuthTab('signup')} className="text-yellow-700 font-bold hover:underline">Registrate</button>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key="signup-tab"
                >
                  <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display'] mb-2">Crear cuenta</h2>
                  <p className="text-gray-400 text-xs mb-8">Completá tus datos para empezar.</p>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nombre completo *</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">👤</span>
                        <input
                          type="text" placeholder="Juan Pérez"
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:border-yellow-700 focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email *</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px]">✉️</span>
                          <input
                            type="email" placeholder="tu@email.com"
                            className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:border-yellow-700 focus:bg-white focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Teléfono *</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px]">📱</span>
                          <input
                            type="tel" placeholder="2910123456"
                            className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:border-yellow-700 focus:bg-white focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contraseña *</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px]">🔒</span>
                          <input
                            type="password" placeholder="••••••••"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:border-yellow-700 focus:bg-white focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirmar *</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px]">🔒</span>
                          <input
                            type="password" placeholder="••••••••"
                            className="w-full pl-8 pr-3 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:border-yellow-700 focus:bg-white focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* VALIDACIÓN PASS */}
                    {passwordValue.length > 0 && (
                      <div className="space-y-1.5 mt-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2 text-[10px] font-medium leading-none">
                          <span>{passwordReqs.length ? '✅' : '❌'}</span>
                          <span className={passwordReqs.length ? 'text-green-600' : 'text-red-400'}>Mínimo 8 caracteres</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-medium leading-none">
                          <span>{passwordReqs.upper ? '✅' : '❌'}</span>
                          <span className={passwordReqs.upper ? 'text-green-600' : 'text-red-400'}>Una mayúscula</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-medium leading-none">
                          <span>{passwordReqs.lower ? '✅' : '❌'}</span>
                          <span className={passwordReqs.lower ? 'text-green-600' : 'text-red-400'}>Una minúscula</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-medium leading-none">
                          <span>{passwordReqs.number ? '✅' : '❌'}</span>
                          <span className={passwordReqs.number ? 'text-green-600' : 'text-red-400'}>Un número</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-4 rounded-2xl mt-8 shadow-lg shadow-yellow-900/20 transition-all font-['DM_Sans']"
                  >
                    Crear cuenta
                  </motion.button>

                  <p className="text-center text-sm text-gray-400 mt-6">
                    ¿Ya tenés cuenta? {' '}
                    <button onClick={() => setAuthTab('login')} className="text-yellow-700 font-bold hover:underline">Iniciá sesión</button>
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {/* Botón cerrar */}
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-2xl flex items-center justify-center hover:bg-white/20 transition-colors z-[120]"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>

            {/* Imagen del Lightbox */}
            <motion.img
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={lightbox}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTONES FLOTANTES CÍRCULOS */}
      <div className="hidden md:flex fixed right-6 bottom-8 flex-col gap-4 z-50">
        {/* Instagram */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          href="https://www.instagram.com/synapse.ok/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-200 bg-[#2C1810]"
        >
          <svg className="w-5 h-5 text-[#8B6914]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          href="https://wa.me/5492920543376?text=Quiero%20mi%20sistema%20de%20turnos!%20Me%20gusto%20la%20demo%20de%20barberia!"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#8B6914] shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </motion.a>
      </div>
      {/* FOOTER MINIMALISTA */}
      <footer className="w-full bg-[#FAF7F2] border-t border-[#E5E0D8] py-6 text-center">
        <p className="text-gray-400 text-xs tracking-wide">
          Sistema de turnos por{" "}
          <a
            href="/"
            className="text-blue-500 font-semibold hover:text-blue-600 transition-colors"
          >
            Agendoo
          </a>
        </p>
      </footer>
    </div>
  );
};

export default DemoBarberia;
