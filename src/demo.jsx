import * as React from 'react';
import Moveable from 'react-moveable';

export default function Demo() {
  const targetRef = React.useRef();
  const [boxText, setBoxText] = React.useState('w:200 X h:200');
  return (
    <div className="root">
      <div className="container">
        <div className="target" ref={targetRef}>
          <div className="box">
            <span>{boxText}</span>
          </div>
        </div>
        <Moveable
          target={targetRef}
          scalable={false}
          warpable={true}
          draggable={true}
          throttleDrag={1}
          edgeDraggable={false}
          startDragRotate={0}
          throttleDragRotate={0}
          onDrag={(e) => {
            e.target.style.transform = e.transform;
          }}
          throttleScale={0}
          onScale={(e) => {
            e.target.style.transform = e.drag.transform;
            const cValues = e.target.getBoundingClientRect();
            // console.log(cValues.height, cValues.width);
            setBoxText(
              `w:${Math.round(cValues.width)} X h:${Math.round(
                cValues.height
              )} `
            );
          }}
          renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
          onWarp={(e) => {
            e.target.style.transform = e.transform;
            const cValues = e.target.getBoundingClientRect();
            console.log(cValues.height, cValues.width);
            setBoxText(
              `w:${Math.round(cValues.width)} X h:${Math.round(
                cValues.height
              )} `
            );
          }}
        />
      </div>
    </div>
  );
}
