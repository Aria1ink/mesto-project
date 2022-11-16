export class Section {

  constructor (items, selector) {
    this.items = items.data;
    this.renderer = items.renderer;
    this.container = document.querySelector(selector);
  }
  renderItems () {
    const data = [];
    let i = 0;
    this.items.forEach(item => {
      data[i] = this.renderer(item);
      i++
    });
    return data
  }
  addItem (item) {
      this.container.prepend(item);
  };

};