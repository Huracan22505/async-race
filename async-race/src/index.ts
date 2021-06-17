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
 <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
   width="100" height="50" viewBox="0 0 1280.000000 640.000000"
   preserveAspectRatio="xMidYMid meet">
    <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
      fill="${color}" stroke="none">
      <path d="M4235 5299 c-410 -26 -906 -96 -1140 -160 -136 -37 -293 -92 -495
      -174 -234 -95 -347 -148 -1048 -483 l-272 -131 -438 -56 c-240 -31 -454 -61
      -474 -66 -88 -23 -148 -157 -183 -409 -16 -117 -35 -427 -35 -595 l-1 -110
      -32 -20 c-39 -25 -71 -80 -91 -159 -14 -57 -13 -77 9 -296 l24 -235 -30 -43
      -31 -42 22 -45 c27 -57 125 -148 239 -223 l90 -59 238 -32 c131 -18 443 -62
      693 -98 250 -36 506 -69 569 -72 l115 -6 12 -50 c7 -27 36 -96 64 -151 197
      -392 691 -578 1190 -448 270 70 495 240 598 454 l47 97 186 -5 185 -5 33 42
      33 42 337 -6 c185 -3 838 -10 1451 -15 613 -6 1543 -15 2065 -20 934 -10 952
      -10 1065 10 63 11 124 22 135 25 17 3 29 -10 65 -73 53 -90 185 -229 279 -292
      270 -181 643 -244 952 -159 235 64 435 219 545 421 l39 72 135 33 c95 23 254
      47 540 82 l405 49 216 88 216 87 6 211 c3 126 12 249 22 306 28 157 7 286 -52
      313 -15 7 -27 24 -33 51 -45 176 -182 437 -288 548 -144 151 -827 325 -1798
      457 -321 44 -655 82 -929 106 l-179 15 -176 104 c-313 186 -695 393 -1067 579
      -334 167 -765 368 -843 392 -265 83 -655 134 -1175 155 -288 11 -1831 11
      -2010 -1z m1300 -191 c3 -13 41 -228 86 -478 51 -288 78 -467 74 -487 -7 -39
      -44 -70 -93 -79 -20 -4 -257 1 -526 10 -601 20 -1090 38 -1093 40 -5 4 -104
      888 -100 893 18 17 322 64 572 88 236 22 462 32 792 34 l283 1 5 -22z m942
      -13 c353 -30 557 -72 834 -170 222 -79 502 -225 714 -373 87 -61 242 -179 249
      -190 2 -4 -24 -7 -58 -8 -202 -2 -305 -242 -157 -367 l33 -27 -32 0 c-30 0
      -182 6 -1205 50 -274 12 -475 24 -498 31 -44 15 -112 70 -131 108 -12 23 -228
      629 -317 890 l-29 84 213 -7 c116 -4 289 -14 384 -21z m-2673 -142 c3 -21 26
      -209 51 -418 25 -209 46 -389 48 -400 2 -18 -3 -20 -68 -17 -38 1 -216 7 -395
      12 -179 6 -348 15 -377 21 -93 18 -163 86 -203 196 -55 153 17 248 305 404
      162 88 381 175 575 228 55 15 58 13 64 -26z m-3343 -833 c114 -78 161 -144
      194 -270 20 -78 30 -273 21 -401 l-8 -97 -219 -7 c-121 -4 -222 -5 -224 -3 -3
      2 0 95 5 207 15 324 50 492 117 570 19 23 39 41 44 41 6 0 37 -18 70 -40z
      m3349 -375 c18 -21 16 -64 -4 -83 -15 -15 -46 -17 -251 -17 -256 0 -267 2
      -267 59 0 55 4 56 267 56 204 0 245 -2 255 -15z m2894 -71 c20 -19 20 -54 2
      -80 -13 -18 -30 -19 -233 -22 -134 -2 -229 1 -246 7 -40 15 -54 53 -33 86 l16
      25 240 0 c204 0 241 -2 254 -16z m5607 -340 c32 -31 76 -80 98 -108 41 -53
      131 -204 131 -220 0 -9 -876 -3 -886 6 -7 8 132 292 152 309 39 33 69 41 212
      54 244 21 225 23 293 -41z m-1734 -507 c115 -39 201 -93 285 -177 61 -63 86
      -97 122 -172 61 -125 79 -213 73 -348 -6 -118 -28 -197 -84 -300 -156 -288
      -504 -426 -818 -326 -109 35 -196 88 -279 172 -83 82 -136 168 -173 279 -23
      70 -27 96 -27 210 0 114 4 140 27 210 78 237 273 415 512 469 102 23 268 15
      362 -17z m-7473 -77 c232 -59 416 -233 493 -465 23 -69 27 -98 27 -205 1 -104
      -3 -137 -22 -200 -72 -231 -248 -403 -487 -476 -92 -28 -276 -25 -375 5 -300
      92 -501 361 -500 673 0 107 24 201 76 308 142 286 478 440 788 360z"/>
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
    <div class="finish" id="finish-${id}">
      <img src="https://acegif.com/wp-content/gifs/race-flag-4.gif" alt="">
    </div>
  </div>
`;

const renderGarage = () => `
    <h2 class="title">Garage (${store.carsCount} cars)</h2>
    <p class="text">Page #${store.carsPage}</p>
    <ul class="cars">
      ${store.cars.map(car => `<li>${renderCar(car)}</li>`).join('')}
    </ul>
`;

const renderWinners = () => `
  <h2>Winners (${store.winnersCount})</h2>
  <p>Page #${store.winnersPage}</p>
<table>
<tr>
  <th>№</th>
  <th>Car</th>
  <th>Model</th>
      <th class="table-button table-wins ${
  store.sortBy === 'wins' ? store.sortOrder : ''
}	id="sort-by-wins">Wins</th>
      <th class="table-button table-time ${
  store.sortBy === 'time' ? store.sortOrder : ''
}	id="sort-by-time">Best time (sec)</th>
  </tr>
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

</table>`;

const render = () => {
  const markup = `
    <header class="header">
      <img src="https://media1.giphy.com/media/W643jDxPJXWQywrJwH/source.gif" alt="">
      <h1 class="title" >Async Race Game</h1>
      <button type="button" class="btn header-garage-btn">garage</button>
      <button type="button" class="btn header-winners-btn">winners</button>
    </header>
    <main id="garage-page">
      <div class="forms-container">
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
          <button class="btn" id="update-btn" type="submit" disabled >Update</button>
        </form>
      </div>
      <ul class="controls-list">
        <li class="item" ><button class="btn race-btn" id="race">Race</button></li>
        <li class="item" ><button class="btn reset-btn" id="reset" disabled>Reset</button></li>
        <li class="item" ><button class="btn generate-btn" id="generate">Generate</button></li>
      </ul>
      <div id="garage" class="garage">${renderGarage()}</div>
      <div>
        <p class="win-message hidden" id="win-message"></p>
      </div>
    </main>
    <div id="winners-page" class="winners-page" style="display: none">${renderWinners()}</div>
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
  car.style.transform = 'translateX(0) translateY(52px)';
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
