import React, { useMemo, useState } from "react";
import logo from "./logo.svg";
import { Field } from "./components/Field/Field";
import s from "./App.module.css";
import data from "./tickets.json";
import { StopsCheckboxes } from "./components/StopsCheckboxes/StopsCheckboxes";
import { Card } from "./components/Card/Card";
import { Ticket } from "./components/Ticket/Ticket";
import moment from "moment";
import "moment/locale/ru";
import {
  CurrenciesSwitch,
  CurrrencyType,
} from "./components/CurrenciesSwitch/CurrenciesSwitch";
import { useCourses } from "./useCourses";

export interface TicketType {
  price: number;
  departure_time: string;
  origin: string;
  origin_name: string;
  departure_date: string;
  stops: number;
  arrival_time: string;
  destination: string;
  destination_name: string;
  arrival_date: string;
}

const sortedTickets: TicketType[] = data.tickets;
sortedTickets.sort((x, y) => (x.price > y.price ? 1 : -1));

moment.locale("ru");

function App() {
  const { courses, coursesLoading, coursesError } = useCourses();

  const [activeCurrency, setActiveCurrency] = useState<CurrrencyType>("RUB");

  const [stops, setStops] = useState<number[]>([]);
  const stopsCheckboxesAvailableValues = useMemo(
    () =>
      sortedTickets.reduce<number[]>((acc, ticket) => {
        if (!acc.includes(ticket.stops)) {
          acc.push(ticket.stops);
          acc.sort((x, y) => (x > y ? 1 : -1));
        }
        return acc;
      }, []),
    []
  );
  const filteredTickets = useMemo(() => {
    if (!stops.length) return sortedTickets;
    return sortedTickets.filter((ticket) => stops.includes(ticket.stops));
  }, [stops]);

  return (
    <div className={s.app}>
      <div className={s.left}>
        <Card>
          {!coursesError && (
            <Field name="ВАЛЮТА">
              {coursesLoading ? (
                <span className={s.coursesLoader}>loading...</span>
              ) : (
                <CurrenciesSwitch
                  activeCurrency={activeCurrency}
                  setActiveCurrency={setActiveCurrency}
                />
              )}
            </Field>
          )}
          <Field name="КОЛИЧЕСТВО ПЕРЕСАДОК">
            <StopsCheckboxes
              values={stops}
              availableValues={stopsCheckboxesAvailableValues}
              setValues={setStops}
            />
          </Field>
        </Card>
      </div>
      <div className={s.right}>
        {filteredTickets.map((ticket) => {
          return (
            <Ticket
              ticket={ticket}
              courses={courses}
              currency={activeCurrency}
              key={ticket.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
