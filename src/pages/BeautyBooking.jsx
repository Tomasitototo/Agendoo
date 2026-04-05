import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Calendar, ArrowLeft } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const BeautyBooking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // -- ESTADO DEL FLUJO --
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [servicesPerTime, setServicesPerTime] = useState({});
  const [userData, setUserData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    notas: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // -- DATOS HARDCODEADOS --
  const horariosDisponibles = {
    manana: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"],
    tarde: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]
  };

  const profesionales = [
    { id: 1, nombre: "Cualquiera", descripcion: "Te asignamos la primera disponible", foto: null, icono: "🎲" },
    { id: 2, nombre: "Valentina", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
    { id: 3, nombre: "Sofía", foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" },
    { id: 4, nombre: "Camila", foto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200" }
  ];

  const servicios = [
    { nombre: "Lashes clásico", precio: 8000 },
    { nombre: "Lashes volumen", precio: 12000 },
    { nombre: "Facial básico", precio: 6000 },
    { nombre: "Nail art", precio: 5000 }
  ];

  // -- TIMER PASO 5 --
  const [timeLeft, setTimeLeft] = useState(300);
  useEffect(() => {
    if (step === 5 && timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [step, timeLeft]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const diasMarzo = Array.from({ length: 31 }, (_, i) => i + 1);
  const disabledDays = [1, 8, 15, 22, 29, 4, 12];

  const totalPrice = Object.values(servicesPerTime).reduce((acc, s) => acc + (s?.precio || 0), 0);

  const canContinueStep4 = () => {
    const allServicesSelected = selectedTimes.every(t => servicesPerTime[t]);
    return allServicesSelected && userData.nombre && userData.telefono && userData.email;
  };

  const handleTimeToggle = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(prev => prev.filter(t => t !== time));
      const newServices = { ...servicesPerTime };
      delete newServices[time];
      setServicesPerTime(newServices);
    } else {
      setSelectedTimes(prev => [...prev, time]);
    }
  };

  return (
    <div className="min-h-screen font-['DM_Sans'] bg-[#FDF8F5] text-[#1A1A1A]">
      {/* NAVBAR (Desktop Only Bar) */}
      <nav className="hidden md:flex bg-[#1A1A1A] px-6 py-4 justify-between items-center sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/demo-beauty')}>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden p-1.5">
            <img 
              src="/LogoDemoBeauty.webp" 
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-white font-semibold text-lg font-['Cormorant_Garamond'] tracking-wide">Amara Beauty</span>
        </div>
        <div className="hidden md:flex gap-3">
          <button 
            onClick={() => { setAuthTab('login'); setAuthModalOpen(true); }}
            className="border border-white/20 text-white/80 rounded-full px-4 py-2 text-sm hover:bg-white/10 transition-colors"
          >
            Iniciar sesión
          </button>
          <button onClick={() => setStep(1)} className="bg-[#C9847A] text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-[#b8736a] transition-colors shadow-lg shadow-[#C9847A]/20">Reservar turno</button>
        </div>
      </nav>

      {/* IMMERSIVE NAVBAR ICONS (Mobile & Desktop Floating) */}
      <div className="md:hidden fixed top-6 left-6 z-[60]">
        <button 
          onClick={() => navigate('/demo-beauty')}
          className="flex items-center justify-center w-11 h-11 bg-white rounded-full shadow-lg border border-black/5 active:scale-95 transition-transform"
        >
          <ArrowLeft size={24} color="#1A1A1A" />
        </button>
      </div>

      <div className="md:hidden fixed top-6 right-6 z-[60]" ref={dropdownRef}>
        <button 
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-center w-11 h-11 bg-white rounded-full shadow-lg border border-black/5 active:scale-95 transition-transform"
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

      {/* HEADER */}
      <section className="w-full max-w-none px-0">
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200" alt="Beauty Banner" className="w-full h-48 md:h-64 object-cover shadow-lg beauty-banner-booking" />
          <div className="max-w-3xl mx-auto px-6 relative">
            <div className="absolute -bottom-10 left-6 z-10">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center">
                <img 
                  src="/LogoDemoBeauty.webp" 
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Banner Height Fix - Responsive */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 768px) {
            .beauty-banner-booking { height: 160px !important; }
          }
        `}} />
        
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-6 text-left">
          <h1 className="font-['Cormorant_Garamond'] font-bold text-4xl text-gray-900 italic">Amara Beauty</h1>
          <p className="mt-2 text-[#6B5744] text-xs md:text-sm italic">📍 Palermo, Buenos Aires</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className={`grid ${step === 1 ? 'grid-cols-1' : 'md:grid-cols-[240px_1fr]'} gap-8`}>
          {/* ASIDE SUMMARY */}
          {step > 1 && (
            <aside className="hidden md:block">
              <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-[10px] font-bold text-[#6B5744] tracking-[0.2em] mb-4">RESUMEN</h3>
                <div className="space-y-5">
                  {selectedDate && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-gray-300">FECHA</span>
                      <span className="text-sm font-semibold text-gray-800">{selectedDate.day} de Marzo</span>
                    </div>
                  )}
                  {selectedTimes.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-gray-300">HORARIO</span>
                      <div className="flex flex-wrap gap-1.5">{selectedTimes.map(t => <span key={t} className="bg-pink-50 text-[#C9847A] text-[11px] font-bold px-2 py-1 rounded-md border border-pink-100">{t}</span>)}</div>
                    </div>
                  )}
                  {selectedProfessional && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-gray-300">PROFESIONAL</span>
                      <span className="text-sm font-semibold text-gray-800">{selectedProfessional.nombre}</span>
                    </div>
                  )}
                  {totalPrice > 0 && (
                    <div className="pt-4 border-t border-gray-100 flex justify-between items-baseline">
                      <span className="text-xs font-bold text-gray-800">TOTAL</span>
                      <span className="text-xl font-bold text-[#C9847A] font-['Cormorant_Garamond']">${totalPrice}</span>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          )}

          <section>
            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm max-w-2xl mx-auto">
                  <h2 className="text-xl font-bold text-gray-800 font-['Cormorant_Garamond'] italic mb-8 text-center underline decoration-[#C9847A] underline-offset-8">Marzo 2026</h2>
                  <div className="grid grid-cols-7 gap-2">
                    {['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'].map(d => <span key={d} className="text-[10px] font-bold text-gray-300 text-center mb-4">{d}</span>)}
                    {Array.from({ length: 6 }).map((_, i) => <div key={i} />)}
                    {diasMarzo.map(day => {
                      const isPast = day < new Date().getDate();
                      const isDisabled = disabledDays.includes(day) || isPast;
                      const isSelected = selectedDate?.day === day;
                      return (
                        <button key={day} disabled={isDisabled} onClick={() => { setSelectedDate({ day, month: 'Marzo', year: 2026 }); setStep(2); }}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm transition-all ${isDisabled ? 'text-gray-200' : isSelected ? 'bg-[#C9847A] text-white font-bold' : 'bg-gray-50 text-gray-700 hover:bg-pink-50'}`}
                        >{day}</button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm max-w-2xl mx-auto">
                  <button onClick={() => setStep(1)} className="mb-6 text-[#C9847A] font-bold">← Volver</button>
                  <h2 className="text-2xl font-bold text-gray-900 font-['Cormorant_Garamond'] italic mb-8">Horarios disponibles</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {[...horariosDisponibles.manana, ...horariosDisponibles.tarde].map(t => {
                      const isSel = selectedTimes.includes(t);
                      return (
                        <button key={t} onClick={() => handleTimeToggle(t)}
                          className={`py-3 rounded-2xl border text-sm font-semibold transition-all ${isSel ? 'bg-[#C9847A] border-[#C9847A] text-white shadow-lg' : 'bg-white border-gray-100 text-[#6B5744] hover:border-[#C9847A]'}`}
                        >{t}</button>
                      );
                    })}
                  </div>
                  {selectedTimes.length > 0 && <button onClick={() => setStep(3)} className="w-full mt-10 bg-[#C9847A] text-white font-bold py-5 rounded-2xl shadow-xl shadow-[#C9847A]/20 transition-all">Continuar →</button>}
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm max-w-2xl mx-auto">
                  <button onClick={() => setStep(2)} className="mb-6 text-[#C9847A] font-bold">← Volver</button>
                  <h2 className="text-2xl font-bold text-gray-900 font-['Cormorant_Garamond'] italic mb-10">¿Con quién querés reservar?</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {profesionales.map(p => (
                      <button key={p.id} onClick={() => { setSelectedProfessional(p); setStep(4); }} className="text-center group">
                        <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-gray-100 group-hover:border-[#C9847A] transition-all">
                          {p.foto ? <img src={p.foto} alt={p.nombre} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#FDF8F5] flex items-center justify-center text-3xl">{p.icono}</div>}
                        </div>
                        <p className="font-bold text-gray-800 text-sm">{p.nombre}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm max-w-2xl mx-auto">
                  <button onClick={() => setStep(3)} className="mb-6 text-[#C9847A] font-bold">← Volver</button>
                  <h2 className="text-2xl font-bold text-gray-900 font-['Cormorant_Garamond'] italic mb-8">Servicios y Datos</h2>
                  <div className="space-y-4 mb-10">
                    {selectedTimes.map(time => (
                      <div key={time} className="bg-[#FDF8F5] rounded-3xl p-6 border border-pink-100">
                        <p className="text-xs font-bold text-[#C9847A] mb-4">SERVICIO PARA {time} HS</p>
                        <div className="grid grid-cols-2 gap-2">
                          {servicios.map(s => (
                            <button key={s.nombre} onClick={() => setServicesPerTime(prev => ({ ...prev, [time]: s }))}
                              className={`p-3 text-left rounded-xl border transition-all ${servicesPerTime[time]?.nombre === s.nombre ? 'border-[#C9847A] bg-white shadow-sm' : 'border-gray-100 bg-white/50'}`}
                            >
                              <p className="text-[11px] font-bold">{s.nombre}</p>
                              <p className="text-[10px] text-[#6B5744]">${s.precio}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 bg-[#FDF8F5] p-6 rounded-3xl mb-8">
                    <input type="text" placeholder="Nombre completo" value={userData.nombre} onChange={e => setUserData({...userData, nombre: e.target.value})} className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-sm focus:border-[#C9847A] outline-none" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="tel" placeholder="Teléfono" value={userData.telefono} onChange={e => setUserData({...userData, telefono: e.target.value})} className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-sm focus:border-[#C9847A] outline-none" />
                      <input type="email" placeholder="Email" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} className="w-full p-4 bg-white border border-gray-100 rounded-2xl text-sm focus:border-[#C9847A] outline-none" />
                    </div>
                  </div>
                  <button disabled={!canContinueStep4()} onClick={() => setStep(5)} className={`w-full py-5 rounded-2xl font-bold transition-all shadow-xl ${canContinueStep4() ? 'bg-[#C9847A] text-white' : 'bg-gray-100 text-gray-300'}`}>Confirmar →</button>
                </motion.div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm max-w-2xl mx-auto">
                  <button onClick={() => setStep(4)} className="mb-6 text-[#C9847A] font-bold">← Volver</button>
                  <h2 className="text-2xl font-bold text-gray-900 font-['Cormorant_Garamond'] italic mb-8">Confirmar reserva</h2>
                  <div className="bg-[#1A1A1A] text-white p-8 rounded-3xl mb-8 text-center shadow-2xl">
                    <p className="text-[#C9847A] font-bold text-xl mb-2 font-['Cormorant_Garamond']italic">Total: ${totalPrice}</p>
                    <p className="text-white/40 text-xs mb-8">Pagá ahora para asegurar tu lugar. Tiempo: {formatTime(timeLeft)}</p>
                    <button onClick={() => setShowSuccessModal(true)} className="w-full bg-[#C9847A] py-5 rounded-2xl font-bold text-white shadow-xl">PAGAR CON MERCADO PAGO</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      <footer className="py-10 text-center border-t border-gray-100 bg-[#FDF8F5]">
        <p className="text-[#6B5744] text-xs">Sistema de turnos por <a href="/" className="text-[#C9847A] font-bold">Agendoo</a></p>
      </footer>

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2.5rem] p-12 text-center max-w-sm w-full shadow-2xl border border-gray-100">
              <div className="w-20 h-20 bg-pink-50 rounded-2xl overflow-hidden flex items-center justify-center mx-auto mb-6">
                <img src="/LogoDemoBeauty.webp" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="font-['Cormorant_Garamond'] italic font-bold text-3xl text-gray-900 mb-4">¡Turno confirmado!</h2>
              <p className="text-[#6B5744] text-sm mb-10">Te enviamos la confirmación por email. ¡Nos vemos en <strong>Amara Beauty</strong>!</p>
              <button onClick={() => navigate('/demo-beauty')} className="w-full bg-[#C9847A] text-white font-bold py-4 rounded-2xl">Volver al inicio</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  onClick={() => { setAuthTab('login'); }}
                  className={`pb-3 text-sm font-bold transition-all border-b-2 ${authTab === 'login' ? 'text-[#C9847A] border-[#C9847A]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                >Iniciar sesión</button>
                <button 
                  onClick={() => { setAuthTab('signup'); }}
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
                    <input type="password" placeholder="Contraseña" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:border-[#C9847A] focus:outline-none transition-all" />
                  </div>
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full bg-[#C9847A] hover:bg-[#b8736a] text-white font-bold py-4 rounded-2xl mt-8 shadow-lg shadow-[#C9847A]/20 transition-all font-['DM_Sans']">Crear cuenta</motion.button>
                </motion.div>
              )}
            </motion.div>
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

export default BeautyBooking;
