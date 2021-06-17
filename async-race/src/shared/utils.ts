import store from '../servises/store';

// ANIMAION

const getElemPosition = (elem: HTMLElement) => {
  const { top, left, width, height } = elem.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};

export const getDistanceBtwElements = (
  firstElem: HTMLElement,
  secondElem: HTMLElement,
): number => {
  const firstElemPos = getElemPosition(firstElem);
  const secondElemPos = getElemPosition(secondElem);

  return Math.hypot(
    firstElemPos.x - secondElemPos.x,
    firstElemPos.y - secondElemPos.y,
  );
};

export const animation = (
  car: HTMLElement,
  distanceBtwElem: number,
  animationTime: number,
): { id: number } => {
  let start: number | null = null;
  const state: {
    id: number;
  } = { id: 1 };

  const getStep = (timestamp: number) => {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distanceBtwElem / animationTime));
    car.style.transform = `translateX(${Math.min(
      passed,
      distanceBtwElem,
    )}px) translateY(52px)`;

    if (passed < distanceBtwElem) {
      state.id = window.requestAnimationFrame(getStep);
    }
  };

  state.id = window.requestAnimationFrame(getStep);

  return state;
};

// GENERATE CARS

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
  const hexLetters = '0123456789ABCDEF';
  let carColor = '#';

  for (let i = 0; i < 6; i += 1) {
    carColor += hexLetters[Math.floor(Math.random() * 16)];
  }

  return carColor;
};

export const generateRandomCars = (
  carCount = 100,
): Array<{ name: string; color: string }> =>
  new Array(carCount)
    .fill(1)
    .map(() => ({ name: getRandomCarName(), color: getRandomCarColor() }));

// RACE

export const raceAll = async (
  promises: Array<
  Promise<{
    time: number;
    id: number;
    success: boolean;
  }>
  >,
  ids: number[],
): Promise<{
  name: string;
  color: string;
  id: number;
  time: number;
}> => {
  const { success, id, time } = await Promise.race(promises);

  if (!success) {
    const failedIndex = ids.findIndex(i => i === id);
    const restPromises = [
      ...promises.slice(0, failedIndex),
      ...promises.slice(failedIndex + 1, promises.length),
    ];
    const restIds = [
      ...ids.slice(0, failedIndex),
      ...ids.slice(failedIndex + 1, ids.length),
    ];
    return raceAll(restPromises, restIds);
  }

  const winner: {
    name: string;
    color: string;
    id: number;
  } = store.cars.filter(
    (car: { name: string; color: string; id: number }): boolean =>
      car.id === id,
  )[0];

  return {
    ...winner,
    time: Number((time / 1000).toFixed(2)),
  };
};

export const race = async (action: {
  (id: number): Promise<{
    success: boolean;
    id: number;
    time: number;
  }>;
}): Promise<{
  name: string;
  color: string;
  id: number;
  time: number;
}> => {
  const promises = store.cars.map(({ id }) => action(id));

  const winner = await raceAll(
    promises,
    store.cars.map(
      (car: { name: string; color: string; id: number }) => car.id,
    ),
  );

  return winner;
};
