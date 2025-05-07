<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Cinema Project

The Cinema Project is a web application built using the Laravel framework. It provides a platform for managing cinema operations, including movie listings, ticket bookings, and user management.

## Features

- Manage movie listings with details such as title, genre, and showtimes.
- User-friendly interface for booking tickets.
- Admin panel for managing users and movies.
- Real-time notifications for booking confirmations.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/hashim18ali/cinema.git
   cd cinema
   ```

2. Install dependencies:
   ```bash
   composer install
   npm install
   ```

3. Set up the environment file:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Configure your database in the `.env` file and run migrations:
   ```bash
   php artisan migrate
   ```

5. Start the development server:
   ```bash
   php artisan serve
   ```

## Usage

- Access the application at `http://localhost:8000`.
- Admin users can log in to manage movies and users.
- Regular users can browse movies and book tickets.

## Contributing

Contributions are welcome! Please follow the [contribution guide](https://laravel.com/docs/contributions) for Laravel projects.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
