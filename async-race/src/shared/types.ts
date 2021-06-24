export type Cars = {
  items: [];
  count: string | null;
};

export type Car = {
  name: string;
  color: string;
  id: number;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type Winners = {
  items: Array<{
    car: { name: string; color: string; id: number };
    id: number;
    time: number;
    wins: number;
  }>;
  count: string | null;
};

export type Engine = { velocity: number; distance: number };

export type Race = {
  name: string;
  color: string;
  id: number;
  time: number;
};
