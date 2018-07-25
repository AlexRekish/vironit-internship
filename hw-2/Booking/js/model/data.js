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

export const WEEK = 7;
export const getDate = (increment) => {
  let today = new Date();
  const dateOptions = {
    year: `numeric`,
    month: `long`,
    day: `numeric`,
    weekday: `long`
  };
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + increment).toLocaleString(`ru`, dateOptions);
};

export const state = localStorage.getItem(`state`) ? JSON.parse(localStorage.getItem(`state`)) : {
  inPending: {
    status: false,
    roomNumber: ``,
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
