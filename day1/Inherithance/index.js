class Person {
  name;
  constructor(name) {
    this.name = name;
  }

  introduceSelf() {
    console.log(`Hello ${this.name}`);
  }
}

class Professor extends Person {
  teaches;

  constructor(name, teaches) {
    super(name)
    this.teaches = teaches;
  }


  introduceSelf() {
    console.log(
      `Prof ${this.name} will be your ${this.teaches} professor `
    );
  }
}

class Student extends Person {
  year;

  constructor(name, year) {
    super(name);
    this.year = year;
  }

  get name(){
    return this.name
  }

  introduceSelf() {
    console.log(`My name ${this.name} and i am in the ${this.year} year`);
  }
}

const person = new Person("devit saja");
person.introduceSelf() 

const walsh = new Professor("Loiyd", "Science");
walsh.introduceSelf();

const dev = new Student("Devit", 3);
dev.introduceSelf();