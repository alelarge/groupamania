// const pool = new Pool({
//     user: 'postgres',
//     host: '172.17.0.2',
//     database: 'postgres',
//     password: 'sdf',
//     port: 5423,
// });

const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('groupamania', 'postgres', 'gLT"9o_h-0,8/)&d', {
  host: '34.76.117.222',
  dialect: 'postgres'
});

async function test() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
test();