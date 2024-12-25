const myMixin = {
  sayHello() {
    console.log("Hello!");
  },
  sayGoodbye() {
    console.log("Goodbye!");
  },
};

class MyClass {}

Object.assign(MyClass.prototype, myMixin);

const obj = new MyClass();

obj.sayHello();
obj.sayGoodbye();
