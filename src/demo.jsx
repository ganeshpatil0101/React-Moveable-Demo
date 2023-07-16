import * as React from 'react';
import Moveable from 'react-moveable';
import { v4 as uuidv4 } from 'uuid';
//https://github.com/daybrush/scena
export default function Demo() {
  const targetRef = React.useRef();
  const target2Ref = React.useRef();
  let moveableRef = null;
  const allRefs = React.useRef([]);
  const [currentRef, setCurrentRef] = React.useState(null);
  const [eles, setEles] = React.useState([
    // {
    //   id: uuidv4(),
    //   dRef: React.useRef(),
    //   w: 200,
    //   h: 200,
    //   type: 'roof',
    // },
    // {
    //   id: uuidv4(),
    //   dRef: React.useRef(),
    //   w: 200,
    //   h: 200,
    //   type: 'obstacles',
    // },
  ]);
  const [allWrap, setAllWrap] = React.useState(false);
  const [scale, setScale] = React.useState(true);
  const addRect = (type) => {
    setEles([
      ...eles,
      {
        id: uuidv4(),
        w: 200,
        h: 200,
        type: type,
      },
    ]);
  };
  const updateHeightWidth = (cValues, id) => {
    const cp = eles.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          w: Math.round(cValues.width),
          h: Math.round(cValues.height),
        };
      }
      return c;
    });
    return cp;
  };

  const onScaleCb = (e) => {
    e.target.style.transform = e.drag.transform;
    const cValues = e.target.getBoundingClientRect();
    setEles(updateHeightWidth(cValues, e.target.id));
  };

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
        <button onClick={() => addRect('roof')}> Create Roof </button>
        <button onClick={() => addRect('obstacles')}> Create Obstacles </button>
      </div>
      <div className="container">
        {eles.map((e) => (
          <div
            ref={(el) => (allRefs.current[e.id] = el)}
            id={e.id}
            className="target"
            onClick={() => {
              setCurrentRef(allRefs.current[e.id]);
            }}
          >
            <div className={e.type}>
              <span>
                w : {e.w} X h: {e.h}
              </span>
            </div>
          </div>
        ))}
        {/* <div className="target" ref={targetRef} onClick={() => {setCurrentRef(targetRef)}}>
          <div className="box">
            <span>{boxText}</span>
          </div>
        </div>
        <div className="target" ref={target2Ref} onClick={() => {setCurrentRef(target2Ref)}}>
          <div className="box">
            <span>{boxText}</span>
          </div>
        </div> */}
        <Moveable
          ref={(e) => {
            moveableRef = e;
          }}
          target={currentRef}
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
          onScale={onScaleCb}
          renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
          onWarp={(e) => {
            e.target.style.transform = e.transform;
            const cValues = e.target.getBoundingClientRect();
            console.log('===> cValues ', cValues, e.target.id);
            setEles(updateHeightWidth(cValues, e.target.id));
            // console.log(cValues.height, cValues.width);
            // console.log('==>> currentRef ', moveableRef);
            // setBoxText(
            //   `w:${Math.round(cValues.width)} X h:${Math.round(
            //     cValues.height
            //   )} `
            // );
          }}
        />
      </div>
    </div>
  );
}
