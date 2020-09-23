<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Bookable;
use Faker\Generator as Faker;
use Illuminate\Support\Arr;

$suffix = [
    'Villa',
    'House',
    'Cottage',
    'Luxury Vialls',
    'Cheap House',
    'Rooms',
    'Cheap Rooms',
    'Rooms',
    'Luxury Rooms',
    'Fancy Rooms'
];

$factory->define(Bookable::class, function (Faker $faker) use ($suffix) {
    return [
        'title' => $faker->city . ' ' . Arr::random($suffix),
        'description' => $faker->text(),
    ];
});
