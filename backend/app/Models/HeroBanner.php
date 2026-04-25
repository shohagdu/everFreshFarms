<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroBanner extends Model
{
    protected $fillable = [
        'badge_text', 'title', 'title_bn', 'tagline',
        'description', 'description_bn',
        'primary_btn_text', 'primary_btn_link',
        'secondary_btn_text', 'secondary_btn_link',
        'background_image', 'stats', 'is_active',
    ];

    protected $casts = [
        'stats' => 'array',
        'is_active' => 'boolean',
    ];
}
