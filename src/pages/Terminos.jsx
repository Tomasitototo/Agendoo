import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

const Terminos = () => {
  const secciones = [
    { id: "resumen", title: "1. Resumen", content: "Agendoo es una plataforma SaaS de gestión de turnos online para negocios basados en citas, desarrollada por Synapse. Al usar este servicio aceptás todos los términos, condiciones y políticas aquí establecidos. Si no estás de acuerdo, no utilices la plataforma. Nos reservamos el derecho de actualizar estos términos en cualquier momento — el uso continuado del servicio constituye aceptación de los cambios." },
    { id: "usuarios", title: "2. Términos de usuarios", content: "Al registrarte declarás ser mayor de edad en tu país de residencia o tener capacidad legal para celebrar contratos. Debés proporcionar información veraz y notificarnos cualquier uso no autorizado de tu cuenta. No podés usar Agendoo para ningún propósito ilegal. Nos reservamos el derecho de suspender o cancelar cuentas que presenten inconsistencias o actividad sospechosa, sin que eso genere derecho a indemnización." },
    { id: "condiciones", title: "3. Condiciones generales", content: "Nos reservamos el derecho de rechazar el servicio a cualquier persona por cualquier motivo. Te comprometés a no reproducir, duplicar, copiar, vender ni explotar ninguna parte del servicio sin autorización expresa por escrito de Agendoo." },
    { id: "reservas", title: "4. Reservas y pagos", content: "Los pagos se procesan a través de Mercado Pago. Agendoo facilita la plataforma pero no es parte de las transacciones entre el negocio y sus clientes. Las políticas de cancelación y reembolso las define cada negocio. No almacenamos datos de tarjetas de crédito." },
    { id: "modificaciones", title: "5. Modificaciones al servicio y precios", content: "Los precios están sujetos a cambios. Nos reservamos el derecho de modificar o discontinuar cualquier parte del servicio en cualquier momento. No somos responsables ante vos ni terceros por modificaciones, cambios de precio o discontinuación del servicio." },
    { id: "actividades", title: "6. Actividades prohibidas", content: "No podés usar Agendoo para actividades que violen leyes o regulaciones, infrinjan derechos de terceros, distribuyan contenido dañino u obsceno, promuevan el odio o la discriminación, comprometan la seguridad de la plataforma, o involucren esquemas fraudulentos o piramidales." },
    { id: "propiedad", title: "7. Propiedad intelectual", content: "El diseño, código y contenido de Agendoo son propiedad de Synapse. No podés copiarlo, modificarlo ni distribuirlo sin autorización. El contenido que vos cargás (logo, fotos, servicios) es de tu propiedad." },
    { id: "limitacion", title: "8. Limitación de responsabilidad", content: "En la medida permitida por la ley, nuestra responsabilidad se limita al monto abonado en los doce meses anteriores al reclamo. No somos responsables por daños indirectos, incidentales o consecuentes derivados del uso de la plataforma." },
    { id: "contacto", title: "9. Contacto", content: "Para consultas sobre estos términos escribinos a: contacto@itssynapse.com" }
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Navbar con isFloating=false para que tenga fondo blanco y esté en el flujo */}
      <Navbar isFloating={false} />

      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Header de la página */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <img src="/Logo.webp" alt="Agendoo Logo" className="w-16 h-16 object-contain" />
          </motion.div>
          <h1 className="text-3xl font-extrabold mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            Términos y condiciones de uso
          </h1>
          <p className="text-sm text-gray-400">
            Última actualización: Abril 2026
          </p>
        </div>

        {/* Tabla de contenidos */}
        <div className="bg-[#F1F5F9] rounded-xl p-6 mb-10 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            Tabla de contenidos
          </h2>
          <nav>
            <ul className="grid grid-cols-1 gap-2">
              {secciones.map((sec, idx) => (
                <li key={sec.id}>
                  <a 
                    href={`#${sec.id}`} 
                    className="text-blue-600 hover:text-blue-800 text-sm flex gap-2 transition-colors"
                  >
                    <span className="font-semibold">{idx + 1}.</span>
                    <span className="hover:underline">{sec.title.split('. ')[1]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Secciones de contenido */}
        <div className="space-y-12">
          {secciones.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2 mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                {sec.title}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                {sec.content}
              </p>
            </section>
          ))}
        </div>

        {/* Footer interno de la página */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-sm">
            ¿Tenés dudas? Contactanos en <a href="mailto:contacto@itssynapse.com" className="text-blue-600 hover:underline">contacto@itssynapse.com</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terminos;
