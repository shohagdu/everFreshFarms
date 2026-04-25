<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = [
        'site_name', 'site_name_bn', 'tagline', 'tagline_bn',
        'logo', 'favicon', 'footer_text',
        'facebook_url', 'whatsapp_url', 'instagram_url',
    ];
}
