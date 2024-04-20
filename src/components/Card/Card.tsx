import { ReactNode } from "react";
import s from "./Card.module.css";

export function Card({ children }: { children: ReactNode }) {
  return <div className={s.card}>{children}</div>;
}
