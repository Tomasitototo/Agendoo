import React from "react";

export const Footer = () => {
  return (
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
          <a href="/#ideal-para" className="text-white/50 text-sm hover:text-white transition-colors">Ideal para</a>
          <a href="/#sin-vs-con" className="text-white/50 text-sm hover:text-white transition-colors">Sin vs Con</a>
          <a href="/#demos" className="text-white/50 text-sm hover:text-white transition-colors">Demos</a>
          <a href="/#precios" className="text-white/50 text-sm hover:text-white transition-colors">Precios</a>
          <a href="/#faq" className="text-white/50 text-sm hover:text-white transition-colors">FAQ</a>
          <a href="/#comenzar" className="text-white/50 text-sm hover:text-white transition-colors">Comenzar ahora</a>
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
  );
};
