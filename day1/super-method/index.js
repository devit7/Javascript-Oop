class Parent {
  name() {
    const name = "devit";
    return name;
  }
}

class Child extends Parent {
    sayHello(){
        console.log(`Hello ${super.name()}`)
    }
}


const child = new Child()
child.sayHello()