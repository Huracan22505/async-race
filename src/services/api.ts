import { Cars, SimpleCar, Car, Engine, Winner, Winners } from '../shared/types';

const BASE_URL = 'http://localhost:3000';

export const getCars = async (page: number, limit = 7): Promise<Cars> => {
  const response = await fetch(
    `${BASE_URL}/garage?_page=${page}&_limit=${limit}`,
  );

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCarById = async (id: string): Promise<Car> =>
  (await fetch(`${BASE_URL}/garage/${id}`)).json();

export const getCreateCar = async (car: {
  name: string;
  color: string;
}): Promise<Response> =>
  (
    await fetch(`${BASE_URL}/garage`, {
      method: 'POST',
      body: JSON.stringify(car),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const getDeleteCarById = async (id: number): Promise<Car> =>
  (await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' })).json();

export const updateCar = async (id: number, body: SimpleCar): Promise<void> =>
  (
    await fetch(`${BASE_URL}/garage/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const getStartEngine = async (id: number): Promise<Engine> =>
  (await fetch(`${BASE_URL}/engine?id=${id}&status=started`)).json();

export const getStopEngine = async (id: number): Promise<Engine> =>
  (await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`)).json();

export const getDriveStatus = async (
  id: number,
): Promise<{ success: boolean }> => {
  const res = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

// WINNERS

const getSortOrder = (sort?: string | null, order?: string | null) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const getWinners = async ({
  page,
  limit = 10,
  sort,
  order,
}: {
  page: number;
  limit?: number;
  sort?: string | null;
  order?: string | null;
}): Promise<Winners> => {
  const response = await fetch(
    `${BASE_URL}/winners?_page=${page}&_limit=${limit}${getSortOrder(
      sort,
      order,
    )}`,
  );

  const items = await response.json();

  return {
    items: await Promise.all(
      items.map(async (winner: Winner) => ({
        ...winner,
        car: await getCarById(winner.id.toString()),
      })),
    ),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number): Promise<Winner> =>
  (await fetch(`${BASE_URL}/winners/${id}`)).json();

export const getWinnerStatus = async (id: number): Promise<number> =>
  (await fetch(`${BASE_URL}/winners/${id}`)).status;

export const createWinner = async (body: Winner): Promise<void> =>
  (
    await fetch(`${BASE_URL}/winners`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const deleteWinner = async (id: number): Promise<void> =>
  (await fetch(`${BASE_URL}/winners/${id}`, { method: 'DELETE' })).json();

export const updateWinner = async (id: number, body: Winner): Promise<void> =>
  (
    await fetch(`${BASE_URL}/winners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const saveWinner = async ({
  id,
  time,
}: {
  id: number;
  time: number;
}): Promise<void> => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
