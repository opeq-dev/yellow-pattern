# useDrawPattern 


The useDrawPattern is a React hook that allows you to draw a pattern from an array of svg strings.

The hook returns a ref that you can attach to a div element, svg element and generate function that you can call to re-draw the pattern.


## Installation
Install the package using your preferred package manager:
    
    ```bash
    npm install use-draw-pattern
    ```

## Usage

```javascript
import React, { useMemo } from 'react';
import { useDrawPattern } from 'use-draw-pattern';

const App = () => {
    const icons = useMemo(()=>[
          '<svg viewBox="0 0 24 24" fill="#70649b"><path d="M4.5 2h15v15h-15z"/></svg>',
          '<svg viewBox="0 0 5 5" fill="#29f402"><path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"/></svg>',
          '<svg viewBox="0 0 210 400" fill="#0a0bcd"><path d="M150 0 L75 200 L225 200 Z"/></svg>',
    ], []);
    
    const { ref, generate } = useDrawPattern(
        icons,
        {
          count: 30,
          size: 200,
        },
    );

    return (
        <div>
            <button onClick={generate}>Generate</button>
            <div ref={ref}>
        </div>
    );
};