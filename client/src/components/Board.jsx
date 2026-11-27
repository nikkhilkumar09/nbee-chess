import { useState } from 'react';
import { Chess } from 'chess.js';

const PIECES = {
  wp: '♙', wn: '♘', wb: '♗', wr: '♖', wq: '♕', wk: '♔',
  bp: '♟', bn: '♞', bb: '♝', br: '♜', bq: '♛', bk: '♚',
};

export default function Board({ fen, playerColor, onMove }) {
  const [selected, setSelected] = useState(null);
  const chess = new Chess(fen);
  const board = chess.board();

  const legalMoves = selected
    ? chess.moves({ square: selected, verbose: true }).map((m) => m.to)
    : [];

  const handleSquareClick = (square) => {
    if (selected && legalMoves.includes(square)) {
      onMove({ from: selected, to: square, promotion: 'q' });
      setSelected(null);
      return;
    }

    const piece = chess.get(square);
    if (piece && piece.color === playerColor && chess.turn() === playerColor) {
      setSelected(square);
    } else {
      setSelected(null);
    }
  };

  const rows = playerColor === 'b' ? [...board].reverse() : board;

  return (
    <div className="grid grid-cols-8 w-80 h-80 sm:w-96 sm:h-96 border-2 border-gray-700 select-none">
      {rows.map((row, rIdx) => {
        const cols = playerColor === 'b' ? [...row].reverse() : row;
        const rank = playerColor === 'b' ? rIdx + 1 : 8 - rIdx;

        return cols.map((cell, cIdx) => {
          const file = String.fromCharCode(97 + (playerColor === 'b' ? 7 - cIdx : cIdx));
          const square = `${file}${rank}`;
          const isDark = (rIdx + cIdx) % 2 === 1;
          const isSelected = selected === square;
          const isHint = legalMoves.includes(square);

          return (
            <div
              key={square}
              onClick={() => handleSquareClick(square)}
              className={`flex items-center justify-center text-3xl sm:text-4xl cursor-pointer relative ${
                isSelected ? 'bg-emerald-500/70' : isDark ? 'bg-emerald-800' : 'bg-emerald-100'
              }`}
            >
              {cell && (
                <span className={cell.color === 'w' ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]' : 'text-gray-950'}>
                  {PIECES[`${cell.color}${cell.type}`]}
                </span>
              )}
              {isHint && (
                <span className="absolute w-3 h-3 rounded-full bg-black/30" />
              )}
            </div>
          );
        });
      })}
    </div>
  );
}
