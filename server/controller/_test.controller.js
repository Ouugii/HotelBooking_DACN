const { OK } = require("../core/success.response");
const TestService = require("../services/_test.service");

class TestController {
  // overview
  test_GetDetailHotel = async (req, res, next) => {
    new OK({
      message: "Get detail OK",
      metadata: await TestService.test_GetDetailHotel(req.params._id),
    }).send(res);
  };

  testPostMethod = async (req, res, next) => {
    new OK({
      message: "Get detail OK",
      metadata: await TestService.testPostMethod(req.body),
    }).send(res);
  };
}

module.exports = new TestController();
