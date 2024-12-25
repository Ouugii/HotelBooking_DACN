class Coffee {
  cost() {
    return 5;
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 2;
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 1;
  }
}

let myCoffee = new Coffee();

myCoffee = new MilkDecorator(myCoffee);

myCoffee = new SugarDecorator(myCoffee);

console.log("Total cost:", myCoffee.cost());
