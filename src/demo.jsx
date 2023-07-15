import * as React from 'react';
import Moveable from 'react-moveable';

export default function Demo() {
  const targetRef = React.useRef();

  return (
    <div className="root">
      <div className="container">
        <div className="target" ref={targetRef}>
          Target
        </div>
        <Moveable
          target={targetRef}
          warpable={true}
          renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
          onWarp={(e) => {
            e.target.style.transform = e.transform;
          }}
        />
      </div>
    </div>
  );
}
