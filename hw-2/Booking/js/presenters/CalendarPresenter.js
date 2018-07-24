import AbstractPresenter from './AbstractPresenter';
import CalendarView from '../views/CalendarView';

class CalendarPresenter extends AbstractPresenter {
  constructor() {
    super(new CalendarView());
  }

  listener() {
    //
  }
}

const calendarPresenter = new CalendarPresenter();

export default calendarPresenter;
