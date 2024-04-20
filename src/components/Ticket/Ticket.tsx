import { Card } from "../Card/Card";
import s from "./Ticket.module.css";
import airlinesLogo from "./airlines-logo.png";
import stopsImage from "./stops-image.png";
import { pluralize } from "../../util";
import { TicketType } from "../../App";
import moment from "moment";

const MOMENT_FORMAT = "D MMM YYYY, dd";

export function Ticket({ ticket }: { ticket: TicketType }) {
  return (
    <Card>
      <div className={s.content}>
        <div className={s.left}>
          <img src={airlinesLogo} className={s.logo} />
          <button className={s.button}>
            Купить <br /> за {ticket.price}₽
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
            {pluralize(ticket.stops, ["пересадка", "пересадки", "пересадок"])}
            <img src={stopsImage} />
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
