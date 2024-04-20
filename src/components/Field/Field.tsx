import { ReactNode } from "react";
import s from "./Field.module.css";

export function Field({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className={s.name}>{name}</div>
      {children}
    </div>
  );
}
