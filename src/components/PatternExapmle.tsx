import { createElement, useMemo } from 'react';
import { renderToString } from 'react-dom/server';
import * as phosphorIcons from '@phosphor-icons/react';
import { useDrawPattern } from '../hooks/useDrawPattern';
import { PatternControls } from './PatternControls';

interface PatternExapmleProps {
  size?: number;
  count?: number;
}

/**
 * This component is used to generate a pattern of phosphor icons.
 * @param size
 * @param count
 * @returns
 */
export const PatternExapmle = ({
  size = 300,
  count = 50,
}: PatternExapmleProps) => {
  const icons = useMemo(
    () =>
      Object.entries(phosphorIcons)
        .filter(
          ([key]) =>
            key !== 'SSR' &&
            key !== 'IconContext' &&
            key !== 'IconBase' &&
            key !== 'Icon' &&
            key !== 'IconProps' &&
            key !== 'IconWeight',
        )
        .map(([_, icon]) => {
          return renderToString(
            createElement(icon as phosphorIcons.Icon, {
              weight: 'bold',
              color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            }),
          );
        }),
    [],
  );

  const { ref, generate, svg } = useDrawPattern(icons, { count, size });

  return (
    <>
      <PatternControls onGenerateClick={generate} svg={svg} />
      <div ref={ref} />
    </>
  );
};
