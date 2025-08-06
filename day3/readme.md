# Progress Hari ke-3: OOP JavaScript & TypeScript

## Materi yang Dipelajari

- Implementasi OOP dengan studi kasus **Platform CTF** (JavaScript)
- Mempelajari Typescript 
- Penerapan OOP pada **TypeScript** dengan studi kasus **Restaurant Management**

### 1. Platform CTF (JavaScript)


**Konsep yang diterapkan:**

- **Inheritance:** User → Admin & Participant
- **Encapsulation:** Private properties dengan # 
- **Polymorphism:** Method override di child class

**Fitur:**

- Add data User(Admin & Participant)

```
class Participant extends User {
  constructor({ name, email, username, password, campus }) {
    super({
      name: name,
      email: email,
      username: username,
      password: password,
      role: "participant",
    });
    this.campus = campus;
  }

  class Admin extends User {
  constructor({ name, email, username, password }) {
    super({
      email: email,
      name: name,
      username: username,
      password: password,
      role: "admin",
    });
  }

```

melakukan penambhan data admin dan participan melalui constructor sehingga ketika object dibuat maka akan langsung mengisi data

- Validasi Flag
- Flag submission system

```
  checkFlag(inputFlag) {
    return this.#flag === inputFlag;
  }

    ... code ...

    addSubmission({
    chall_object,
    parti_object,
    flag,
    leaderboardList,
  }) {

    let result;
    if (!chall_object.checkFlag(flag)) {
      result = "Wrong Flag ...";
      return this.#resultSubmision(parti_object,chall_object,flag,result) ;
    }
```

menerapkan validasi flag pada proses submit  

- Leaderboard tracking
- Scoring system

```
  #addToLeaderboard(chall_object, parti_object, leaderboardList) {
    let point = chall_object.point;
    
    if(!leaderboardList.find(val => val.username == parti_object.username)){
        const data = {
          username: parti_object.username,
          point: point,
        };
        leaderboardList.push(data);
    }else{
        for(var i in leaderboardList){
            if(leaderboardList[i].username == parti_object.username){
                leaderboardList[i].point += point 
                break; 
            }
        }
    }
```



### 2. Mempelajari dan Menerapkan typescript

typescript membantu programer dalam menerapkan type safety pada javascript sehingga menurunkan resiko terkena error atau input yang tidak di inginkan

### penerapan type safety pada property
```
abstract class Menu {
  _name: string;
  _price: number;
  _category: string;
  constructor(name: string, price: number, category: string) {
    this._name = name;
    this._price = price;
    this._category = category;
  }

  get price(): number {
    return this._price;
  }
  set price(val: number) {
    this._price = val;
  }
```
melakukan type safety pada properti dengan menambahkan ``` : ``` setelah properti dan memberi type data dari properti tersebut

### penerpan type safety pada array
```
interface OrderItem{
  menu:Menu;
  quantity: number;
  subTotal: number;
}

class Order{
  total:number;
  listOrderItem: OrderItem[] = [];

  constructor(public id:number){
  }
```
jika menerapkan type safety pada array terutama array object maka diperlukan sebuah interface karena array object memiliki beberapa key didalamnya


### 3. Restaurant Management (TypeScript) - Masih dikerjakan


**Konsep yang diterapkan:**

- **Abstract Class:** Menu sebagai abstrak class
- **Inheritance:** FoodMenu & DrinkMenu extends Menu
- **Interface:** OrderItem untuk struktur data
- **Encapsulation:** Private properties dengan getter/setter


## Struktur Class

### Platform CTF

```
User (abstract)
├── Admin
│   ├── createChallenge()
│   └── addToLeaderboard()
└── Participant
    ├── submitFlag()
    └── updateScore()

Challenge
├── checkFlag()
└── getDetails()

Submission
├── validateFlag()
└── calculatePoints()
```

### Restaurant

```
Menu (abstract)
├── FoodMenu
│   └── type_of_food
└── DrinkMenu
    └── type_of_drink

Order
├── addItems()
├── calculateTotal()
└── getOrder()

Restaurant
├── addFoodMenu()
├── addDrinkMenu()
├── createOrder()
└── getAllMenus()
```

