import refs from './shared/refs';
import store from './api/store';
import {
  getCars,
  getWinners,
  getCarById,
  getDeleteCarById,
  getCreateCar,
  updateCar,
  getStartEngine,
  getStopEngine,
  getDriveStatus,
  saveWinner,
  deleteWinner,
} from './api/api';
import {
  getDistanceBtwElements,
  animation,
  generateRandomCars,
  race,
} from './shared/utils';
import './style.scss';

let selectedCar: { name: string; color: string; id: number };

// RENDER

const renderCarImg = (color: string) => `
  <svg
      version="1.1"
      id="car"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="79.536px"
      height="79.536px"
      viewBox="0 0 79.536 79.536"
      style="enable-background: new 0 0 79.536 79.536"
      xml:space="preserve"
    >
      <g>
        <path
          style="fill:${color};"
          d="M15.532,56.706c-3.977,0-7.213-3.242-7.213-7.197c0-3.998,3.236-7.224,7.213-7.224
      c3.987,0,7.226,3.226,7.226,7.224C22.758,53.463,19.519,56.706,15.532,56.706z
      M15.532,45.604c-2.128,0-3.876,1.75-3.876,3.883c0,2.129,1.748,3.879,3.876,3.879c2.141,0,3.886-1.75,
      3.886-3.879C19.418,47.354,17.673,45.604,15.532,45.604z M64.137,56.706
      c-3.987,0-7.219-3.242-7.219-7.197c0-3.998,3.231-7.224,7.219-7.224c3.977,0,7.208,3.226,7.208,7.224
      C71.345,53.463,68.113,56.706,64.137,56.706z M64.137,45.604c-2.144,0-3.895,1.75-3.895,3.883c0,2.129,
      1.751,3.879,3.895,3.879
      c2.139,0,3.884-1.75,3.884-3.879C68.021,47.354,66.275,45.604,64.137,45.604z M78.138,44.091
      c0-7.011-4.365-7.842-4.365-7.842
      c-6.426-0.912-17.496-1.38-17.496-1.38c-1.016-1.766-5.707-12.039-8.44-12.039c-0.911,0-20.508,0-23.975,0
      c-3.472,0-9.167,10.024-10.413,12.285c0,0-4.36,0.758-6.416,1.219c-1.142,0.265-4.301,0.324-4.301,9.155H0v3.997h6.654
      c0-4.908,3.982-8.885,8.878-8.885c4.914,0,8.886,3.977,8.886,8.885h30.827c0-4.908,3.967-8.885,8.892-8.885
      c4.898,0,8.875,3.977,8.875,8.885h6.524v-5.396H78.138z M35.589,34.191H21.751c1.872-5.831,5.339-9.994,6.801-9.994
      c1.841,0,7.037,0,7.037,0V34.191z M38.168,34.191v-9.994c0,0,7.141,0,8.974,0c1.854,
      0,5.893,8.461,7.032,10.625L38.168,34.191z"
        />
      </g>
    </svg>
`;

const renderCar = ({
  id,
  name,
  color,
  isEngineStarted,
}: {
  id: string;
  name: string;
  color: string;
  isEngineStarted: boolean;
}) => `
  <div class="select-car-buttons">
    <button class="btn select-btn" id="select-car-${id}">Select</button>
    <button class="btn remove-btn" id="remove-car-${id}">Remove</button>
    <span class="car-model">${name}</span>
  </div>
  <div class="way">
    <div class="car-control-container">
      <div class="engine-panel">
        <button class="engine-icon start-engine-btn" id="start-engine-car-${id}" ${
  isEngineStarted ? 'disabled' : ''
}>Start</button>
        <button class="engine-icon stop-engine-btn" id="stop-engine-car-${id}" ${
  !isEngineStarted ? 'disabled' : ''
}>Stop</button>
      </div>
      <div class="car" id="car-${id}">
        ${renderCarImg(color)}
      </div>
    </div>
    <div class="finish" id="finish-${id}">🚩</div>
  </div>
`;

const renderGarage = () => `
    <h2>Garage (${store.carsCount} cars)</h2>
    <p>Page #${store.carsPage}</p>
    <ul class="cars">
      ${store.cars.map(car => `<li>${renderCar(car)}</li>`).join('')}
    </ul>
`;

const renderWinners = () => `
  <h2>Winners (${store.winnersCount})</h2>
  <p>Page #${store.winnersPage}</p>
  <table class="table" cellspacing="0" border="0" cellpadding="0">
    <thead>
      <th>№</th>
      <th>Car</th>
      <th>Model</th>
      <th class="table-button table-wins ${
  store.sortBy === 'wins' ? store.sortOrder : ''
}	id="sort-by-wins">Wins</th>
      <th class="table-button table-time ${
  store.sortBy === 'time' ? store.sortOrder : ''
}	id="sort-by-time">Best time (seconds)</th>
    </thead>
    <tbody>
      ${store.winners
    .map(
      (
        winner: {
          car: { name: string; color: string };
          wins: number;
          time: number;
        },
        index,
      ) => `
        <tr>
          <td>${index + 1}</td>
          <td>${renderCarImg(winner.car.color)}</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        </tr>
      `,
    )
    .join('')}
    </tbody>
  </table>
`;

const render = () => {
  const markup = `
    <header class="header">
      <h1 class="title" >Async Race Game</h1>
      <button type="button" class="btn header-garage-btn">garage</button>
      <button type="button" class="btn header-winners-btn">winners</button>
    </header>
    <div id="garage-page">
      <div>
        <form class="form" id="create-form">
          <input class="input" id="create-name" name="name" type="text" />
          <input
            class="color"
            id="create-color"
            name="color"
            type="color"
            value="#ffffff"
          />
          <button class="btn" type="submit">Create</button>
        </form>
        <form class="form" id="update-form">
          <input
            class="input"
            id="update-name"
            name="name"
            type="text"
            disabled
          />
          <input
            class="color"
            id="update-color"
            name="color"
            type="color"
            value="#ffffff"
            disabled
          />
          <button class="btn" id="update-btn" type="submit">Update</button>
        </form>
      </div>
      <div class="controls">
        <button class="btn race-btn" id="race">Race</button>
        <button class="btn reset-btn" id="reset" disabled>Reset</button>
        <button class="btn generate-btn" id="generate">Generate</button>
      </div>
      <div id="garage">${renderGarage()}</div>
      <div>
        <p class="win-message hidden" id="win-message"></p>
      </div>
    </div>
    <div id="winners-page" style="display: none">${renderWinners()}</div>
    <div class="pagination">
      <button class="btn prev-button" disabled id="prev">←</button>
      <button class="btn next-button" disabled id="next">→</button>
    </div>
`;
  const app = document.createElement('div');
  app.innerHTML = markup;
  document.body.appendChild(app);
};

render();

// DRIVING

const updateGarage = async () => {
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

await updateGarage();

const updateStateWinners = async () => {
  const { items, count } = await getWinners({
    page: store.winnersPage,
    sort: store.sortBy,
    order: store.sortOrder,
  });

  store.winners = items;
  store.winnersCount = count;

  if (store.winnersPage * 10 < Number(store.winnersCount)) {
    const nextBtn = document.getElementById('next') as HTMLButtonElement;
    nextBtn.disabled = false;
  } else {
    const nextBtn = document.getElementById('next') as HTMLButtonElement;
    nextBtn.disabled = true;
  }
  if (store.winnersPage > 1) {
    const prevBtn = document.getElementById('prev') as HTMLButtonElement;
    prevBtn.disabled = false;
  } else {
    const prevBtn = document.getElementById('prev') as HTMLButtonElement;
    prevBtn.disabled = true;
  }
};

const setSortOrder = async (sortBy: string) => {
  store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
  store.sortBy = sortBy;

  await updateStateWinners();
  const winnersPage = document.getElementById('winners-page') as HTMLDivElement;
  winnersPage.innerHTML = renderWinners();
};

const startDriving = async (id: number) => {
  const startBtn = refs.getStartBtn(id);
  startBtn.disabled = true;
  startBtn.classList.toggle('enabling', true);

  const {
    velocity,
    distance,
  }: {
    velocity: number;
    distance: number;
  } = await getStartEngine(id);

  const time = Math.round(distance / velocity);

  startBtn.classList.toggle('enabling', false);

  const stopBtn = refs.getStopBtn(id);
  stopBtn.disabled = false;

  const car = refs.getCarElem(id);
  const finish = refs.getFinishElem(id);
  const distanceBtwElem = Math.floor(getDistanceBtwElements(car, finish)) + 100;

  store.animation[id] = animation(car, distanceBtwElem, time);

  const { success } = await getDriveStatus(id);
  if (!success) window.cancelAnimationFrame(store.animation[id].id);

  return { success, id, time };
};

const stopDriving = async (id: number) => {
  const stopBtn = refs.getStopBtn(id);
  stopBtn.disabled = true;
  stopBtn.classList.toggle('enabling', true);

  await getStopEngine(id);

  stopBtn.classList.toggle('enabling', false);

  const startBtn = refs.getStartBtn(id);
  startBtn.disabled = false;

  const car = refs.getCarElem(id);
  car.style.transform = 'translateX(0)';
  if (store.animation[id]) window.cancelAnimationFrame(store.animation[id].id);
};

// MAIN LISTENER

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
    raceBtn.disabled = true;

    const winner = await race(startDriving);
    await saveWinner(winner);

    const winMessage = document.getElementById('win-message') as HTMLElement;
    winMessage.innerHTML = `${winner.name} win for ${winner.time} secs!`;
    winMessage.classList.remove('hidden');

    const resetBtn = document.getElementById('reset') as HTMLButtonElement;
    resetBtn.disabled = false;
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
    await updateStateWinners();
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
        await updateStateWinners();
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
        await updateStateWinners();
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
  nameInput.disabled = true;
  colorInput.disabled = true;
  colorInput.value = '';
});
