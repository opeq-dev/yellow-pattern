import { Delaunay, create, polygonArea, polygonCentroid } from 'd3';
import { drawElements } from './drawElements';
import { drawSvg } from './drawSvg';

export interface DrawPatternOptions {
  /**
   * Number of icons to draw.
   */
  count: number;
  /**
   * Size of the pattern.
   */
  size: number;
}

/**
 * This function draws a pattern of icons.
 * @param icons array of svg strings
 * @param options
 * @returns svg element
 */
export const drawPattern = (
  icons: string[],
  { count, size }: DrawPatternOptions,
): SVGSVGElement | null => {
  const points = Array.from({ length: count }, () => ({
    x: Math.random() * size,
    y: Math.random() * size,
  }));

  const delaunay = Delaunay.from(points.map((d) => [d.x, d.y]));
  const voronoi = delaunay.voronoi([0, 0, size, size]);

  const polygons = [...voronoi.cellPolygons()].map((polygon) => {
    const [x, y] = polygonCentroid(polygon);
    const radius = Math.sqrt(Math.abs(polygonArea(polygon)) / Math.PI);

    return {
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      size: Number(radius.toFixed(2)),
    };
  });

  const svg = create('svg');
  svg.attr('width', size).attr('height', size);

  polygons.forEach((polygon) => {
    const icon = icons[Math.floor(Math.random() * icons.length)];

    drawElements(drawSvg, {
      canvas: { value: svg, size },
      element: {
        value: icon,
        ...polygon,
        rotate: Math.floor(Math.random() * 90) - 45,
      },
    });
  });

  svg.attr('viewBox', `${size} ${size} ${size} ${size}`);
  return svg.node();
};
