import AbstractView from './AbstractView';
import {state, getDate, RoomStatus, getFinalCost} from '../model/data';

export default class OrderView extends AbstractView {
  get template() {
    if (!state.inCancel.status) {
      return `
      <div class="form-wrapper">
        <form class="order">
          <fieldset class="order__container">
            <legend class="order__title">Ваш заказ:</legend>
            <div class="order__fields-wrapper">
              <label for="inDate" class="order__description">
                Дата заезда:
                <input type="text" id="inDate" readonly class="order__information" value="${
  getDate(state.rooms[state.inPending.roomNumber].dates
                  .findIndex((val) => val === RoomStatus.PENDING))}">
              </label>
              <label for="outDate" class="order__description">
                Дата выезда:
                <input type="text" id="outDate" readonly  class="order__information" value="${
  getDate(state.rooms[state.inPending.roomNumber].dates
                  .lastIndexOf(RoomStatus.PENDING))}">
              </label>
              <label for="cost" class="order__description">
                Итоговая стоимость:
                <input type = "text"
                id = "cost"
                readonly class = "order__information"
                value =
                  "${getFinalCost(state.rooms[state.inPending.roomNumber].dates
                  .filter((val) => val === RoomStatus.PENDING)
                  .length, state.rooms[state.inPending.roomNumber].cost)}
                ">
              </label>
            </div>
          </fieldset>
          <button type="submit" class="btn">Забронировать номер</button>
        </form>
      </div>
    `.trim();
    }
    return `
    <div class="form-wrapper">
        <form class="order">
          <button type="submit" class="btn">Отменить заказ</button>
        </form>
      </div>
    `.trim();
  }

  bind() {
    const form = this._element.querySelector(`.order`);
    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.onOrder();
    });
  }

  onOrder() {
    //
  }
}
