import React, { useCallback, useEffect, useRef, useState } from 'react'

interface HoverOnAvatarProps {
  activeClass: string;
  render: (arg: HoverOnAvatarType) => JSX.Element;
}

export type HoverOnAvatarType = {
  anchorRef: React.RefObject<HTMLLIElement>;
  currentClass: string;
};

export const HoverOnAvatar: React.FC<HoverOnAvatarProps> = ({ activeClass, render }) => {
  const anchorRef = useRef<HTMLLIElement>(null);
  const [currentClass, setCurrentClass] = useState<string>('');
  let hoverTimeout: NodeJS.Timeout | undefined;

  const onHoverIn = useCallback(() => {
    hoverTimeout && clearTimeout(hoverTimeout);
    setCurrentClass(activeClass);
  }, []);

  const onHoverOut = useCallback(() => {
    hoverTimeout = setTimeout(() => {
      setCurrentClass('');
    }, 50);
  }, []);

  useEffect(() => {
    const anchor = anchorRef.current;
    anchor?.addEventListener('mouseover', onHoverIn, { passive: true });
    anchor?.addEventListener('mouseout', onHoverOut, { passive: true });

    return () => {
      hoverTimeout && clearTimeout(hoverTimeout);
      anchor?.removeEventListener('mouseover', onHoverIn);
      anchor?.removeEventListener('mouseout', onHoverOut);
    };
  }, [hoverTimeout, onHoverIn, onHoverOut]);

  return render({ anchorRef, currentClass });
};
