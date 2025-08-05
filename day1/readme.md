# JavaScript Object-Oriented Programming (OOP) Learning Project


## 📁 Project Structure

```
├── class-and-object/     # basic dari penggunaan class dan object 
├── property/             # basic penggunaan properties pada class
├── encapsulation/        # Private props dan method
├── get-set/             # Getter dan setter pada methods
├── Inheritance/         # pewarisan pada class dengan extends
├── super-method/        # penggunaan super() dalam inheritance 
├── polymorphism/        # penggunaan overriding
├── static/              # penggunaan method static
└── variable/            # perbedaan dari (var, let, const)
```

## 🎯 Learning Topics

### 1. [Class and Object](./class-and-object/)
Mempelajari dan mengimplementasikan dari dasar pembuatan class dan object

**Example:**
```javascript
class Professor {
  name;
  teaches;
  
  constructor(name, teaches) {
    this.name = name;
    this.teaches = teaches;
  }
  
  introduceSelf() {
    console.log(`My name is Professor ${this.name}`);
  }
}
```

### 2. [Properties](./property/)
Memahami dan mengimplementasikan penggunaan properti dimana bisa di gunakan dengan 2 macam cara.

**Yaitu:**
- Dideklarasikan di class
- Secara langsung di constructor

```javascript
// property on class
class Person{
    name;
    age;
}

//property on constructor
class Car{
    constructor(name,color){
        this.name = name,
        this.color = color
    }
}
```

### 3. [Encapsulation](./encapculation/)
melakukan private pada properti atau method sehingga hanya dapat di akses pada class itu sendiri

**Example:**
```javascript
class Counter {
  #counter = 0  // Private field
  
  #increment() {  // Private method
    return this.#counter++;
  }
}
```

### 4. [Getters and Setters](./get-set/)
Memahami penggunaan setter dan getter, dalam mengambil data dan merubah data

**Example:**
```javascript
class Person {
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  set fullName(value) {
    const result = value.split(" ");
    this.firstName = result[0];
    this.lastName = result[1];
  }
}
```

### 5. [Inheritance](./Inherithance/)
memahami dan mengimplementasikan pewarisan dari parent ke children dengan extends.

**Key Files:**
- [`index.js`](./Inherithance/index.js) - Person, Professor, and Student classes
- [`pakeko.js`](./Inherithance/pakeko.js) - Employee and Manager classes

**Example:**
```javascript
class Professor extends Person {
  constructor(name, teaches) {
    super(name);  // Call parent constructor
    this.teaches = teaches;
  }
}
```

### 6. [Super Method](./super-method/)
Memahami dan mengimplementasikan penggunaan super pada method. untuk mengambil method dari parent ke children

**Example:**
```javascript
class Child extends Parent {
  sayHello() {
    console.log(`Hello ${super.name()}`);
  }
}
```

### 7. [Polymorphism](./polymorphism/)
Memahami dan mengimplementasikan dasar dari overiding method

**Example:**
```javascript
class Person {
  information() {
    console.log(`Name: ${this.name}`);
  }
}

class Professor extends Person {
  // Method overriding
  information() {
    console.log(`Name: ${this.name}, Nip: ${this.nip}`);
  }
}
```

### 8. [Static Methods](./static/)
Memahami dan mengimplementasikan Static method. dimana dengan static maka method yang dimiliki class tersebut dapat dipanggil secara langsung tanpa membuat object dari class tersebut.

**Example:**
```javascript
class Person {
  static name() {
    console.log("ini nama");
  }
}

Person.name();  // Called directly on class
```

### 9. [Variables](./variable/)
Memahami dan mengimplementasikan mengenai perbedaan tiap variable yang ada pada javascript

**Topics Covered:**
- `var` - Penamaan variable dapat duplikat
- `let` - Penamaan variable tidak bisa duplikat dan bisa di ubah valuenya
- `const` - penamaan variable tida bisa duplikat dan tidak bisa di ubah valuenya karena bersifat constanta




## 🔗 Quick Navigation

| Concept | Folder | Key Features |
|---------|--------|--------------|
| Basic Classes | [class-and-object/](./class-and-object/) | Constructor, methods |
| Properties | [property/](./property/) | Class and constructor properties |
| Encapsulation | [encapculation/](./encapculation/) | Private fields (`#`) |
| Getters/Setters | [get-set/](./get-set/) | Property access control |
| Inheritance | [Inherithance/](./Inherithance/) | `extends`, `super` |
| Super Methods | [super-method/](./super-method/) | Parent method access |
| Polymorphism | [polymorphism/](./polymorphism/) | Method overriding |
| Static Methods | [static/](./static/) | Class-level methods |
| Variables | [variable/](./variable/) | `var`, `let`, `const` |

---

