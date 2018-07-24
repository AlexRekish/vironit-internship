export default class AbstractPresenter {
  constructor(view) {
    this.view = view;
  }

  get main() {
    return document.querySelector(`.booking`);
  }

  listener() {
    //
  }

  switchScreens(template) {
    this.main.innerHTML = ``;
    this.main.appendChild(template);
  }

  init() {
    this.listener();
    this.switchScreens(this.view.element);
  }
}
