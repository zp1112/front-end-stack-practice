export default class {
  constructor(name) {
    this.name = name;
  }
  bark() {
    return `Wah wah, I am ${this.name}`;
  }
  barkInConsole() {
    console.log(this.bark());
  }
}
