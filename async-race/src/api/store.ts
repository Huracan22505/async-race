import { getCars } from './api';

const { items: cars, count: carsCount } = await getCars(1);

export default {
  page: 1,
  cars,
  carsCount,
};
