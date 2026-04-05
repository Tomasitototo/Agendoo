import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Calendar, Images, ChevronDown, MapPin } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const DemoBeauty = () => {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'signup'
  const [passwordValue, setPasswordValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const dropdownRef = useRef(null);

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
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200"
  ];

  return (
    <div className="min-h-screen font-['DM_Sans'] bg-[#FDF8F5] text-[#1A1A1A]">
      {/* SECCIÓN 1 — NAVBAR (Minimalist & Floating) */}
      <div className="fixed top-6 right-6 z-[60]" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-center w-11 h-11 bg-white rounded-full shadow-lg border border-black/5 hover:scale-105 transition-all active:scale-95"
        >
          <UserCircle size={28} color="#1A1A1A" />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-[#FDF8F5] rounded-2xl shadow-2xl overflow-hidden z-50 border border-[#1A1A1A]/20"
            >
              <button
                onClick={() => { setAuthTab('login'); setAuthModalOpen(true); setDropdownOpen(false); }}
                className="w-full text-left py-4 px-5 text-sm font-bold text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-colors font-['DM_Sans']"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => { setAuthTab('signup'); setAuthModalOpen(true); setDropdownOpen(false); }}
                className="w-full text-left py-4 px-5 text-sm font-bold text-[#1A1A1A] hover:bg-[#1A1A1A]/5 border-t border-[#1A1A1A]/10 transition-colors font-['DM_Sans']"
              >
                Registrarse
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SECCIÓN 2 — PERFIL DE NEGOCIO */}
      <section className="w-full max-w-none px-0">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200"
            alt="Beauty Banner"
            className="w-full h-40 md:h-64 object-cover shadow-lg"
          />

          <div className="max-w-3xl mx-auto px-6 relative">
            <div className="absolute -bottom-10 left-6 z-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center font-bold text-white text-3xl"
              >
                <img
                  src="/LogoDemoBeauty.webp"
                  alt="Logo Amara Beauty"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-left">
          <h1 className="font-['Cormorant_Garamond'] font-bold text-5xl text-gray-900 italic">
            Amara Beauty
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-[#C9847A] text-sm">
              {"⭐".repeat(5)}
            </div>
            <span className="text-[#6B5744] text-sm font-medium">5.0 (84 reseñas)</span>
          </div>

          <p className="mt-2 text-[#6B5744] text-sm">
            📍 Palermo, Buenos Aires
          </p>

          {/* Mobile Block (md:hidden) */}
          <div className="md:hidden mt-8 space-y-6">
            {/* A) Redes Sociales */}
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/agendoo.ok/" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#1A1A1A] text-white shadow-sm transition-transform active:scale-90"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://wa.me/5492914000000" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-[#1A1A1A] text-white shadow-sm transition-transform active:scale-90"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>

            {/* B) Botón Reservar Turno */}
            <button
              onClick={() => navigate('/demo-beauty/turnos')}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#1A1A1A] text-white py-4 px-4 font-['DM_Sans'] font-bold shadow-lg transition-transform active:scale-[0.98]"
            >
              <Calendar size={20} />
              <span>Reservar turno</span>
            </button>

            {/* C) Botón Galería Colapsable */}
            <div>
              <button
                onClick={() => setOpenSection(openSection === 'galeria' ? null : 'galeria')}
                className="flex items-center justify-between w-full rounded-xl border border-[#C9847A] bg-transparent text-[#1A1A1A] py-4 px-4 font-['DM_Sans'] transition-all active:scale-[0.98]"
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
                      <div onClick={() => setLightbox(images[0])} className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 cursor-pointer">
                        <img src={images[0]} alt="Gallery 1" className="h-48 object-cover w-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {images.slice(1, 5).map((src, i) => (
                          <div key={i} onClick={() => setLightbox(src)} className="rounded-2xl overflow-hidden shadow-md border border-gray-100 cursor-pointer">
                            <img src={src} alt={`Beauty detail ${i}`} className="h-32 object-cover w-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* D) Botón Cómo llegar Colapsable */}
            <div>
              <button
                onClick={() => setOpenSection(openSection === 'mapa' ? null : 'mapa')}
                className="flex items-center justify-between w-full rounded-xl border border-[#C9847A] bg-transparent text-[#1A1A1A] py-4 px-4 font-['DM_Sans'] transition-all active:scale-[0.98]"
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
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.52!2d-58.397!3d-34.5915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM1JzI5LjQiUyA1OMKwMjMnNDkuMiJX!5e0!3m2!1ses!2sar!4v1234567890"
                          width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                          title="Ubicación Amara Beauty Mobile"
                        ></iframe>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <p className="hidden md:block mt-6 text-[#1A1A1A] text-xl leading-relaxed font-light font-['Cormorant_Garamond']">
            Centro de estética y belleza.
            Tratamientos faciales, lashes y nail art
            en un ambiente íntimo y sofisticado.
          </p>
        </div>
      </section>

      {/* SECCIÓN 4 — GALERÍA (Desktop) */}
      <section className="hidden md:block w-full max-w-none px-4 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          <div className="col-span-1 md:row-span-2 h-full">
            <div
              onClick={() => setLightbox(images[0])}
              className="rounded-2xl overflow-hidden h-full shadow-lg border border-gray-100 cursor-pointer group"
            >
              <img
                src={images[0]}
                alt="Beauty Style"
                className="h-full min-h-[420px] object-cover w-full group-hover:scale-[1.08] transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-3">
            {images.slice(1, 5).map((src, i) => (
              <div
                key={i}
                onClick={() => setLightbox(src)}
                className="rounded-2xl overflow-hidden shadow-md border border-gray-100 cursor-pointer group"
              >
                <img
                  src={src}
                  alt={`Beauty detail ${i}`}
                  className="h-48 md:h-64 object-cover w-full group-hover:scale-[1.08] transition-transform duration-500 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 5 — CARD CTA (Desktop) */}
      <section className="hidden md:block w-full px-4 pt-12 pb-12">
        <div className="bg-[#1A1A1A] rounded-[2.5rem] p-12 lg:p-20 text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="font-['Cormorant_Garamond'] text-5xl lg:text-6xl italic font-bold text-white mb-4 leading-tight">
              Tu turno de brillar
            </h2>

            <p className="text-white/60 text-base lg:text-xl mb-10 max-w-lg mx-auto font-medium leading-relaxed">
              Reservá online en segundos.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/demo-beauty/turnos')}
              className="bg-[#C9847A] hover:bg-[#b8736a] text-white font-bold text-base lg:text-lg px-12 py-5 rounded-2xl transition-all shadow-xl shadow-black/40"
            >
              Sacar turno ahora →
            </motion.button>
          </div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9847A]/10 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* SECCIÓN 6 — MAPA (Desktop) */}
      <section className="hidden md:block w-full bg-[#FDF8F5] pb-20">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h3 className="text-gray-900 font-bold text-2xl mb-1 flex items-center gap-2 font-['Cormorant_Garamond'] italic">
            <span>📍</span> Dónde encontrarnos
          </h3>
          <p className="text-[#6B5744] text-sm font-medium">
            Av. Santa Fe 1200, Palermo, Buenos Aires
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="w-full h-[500px] rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-[0_12px_48px_rgba(0,0,0,0.06)] bg-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.52!2d-58.397!3d-34.5915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM1JzI5LjQiUyA1OMKwMjMnNDkuMiJX!5e0!3m2!1ses!2sar!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Amara Beauty"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#FDF8F5] border-t border-[#E5E0D8] py-8 text-center">
        <p className="text-[#6B5744] text-xs tracking-wide">
          Sistema de turnos por{" "}
          <a href="/" className="text-[#C9847A] font-semibold hover:underline transition-colors">Agendoo</a>
        </p>
      </footer>

      {/* MODAL AUTH */}
      <AnimatePresence>
        {authModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setAuthModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2.5rem] w-full max-w-sm p-8 relative shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors z-10"
              >✕</button>

              <div className="flex gap-6 mb-8 border-b border-gray-100">
                <button
                  onClick={() => { setAuthTab('login'); setPasswordValue(''); }}
                  className={`pb-3 text-sm font-bold transition-all border-b-2 ${authTab === 'login' ? 'text-[#C9847A] border-[#C9847A]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                >Iniciar sesión</button>
                <button
                  onClick={() => { setAuthTab('signup'); setPasswordValue(''); }}
                  className={`pb-3 text-sm font-bold transition-all border-b-2 ${authTab === 'signup' ? 'text-[#C9847A] border-[#C9847A]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                >Registrarse</button>
              </div>

              {authTab === 'login' ? (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-2xl font-bold text-gray-900 font-['Cormorant_Garamond'] italic mb-2">Bienvenido de nuevo</h2>
                  <p className="text-[#6B5744] text-xs mb-8">Ingresá tus credenciales para continuar.</p>
                  <div className="space-y-4">
                    <input type="email" placeholder="tu@email.com" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:border-[#C9847A] focus:outline-none transition-all" />
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:border-[#C9847A] focus:outline-none transition-all" />
                  </div>
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full bg-[#C9847A] hover:bg-[#b8736a] text-white font-bold py-4 rounded-2xl mt-8 shadow-lg shadow-[#C9847A]/20 transition-all font-['DM_Sans']">Iniciar sesión</motion.button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                  <h2 className="text-2xl font-bold text-gray-900 font-['Cormorant_Garamond'] italic mb-2">Crear cuenta</h2>
                  <p className="text-[#6B5744] text-xs mb-8">Completá tus datos para empezar.</p>
                  <div className="space-y-4">
                    <input type="text" placeholder="Juan Pérez" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:border-[#C9847A] focus:outline-none transition-all" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="email" placeholder="Email" className="w-full px-3 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:border-[#C9847A] focus:outline-none transition-all" />
                      <input type="tel" placeholder="Teléfono" className="w-full px-3 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:border-[#C9847A] focus:outline-none transition-all" />
                    </div>
                    <input type="password" placeholder="Contraseña" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:border-[#C9847A] focus:outline-none transition-all" />
                  </div>
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full bg-[#C9847A] hover:bg-[#b8736a] text-white font-bold py-4 rounded-2xl mt-8 shadow-lg shadow-[#C9847A]/20 transition-all font-['DM_Sans']">Crear cuenta</motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <button className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-2xl flex items-center justify-center hover:bg-white/20 transition-colors z-[120]" onClick={() => setLightbox(null)}>✕</button>
            <motion.img initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} src={lightbox} className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* BOTONES FLOTANTES CÍRCULOS (Desktop Only) */}
      <div className="hidden md:flex fixed right-6 bottom-8 flex-col gap-4 z-50">
        {/* Instagram */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          href="https://www.instagram.com/agendoo.ok/" target="_blank" rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 bg-[#1A1A1A]"
        >
          <FaInstagram size={20} className="text-[#C9847A]" />
        </motion.a>
        {/* WhatsApp */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          href="https://wa.me/5492914000000" target="_blank" rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#C9847A] shadow-lg transition-all duration-200"
        >
          <FaWhatsapp size={20} />
        </motion.a>
      </div>
    </div>
  );
};

export default DemoBeauty;
