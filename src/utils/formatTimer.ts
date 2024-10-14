/*
time: 45
output: 0:45
*/

export const formatTimer = (time: number) => {
  const minutes = Math.floor(time / 60);
  const second = time % 60;
  return `${minutes}:${second < 10 ? '0' : ''}${second}`
}