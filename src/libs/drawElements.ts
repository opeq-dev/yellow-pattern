import { drawParams } from './drawSvg';

interface drawFn {
  (params: drawParams): void;
}

/**
 * This function draws element 5 times to create a pattern.
 * @param fn draw function
 * @param drawParams
 * @returns
 */
export const drawElements = (fn: drawFn, { canvas, element }: drawParams) => {
  const { x, y } = element;
  const { size } = canvas;

  fn({ canvas, element: { ...element, y: y + size } });
  fn({ canvas, element: { ...element, x: x + size } });
  fn({ canvas, element: { ...element, x: x + size, y: y + size } });
  fn({ canvas, element: { ...element, x: x + size, y: y + size * 2 } });
  fn({ canvas, element: { ...element, x: x + size * 2, y: y + size } });
};
