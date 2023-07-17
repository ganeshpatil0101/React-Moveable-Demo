import * as React from 'react';

export const DimensionViewable = {
  name: 'dimensionViewable',
  props: [],
  events: [],
  render(moveable) {
    const rect = moveable.getRect();
    console.log('===>> rect ', rect);
    // Add key (required)
    // Add class prefix moveable-(required)
    return (
      <div
        key={'dimension-viewer'}
        className={'moveable-dimension'}
        style={{
          position: 'absolute',
          left: `${rect.width / 2}px`,
          top: `${rect.height + 20}px`,
          background: '#4af',
          borderRadius: '2px',
          padding: '2px 4px',
          color: 'white',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          willChange: 'transform',
          transform: `translate(-50%, 0px)`,
        }}
      >
        {Math.round(rect.width)} x {Math.round(rect.height)}
      </div>
    );
  },
};

// export default function App() {
//     const targetRef = React.useRef<HTMLDivElement>(null);
//     return <div className="container">
//         <div className="target" ref={targetRef}>Target</div>
//         <Moveable
//             target={targetRef}
//             ables={[DimensionViewable]}
//             draggable={true}
//             resizable={true}
//             rotatable={true}
//             props={{
//                 dimensionViewable: true,
//             }}
//             onDrag={e => {
//                 e.target.style.transform = e.transform;
//             }}
//             onResize={e => {
//                 e.target.style.width = `${e.width}px`;
//                 e.target.style.height = `${e.height}px`;
//                 e.target.style.transform = e.drag.transform;
//             }}
//             onRotate={e => {
//                 e.target.style.transform = e.drag.transform;
//             }}
//         />
//     </div>;
// }
