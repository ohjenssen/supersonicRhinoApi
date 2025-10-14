module.exports = (sequelize, Sequelize) => {
    const Exercise = sequelize.define("exercise", {
        exerciseID: {
            type: Sequelize.INTEGER,
            autoIncrement: true, // 
            primaryKey: true // By default Sequelize assumes every table has a primary key called id, unless you explicitly tell it otherwise, so if in your database, the has an id thats just called "id", this line is unesseccary
        },
        exerciseName: {
            type: Sequelize.STRING
        }
    }, {
        tableName: "exercises",
        timestamps: false
    });

    return Exercise;
}