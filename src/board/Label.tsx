import { LabelClasses } from "../types/model";

interface LabelProps {
  class: LabelClasses;
  text?: string;
}

const Label = (props: LabelProps) => (
  <button className={`label ${props.class}`}>{props.text ?? ""}</button>
);

export default Label;
