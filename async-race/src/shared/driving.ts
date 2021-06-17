import refs from './refs';
import store from '../servises/store';
import { getStartEngine, getDriveStatus, getStopEngine } from '../servises/api';
import { getDistanceBtwElements, animation } from './utils';

export const startDriving = async (
  id: number,
): Promise<{
  success: boolean;
  id: number;
  time: number;
}> => {
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

export const stopDriving = async (id: number): Promise<void> => {
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
