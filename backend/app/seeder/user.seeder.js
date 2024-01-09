require("../../config/db");
const UserModel = require('../model/User');
const bcrypt = require("bcrypt");

const UserSeeder = async () => {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('123asd123', salt);
    const users = [
        {
            avatar: null,
            name: 'Ridwanul Hafiz',
            designation: 'Team Lead & CTO',
            email: 'ridwanul.hafiz@gmail.com',
            password: password,
            user_type: "Admin"
        },
        {
            avatar: null,
            name: 'Ahmed Zobayer',
            designation: 'Senior Full Stack Software Engineer',
            email: 'zobayer.me@gmail.com',
            password: password,
            user_type: "Admin"
        },
        {
            avatar: null,
            name: 'Khalid Imran',
            designation: 'Full Stack Software Engineer',
            email: 'ekhalid090@gmail.com',
            password: password,
            user_type: "Employee"
        },
        {
            avatar: null,
            name: 'Abir Das',
            designation: 'Full Stack Software Engineer',
            email: 'dasabir28@gmail.com',
            password: password,
            user_type: "Employee"
        },
        {
            avatar: null,
            name: 'Ali Haider',
            designation: 'Junior Full Stack Developer',
            email: 'swccho@gmail.com',
            password: password,
            user_type: "Manager"
        },
        {
            avatar: null,
            name: 'Noyon Ahmed',
            designation: 'Front-end Developer',
            email: 'noyon@gmail.com',
            password: password,
            user_type: "Employee"
        },
        {
            avatar: null,
            name: 'Asadullah Chowdhury',
            designation: 'Front-end Developer',
            email: 'asadullah@gmail.com',
            password: password,
            user_type: "Employee"
        },
        {
            avatar: null,
            name: 'Mahi Bashar',
            designation: 'Junior Front-end Developer (Intern)',
            email: 'mahi@gmail.com',
            password: password,
            user_type: "Employee"
        }
    ];
    UserModel.deleteMany().then(() => {
        console.log('User collection has been truncated successfully');

        UserModel.insertMany(users).then(() => {
            console.log('Users has been inserted successfully');
            process.exit(1);
        }).catch((e) => {
            console.log(e.message);
            process.exit(1);
        })

    }).catch((e) => {
        console.log(e.message);
        process.exit(1);
    });
}

module.exports = UserSeeder;