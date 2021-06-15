import { getCars } from './api';

const { items: cars, count: carsCount } = await getCars(1);
const animation: { [key: number]: { id: number } } = {};

export default {
  page: 1,
  cars,
  carsCount,
  animation,
};
