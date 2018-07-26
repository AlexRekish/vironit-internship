import OrderView from '../views/OrderView';
import AbstractPresenter from './AbstractPresenter';
import {state, RoomStatus, reservedNumbers, nowDate} from '../model/data';
import calendarPresenter from './CalendarPresenter';

class OrderPresenter extends AbstractPresenter {
  constructor() {
    super(new OrderView());
  }
  listener() {
    this.view.onOrder = () => {
      if (state.inPending.status) {
        this.order();
      } else if (state.inCancel.status && state.inCancel.reservedNumber) {
        this.cancel();
      }
    };
  }
  order() {
    const room = state.inPending.roomNumber;
    const reserved = {
      roomNumber: state.inPending.roomNumber,
      numbersOfDateCell: [],
      date: +nowDate,
    };
    state.rooms[room].dates.forEach((val, i) => {
      if (val === RoomStatus.PENDING) {
        state.rooms[room].dates[i] = RoomStatus.BUSY;
        reserved.numbersOfDateCell.push(i);
      }
    });
    reservedNumbers.push(reserved);
    state.rooms[room].isPending = ``;
    state.inPending.status = ``;
    state.inPending.roomNumber = ``;
    this.updateViews();
  }

  cancel() {
    const reserved = state.inCancel.reservedNumber;
    const roomNumber = state.inCancel.roomNumber;
    reservedNumbers[reserved].numbersOfDateCell
      .forEach((val) => {
        state.rooms[roomNumber].dates[val] = RoomStatus.FREE;
      });
    reservedNumbers.splice(reserved, 1);
    state.inCancel.status = ``;
    state.inCancel.roomNumber = ``;
    this.updateViews();
  }

  updateViews() {
    localStorage.setItem(`state`, JSON.stringify(state));
    localStorage.setItem(`reserved`, JSON.stringify(reservedNumbers));
    calendarPresenter.init();
  }
}

const orderPresenter = new OrderPresenter();
orderPresenter.listener();
export default orderPresenter;
