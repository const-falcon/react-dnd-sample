import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from "react-dnd";
import "./Board.css";

type Position = {
  top: number;
  left: number;
};

const Board = () => {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const boardRef = useRef<HTMLDivElement>(null);

  const isOnBoard = (delta: XYCoord) => {
    // 上端を判定
    if (position.top + delta.y < 0) return false;
    // 右端を判定
    if (position.left + 100 + delta.x > 960) return false;
    // 左端を判定
    if (position.left + delta.x < 0) return false;
    // 下端を判定
    if (position.top + 100 + delta.y > 540) return false;
    return true;
  };

  const [{ isDragging }, drag] = useDrag(
    {
      type: "square",
      item: { top: position.top, left: position.left },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    },
    [position]
  );

  const [_, drop] = useDrop(
    () => ({
      accept: "square",
      drop: (_, monitor) => {
        // yは上に動くと-になる...
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        setPosition((prev) => {
          return {
            top: Math.round(prev.top + delta.y),
            left: Math.round(prev.left + delta.x),
          };
        });
      },
      canDrop: (_, monitor) => {
        // ボード外にはdropさせない
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        return isOnBoard(delta);
      },
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [position]
  );

  return (
    <div id="board" ref={boardRef}>
      <div ref={drop}>
        <p
          className="square"
          ref={drag}
          style={{
            ...position,
            display: isDragging ? "none" : "block",
          }}
        >
          動かせるよ
        </p>
        <p className="background-text">dropできるよーん</p>
      </div>
    </div>
  );
};

export default Board;
