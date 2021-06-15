export default {
  root: document.querySelector('#root') as HTMLBodyElement,
  getCarElem: (id: number): HTMLElement =>
    document.getElementById(`car-${id}`) as HTMLElement,
  getFinishElem: (id: number): HTMLElement =>
    document.getElementById(`finish-${id}`) as HTMLDivElement,
  getStartBtn: (id: number): HTMLButtonElement =>
    document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement,
  getStopBtn: (id: number): HTMLButtonElement =>
    document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement,
};
