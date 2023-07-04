import { Slider } from "@mui/material";
import { action } from "mobx";
import { observer } from "mobx-react-lite";

export interface Mark {
  value: number;
  label: string;
}

export interface NumberRange {
  minLimit: Mark;
  maxLimit: Mark;
  step: number;
  from: number;
  to: number;
}

const RangeSlider = observer(
  (props: { range: NumberRange; inverted?: boolean; onChange: (from: number, to: number) => void }) => {
    const range = props.range;

    return (
      <Slider
        step={range.step}
        marks={[range.minLimit, range.maxLimit]}
        valueLabelDisplay="auto"
        value={[range.from, range.to]}
        min={range.minLimit.value}
        max={range.maxLimit.value}
        onChange={action((event, value) => {
          if (!Array.isArray(value)) return;

          if (value[0] > value[1]) value[0] = value[1];

          props.onChange(value[0], value[1]);
        })}
        {...(props.inverted ? { track: "inverted" } : {})}
      />
    );
  }
);

export { RangeSlider };