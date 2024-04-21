import { Card } from "../Card/Card";
import s from "./Ticket.module.css";
import airlinesLogo from "./airlines-logo.png";
import stopsImage from "./stops-image.png";
import { pluralize } from "../../util";
import { TicketType } from "../../App";
import moment from "moment";
import { CurrenciesRatesType } from "../../useCurrenciesRates";
import { CurrrencyType } from "../CurrenciesSwitch/CurrenciesSwitch";
import airplaneImage from "./airplane.png";

const MOMENT_FORMAT = "D MMM YYYY, dd";

const currenciesSymbols: Record<CurrrencyType, string> = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
};

export function Ticket({
  ticket,
  currency,
  currenciesRates,
}: {
  ticket: TicketType;
  currency: CurrrencyType;
  currenciesRates: CurrenciesRatesType;
}) {
  return (
    <Card>
      <div className={s.content}>
        <div className={s.left}>
          <img src={airlinesLogo} className={s.logo} />
          <button className={s.button}>
            Купить <br /> за{" "}
            {calcPrice(ticket.price, currenciesRates[currency])}
            {currenciesSymbols[currency]}
          </button>
        </div>
        <div className={s.right}>
          <div className={s.departure}>
            <div className={s.time}>{ticket.departure_time}</div>
            <div className={s.airport}>
              {ticket.origin}, {ticket.origin_name}
            </div>
            <div className={s.date}>
              {moment(ticket.departure_date).format(MOMENT_FORMAT)}
            </div>
          </div>
          <div className={s.stops}>
            {ticket.stops === 0
              ? "БЕЗ ПЕРЕСАДОК"
              : pluralize(ticket.stops, [
                  "ПЕРЕСАДКА",
                  "ПЕРЕСАДКИ",
                  "ПЕРЕСАДОК",
                ])}
            <img className={s.airplaneImage} src={airplaneImage} />
          </div>
          <div className={s.arrival}>
            <div className={s.time}>{ticket.arrival_time}</div>
            <div className={s.airport}>
              {ticket.destination}, {ticket.destination_name}
            </div>
            <div className={s.date}>
              {moment(ticket.arrival_date).format(MOMENT_FORMAT)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function calcPrice(price: number, currencyBet: number) {
  return Math.round(price * currencyBet * 100) / 100;
}
