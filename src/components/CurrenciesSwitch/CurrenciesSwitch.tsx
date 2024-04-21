import cn from "classnames";
import { useEffect } from "react";
import s from "./CurrenciesSwitch.module.css";

export type CurrrencyType = "RUB" | "USD" | "EUR";

const CURRENCIES: CurrrencyType[] = ["RUB", "USD", "EUR"];

export function CurrenciesSwitch({
  activeCurrency,
  setActiveCurrency,
}: {
  activeCurrency: CurrrencyType;
  setActiveCurrency: (currency: CurrrencyType) => void;
}) {
  return (
    <div className={s.container}>
      {CURRENCIES.map((currency) => (
        <div
          className={cn(s.currency, {
            [s.active]: activeCurrency === currency,
          })}
          onClick={() => {
            setActiveCurrency(currency);
          }}
          key={currency}
        >
          {currency}
        </div>
      ))}
    </div>
  );
}
