var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Menu = /** @class */ (function () {
    function Menu(name, price, category) {
        this._name = name;
        this._price = price;
        this._category = category;
    }
    Object.defineProperty(Menu.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (val) {
            this._price = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (val) {
            this._name = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Menu.prototype, "category", {
        get: function () {
            return this._category;
        },
        set: function (val) {
            this._category = val;
        },
        enumerable: false,
        configurable: true
    });
    return Menu;
}());
var FoodMenu = /** @class */ (function (_super) {
    __extends(FoodMenu, _super);
    function FoodMenu(id, name, price, category, type_of_food) {
        var _this = _super.call(this, name, price, category) || this;
        _this.id = id;
        _this._type_of_food = type_of_food;
        return _this;
    }
    Object.defineProperty(FoodMenu.prototype, "type_of_food", {
        get: function () {
            return this._type_of_food;
        },
        set: function (val) {
            this._type_of_food = val;
        },
        enumerable: false,
        configurable: true
    });
    return FoodMenu;
}(Menu));
var DrinkMenu = /** @class */ (function (_super) {
    __extends(DrinkMenu, _super);
    function DrinkMenu(id, name, price, category, type_of_drink) {
        var _this = _super.call(this, name, price, category) || this;
        _this.id = id;
        _this._type_of_drink = type_of_drink;
        return _this;
    }
    Object.defineProperty(DrinkMenu.prototype, "type_of_drink", {
        get: function () {
            return this._type_of_drink;
        },
        set: function (val) {
            this._type_of_drink = val;
        },
        enumerable: false,
        configurable: true
    });
    return DrinkMenu;
}(Menu));
var Order = /** @class */ (function () {
    function Order(id) {
        this.id = id;
        this.listOrderItem = [];
    }
    Order.prototype.addItems = function (menu, quantity) {
        this.listOrderItem.push({
            menu: menu,
            quantity: quantity,
            subTotal: menu.price * quantity,
        });
        this.calculateTotal();
    };
    Order.prototype.getOrder = function () {
        return {
            id: this.id,
            items: this.listOrderItem,
            total: this.total,
        };
    };
    Order.prototype.calculateTotal = function () {
        this.total = this.listOrderItem.reduce(function (sum, item) { return sum + item.subTotal; }, 0);
    };
    return Order;
}());
var Restaurant = /** @class */ (function () {
    function Restaurant(name) {
        this.nextId = 1;
        this.orders = [];
        this.name = name;
        this.listInFoodMenu = [];
        this.listInDrinkMenu = [];
    }
    Restaurant.prototype.addFoodMenu = function (name, price, category, type_of_food) {
        this.listInFoodMenu.push(new FoodMenu(this.nextId++, name, price, category, type_of_food));
    };
    Restaurant.prototype.addDrinkMenu = function (name, price, category, type_of_drink) {
        this.listInDrinkMenu.push(new DrinkMenu(this.nextId++, name, price, category, type_of_drink));
    };
    Restaurant.prototype.createOrder = function () {
        var order = new Order(this.nextId++);
        this.orders.push(order);
        return order;
    };
    Restaurant.prototype.addItemToOrder = function (orderId, menuId, quantity) {
        var order = this.orders.find(function (item) { return item.id === orderId; });
        var menu = this.findMenu(menuId);
        if (menu && order) {
            order.addItems(menu, quantity);
            console.log("Order ".concat(quantity, " x ").concat(menu.name));
        }
        else {
            console.log("Order or Menu not found !!");
        }
    };
    Restaurant.prototype.findMenu = function (id) {
        var food = this.listInFoodMenu.find(function (item) { return item.id === id; });
        var drink = this.listInDrinkMenu.find(function (item) { return item.id === id; });
        return food || drink;
    };
    Restaurant.prototype.getAllOrder = function (idOrder) {
        var order = this.orders.find(function (item) { return item.id === idOrder; });
        console.log(order);
    };
    Restaurant.prototype.getAllFoodMenu = function () {
        return console.log(this.listInFoodMenu);
    };
    Restaurant.prototype.getAllDrinkMenu = function () {
        return console.log(this.listInDrinkMenu);
    };
    return Restaurant;
}());
var restaurant = new Restaurant("Waroeng");
restaurant.addFoodMenu("Steak", 20000, "Heavy Food", "Meat");
restaurant.addFoodMenu("Rendang", 15000, "Heavy Food", "Meat");
restaurant.addDrinkMenu("Thai Tea", 10000, "Sweet Drink", "Tea");
restaurant.addDrinkMenu("Coffee late", 10000, "Sweet Drink", "Coffee");
restaurant.getAllFoodMenu();
restaurant.getAllDrinkMenu();
var order_1 = restaurant.createOrder();
console.log("Your order id is : ".concat(order_1.id));
// Add item to order
restaurant.addItemToOrder(order_1.id, 1, 2);
restaurant.addItemToOrder(order_1.id, 2, 4);
//Show All Order
console.log(restaurant.getAllOrder(order_1.id));
