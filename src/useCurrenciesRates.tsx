import { useEffect, useState } from "react";

export interface CurrenciesRatesType {
  RUB: number;
  USD: number;
  EUR: number;
}

interface USDResType {
  data: { USD: number };
}

interface EURResType {
  data: { EUR: number };
}

export function useCurrenciesRates() {
  const [currenciesRates, setCurrenciesRates] = useState<CurrenciesRatesType>({
    RUB: 1,
    USD: 1,
    EUR: 1,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    Promise.all([
      fetch(
        "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_CmMtK2h0AmK4mcdQN6UYoezIxVTjVuoWlopi4bmZ&base_currency=RUB&currencies=USD"
      ).then((res) => res.json()),
      fetch(
        "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_CmMtK2h0AmK4mcdQN6UYoezIxVTjVuoWlopi4bmZ&base_currency=RUB&currencies=EUR"
      ).then((res) => res.json()),
    ])
      .then(([rubUsd, rubEur]: [USDResType, EURResType]) => {
        setCurrenciesRates({
          RUB: 1,
          USD: rubUsd.data.USD,
          EUR: rubEur.data.EUR,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("failed to fetch currenciesRates");
      });
  }, [setCurrenciesRates, setLoading, setError]);

  return {
    currenciesRates,
    currenciesRatesLoading: loading,
    currenciesRatesError: error,
  };
}
