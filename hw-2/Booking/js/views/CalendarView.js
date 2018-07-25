import AbstractView from './AbstractView';
import * as data from '../model/data';

export default class CalendarView extends AbstractView {
  get template() {
    return `
      <h1 class="booking__title">Бронирование номера в отеле</h1>
      <table class="calendar">
        <tr class="calendar__room">
          <th class="calendar__day"> </th>
          ${(new Array(data.WEEK).fill().map((val, i) => `<th class="calendar__day">${data.getDate(i)}</th>`.trim()).join(``))}
        </tr>
        ${data.state.rooms.map((room, i) => `
          <tr class="room">
            <th class="room__number">Номер №${i + 1} <br/>Тип номера: ${room.type} <br/> Цена за сутки: ${room.cost}</th>
            ${room.dates.map((status) => {
    let roomStatus;
    switch (status) {
      case data.RoomStatus.FREE:
        roomStatus = `free`;
        break;
      case data.RoomStatus.BUSY:
        roomStatus = `busy`;
        break;
      case data.RoomStatus.PENDING:
        roomStatus = `pending`;
        break;
    }
    return `
              <td class="room__status ${roomStatus}" tabindex="0">${status}</td>
            `.trim();
  }).join(``)}
          </tr>`.trim()).join(``)}
    </table>`.trim();
  }

  bind() {
    const rows = this._element.querySelectorAll(`.room`);
    const table = this._element.querySelector(`.calendar`);
    table.addEventListener(`click`, (evt) => {
      this.onDateSelected(evt, rows);
    });
  }

  onDateSelected() {
    //
  }
}
