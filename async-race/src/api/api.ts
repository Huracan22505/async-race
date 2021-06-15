const BASE_URL = 'http://localhost:3000';

export const getCars = async (
  page: number,
  limit = 7,
): Promise<{
  items: [];
  count: string | null;
}> => {
  const response = await fetch(
    `${BASE_URL}/garage?_page=${page}&_limit=${limit}`,
  );

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getStartEngine = async (
  id: number,
): Promise<{ velocity: number; distance: number }> =>
  (await fetch(`${BASE_URL}/engine?id=${id}&status=started`)).json();

export const getStopEngine = async (
  id: number,
): Promise<{ velocity: number; distance: number }> =>
  (await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`)).json();

export const getDriveStatus = async (
  id: number,
): Promise<{ success: boolean }> => {
  const res = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};
