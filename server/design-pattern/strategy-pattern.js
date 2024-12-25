const strategyA = {
  execute: () => {
    console.log("Executing strategy A");
  },
};

const strategyB = {
  execute: () => {
    console.log("Executing strategy B");
  },
};

const strategyC = {
  execute: () => {
    console.log("Executing strategy C");
  },
};

class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  executeStrategy() {
    this.strategy.execute();
  }
}

const context = new Context(strategyA);

context.executeStrategy();

context.setStrategy(strategyB);
context.executeStrategy();

context.setStrategy(strategyC);
context.executeStrategy();
