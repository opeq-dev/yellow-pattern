export interface drawParams {
  canvas: {
    value: d3.Selection<SVGSVGElement, undefined, null, undefined>;
    size: number;
  };
  element: {
    value: string;
    x: number;
    y: number;
    size: number;
    rotate: number;
  };
}

/**
 * This function draws a svg element on canvas.
 * @param drawParams
 * @returns
 */
export const drawSvg = ({ canvas, element }: drawParams) => {
  const elementBBox = {
    x: Number((element.x - element.size / 2).toFixed(2)),
    y: Number((element.y - element.size / 2).toFixed(2)),
    width: element.size,
    height: element.size,
  };

  if (
    elementBBox.x + elementBBox.width < canvas.size ||
    elementBBox.y + elementBBox.height < canvas.size ||
    elementBBox.x > canvas.size + canvas.size ||
    elementBBox.y > canvas.size + canvas.size
  )
    return;

  canvas.value.append('g').node()!.innerHTML = element.value;
  const group = canvas.value.node()!.lastChild as SVGGElement;

  group.setAttribute(
    'transform',
    `rotate(${element.rotate} ${element.x} ${element.y})`,
  );

  const svgElement = group.lastChild as SVGSVGElement;
  svgElement.setAttribute('x', elementBBox.x.toString());
  svgElement.setAttribute('y', elementBBox.y.toString());
  svgElement.setAttribute('width', element.size.toString());
  svgElement.setAttribute('height', element.size.toString());
  svgElement.setAttribute('opacity', '0.5');
};
