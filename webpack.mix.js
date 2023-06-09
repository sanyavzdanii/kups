const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/script.js', 'public/js')
    .js('resources/js/header.js', 'public/js')
    .sass('resources/scss/app.scss', 'public/css')
    .sass('resources/scss/vendors/slick.scss', 'public/css')
    .disableNotifications();

mix.autoload({
    jquery: ['$', 'window.jQuery'],
});
