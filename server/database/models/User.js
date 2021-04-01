// Based on https://www.codementor.io/@mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true,
        },
        name: type.STRING,
        email: type.STRING,
        googleAccessToken: type.STRING,
        googleRefreshToken: type.STRING,
        dexcomAccessToken: type.STRING,
        dexcomRefreshToken: type.STRING,
    })
}
