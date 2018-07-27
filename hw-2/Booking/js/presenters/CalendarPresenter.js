import AbstractPresenter from './AbstractPresenter';
import CalendarView from '../views/CalendarView';
import {state, RoomStatus, reservedNumbers} from '../model/data';
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
        this.checkRoomReserve(roomNumber, state.rooms[roomNumber].dates, selectedDate);
      }
    };
  }

  checkRoomReserve(roomNumber, dates, selectedDate) {
    const datesCounter = dates.filter((val) => val === RoomStatus.PENDING);
    if ((datesCounter.length > 0 && dates[selectedDate - 1] === RoomStatus.BUSY) || datesCounter.length) {
      if (dates[selectedDate - 2] !== RoomStatus.PENDING && dates[
          selectedDate - 1] !== RoomStatus.PENDING) {
        return;
      } else if (dates[selectedDate - 2] === RoomStatus.PENDING && dates[
          selectedDate - 1] === RoomStatus.PENDING && dates[
          selectedDate] === RoomStatus.PENDING) {
        return;
      }
    }
    this.reserveRoom(roomNumber, selectedDate);
  }

  reserveRoom(roomNumber, selectedDate) {
    const clearCancelStatus = () => {
      state.inCancel.status = false;
      state.inCancel.roomNumber = ``;
    };
    // позже попробовать заменить кучу ифов на свитч
    // проверяем бронируется ли уже что-нибудь
    if (!state.inPending.status) {
      // проверяем занят ли номер в выбранную дату. Если занят, то отрисовываем форму с кнопкой отмены заказа.
      if (state.rooms[roomNumber].dates[selectedDate - 1] === RoomStatus.BUSY) {
        state.inCancel.status = true;
        state.inCancel.roomNumber = roomNumber;
        const reserved = reservedNumbers
        .findIndex((val) => val.roomNumber === roomNumber && val.numbersOfDateCell.includes(selectedDate - 1));
        state.inCancel.reservedNumber = reserved;
        this.onReserveRoom();
        return;
      }
      clearCancelStatus();
      state.rooms[roomNumber].dates[selectedDate - 1] = RoomStatus.PENDING;
      state.inPending.status = true;
      state.rooms[roomNumber].isPending = true;
      state.inPending.roomNumber = roomNumber;
      this.onReserveRoom();
    } else if (state.rooms[roomNumber].dates[selectedDate - 1] === RoomStatus.FREE
      && state.rooms[roomNumber].isPending) {
      // Если уже бронируется, то проверяем дату только для этой комнаты. Если комната свободна, то добавляем к брони
      clearCancelStatus();
      state.rooms[roomNumber].dates[selectedDate - 1] = RoomStatus.PENDING;
      this.onReserveRoom();
    } else if (state.rooms[roomNumber].dates[selectedDate - 1] === RoomStatus.PENDING
      && state.rooms[roomNumber].isPending) {
      // Если на данную дату комната уже бронируется, то удаляем из брони и проверяем,
      // есть ли еще даты в процессе бронирования. Если нет дат в процессе бронирования,
      // то меняем статус комнаты и всей таблицы на "FREE"
      clearCancelStatus();
      state.rooms[roomNumber].dates[selectedDate - 1] = RoomStatus.FREE;
      const inPending = state.rooms[roomNumber].dates
      .findIndex((val) => val === RoomStatus.PENDING);
      if (inPending === -1) {
        state.inPending.status = false;
        state.rooms[roomNumber].isPending = false;
        state.inPending.roomNumber = ``;
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
