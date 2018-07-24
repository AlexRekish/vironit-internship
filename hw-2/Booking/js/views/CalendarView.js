import AbstractView from './AbstractView';
import * as data from '../model/data';

export default class CalendarView extends AbstractView {
  get template() {
    return `
      <table class="calendar">
        <tr class="calendar__room">
          <th class="calendar__day"> </th>
          <th class="calendar__day">${data.Day.FIRST}</th>
          <th class="calendar__day">${data.Day.SECOND}</th>
          <th class="calendar__day">${data.Day.THIRD}</th>
          <th class="calendar__day">${data.Day.FOURTH}</th>
          <th class="calendar__day">${data.Day.FIVETH}</th>
          <th class="calendar__day">${data.Day.SIXTH}</th>
          <th class="calendar__day">${data.Day.SEVENTH}</th>
        </tr>
        ${data.state.rooms.map((room, i) => `
          <tr class="room">
            <th class="room__number">Номер №${i + 1}</th>
            ${room.dates.map((status) => `
              <td class="room__status">${status}</td>
            `.trim()).join(``)}
          </tr>`.trim()).join(``)}
    </table>`.trim();
  }

  bind() {
    const rows = this._element.querySelectorAll(`.room`);
    const table = this._element.querySelector(`.calendar`);
    const dates = this._element.querySelectorAll(`.room__status`);
    table.addEventListener(`click`, (evt) => {
      const isStarted = [...dates].filter((val) => val.classList.contains(`busy`));
      if (isStarted.length) {
        //
      }

      if (evt.target.tagName === `TD`) {
        const roomNumber = [...rows].findIndex((val) => val === evt.target.parentNode);
        const startDate = [...rows[roomNumber]].findIndex((val) => val === evt.target);
        if (data.state.rooms[roomNumber].dates[startDate] === data.RoomStatus.FREE) {
          evt.target.classList.toggle(`busy`);
        }
      }
    });
  }
}
