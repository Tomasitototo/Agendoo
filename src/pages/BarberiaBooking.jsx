import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BarberiaBooking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // -- ESTADO DEL FLUJO --
  const [selectedDate, setSelectedDate] = useState(null); // { day: number, month: string, year: number }
  const [selectedTimes, setSelectedTimes] = useState([]); // Array de strings ["10:00", "11:30"]
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [servicesPerTime, setServicesPerTime] = useState({}); // { "10:00": { name, price }, ... }
  const [userData, setUserData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    notas: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // -- DATOS HARDCODEADOS --
  const horariosDisponibles = {
    manana: ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"],
    tarde: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]
  };

  const profesionales = [
    { id: 1, nombre: "Cualquiera", descripcion: "Te asignamos el primero disponible", foto: null, icono: "🎲" },
    { id: 2, nombre: "Marcos", foto: "/Marcos.png" },
    { id: 3, nombre: "Diego", foto: "/Diego.png" },
    { id: 4, nombre: "Sofia", foto: "/Sofia.png" }
  ];

  const servicios = [
    { nombre: "Corte", precio: 5000 },
    { nombre: "Corte + Barba", precio: 8000 },
    { nombre: "Barba", precio: 4000 }
  ];

  // -- TIMER PASO 5 --
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  useEffect(() => {
    if (step === 5 && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // -- LÓGICA DE CALENDARIO (MARZO 2026) --
  const diasMarzo = Array.from({ length: 31 }, (_, i) => i + 1);
  const disabledDays = [1, 8, 15, 22, 29, 4, 12, 19]; // Domingos + algunos random

  // -- CALCULOS --
  const totalPrice = Object.values(servicesPerTime).reduce((acc, s) => acc + (s?.precio || 0), 0);

  // -- HELPERS --
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
    <div className="min-h-screen font-['DM_Sans'] bg-[#FAF7F2] text-[#1A1A1A]">
      {/* SECCIÓN 1 — NAVBAR (Exactamente igual a DemoBarberia) */}
      <nav className="bg-[#2C1810] px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/demo-barberia')}>
          <img src="/logo-barberia.png" alt="Logo" className="w-10 h-10 object-contain" />
          <span className="text-white font-semibold text-lg font-['Playfair_Display'] tracking-wide">Barbería Monarca</span>
        </div>
        
        <div className="flex gap-3">
          <button className="border border-white/30 text-white/80 rounded-full px-4 py-2 text-sm hover:bg-white/10 transition-colors">
            Iniciar sesión
          </button>
          <button 
            onClick={() => setStep(1)}
            className="bg-[#8B6914] text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-yellow-700 transition-colors shadow-lg shadow-yellow-900/20"
          >
            Reservar turno
          </button>
        </div>
      </nav>

      {/* SECCIÓN 2 — PERFIL DE NEGOCIO (Exactamente igual a DemoBarberia) */}
      <section className="w-full max-w-none px-0">
        {/* Banner con Logo Superpuesto */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200" 
            alt="Barbería Banner"
            className="w-full h-48 md:h-64 object-cover shadow-lg"
          />
          
          {/* Logo Superpuesto */}
          <div className="max-w-3xl mx-auto px-6 relative">
            <div className="absolute -bottom-10 left-6 z-10">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#2C1810] border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center font-bold text-white text-3xl"
              >
                <img 
                  src="/logo-barberia.png" 
                  alt="Logo"
                  className="w-full h-full object-cover scale-110"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bloque de Información Centrado */}
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-6 text-left">
          <h1 className="font-['Playfair_Display'] font-bold text-3xl md:text-4xl text-gray-900">
            Barbería Monarca
          </h1>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-yellow-500 text-sm">
              {"⭐".repeat(5)}
            </div>
            <span className="text-gray-400 text-xs md:text-sm font-medium">4.9 (127 reseñas en Google)</span>
          </div>

          <p className="mt-2 text-gray-400 text-xs md:text-sm">
            📍 Bahía Blanca, Buenos Aires
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        <div className={`grid ${step === 1 ? 'grid-cols-1' : 'md:grid-cols-[240px_1fr]'} gap-8`}>
          
          {/* COLUMNA IZQUIERDA: RESUMEN (Sticky) */}
          {step > 1 && (
            <aside className="hidden md:block">
              <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-4">TU RESERVA</h3>
                
                <div className="space-y-5">
                  {selectedDate && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-gray-400 capitalize">📅 FECHA</span>
                      <span className="text-sm font-semibold text-gray-800">{selectedDate.day} de Marzo, 2026</span>
                    </div>
                  )}

                  {selectedTimes.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-gray-400 capitalize">🕐 HORARIO</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTimes.sort().map(t => (
                          <span key={t} className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-1 rounded-md border border-blue-100">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProfessional && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-gray-400 capitalize">👤 PROFESIONAL</span>
                      <span className="text-sm font-semibold text-gray-800">{selectedProfessional.nombre}</span>
                    </div>
                  )}

                  {selectedTimes.some(t => servicesPerTime[t]) && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-gray-400 capitalize">🔧 SERVICIO</span>
                      <div className="space-y-1">
                        {selectedTimes.map(t => servicesPerTime[t] && (
                          <div key={t} className="text-[11px] text-gray-600 flex justify-between">
                            <span>• {servicesPerTime[t].nombre}</span>
                            <span className="font-bold">${servicesPerTime[t].precio}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {totalPrice > 0 && (
                    <div className="pt-4 border-t border-gray-100 flex justify-between items-baseline">
                      <span className="text-xs font-bold text-gray-800">TOTAL</span>
                      <span className="text-xl font-black text-yellow-700 font-['Playfair_Display']">${totalPrice}</span>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          )}

          {/* COLUMNA DERECHA: PASOS */}
          <section>
            <AnimatePresence mode="wait">
              
              {/* PASO 1 — CALENDARIO */}
              {step === 1 && (
                <motion.div 
                  key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm max-w-2xl mx-auto"
                >
                  <div className="flex justify-between items-center mb-8">
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400">←</button>
                    <h2 className="text-xl font-bold text-gray-800 font-['Playfair_Display']">Marzo de 2026</h2>
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400">→</button>
                  </div>

                  <div className="grid grid-cols-7 text-center mb-4">
                    {['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'].map(d => (
                      <span key={d} className="text-[10px] font-bold text-gray-300 tracking-widest">{d}</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {/* Padding for March 1st (starts on Sunday = 6 empty slots) */}
                    {Array.from({ length: 6 }).map((_, i) => <div key={`empty-${i}`} />)}
                    
                    {diasMarzo.map(day => {
                      const todayObj = new Date();
                      const isPast = day < todayObj.getDate(); 
                      const isDisabled = disabledDays.includes(day) || isPast;
                      const isToday = day === todayObj.getDate();
                      const isSelected = selectedDate?.day === day;

                      return (
                        <button
                          key={day}
                          disabled={isDisabled}
                          onClick={() => {
                            setSelectedDate({ day, month: 'Marzo', year: 2026 });
                            setStep(2);
                          }}
                          className={`
                            w-12 h-12 rounded-2xl flex items-center justify-center text-sm transition-all duration-200
                            ${isDisabled ? 'text-gray-200 cursor-not-allowed' : 'text-gray-700 hover:bg-yellow-50 hover:text-yellow-800'}
                            ${isToday && !isSelected ? 'border-2 border-yellow-700 text-yellow-700 font-black' : ''}
                            ${isSelected ? 'bg-yellow-700 text-white font-bold shadow-lg shadow-yellow-900/20' : ''}
                            ${!isDisabled && !isSelected && !isToday ? 'bg-gray-50' : ''}
                          `}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* PASO 2 — HORARIOS */}
              {step === 2 && (
                <motion.div 
                  key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm max-w-2xl mx-auto"
                >
                  <button onClick={() => setStep(1)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 mb-6 group transition-colors">
                    <span className="text-gray-400 group-hover:text-gray-600">←</span>
                  </button>
                  
                  <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display'] mb-2">Elegí tu horario</h2>
                  <p className="text-gray-400 text-sm mb-8">Podés seleccionar más de un turno si buscás servicios largos.</p>

                  <div className="space-y-8">
                    <div>
                      <h3 className="flex items-center gap-2 text-xs font-black text-gray-400 tracking-widest uppercase mb-4">☀️ Mañana</h3>
                      <div className="flex flex-wrap gap-2">
                        {horariosDisponibles.manana.map(t => {
                          const isSel = selectedTimes.includes(t);
                          return (
                            <button
                              key={t}
                              onClick={() => handleTimeToggle(t)}
                              className={`
                                px-5 py-3 rounded-2xl border text-sm font-semibold transition-all
                                ${isSel ? 'bg-yellow-700 border-yellow-700 text-white shadow-lg' : 'bg-white border-gray-200 text-gray-600 hover:border-yellow-700 hover:text-yellow-700'}
                              `}
                            >
                              {isSel ? `✓ ${t}` : t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="flex items-center gap-2 text-xs font-black text-gray-400 tracking-widest uppercase mb-4">🌙 Tarde</h3>
                      <div className="flex flex-wrap gap-2">
                        {horariosDisponibles.tarde.map(t => {
                          const isSel = selectedTimes.includes(t);
                          return (
                            <button
                              key={t}
                              onClick={() => handleTimeToggle(t)}
                              className={`
                                px-5 py-3 rounded-2xl border text-sm font-semibold transition-all
                                ${isSel ? 'bg-yellow-700 border-yellow-700 text-white shadow-lg' : 'bg-white border-gray-200 text-gray-600 hover:border-yellow-700 hover:text-yellow-700'}
                              `}
                            >
                              {isSel ? `✓ ${t}` : t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {selectedTimes.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      onClick={() => setStep(3)}
                      className="w-full mt-12 bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-yellow-900/20 transition-all flex items-center justify-center gap-2"
                    >
                      Continuar ({selectedTimes.length} turno/s) →
                    </motion.button>
                  )}
                </motion.div>
              )}

              {/* PASO 3 — SELECCIÓN DE PROFESIONAL */}
              {step === 3 && (
                <motion.div 
                  key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm max-w-2xl mx-auto"
                >
                  <button onClick={() => setStep(2)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 mb-6 group transition-colors">
                    <span className="text-gray-400 group-hover:text-gray-600">←</span>
                  </button>

                  <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display'] mb-2">¿Con quién querés reservar?</h2>
                  <p className="text-gray-400 text-sm mb-8">Todos nuestros barberos están capacitados para todos los servicios.</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {profesionales.map(p => {
                      const isSel = selectedProfessional?.id === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            setSelectedProfessional(p);
                            setStep(4);
                          }}
                          className={`
                            group bg-white border-2 rounded-[2rem] p-4 transition-all duration-300
                            ${isSel ? 'border-yellow-700 bg-yellow-50' : 'border-gray-50 hover:border-yellow-200'}
                          `}
                        >
                          <div className={`w-20 h-20 rounded-2xl mx-auto mb-4 overflow-hidden shadow-md group-hover:scale-105 transition-transform ${!p.foto ? 'bg-gray-100 flex items-center justify-center' : ''}`}>
                            {p.foto ? (
                              <img src={p.foto} alt={p.nombre} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-4xl">{p.icono}</span>
                            )}
                          </div>
                          <p className="font-bold text-gray-800 text-sm">{p.nombre}</p>
                          {p.descripcion && <p className="text-[10px] text-gray-400 mt-1 leading-tight">{p.descripcion}</p>}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* PASO 4 — SERVICIOS Y DATOS */}
              {step === 4 && (
                <motion.div 
                  key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm max-w-2xl mx-auto"
                >
                  <button onClick={() => setStep(3)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 mb-6 group transition-colors">
                    <span className="text-gray-400 group-hover:text-gray-600">←</span>
                  </button>

                  <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display'] mb-8">Tus Datos y Servicios</h2>

                  <div className="space-y-4 mb-10">
                    <h3 className="text-xs font-black text-gray-400 tracking-widest uppercase ml-1">Servicios por turno</h3>
                    {selectedTimes.sort().map(time => (
                      <div key={time} className="bg-gray-50 rounded-[2rem] border border-gray-100 p-6 shadow-sm overflow-hidden relative">
                        <div className="flex justify-between items-center mb-6">
                          <span className="bg-white text-blue-700 text-[11px] font-bold px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">🕐 {time} hs</span>
                          {servicesPerTime[time] && (
                            <span className="text-yellow-700 font-black text-xl font-['Playfair_Display']">${servicesPerTime[time].precio}</span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {servicios.map(s => {
                            const isSel = servicesPerTime[time]?.nombre === s.nombre;
                            return (
                              <button
                                key={s.nombre}
                                onClick={() => setServicesPerTime(prev => ({ ...prev, [time]: s }))}
                                className={`
                                  flex flex-col text-left p-4 rounded-2xl border transition-all duration-200
                                  ${isSel ? 'border-yellow-700 bg-white shadow-md' : 'border-gray-100 bg-white/50 hover:border-yellow-200'}
                                `}
                              >
                                <span className={`text-sm font-bold ${isSel ? 'text-yellow-800' : 'text-gray-700'}`}>{s.nombre}</span>
                                <span className="text-xs text-gray-400 mt-1">${s.precio}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-[2rem] border border-gray-100 p-8 shadow-sm mb-8">
                    <h3 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-6 flex items-center gap-2">📋 Tus datos</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Nombre completo *</label>
                        <input 
                          type="text" placeholder="Tu nombre"
                          value={userData.nombre} onChange={e => setUserData({...userData, nombre: e.target.value})}
                          className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:border-yellow-700 focus:outline-none transition-all shadow-sm"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Teléfono *</label>
                          <input 
                            type="tel" placeholder="2910123456"
                            value={userData.telefono} onChange={e => setUserData({...userData, telefono: e.target.value})}
                            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:border-yellow-700 focus:outline-none transition-all shadow-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Email *</label>
                          <input 
                            type="email" placeholder="hola@ejemplo.com"
                            value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})}
                            className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:border-yellow-700 focus:outline-none transition-all shadow-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">Notas (opcional)</label>
                        <textarea 
                          rows="3" placeholder="Alguna indicación especial..."
                          value={userData.notas} onChange={e => setUserData({...userData, notas: e.target.value})}
                          className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:border-yellow-700 focus:outline-none transition-all resize-none shadow-sm"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={!canContinueStep4()}
                    onClick={() => setStep(5)}
                    className={`
                      w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-2
                      ${canContinueStep4() ? 'bg-yellow-700 hover:bg-yellow-600 text-white shadow-yellow-900/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                    `}
                  >
                    Confirmar datos →
                  </button>
                </motion.div>
              )}

              {/* PASO 5 — CONFIRMAR PAGO */}
              {step === 5 && (
                <motion.div 
                  key="step5" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm max-w-2xl mx-auto"
                >
                  <button onClick={() => setStep(4)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 mb-6 group transition-colors">
                    <span className="text-gray-400 group-hover:text-gray-600">←</span>
                  </button>

                  <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display'] mb-6">💳 Confirmar Pago</h2>

                  {/* TIMER */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-6 mb-8 flex justify-between items-center relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-sm font-bold text-yellow-800">⏰ Tiempo restante: {formatTime(timeLeft)}</p>
                      <p className="text-xs text-yellow-700/60 mt-0.5">Los turnos se liberarán si no pagás a tiempo.</p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    {/* RESUMEN DE TURNOS */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                      <h3 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-6">📋 Resumen de turnos</h3>
                      <div className="space-y-4">
                        {selectedTimes.map(t => (
                          <div key={t} className="flex justify-between items-center border-l-4 border-yellow-700 pl-4 py-1">
                            <div>
                              <p className="text-sm font-black text-gray-800">🕐 {t} hs</p>
                              <p className="text-xs text-gray-400">✂️ {servicesPerTime[t]?.nombre}</p>
                            </div>
                            <span className="font-bold text-gray-700 font-['Playfair_Display']">${servicesPerTime[t]?.precio}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-400 uppercase">TOTAL A PAGAR</span>
                        <span className="text-3xl font-black text-yellow-800 font-['Playfair_Display']">${totalPrice}</span>
                      </div>
                    </div>

                    {/* TUS DATOS */}
                    <div className="bg-gray-50 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 justify-between items-center border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-xl shadow-sm">👤</div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{userData.nombre}</p>
                          <p className="text-xs text-gray-400">{userData.email} | {userData.telefono}</p>
                        </div>
                      </div>
                      <button onClick={() => setStep(4)} className="text-xs font-bold text-yellow-700 hover:text-yellow-800 px-4 py-2 bg-yellow-100 rounded-full transition-colors">Editar datos</button>
                    </div>

                    <button
                      onClick={() => setShowSuccessModal(true)}
                      className="w-full bg-yellow-700 hover:bg-yellow-600 text-white font-black py-6 rounded-3xl text-xl tracking-widest shadow-2xl shadow-yellow-900/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                    >
                      💳 PAGAR CON MERCADO PAGO
                    </button>
                    <p className="text-center text-[10px] text-gray-400 font-medium">Pago procesado de forma segura por Mercado Pago</p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </section>

        </div>
      </main>

      {/* FOOTER MINIMALISTA (Igual a DemoBarberia) */}
      <footer className="w-full bg-[#FAF7F2] border-t border-[#E5E0D8] py-8 text-center mt-20">
        <p className="text-gray-400 text-xs tracking-wide">
          Sistema de turnos por{" "}
          <a href="/" className="text-blue-500 font-semibold hover:text-blue-600 transition-colors">Agendoo</a>
        </p>
      </footer>

      {/* MODAL DE ÉXITO */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-12 text-center max-w-sm w-full shadow-2xl border border-gray-100"
            >
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-6xl">✅</span>
              </div>
              <h2 className="font-['Playfair_Display'] font-bold text-3xl text-gray-900 mb-4">¡Turno confirmado!</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-10">
                Te enviamos la confirmación por email y WhatsApp. <br />
                ¡Nos vemos en <strong>Barbería Monarca</strong>!
              </p>
              <button
                onClick={() => navigate('/demo-barberia')}
                className="w-full bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
              >
                Volver al inicio
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTONES FLOTANTES CÍRCULOS (Igual a DemoBarberia) */}
      <div className="fixed right-6 bottom-8 flex flex-col gap-4 z-50">
        {/* Instagram */}
        <motion.a 
          whileHover={{ scale: 1.08 }}
          href="https://www.instagram.com/synapse.ok/" target="_blank" rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-200 bg-[#2C1810]"
        >
          <svg className="w-5 h-5 text-[#8B6914]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771-4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
        </motion.a>
        {/* WhatsApp */}
        <motion.a 
          whileHover={{ scale: 1.08 }}
          href="https://wa.me/5492920543376?text=Quiero%20mi%20sistema%20de%20turnos!%20Me%20gusto%20la%20demo%20de%20barberia!" target="_blank" rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#8B6914] shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
        </motion.a>
      </div>

    </div>
  );
};

export default BarberiaBooking;
