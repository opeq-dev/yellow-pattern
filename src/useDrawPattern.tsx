import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { DrawPatternOptions, drawPattern } from './libs';

/**
 *
 * @param icons array of svg strings
 * @param options
 * @returns
 */
export const useDrawPattern = (
  icons: string[],
  { count, size }: DrawPatternOptions = { count: 50, size: 300 },
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<SVGSVGElement | null>(null);

  const generate = useCallback(() => {
    setSvg(drawPattern(icons, { count, size }));
  }, [icons, count, size, setSvg]);

  useLayoutEffect(() => {
    if (!ref.current || !svg) return;

    ref.current.replaceChildren(svg);
  }, [ref, svg]);

  useEffect(() => {
    generate();
  }, [generate]);

  return { ref, svg, generate };
};
