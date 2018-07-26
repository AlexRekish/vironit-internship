export const RoomStatus = {
  FREE: `Свободен`,
  BUSY: `Занят`,
  PENDING: `Бронируется`
};

const RoomType = {
  LUX: `Люкс`,
  STANDARD: `Стандарт`
};

const RoomCost = {
  LUX: 3000,
  STANDARD: 1500
};

export const TODAY = new Date();

export const nowDate = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());

export const WEEK = 7;

export const getDate = (increment) => {
  const dateOptions = {
    year: `numeric`,
    month: `long`,
    day: `numeric`,
    weekday: `long`
  };
  return new Date(TODAY.getFullYear(),
      TODAY.getMonth(),
      TODAY.getDate() + +increment).toLocaleString(`ru`, dateOptions);
};

export const state = localStorage.getItem(`state`) ? JSON.parse(localStorage.getItem(`state`)) : {
  inPending: {
    status: false,
    roomNumber: ``,
  },
  inCancel: {
    status: false,
    roomNumber: ``,
    reservedNumber: ``,
  },
  rooms: [
    {
      number: 1,
      type: RoomType.LUX,
      cost: RoomCost.LUX,
      isPending: false,
      dates: [
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE
      ],
    },
    {
      number: 2,
      type: RoomType.LUX,
      cost: RoomCost.LUX,
      isPending: false,
      dates: [
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE
      ],
    },
    {
      number: 3,
      type: RoomType.STANDARD,
      cost: RoomCost.STANDARD,
      isPending: false,
      dates: [
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE
      ],
    }, {
      number: 4,
      type: RoomType.STANDARD,
      cost: RoomCost.STANDARD,
      isPending: false,
      dates: [
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE
      ],
    }, {
      number: 5,
      type: RoomType.STANDARD,
      cost: RoomCost.STANDARD,
      isPending: false,
      dates: [
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE,
        RoomStatus.FREE
      ],
    }
  ]
};

export const reservedNumbers = localStorage.getItem(`reserved`)
  ? JSON.parse(localStorage.getItem(`reserved`))
  : [{
    roomNumber: ``,
    numbersOfDateCell: [],
    date: +nowDate,
  }];

export const getFinalCost = (days, cost) => {
  const countOfDays = +days || 0;
  const finalCost = +cost || 0;
  return countOfDays * finalCost;
};

export const updateCells = (orders) => {
  orders.forEach((val, roomIndex) => {
    if (val.date !== +nowDate) {
      const days = +nowDate - +val.date;
      val.numbersOfDateCell.forEach((cell, i) => {
        const shift = cell - days / (1000 * 3600 * 24);
        if (shift >= 1) {
          if (state.rooms[val.roomNumber]) {
            state.rooms[val.roomNumber].dates[cell] = RoomStatus.FREE;
            state.rooms[val.roomNumber].dates[shift] = RoomStatus.BUSY;
          }
          orders[roomIndex].numbersOfDateCell[i] = cell - days;
        } else {
          state.rooms[val.roomNumber].dates.splice(0, Math.abs(shift));
          state.rooms[val.roomNumber].dates.push(...(new Array(Math.abs(shift)).fill(RoomStatus.FREE)));
          orders[roomIndex].numbersOfDateCell.splice(i, 1);
        }
      });
    }
  });
};
