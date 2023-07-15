import * as React from 'react';
import Moveable from 'react-moveable';
//https://github.com/daybrush/scena
export default function Demo() {
  const targetRef = React.useRef();
  const [boxText, setBoxText] = React.useState('w:200 X h:200');
  const [allWrap, setAllWrap] = React.useState(false);
  const [scale, setScale] = React.useState(true);
  return (
    <div className="root">
      <div className="leftPane">
        <h3>Left Pane</h3>
        <label>
          <input
            type="checkbox"
            checked={scale}
            onChange={() => setScale(!scale)}
          />
          Allow Scale
        </label>
        <label>
          <input
            type="checkbox"
            checked={allWrap}
            onChange={() => setAllWrap(!allWrap)}
          />
          allow wrap
        </label>

        <div style={{ display: 'flex' }}>
          <input type="text" style={{ width: '100%' }} placeholder="Width" />
          <input
            type="text"
            style={{ width: '100%' }}
            placeholder="Height"
          />{' '}
          <br />
        </div>
        <button> Create React </button>
      </div>
      <div className="container">
        <div className="target" ref={targetRef}>
          <div className="box">
            <span>{boxText}</span>
          </div>
        </div>

        <Moveable
          target={targetRef}
          scalable={scale}
          warpable={allWrap}
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
