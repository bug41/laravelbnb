<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Bookable extends Model
{
    
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        //return $this->hasMany(Review::class);
        return $this->hasOne(Review::class);
    }
    public function availableFor($from, $to): bool
    {        
        //DB::enableQueryLog();
        $result = $this->bookings()->betweenDates($from, $to)->count();
        //dd(DB::getQueryLog());
        return 0 ==  $result;
    }
}
