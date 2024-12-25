class Dog {
  constructor(name) {
    this.name = name;
    this.type = "Dog";
  }

  speak() {
    console.log(`${this.name} says: Woof!`);
  }
}

class Cat {
  constructor(name) {
    this.name = name;
    this.type = "Cat";
  }

  speak() {
    console.log(`${this.name} says: Meow!`);
  }
}

class Bird {
  constructor(name) {
    this.name = name;
    this.type = "Bird";
  }

  speak() {
    console.log(`${this.name} says: Tweet!`);
  }
}

class AnimalFactory {
  static createAnimal(type, name) {
    switch (type) {
      case "Dog":
        return new Dog(name);
      case "Cat":
        return new Cat(name);
      case "Bird":
        return new Bird(name);
      default:
        throw new Error("Unknown animal type");
    }
  }
}

const dog = AnimalFactory.createAnimal("Dog", "Buddy");
const cat = AnimalFactory.createAnimal("Cat", "Whiskers");
const bird = AnimalFactory.createAnimal("Bird", "Tweety");

dog.speak();
cat.speak();
bird.speak();
