import refs from '../../shared/refs';
import store from '../../services/store';
import { renderCar } from '../car';
import { startDriving, stopDriving } from '../../shared/driving';
import { getCars } from '../../services/api';

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

  const nextBtn = document.getElementById('next') as HTMLButtonElement;
  nextBtn.disabled = store.carsPage * 7 >= Number(store.carsCount);

  const prevBtn = document.getElementById('prev') as HTMLButtonElement;
  prevBtn.disabled = store.carsPage <= 1;
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
