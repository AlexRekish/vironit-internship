import orderPresenter from './presenters/OrderPresenter';
import {reservedNumbers, updateCells} from './model/data';

updateCells(reservedNumbers);
orderPresenter.updateViews();
