import { useState, useEffect } from "react";

export type Movement = {
  id: number;
  concept: string;
  amount: number;
  date: string;
  type: string;
};

export function useMovements() {
  const [data, setData] = useState<Movement[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetch("/api/movements")
      .then((res) => res.json())
      .then((rows: Movement[]) => {
        setData(rows);
        const bal = rows.reduce(
          (acc, r) => acc + (r.type === "INGRESO" ? r.amount : -r.amount),
          0
        );
        setBalance(bal);
      });
  }, []);

  return { data, balance };
}
