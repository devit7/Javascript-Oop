class Professor {
  name;
  teaches;

  constructor(name, teaches) {
    (this.name = name), (this.teaches = teaches);
  }

  introduceSelf() {
    console.log(`My name is Professor ${this.name}`);
  }
}

const walsh = new Professor("Walsh", "Psychology");
console.log(walsh.introduceSelf());
