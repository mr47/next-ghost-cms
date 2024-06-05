'use client'
import React, { useRef, useState, useEffect, useCallback } from 'react';
import _throttle from 'lodash/throttle';

interface StickyNavContainerProps {
  activeClass: string;
  isPost?: boolean;
  throttle: number;
  render: (arg: { anchorRef: React.RefObject<HTMLDivElement>, currentClass: string }) => JSX.Element;
}

export const useStickyNav = (initialActiveClass: string, isPost = false, throttle = 300) => {
  const [activeClass, setActiveClass] = useState(initialActiveClass);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [ticking, setTicking] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentClass, setCurrentClass] = useState('');

  const update = useCallback(() => {
    const current = anchorRef.current;
    let top = current ? current.getBoundingClientRect().top : 0;
    let trigger = top + window.scrollY;
    let triggerOffset = -20;

    if (isPost) {
      triggerOffset = current ? current.offsetHeight + 35 : 0;
    }

    if (lastScrollY >= trigger + triggerOffset) {
      setCurrentClass(activeClass);
    } else {
      setCurrentClass('');
    }

    setTicking(false);
  }, [lastScrollY, isPost, activeClass]);

  const onScroll = useCallback(() => {
    setLastScrollY(window.scrollY);
    if (!ticking) {
      requestAnimationFrame(update);
    }
    setTicking(true);
  }, [ticking, update]);

  useEffect(() => {
    const throttledScrollHandler = _throttle(onScroll, throttle);
    const throttledResizeHandler = _throttle(onScroll, throttle);

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    window.addEventListener('resize', throttledResizeHandler, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      window.removeEventListener('resize', throttledResizeHandler);
    };
  }, [onScroll, throttle]);

  return { sticky: { anchorRef, currentClass }, setActiveClass };
}

