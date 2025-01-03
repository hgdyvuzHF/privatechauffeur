import { useEffect, useState } from 'react';

export function useParallax() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setOffset(scrollPosition * 0.5); // Ajustez ce multiplicateur pour contrôler la vitesse de l'effet
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return offset;
}