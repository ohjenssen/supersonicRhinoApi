module.exports = {
    HOST: process.env.MYSQLHOST || process.env.DB_HOST || "localhost",
    USER: process.env.MYSQLUSER || process.env.DB_USER || "root",
    PASSWORD: process.env.MYSQLPASSSWORD || process.env.DB_PASSWORD || "root_root#69",
    DB: process.env.MYSQLDATABASE || process.env.DB_NAME || 'supersonicrhinoDB',
    dialect: "mysql",
    pool: {
        max: 5, 
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}