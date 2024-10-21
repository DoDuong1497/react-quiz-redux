export const formatTimer = (time: number) => {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  return `${minute} : ${second < 10 ? "0" : ""}${second}`;
};
