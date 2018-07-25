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

  switchScreens(template, form) {
    this.main.innerHTML = ``;
    this.main.appendChild(template);
    if (form) {
      this.main.appendChild(form);
    }
  }

  init() {
    this.listener();
    this.switchScreens(this.view.element);
  }
}
