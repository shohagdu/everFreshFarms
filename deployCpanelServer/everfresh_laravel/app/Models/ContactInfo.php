<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactInfo extends Model
{
    protected $table = 'contact_info';

    protected $fillable = [
        'phone_primary', 'phone_secondary', 'email',
        'address', 'address_bn', 'working_hours', 'working_hours_bn', 'map_embed_url',
    ];
}
