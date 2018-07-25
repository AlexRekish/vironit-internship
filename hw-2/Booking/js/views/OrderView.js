import AbstractView from './AbstractView';
import * as data from '../model/data';

export default class OrderView extends AbstractView {
  get template() {
    return `
      <div class="form-wrapper">
        <form class="order">
          <fieldset class="order__container">
            <legend class="order__title">Ваш заказ:</legend>
            <div class="order__fields-wrapper">
              <label for="inDate" class="order__description">
                Дата заезда:
                <input type="text" id="inDate" readonly class="order__information" value="${data.getDate(data.state.rooms[data.state.inPending.roomNumber].dates.findIndex((val) => val === data.RoomStatus.PENDING))}">
              </label>
              <label for="outDate" class="order__description">
                Дата выезда:
                <input type="text" id="outDate" readonly  class="order__information" value="${data.getDate(data.state.rooms[data.state.inPending.roomNumber].dates.lastIndexOf(data.RoomStatus.PENDING))}">
              </label>
              <label for="cost" class="order__description">
                Итоговая стоимость:
                <input type="text" id="cost" readonly class="order__information" value="${data.state.rooms[data.state.inPending.roomNumber].dates.filter((val) => val === data.RoomStatus.PENDING).length * data.state.rooms[data.state.inPending.roomNumber].cost}">
              </label>
            </div>
          </fieldset>
          <button type="submit" class="btn">Забронировать номер</button>
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
