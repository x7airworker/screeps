/* eslint-disable eqeqeq */
/* eslint-disable no-bitwise */
export default function (): string {
  let dt = new Date().getTime();
  const uuid = "4xxx-yxxx".replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
