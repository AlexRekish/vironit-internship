import OrderView from '../views/OrderView';
import AbstractPresenter from './AbstractPresenter';
import * as data from '../model/data';
import calendarPresenter from './CalendarPresenter';

class OrderPresenter extends AbstractPresenter {
  constructor() {
    super(new OrderView());
  }
  listener() {
    this.view.onOrder = () => {
      const room = data.state.rooms.findIndex((val) => val.isPending);
      data.state.rooms[room].dates.forEach((val, i) => {
        if (val === data.RoomStatus.PENDING) {
          data.state.rooms[room].dates[i] = data.RoomStatus.BUSY;
        }
      });
      data.state.rooms[room].isPending = ``;
      data.state.inPending.status = ``;
      data.state.inPending.roomNumber = ``;
      localStorage.setItem(`state`, JSON.stringify(data.state));
      calendarPresenter.init();
    };
  }
}

const orderPresenter = new OrderPresenter();
orderPresenter.listener();
export default orderPresenter;
