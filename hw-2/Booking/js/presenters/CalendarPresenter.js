import AbstractPresenter from './AbstractPresenter';
import CalendarView from '../views/CalendarView';
import * as data from '../model/data';
import orderPresenter from './OrderPresenter';

class CalendarPresenter extends AbstractPresenter {
  constructor() {
    super(new CalendarView());
  }

  listener() {
    this.view.onDateSelected = (evt, rows) => {
      if (evt.target.tagName === `TD`) {
        const roomNumber = [...rows].findIndex((val) => val === evt.target.parentNode);
        const selectedDate = [...rows[roomNumber].children].findIndex((val) => val === evt.target);
        this.checkRoomReserve(roomNumber, data.state.rooms[roomNumber].dates, selectedDate);
      }
    };
  }

  checkRoomReserve(roomNumber, dates, selectedDate) {
    const datesCounter = dates.filter((val) => val === data.RoomStatus.PENDING);
    if (datesCounter.length > 0 || dates[selectedDate - 1] === data.RoomStatus.BUSY) {
      if (dates[selectedDate - 2] !== data.RoomStatus.PENDING && dates[
          selectedDate - 1] !== data.RoomStatus.PENDING) {
        return;
      }
    }
    this.reserveRoom(roomNumber, selectedDate);
  }

  reserveRoom(roomNumber, selectedDate) {
    // проверяем бронируется ли уже что-нибудь
    if (!data.state.inPending.status) {
      data.state.rooms[roomNumber].dates[selectedDate - 1] = data.RoomStatus.PENDING;
      data.state.inPending.status = true;
      data.state.rooms[roomNumber].isPending = true;
      data.state.inPending.roomNumber = roomNumber;
      this.onReserveRoom();
    } else if (data.state.rooms[roomNumber].dates[selectedDate - 1] === data.RoomStatus.FREE && data.state.rooms[roomNumber].isPending) {
      /* Если уже бронируется, то проверяем дату только для этой комнаты. Если комната свободна, то добавляем к брони*/
      data.state.rooms[roomNumber].dates[selectedDate - 1] = data.RoomStatus.PENDING;
      this.onReserveRoom();
    } else if (data.state.rooms[roomNumber].dates[selectedDate - 1] === data.RoomStatus.PENDING && data.state.rooms[roomNumber].isPending) {
      /* Если на данную дату комната уже бронируется, то удаляем из брони и проверяем, есть ли еще даты в процессе бронирования. Если нет дат в процессе бронирования, то меняем статус комнаты и всей таблицы на "FREE" */
      data.state.rooms[roomNumber].dates[selectedDate - 1] = data.RoomStatus.FREE;
      const inPending = data.state.rooms[roomNumber].dates.findIndex((val) => val === data.RoomStatus.PENDING);
      if (inPending === -1) {
        data.state.inPending.status = false;
        data.state.rooms[roomNumber].isPending = false;
        data.state.inPending.roomNumber = ``;
        this.init();
        return;
      }
      this.onReserveRoom();
    }
  }
  onReserveRoom() {
    this.listener();
    this.switchScreens(this.view.element, orderPresenter.view.element);
  }
}

const calendarPresenter = new CalendarPresenter();

export default calendarPresenter;
