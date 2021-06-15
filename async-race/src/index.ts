import store from './api/store';

import './style.scss';

const renderGarage = () => `
    <h2>Garage (${store.carsCount} cars)</h2>
    <h3>Page #${store.page}</h3>
    <ul class="car-list"></ul>
`;

const render = () => {
  const markup = `
    <header class="header">
       <h1 class="hidden" >Async Race</h1>
      <button type="button" class="button header-garage-btn">garage</button>
      <button type="button" class="button header-winners-btn">winners</button>
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
          <button class="button" type="submit">Create</button>
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
          <button class="button" id="update-submit" type="submit">
            Update
          </button>
        </form>
      </div>
      <div class="controls">
        <button class="button race-btn" id="race">Race</button>
        <button class="button reset-btn" id="reset">Reset</button>
        <button class="button generate-btn" id="generate">Generate</button>
      </div>
      <div id="garage">${renderGarage()}</div>
    </div>
`;
  const app = document.createElement('div');
  app.innerHTML = markup;
  document.body.appendChild(app);
};

render();
