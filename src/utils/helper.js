export const compareWithCurrentDate = (givenDate) => {
  const now = new Date();
  const currDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [dd, mm, yy] = givenDate.split("/");
  const formattedGivenDate = new Date(yy, mm - 1, dd);

  return +currDate === +formattedGivenDate;
};

export const checkCurrentTimeIsInGivenRange = (range) => {
  const now = new Date();
  const hr = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const mns = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const currTime = `${hr}:${mns}`;
  return currTime >= range[0] && currTime <= range[1];
};

const getMinutes = (s) => {
  const p = s.split(":").map(Number);
  return p[0] * 60 + p[1];
};

export const checkSlotAvailability = (newSlot, oldSlot) => {
  const [startA, endA] = newSlot;
  const [startB, endB] = oldSlot;
  const desiredSlot = {
    start: startA,
    end: endA,
  };
  const existSlot = {
    start: startB,
    end: endB,
  };
  return (
    getMinutes(desiredSlot.end) > getMinutes(existSlot.start) &&
    getMinutes(existSlot.end) > getMinutes(desiredSlot.start)
  );

  //   const isSlotCollide = Math.max(startA, startB) <= Math.min(endA, endB);
  //   console.log(
  //     `${startA}, ${endA} ${startB}, ${endB} isCollide: `,
  //     isSlotCollide
  //   );
  //   return !isSlotCollide;
};
