class Person{
    university = "Telkom university";
    name;
    nip;

    constructor(name, nip){
        this._name = name;
        this.nip = nip;
    }

    university(){
        console.log(this.university)
    }

    //overriding
    information(){
        console.log(`Name: ${this.name}`)
    }

}

class Professor extends Person{
    // overriding
    information(){
        console.log(`Name: ${this.name} ,Nip: ${this.nip}`)
    }
}

person = new Person("Devit")
professor = new Professor("Loyd","Math")

person.information() 
professor.university()