"use client";

import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

// Logos are now pulled from public folder with .webp extension
const imgMercadoPago = "/Mercado Pago Logo.webp";
const imgWhatsApp = "/Whatsapp Logo.webp";
const imgInstagram = "/Instagram Logo.webp";
const imgCalendar = "/Calendar Logo.webp";
const imgOpenAI = "/OpenAI Logo.webp";
const imgGmail = "/Gmail Logo.webp";

export const AnimatedCarousel = ({
  title = "Funciona con las herramientas que ya usás",
  logoCount = 6,
  autoPlay = true,
  autoPlayInterval = 2000,
  logos = [
    { id: "logo-1", description: "Mercado Pago", image: imgMercadoPago },
    { id: "logo-2", description: "WhatsApp",     image: imgWhatsApp },
    { id: "logo-3", description: "Instagram",    image: imgInstagram },
    { id: "logo-4", description: "Google Calendar", image: imgCalendar },
    { id: "logo-5", description: "OpenAI",       image: imgOpenAI },
    { id: "logo-6", description: "Gmail",        image: imgGmail },
  ],
  containerClassName = "",
  titleClassName = "text-base md:text-lg font-medium text-gray-500 uppercase tracking-[0.2em] my-0 mb-12 text-center",
  carouselClassName = "",
  logoClassName = "",
  itemsPerViewMobile = 3,
  itemsPerViewDesktop = 6,
  spacing = "gap-0",
  padding = "py-20",
  // New logo size customization props
  logoContainerWidth = "w-[160px] md:w-[220px]",
  logoContainerHeight = "h-24 md:h-32",
  logoImageWidth = "w-full",
  logoImageHeight = "h-full",
  logoMaxWidth = "max-w-[140px] md:max-w-[180px]",
  logoMaxHeight = "max-h-[50px] md:max-h-[70px]",
}) => {
  const [api, setApi] = useState();

  const baseLogos = logos || Array.from(
    { length: logoCount },
    (_, i) => `https://th.bing.com/th/id/R.4aa108082e7d3cbd55add79f84612aaa?rik=I4dbPhSe%2fbHHSg&riu=http%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png&ehk=ewmaCOvP0Ji4QViEJnxSdlrYUrTSTWhi8nZ9XdyCgAI%3d&risl=&pid=ImgRaw&r=0100x100?text=Logo+${i + 1}`
  );
  
  // Duplicate logos multiple times so the infinite scroll plugin always has enough content extending beyond the screen
  const logoItems = [...baseLogos, ...baseLogos, ...baseLogos];

  // Combine logo image size classes
  const logoImageSizeClasses = `${logoImageWidth} ${logoImageHeight} ${logoMaxWidth} ${logoMaxHeight}`.trim();

  return (
    <div className={`w-full ${padding} bg-background ${containerClassName}`}>
      <div className="container mx-auto">
        <div className={`flex flex-col items-center ${spacing}`}>
          <h2
            className={`${titleClassName}`}>
            {title}
          </h2>
          <div className="relative w-full overflow-hidden">
            <Carousel 
              setApi={setApi} 
              opts={{ dragFree: true, loop: true }}
              plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
              className={`w-full ${carouselClassName}`}>
              <CarouselContent>
                {logoItems.map((logo, index) => (
                  <CarouselItem
                    className={`basis-1/${itemsPerViewMobile} lg:basis-1/${itemsPerViewDesktop}`}
                    key={index}>
                    <div
                      className={`flex rounded-md ${logoContainerWidth} ${logoContainerHeight} items-center justify-center p-4 transition-colors ${logoClassName}`}>
                      <img
                        src={logo.image || logo}
                        alt={logo.description || `Logo ${index + 1}`}
                        className={`${logoImageSizeClasses} object-contain filter grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100`} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Case1 = (props) => {
  return <AnimatedCarousel {...props} />;
};