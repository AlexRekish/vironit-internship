export default class AbstractView {
  get template() {
    //
  }

  render(template) {
    const container = document.createElement(`template`);
    container.innerHTML = template;
    return container.content;
  }

  get element() {
    this._element = this.render(this.template);
    this.bind();
    return this._element;
  }

  bind() {
    //
  }
}
