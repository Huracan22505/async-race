import refs from '../../shared/refs';
import store from '../../servises/store';
import { renderCar } from '../car';
import { startDriving, stopDriving } from '../../shared/driving';
import { getCars } from '../../servises/api';

export const renderGarage = (): string => `
    <h2 class="title">Garage (${store.carsCount} cars)</h2>
    <p class="text">Page #${store.carsPage}</p>
    <ul class="cars">
      ${store.cars.map(car => `<li>${renderCar(car)}</li>`).join('')}
    </ul>
`;

export const updateGarage = async (): Promise<void> => {
  const { items, count } = await getCars(store.carsPage);
  store.cars = items;
  store.carsCount = count;

  if (store.carsPage * 7 < Number(store.carsCount)) {
    const nextBtn = document.getElementById('next') as HTMLButtonElement;
    nextBtn.disabled = false;
  } else {
    const nextBtn = document.getElementById('next') as HTMLButtonElement;
    nextBtn.disabled = true;
  }
  if (store.carsPage > 1) {
    const prevBtn = document.getElementById('prev') as HTMLButtonElement;
    prevBtn.disabled = false;
  } else {
    const prevBtn = document.getElementById('prev') as HTMLButtonElement;
    prevBtn.disabled = true;
  }
};

refs.root.addEventListener('click', async event => {
  const target = <HTMLElement>event.target;

  if (target.classList.contains('start-engine-btn')) {
    const id = Number(target.id.split('start-engine-car-')[1]);
    startDriving(id);
  }

  if (target.classList.contains('stop-engine-btn')) {
    const id = Number(target.id.split('stop-engine-car-')[1]);
    stopDriving(id);
  }
});
