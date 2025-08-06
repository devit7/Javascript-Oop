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
  get name(): string {
    return this._name;
  }
  set name(val: string) {
    this._name = val;
  }
  get category():string{
    return this._category
  }
  set category(val:string){
    this._category=val
  }
}

class FoodMenu extends Menu {
  id: number;
  _type_of_food: string;

  constructor(
    id: number,
    name: string,
    price: number,
    category: string,
    type_of_food: string
  ) {
    super(name, price, category);
    this.id=id;
    this._type_of_food = type_of_food;
  }

  get type_of_food():string{
    return this._type_of_food
  }
  set type_of_food(val:string){
    this._type_of_food = val
  }

}

class DrinkMenu extends Menu {
  id: number;
  _type_of_drink: string;

  constructor(id:number, name: string, price: number, category: string, type_of_drink: string) {
    super(name, price, category);
    this.id = id;
    this._type_of_drink = type_of_drink;
  }
  get type_of_drink(): string {
    return this._type_of_drink;
  }
  set type_of_drink(val: string) {
    this._type_of_drink = val;
  }
}

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

  addItems(menu:Menu, quantity:number):void{
    this.listOrderItem.push({
      menu,
      quantity,
      subTotal: menu.price * quantity
    })
    this.calculateTotal()
  }

  getOrder(){
    return {
      id:this.id,
      items: this.listOrderItem,
      total: this.total
    }
  }

  calculateTotal(){
    this.total = this.listOrderItem.reduce((sum, item) => sum + item.subTotal, 0);
  }

}

class Restaurant {
  name: string;
  listInFoodMenu: FoodMenu[];
  listInDrinkMenu: DrinkMenu[];
  nextId: number = 1;
  orders: Order[] = [];

  constructor(name: string) {
    this.name = name;
    this.listInFoodMenu = [];
    this.listInDrinkMenu = [];
  }

  addFoodMenu(
    name: string,
    price: number,
    category: string,
    type_of_food: string
  ) {
    this.listInFoodMenu.push(
      new FoodMenu(this.nextId++, name, price, category, type_of_food)
    );
  }

  addDrinkMenu(
    name: string,
    price: number,
    category: string,
    type_of_drink: string
  ) {
    this.listInDrinkMenu.push(
      new DrinkMenu(this.nextId++, name, price, category, type_of_drink)
    );
  }

  createOrder(){
    const order = new Order(this.nextId)
  }

  getAllFoodMenu(){
    return console.log(this.listInFoodMenu)
  }

  getAllDrinkMenu(){
    return console.log(this.listInDrinkMenu)
  }
}

const restaurant = new Restaurant("Waroeng");

restaurant.addFoodMenu( "Steak", 20000, "Heavy Food", "Meat");
restaurant.addFoodMenu( "Rendang", 15000, "Heavy Food", "Meat");

restaurant.addDrinkMenu( "Thai Tea", 10000, "Sweet Drink", "Tea")
restaurant.addDrinkMenu( "Coffee late", 10000, "Sweet Drink", "Coffee")

restaurant.getAllFoodMenu()
restaurant.getAllDrinkMenu()


