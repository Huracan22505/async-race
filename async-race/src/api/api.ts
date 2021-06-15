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
