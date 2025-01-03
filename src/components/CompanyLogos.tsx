import React, { useEffect, useRef, useState } from 'react';

const companyLogos = [
  {
    url: 'https://res.cloudinary.com/dinbxrql6/image/upload/v1735808469/t%C3%A9l%C3%A9chargement_5_hq7wot.png',
    alt: 'Company Logo 1'
  },
  {
    url: 'https://res.cloudinary.com/dinbxrql6/image/upload/v1735808469/t%C3%A9l%C3%A9chargement_2_qcpktp.png',
    alt: 'Company Logo 2'
  },
  {
    url: 'https://res.cloudinary.com/dinbxrql6/image/upload/v1735808469/t%C3%A9l%C3%A9chargement_1_nq2jui.png',
    alt: 'Company Logo 3'
  },
  {
    url: 'https://res.cloudinary.com/dinbxrql6/image/upload/v1735808469/t%C3%A9l%C3%A9chargement_yc0eiy.png',
    alt: 'Company Logo 4'
  },
  {
    url: 'https://res.cloudinary.com/dinbxrql6/image/upload/v1735808469/t%C3%A9l%C3%A9chargement_4_wkrm2n.png',
    alt: 'Company Logo 5'
  },
  {
    url: 'https://res.cloudinary.com/dinbxrql6/image/upload/v1735808469/t%C3%A9l%C3%A9chargement_3_bd97ri.png',
    alt: 'Company Logo 6'
  }
];

export default function CompanyLogos() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clone the first set of logos and append them to create a seamless loop
    const content = container.querySelector('.logos-slide');
    if (!content) return;

    // Set animation
    const startAnimation = () => {
      if (container && !isHovered) {
        container.style.setProperty('--animation-status', 'running');
      }
    };

    const stopAnimation = () => {
      if (container) {
        container.style.setProperty('--animation-status', 'paused');
      }
    };

    // Start animation initially
    startAnimation();

    // Event listeners for hover
    container.addEventListener('mouseenter', () => setIsHovered(true));
    container.addEventListener('mouseleave', () => setIsHovered(false));

    return () => {
      container.removeEventListener('mouseenter', () => setIsHovered(true));
      container.removeEventListener('mouseleave', () => setIsHovered(false));
    };
  }, [isHovered]);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 uppercase">
          ILS NOUS FONT CONFIANCE
        </h2>
        
        <div 
          ref={containerRef}
          className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:w-[100px] before:h-full before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:w-[100px] after:h-full after:bg-gradient-to-l after:from-white after:to-transparent"
          style={{
            '--animation-status': 'running'
          } as React.CSSProperties}
        >
          <div 
            className="logos-slide flex items-center gap-12 animate-scroll"
            style={{
              animationPlayState: 'var(--animation-status)'
            } as React.CSSProperties}
          >
            {/* First set of logos */}
            {companyLogos.map((logo, index) => (
              <div
                key={`logo-1-${index}`}
                className="flex-shrink-0 w-32 h-20 flex items-center justify-center"
              >
                <img
                  src={logo.url}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
            
            {/* Duplicate set for seamless scrolling */}
            {companyLogos.map((logo, index) => (
              <div
                key={`logo-2-${index}`}
                className="flex-shrink-0 w-32 h-20 flex items-center justify-center"
              >
                <img
                  src={logo.url}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}