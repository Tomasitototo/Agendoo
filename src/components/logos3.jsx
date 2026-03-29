// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

"use client";;
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Logos are now pulled from public folder with .webp extension
const imgMercadoPago = "/Mercado Pago Logo.webp";
const imgWhatsApp = "/Whatsapp Logo.webp";
const imgInstagram = "/Instagram Logo.webp";
const imgCalendar = "/Calendar Logo.webp";
const imgOpenAI = "/OpenAI Logo.webp";

const Logos3 = ({
  heading = "Funciona con las herramientas que ya usás",
  logos = [
    { id: "logo-1", description: "Mercado Pago", image: imgMercadoPago, className: "h-8 w-auto" },
    { id: "logo-2", description: "WhatsApp",     image: imgWhatsApp,    className: "h-8 w-auto" },
    { id: "logo-3", description: "Instagram",    image: imgInstagram,   className: "h-8 w-auto" },
    { id: "logo-4", description: "Google Calendar", image: imgCalendar, className: "h-8 w-auto" },
    { id: "logo-5", description: "OpenAI",       image: imgOpenAI,      className: "h-8 w-auto" },
  ]
}) => {
  return (
    <section className="py-12">
      <div className="container flex flex-col items-center text-center">
        <h1 className="text-sm font-normal text-gray-400 uppercase tracking-widest my-0 mb-8">
          {heading}
        </h1>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div
          className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel opts={{ loop: true }} plugins={[AutoScroll({ playOnInit: true })]}>
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <div>
                      <img src={logo.image} alt={logo.description} className={`${logo.className} filter grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100`} />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div
            className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent"></div>
          <div
            className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
