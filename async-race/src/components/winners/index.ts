import store from '../../servises/store';
import { getWinners } from '../../servises/api';
import { renderCarImg } from '../car';

export const renderWinners = (): string => `
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

export const updateWinners = async (): Promise<void> => {
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
