<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'name' => 'John Smith',
            'username' => 'johnsmith',
            'email' => 'john@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('12345678'),
        ]);

        \App\Models\User::create([
            'name' => 'Sarah Wilson',
            'username' => 'sarahw',
            'email' => 'sarah@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('12345678'),
        ]);

        \App\Models\User::create([
            'name' => 'Michael Brown',
            'username' => 'mikebrown',
            'email' => 'mike@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('12345678'),
        ]);

        \App\Models\User::create([
            'name' => 'Emily Davis',
            'username' => 'emilyd',
            'email' => 'emily@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('12345678'),
        ]);

        \App\Models\User::create([
            'name' => 'David Miller',
            'username' => 'davidm',
            'email' => 'david@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('12345678'),
        ]);

        \App\Models\User::create([
            'name' => 'Jessica Taylor',
            'username' => 'jessicat',
            'email' => 'jessica@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('12345678'),
        ]);

        \App\Models\User::create([
            'name' => 'Robert Johnson',
            'username' => 'robertj',
            'email' => 'robert@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('12345678'),
        ]);
    }
}
