import AbstractPresenter from './AbstractPresenter';
import CalendarView from '../views/CalendarView';
import * as data from '../model/data';

class CalendarPresenter extends AbstractPresenter {
  constructor() {
    super(new CalendarView());
  }

  listener() {
    this.view.onDateSelected = (evt, rows) => {
      if (evt.target.tagName === `TD`) {
        const roomNumber = [...rows].findIndex((val) => val === evt.target.parentNode);
        const selectedDate = [...rows[roomNumber].children].findIndex((val) => val === evt.target);
        if (data.state.rooms[roomNumber].dates[selectedDate - 1] === data.RoomStatus.FREE) {
          data.state.rooms[roomNumber].dates[selectedDate - 1] = data.RoomStatus.PENDING;
          this.init();
        } else {
          data.state.rooms[roomNumber].dates[selectedDate - 1] = data.RoomStatus.FREE;
          this.init();
        }
      }
    };
  }
}

const calendarPresenter = new CalendarPresenter();

export default calendarPresenter;
