import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from "react-dnd";
import "./Board.css";
import { useState } from "react";

type Position = {
  top: number;
  left: number;
};

const Board = () => {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  const [collected, drag, dragPreview] = useDrag(
    {
      type: "square",
      item: { top: position.top, left: position.left },
    },
    [position]
  );

  const [collectedProps, drop] = useDrop(
    () => ({
      accept: "square",
      drop(_, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        setPosition((prev) => {
          return {
            top: Math.round(prev.top + delta.y),
            left: Math.round(prev.left + delta.x),
          };
        });
      },
    }),
    []
  );

  return (
    <div id="board" ref={drop}>
      <p className="square" ref={drag} style={position}>
        動かせるよ
      </p>
      <p className="background-text">dropできるよーん</p>
    </div>
  );
};

export default Board;
