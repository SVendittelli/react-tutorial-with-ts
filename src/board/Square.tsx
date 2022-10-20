import { Move } from "../types/model";

interface SquareProps {
  value: Move;
  onClick: () => void;
}

const Square = (props: SquareProps) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);

export default Square;
