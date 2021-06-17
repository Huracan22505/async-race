import { renderPage } from './components/page';
import { renderGarage, updateGarage } from './components/garage';
import { renderWinners, updateWinners } from './components/winners';
import { startDriving, stopDriving } from './shared/driving';
import refs from './shared/refs';
import store from './servises/store';
import {
  getCreateCar,
  updateCar,
  saveWinner,
  getCarById,
  getDeleteCarById,
  deleteWinner,
} from './servises/api';
import { generateRandomCars, race } from './shared/utils';
import './style.scss';

let selectedCar: { name: string; color: string; id: number };

renderPage();

await updateGarage();

const setSortOrder = async (sortBy: string) => {
  store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
  store.sortBy = sortBy;

  await updateWinners();
  const winnersPage = document.getElementById('winners-page') as HTMLDivElement;
  winnersPage.innerHTML = renderWinners();
};

// MAIN LISTENER

refs.root.addEventListener('click', async event => {
  const target = <HTMLElement>event.target;

  if (target.classList.contains('generate-btn')) {
    const generateBtn = <HTMLButtonElement>event.target;
    generateBtn.disabled = true;

    const generatedCars = generateRandomCars();

    await Promise.all(generatedCars.map(async car => getCreateCar(car)));
    await updateGarage();
    const garage = document.getElementById('garage') as HTMLDivElement;
    garage.innerHTML = renderGarage();
    generateBtn.disabled = false;
  }

  if (target.classList.contains('race-btn')) {
    const raceBtn = <HTMLButtonElement>event.target;
    const winMessage = document.getElementById('win-message') as HTMLElement;

    raceBtn.disabled = true;

    const resetBtn = document.getElementById('reset') as HTMLButtonElement;
    resetBtn.disabled = false;

    const winner = await race(startDriving);
    winMessage.innerHTML = `${winner.name} win for ${winner.time} secs!`;
    winMessage.classList.remove('hidden');
    await saveWinner(winner);
  }

  if (target.classList.contains('reset-btn')) {
    const resetBtn = <HTMLButtonElement>event.target;

    resetBtn.disabled = true;

    store.cars.map(({ id }) => stopDriving(id));
    const winMessage = document.getElementById('win-message') as HTMLElement;
    winMessage.classList.add('hidden');
    const raceBtn = document.getElementById('race') as HTMLButtonElement;
    raceBtn.disabled = false;
  }

  if (target.classList.contains('header-garage-btn')) {
    const garagePage = document.getElementById('garage-page') as HTMLDivElement;
    const winnersPage = document.getElementById(
      'winners-page',
    ) as HTMLDivElement;

    await updateGarage();

    garagePage.style.display = 'block';
    winnersPage.style.display = 'none';
  }
  if (target.classList.contains('header-winners-btn')) {
    const garagePage = document.getElementById('garage-page') as HTMLDivElement;
    const winnersPage = document.getElementById(
      'winners-page',
    ) as HTMLDivElement;

    winnersPage.style.display = 'block';
    garagePage.style.display = 'none';
    await updateWinners();
    winnersPage.innerHTML = renderWinners();
  }

  if (target.classList.contains('prev-button')) {
    switch (store.view) {
      case 'garage': {
        store.carsPage -= 1;
        await updateGarage();

        const garage = document.getElementById('garage') as HTMLDivElement;
        garage.innerHTML = renderGarage();
        break;
      }
      case 'winners': {
        store.winnersPage -= 1;
        await updateWinners();
        const winners = document.getElementById(
          'winners-page',
        ) as HTMLDivElement;
        winners.innerHTML = renderWinners();
        break;
      }
      default:
        return;
    }
  }

  if (target.classList.contains('next-button')) {
    switch (store.view) {
      case 'garage': {
        store.carsPage += 1;
        await updateGarage();
        const garage = document.getElementById('garage') as HTMLDivElement;

        garage.innerHTML = renderGarage();
        break;
      }
      case 'winners': {
        store.winnersPage += 1;
        await updateWinners();
        const winners = document.getElementById(
          'winners-page',
        ) as HTMLDivElement;

        winners.innerHTML = renderWinners();
        break;
      }
      default:
    }
  }

  if (target.classList.contains('table-wins')) {
    setSortOrder('wins');
  }
  if (target.classList.contains('table-time')) {
    setSortOrder('time');
  }

  if (target.classList.contains('select-btn')) {
    const carUpdName = document.getElementById(
      'update-name',
    ) as HTMLInputElement;
    const carUpdColor = document.getElementById(
      'update-color',
    ) as HTMLInputElement;
    const updateBtn = document.getElementById(
      'update-btn',
    ) as HTMLButtonElement;

    selectedCar = await getCarById(target.id.split('select-car-')[1]);

    carUpdName.value = selectedCar.name;
    carUpdColor.value = selectedCar.color;
    carUpdName.disabled = false;
    carUpdColor.disabled = false;
    updateBtn.disabled = false;
  }

  if (target.classList.contains('remove-btn')) {
    const id = Number(target.id.split('remove-car-')[1]);
    await getDeleteCarById(id);
    await deleteWinner(id);
    await updateGarage();
    const garage = document.getElementById('garage') as HTMLDivElement;
    garage.innerHTML = renderGarage();
  }
});

// LISTENERS CREATE / UPDATE

const createForm = document.getElementById('create-form') as HTMLFormElement;

createForm.addEventListener('submit', async event => {
  event.preventDefault();

  const garage = document.getElementById('garage') as HTMLDivElement;
  const nameInput = document.getElementById('create-name') as HTMLInputElement;
  const colorInput = document.getElementById(
    'create-color',
  ) as HTMLInputElement;

  const car = { name: nameInput.value, color: colorInput.value };

  await getCreateCar(car);
  await updateGarage();

  garage.innerHTML = renderGarage();
  nameInput.value = '';
  colorInput.value = '';
});

const updateForm = document.getElementById('update-form') as HTMLFormElement;

updateForm.addEventListener('submit', async event => {
  event.preventDefault();

  const updateBtn = document.getElementById('update-btn') as HTMLButtonElement;
  const garage = document.getElementById('garage') as HTMLDivElement;
  const nameInput = document.getElementById('update-name') as HTMLInputElement;
  const colorInput = document.getElementById(
    'update-color',
  ) as HTMLInputElement;

  const car = { name: nameInput.value, color: colorInput.value };

  await updateCar(selectedCar.id, car);
  await updateGarage();

  garage.innerHTML = renderGarage();
  nameInput.value = '';
  updateBtn.disabled = true;
  nameInput.disabled = true;
  colorInput.disabled = true;
  colorInput.value = '';
});
