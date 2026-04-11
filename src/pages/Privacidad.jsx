import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";

const Privacidad = () => {
  const secciones = [
    {
      id: "seccion-1",
      title: "1. Información que recopilamos",
      content: "Recopilamos la información que nos proporcionás al registrarte y usar la plataforma: nombre, correo electrónico, teléfono, datos del negocio e información necesaria para procesar pagos. También recopilamos información técnica como dirección IP y datos de uso de la plataforma."
    },
    {
      id: "seccion-2",
      title: "2. Cómo usamos tu información",
      content: "Usamos tu información para brindar y mejorar el servicio, gestionar turnos, procesar pagos, enviar notificaciones y recordatorios, prevenir fraudes y cumplir obligaciones legales. No vendemos tus datos personales a terceros."
    },
    {
      id: "seccion-3",
      title: "3. Responsabilidad sobre los datos",
      content: "Como negocio que usa Agendoo, somos responsables del tratamiento de tus datos de cuenta. Respecto a los datos de tus clientes finales gestionados a través de la plataforma, actuamos como encargados del tratamiento en tu nombre — siendo vos el responsable de esos datos."
    },
    {
      id: "seccion-4",
      title: "4. Compartir información",
      content: "Podemos compartir información con proveedores que nos ayudan a operar la plataforma: hosting (Vercel), base de datos (Supabase), emails (Resend) y procesamiento de pagos (Mercado Pago). Todos están obligados a proteger tus datos. También podemos divulgar información cuando sea requerido por ley."
    },
    {
      id: "seccion-5",
      title: "5. Integración con Google Calendar",
      content: "El Plan Premium incluye sincronización con Google Calendar. Accedemos únicamente a los datos necesarios para crear, modificar y eliminar eventos de turno. No compartimos ni vendemos estos datos. Los tokens de acceso se almacenan encriptados y podés revocar el acceso en cualquier momento desde tu cuenta de Google."
    },
    {
      id: "seccion-6",
      title: "6. Seguridad",
      content: "Implementamos encriptación en las comunicaciones y en los servidores. Ningún sistema es completamente seguro, pero aplicamos las mejores prácticas disponibles para proteger tu información."
    },
    {
      id: "seccion-7",
      title: "7. Conservación de datos",
      content: "Conservamos tus datos únicamente durante el tiempo necesario para los fines para los que fueron recopilados, o mientras lo exija la ley."
    },
    {
      id: "seccion-8",
      title: "8. Tus derechos",
      content: "Tenés derecho a acceder, corregir, eliminar o restringir el uso de tus datos personales, así como a solicitar su portabilidad. Para ejercer estos derechos contactanos en: contacto@itssynapse.com"
    },
    {
      id: "seccion-9",
      title: "9. Uso de cookies",
      content: "Usamos cookies para mejorar la experiencia, analizar el uso de la plataforma y personalizar contenidos. Podés configurar tu navegador para rechazarlas, aunque puede afectar el funcionamiento del servicio."
    },
    {
      id: "seccion-10",
      title: "10. Modificaciones",
      content: "Podemos actualizar esta política en cualquier momento. Te notificaremos sobre cambios importantes por email o mediante un aviso en la plataforma."
    },
    {
      id: "seccion-11",
      title: "11. Contacto",
      content: "Para consultas sobre privacidad escribinos a: contacto@itssynapse.com"
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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
          <h1 className="text-3xl font-bold mb-2 text-center" style={{ fontFamily: "'Sora', sans-serif" }}>
            Política de Privacidad
          </h1>
          <p className="text-sm text-gray-500 text-center mb-10">
            Última actualización: Abril 2026
          </p>
        </div>

        {/* Tabla de contenidos */}
        <div className="bg-[#F1F5F9] rounded-xl p-6 mb-10 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4">
            Tabla de contenidos
          </h2>
          <nav>
            <ul className="grid grid-cols-1 gap-2">
              {secciones.map((sec) => (
                <li key={sec.id}>
                  <a 
                    href={`#${sec.id}`} 
                    className="text-blue-600 hover:text-blue-800 text-sm flex gap-2 transition-colors"
                  >
                    <span className="hover:underline">{sec.title}</span>
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
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
                {sec.title}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                {sec.content}
              </p>
            </section>
          ))}
        </div>

        {/* Footer interno de la página */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-base">
            ¿Tenés dudas? Contactanos en <a href="mailto:contacto@itssynapse.com" className="text-gray-500 hover:text-blue-600 transition-colors">contacto@itssynapse.com</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacidad;
