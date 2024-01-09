const UserSeeder = require('./user.seeder')
const seed = () => {
    UserSeeder().then(r => { console.log("UserSeeder has been executed successfully!") })
}
seed();