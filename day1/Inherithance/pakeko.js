class Employee{
    constructor(name){
        this.name = name
    }

    sayHello(name){
        console.log(`Hello ${name}, My name employee ${this.name}`)
    }
}

class Manager extends Employee{
    constructor(firstName,lastName){
        super(firstName);// super digunakan untuk memanggil prop di constructor
        this.lastName = lastName
    }

    sayHello(name){
        console.log(`Hello ${name}, My name manager ${this.name} ${this.lastName}`)
    }
}

const budi = new Employee("Budi");
budi.sayHello("Joko")

const eko = new Manager("Eko","Sulist");
eko.sayHello("Joko")