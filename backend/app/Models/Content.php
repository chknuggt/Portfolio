<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    public $timestamps = false;

    protected $fillable = ['type', 'slug', 'title', 'excerpt', 'icon', 'link', 'img', 'body'];
}
