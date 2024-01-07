<?php

namespace Database\Seeders;

use App\Models\User;
use App\Services\Media\MediaServices;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamGenerateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::truncate();
        $users = array(
            [
                'avatar' => null,
                'first_name' => 'Ridwanul',
                'last_name' => 'Hafiz',
                'designation' => 'Team Lead & CTO',
                'email' => 'ridwanul.hafiz@gmail.com',
                'password' => bcrypt('123asd123'),
                'user_type' => 1,
            ],
            [
                'avatar' => null,
                'first_name' => 'Ahmed',
                'last_name' => 'Zobayer',
                'designation' => 'Senior Full Stack Software Engineer',
                'email' => 'zobayer.me@gmail.com',
                'password' => bcrypt('123asd123'),
                'user_type' => 1,
            ],
            [
                'avatar' => null,
                'first_name' => 'Khalid',
                'last_name' => 'Imran',
                'designation' => 'Full Stack Software Engineer',
                'email' => 'ekhalid090@gmail.com',
                'password' => bcrypt('123asd123'),
                'user_type' => 3,
            ],
            [
                'avatar' => null,
                'first_name' => 'Abir',
                'last_name' => 'Das',
                'designation' => 'Full Stack Software Engineer',
                'email' => 'dasabir28@gmail.com',
                'password' => bcrypt('123asd123'),
                'user_type' => 3,
            ],
            [
                'avatar' => null,
                'first_name' => 'Ali',
                'last_name' => 'Haider',
                'designation' => 'Junior Full Stack Developer',
                'email' => 'swccho@gmail.com',
                'password' => bcrypt('123asd123'),
                'user_type' => 2,
            ],
            [
                'avatar' => null,
                'first_name' => 'Noyon',
                'last_name' => 'Ahmed',
                'designation' => 'Front-end Developer',
                'email' => 'noyon@gmail.com',
                'password' => bcrypt('123asd123'),
                'user_type' => 3,
            ],
            [
                'avatar' => null,
                'first_name' => 'Asadullah',
                'last_name' => 'Chowdhury',
                'designation' => 'Front-end Developer',
                'email' => 'asadullah@gmail.com',
                'password' => bcrypt('123asd123'),
                'user_type' => 3,
            ],
            [
                'avatar' => null,
                'first_name' => 'Mahi',
                'last_name' => 'Bashar',
                'designation' => 'Junior Front-end Developer (Intern)',
                'email' => 'mahi@gmail.com',
                'password' => bcrypt('123asd123'),
                'user_type' => 3,
            ]
        );
        foreach ($users as &$user){
            $user['avatar'] = MediaServices::uploadDummy($user['first_name'].'+'.$user['last_name']);
        }
        User::insert($users);
    }
}
