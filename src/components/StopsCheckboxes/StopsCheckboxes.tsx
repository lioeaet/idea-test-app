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
    <>
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
    </>
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
    <label className={s.label}>
      <div className={s.checkboxContainer}>
        <input
          type="checkbox"
          className={s.input}
          checked={checked}
          onChange={onChange}
        />
        {label}
      </div>
      {onClickOnly && (
        <span
          className={s.only}
          onClick={(e) => {
            e.preventDefault();
            onClickOnly();
          }}
        >
          ТОЛЬКО
        </span>
      )}
    </label>
  );
}
