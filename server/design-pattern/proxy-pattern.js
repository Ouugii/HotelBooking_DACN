const target = {
  message: "Hello, world!",
  getValue: function () {
    return this.message;
  },
};

const proxy = new Proxy(target, {
  get: function (target, property) {
    console.log(`Getting property "${property}"`);
    return target[property];
  },
  set: function (target, property, value) {
    console.log(`Setting property "${property}" to "${value}"`);
    target[property] = value;
    return true;
  },
  apply: function (target, thisArg, argumentsList) {
    console.log(`Calling method "${thisArg.name}"`);
    return target.apply(thisArg, argumentsList);
  },
});

console.log(proxy.message);
proxy.message = "Hello, Proxy!";
console.log(proxy.message);
console.log(proxy.getValue());

target.getValue = function () {
  return "Original method modified!";
};
console.log(proxy.getValue());
