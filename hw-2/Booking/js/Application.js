import calendarPresenter from './presenters/CalendarPresenter';
import {reservedNumbers, updateCells} from './model/data';

updateCells(reservedNumbers);
calendarPresenter.init();
