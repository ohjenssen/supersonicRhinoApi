module.exports = (sequelize, Sequelize) => {
    const Set = sequelize.define("sets", {
        setID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true // By default Sequelize assumes every table has a primary key called id, unless you explicitly tell it otherwise, so if in your database, the has an id thats just called "id", this line is unesseccary
        },
        weight: {
            type: Sequelize.INTEGER
        }, 
        repetitions: {
            type: Sequelize.INTEGER
        },
        exerciseID: {
            type: Sequelize.INTEGER
        },
        time: {
            type: Sequelize.DATE
        }
    }, {
        tableName: 'sets',
        timestamps: false
    });

    return Set;
}