<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    public $timestamps = false;

    protected $fillable = ['key', 'value'];

    public static function getAllAsArray(): array
    {
        return static::pluck('value', 'key')->toArray();
    }
}
