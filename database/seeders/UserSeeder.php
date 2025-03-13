<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Safim Md Fahim',
            'username' => 'safim',
            'email' => 'safim@gmail.com',
            'password' => Hash::make('12345678'),
        ]);
        User::create([
            'name' => 'John Smith',
            'username' => 'johnsmith',
            'email' => 'john@example.com',
            'password' => Hash::make('12345678'),
        ]);

        User::create([
            'name' => 'Sarah Wilson',
            'username' => 'sarahw',
            'email' => 'sarah@example.com',
            'password' => Hash::make('12345678'),
        ]);

        User::create([
            'name' => 'Michael Brown',
            'username' => 'mikebrown',
            'email' => 'mike@example.com',
            'password' => Hash::make('12345678'),
        ]);

        User::create([
            'name' => 'Emily Davis',
            'username' => 'emilyd',
            'email' => 'emily@example.com',
            'password' => Hash::make('12345678'),
        ]);

        User::create([
            'name' => 'David Miller',
            'username' => 'davidm',
            'email' => 'david@example.com',
            'password' => Hash::make('12345678'),
        ]);

        User::create([
            'name' => 'Jessica Taylor',
            'username' => 'jessicat',
            'email' => 'jessica@example.com',
            'password' => Hash::make('12345678'),
        ]);

        User::create([
            'name' => 'Robert Johnson',
            'username' => 'robertj',
            'email' => 'robert@example.com',
            'password' => Hash::make('12345678'),
        ]);
    }
}
