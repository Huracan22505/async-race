import { SimpleCar } from '../types';

const hexLetters = '0123456789ABCDEF';
const brands = [
  'Nissan',
  'Porsche',
  'Audi',
  'Hyundai',
  'Ford',
  'Volkswagen',
  'Honda',
  'BMW',
  'Mercedes-Benz',
  'Toyota',
];
const models = [
  'Juke',
  'Cayenne',
  'A4',
  'Elantra',
  'Fusion',
  'Jetta',
  'Civic',
  'M5',
  'G63',
  'Camry',
];

const getRandomCarName = () => {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];

  return `${brand} ${model}`;
};

const getRandomCarColor = () => {
  let carColor = '#';

  for (let i = 0; i < 6; i += 1) {
    carColor += hexLetters[Math.floor(Math.random() * 16)];
  }

  return carColor;
};

export const generateRandomCars = (carCount = 100): Array<SimpleCar> =>
  new Array(carCount)
    .fill(1)
    .map(() => ({ name: getRandomCarName(), color: getRandomCarColor() }));
