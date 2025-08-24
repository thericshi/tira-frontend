import { useEffect } from 'react';


export const useIllumination = (selector: string) => {
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const illuminatedElements = document.querySelectorAll(selector);
        illuminatedElements.forEach(elem => {
          const rect = elem.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const htmlElem = elem as HTMLElement;
          htmlElem.style.setProperty('--mouse-x', `${x}px`);
          htmlElem.style.setProperty('--mouse-y', `${y}px`);
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [selector]);
};