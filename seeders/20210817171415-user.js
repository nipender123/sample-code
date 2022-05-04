const md5 = require("md5");

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("users", [
      {
        firstName: "John",
        lastName: "Deer",
        email: "admin@gmail.com",
        profileImage: "user.png",
        password: md5("123456"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Master",
        lastName: "Admin",
        email: "admin@dbpscasting.com",
        profileImage: "user.png",
        password: md5("dbpsc@sting2021!"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.bulkDelete("users", null, {}),
};
