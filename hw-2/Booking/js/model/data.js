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

let today = new Date();

const dateOptions = {
  year: `numeric`,
  month: `long`,
  day: `numeric`,
  weekday: `long`
};

export const Day = {
  FIRST: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toLocaleString(`ru`, dateOptions),
  SECOND: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toLocaleString(`ru`, dateOptions),
  THIRD: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).toLocaleString(`ru`, dateOptions),
  FOURTH: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3).toLocaleString(`ru`, dateOptions),
  FIFTH: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4).toLocaleString(`ru`, dateOptions),
  SIXTH: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).toLocaleString(`ru`, dateOptions),
  SEVENTH: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6).toLocaleString(`ru`, dateOptions),
};

export const state = {
  rooms: [
    {
      number: 1,
      type: RoomType.LUX,
      cost: RoomCost.LUX,
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
