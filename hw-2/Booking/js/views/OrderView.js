import AbstractView from './AbstractView';

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
                <input type="text" id="inDate" readonly class="order__information">
              </label>
              <label for="outDate" class="order__description">
                Дата выезда:
                <input type="text" id="outDate" readonly class="order-information">
              </label>
              <label for="cost" class="order__description">
                Итоговая стоимость:
                <input type="text" id="cost" readonly class="order__information">
              </label>
            </div>
          </fieldset>
          <button type="button" class="btn">Забронировать номер</button>
        </form>
      </div>
    `.trim();
  }
}
