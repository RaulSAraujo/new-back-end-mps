module.exports = {
    HOST: "containers-us-west-105.railway.app",
    USER: "postgres",
    PASSWORD: "Hw6wZgQmAl83IzKA7fui",
    DB: "railway",
    dialect: "postgres",
    port: '6926',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};