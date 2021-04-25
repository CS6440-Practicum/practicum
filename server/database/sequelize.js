// From https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz
const {Sequelize} = require("sequelize");
const UserModel = require("./models/User");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'glucose_tracker.sqlite',
    logging: false,
});

const User = UserModel(sequelize, Sequelize);

(async () => {
    await sequelize.sync({force: false}) // In development, add { force: true } as a parameter to sync to automatically reset your database
    console.log("Database setup complete");
})();

module.exports = {
    User
}
