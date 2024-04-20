import { pluralize } from "../../util";
import s from "./StopsCheckboxes.module.css";

export function StopsCheckboxes({
  values,
  availableValues,
  setValues,
}: {
  values: number[];
  availableValues: number[];
  setValues: (values: number[]) => void;
}) {
  const areAllChecked = availableValues.every((val) => values.includes(val));

  return (
    <div>
      <StopsCheckbox
        label="Все"
        checked={areAllChecked}
        onChange={() => {
          if (areAllChecked) setValues([]);
          else setValues(availableValues);
        }}
      />
      {availableValues.map((val) => {
        const label =
          val === 0
            ? "Без пересадок"
            : pluralize(val, ["пересадка", "пересадки", "пересадок"]);

        return (
          <StopsCheckbox
            label={label}
            checked={values.includes(val)}
            onChange={() => {
              if (values.includes(val))
                setValues(values.filter((v) => v !== val));
              else setValues([...values, val]);
            }}
            onClickOnly={() => {
              setValues([val]);
            }}
            key={val}
          />
        );
      })}
    </div>
  );
}

function StopsCheckbox({
  label,
  checked,
  onChange,
  onClickOnly,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  onClickOnly?: () => void;
}) {
  return (
    <div className={s.checkboxContainer}>
      <label className={s.label}>
        <input
          type="checkbox"
          className={s.input}
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
      {onClickOnly && (
        <span className={s.only} onClick={onClickOnly}>
          ТОЛЬКО
        </span>
      )}
    </div>
  );
}
