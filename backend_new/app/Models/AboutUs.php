<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutUs extends Model
{
    protected $table = 'about_us';

    protected $fillable = [
        'title', 'title_bn', 'content', 'content_bn',
        'image', 'badge_number', 'badge_label', 'features',
    ];

    protected $casts = [
        'features' => 'array',
    ];
}
