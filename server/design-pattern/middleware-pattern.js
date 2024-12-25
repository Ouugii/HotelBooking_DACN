class Middleware {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  run(context, next) {
    let index = -1;

    const dispatch = (i) => {
      if (i <= index) {
        return Promise.reject(new Error("next() called multiple times"));
      }

      index = i;

      const middleware = this.middlewares[i];

      if (i === this.middlewares.length) {
        middleware = next;
      }

      if (!middleware) {
        return Promise.resolve();
      }

      try {
        return Promise.resolve(middleware(context, () => dispatch(i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    };

    return dispatch(0);
  }
}

const middleware1 = async (context, next) => {
  console.log("Middleware 1");
  await next();
};

const middleware2 = async (context, next) => {
  console.log("Middleware 2");
  await next();
};

const middleware3 = async (context, next) => {
  console.log("Middleware 3");
  await next();
};

const middleware = new Middleware();

middleware.use(middleware1);
middleware.use(middleware2);
middleware.use(middleware3);

const mainFunction = async () => {
  console.log("Start");

  await middleware.run({}, async () => {
    console.log("End");
  });
};

mainFunction();
