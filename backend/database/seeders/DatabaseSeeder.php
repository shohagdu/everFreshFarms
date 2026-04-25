<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\SiteSetting;
use App\Models\HeroBanner;
use App\Models\AboutUs;
use App\Models\Product;
use App\Models\WhyChooseUs;
use App\Models\ContactInfo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name'     => 'Admin',
            'email'    => 'admin@everfreshfarm.com',
            'password' => Hash::make('password'),
        ]);

        SiteSetting::create([
            'site_name'    => 'Ever Fresh Farm',
            'site_name_bn' => 'এভার ফ্রেশ ফার্ম',
            'tagline'      => 'Inshaf Brings Happiness',
            'tagline_bn'   => 'ইনশাফ আনে সুখ',
            'footer_text'  => 'বিসমিল্লাহির রাহমানির রাহিম। প্রাণীজ আমিষ উৎপাদন ও সরবরাহে বিশ্বস্ততার নাম — এভার ফ্রেশ ফার্ম।',
            'facebook_url' => '#',
            'whatsapp_url' => '#',
        ]);

        HeroBanner::create([
            'badge_text'         => '🌱 প্রাণীজ আমিষ উৎপাদন ও সরবরাহকারী',
            'title'              => 'Ever Fresh Farm',
            'title_bn'           => 'এভার ফ্রেশ ফার্ম থেকে সরাসরি তাজা ও হালাল',
            'tagline'            => 'Inshaf Brings Happiness 🌿',
            'description'        => 'Fresh and halal products directly from our farm in Feni.',
            'description_bn'     => 'ফেনীর ছনুয়া থেকে সরাসরি পালিত সুস্থ ছাগল ও তাজা মাংস। আমরা নিশ্চিত করি সর্বোচ্চ মান, সম্পূর্ণ হালাল এবং সাশ্রয়ী মূল্য।',
            'primary_btn_text'   => '🐐 পণ্য দেখুন',
            'primary_btn_link'   => '#products',
            'secondary_btn_text' => '📞 অর্ডার করুন',
            'secondary_btn_link' => '#contact',
            'stats'              => [
                ['number' => '১০০%', 'label' => 'হালাল গ্যারান্টি'],
                ['number' => '২৪/৭', 'label' => 'সার্ভিস সময়'],
                ['number' => '৫০+',  'label' => 'সন্তুষ্ট গ্রাহক'],
            ],
            'is_active' => true,
        ]);

        AboutUs::create([
            'title'        => 'Trusted Natural Food Supplier',
            'title_bn'     => 'বিশ্বস্ততার সাথে প্রাকৃতিক খাদ্য সরবরাহ',
            'content'      => 'Ever Fresh Farm is a trusted animal protein producer located in Chnuoa, Feni.',
            'content_bn'   => 'Ever Fresh Farm ফেনীর ছনুয়ায় অবস্থিত একটি বিশ্বস্ত প্রাণীজ আমিষ উৎপাদন ও সরবরাহকারী প্রতিষ্ঠান। আমরা বিশ্বাস করি — সুস্থ পশু থেকেই আসে সুস্থ খাবার।',
            'badge_number' => '১০০%',
            'badge_label'  => 'অর্গানিক',
            'features'     => [
                ['icon' => '✅', 'text' => 'প্রাকৃতিক পরিবেশে পালিত ছাগল'],
                ['icon' => '🕌', 'text' => 'সম্পূর্ণ হালাল প্রক্রিয়ায় জবাই'],
                ['icon' => '🚚', 'text' => 'দ্রুত ও নিরাপদ ডেলিভারি সুবিধা'],
                ['icon' => '💰', 'text' => 'সাশ্রয়ী ও ন্যায্য মূল্য নিশ্চিত'],
            ],
        ]);

        $products = [
            [
                'name'        => 'Live Goat Sale',
                'name_bn'     => 'জীবন্ত ছাগল বিক্রয়',
                'description_bn' => 'সুস্থ, সুন্দর ও ভালোভাবে পালিত দেশি ছাগল। কোরবানি ও পারিবারিক ব্যবহারের জন্য আদর্শ।',
                'badge_text'  => 'সেরা বিক্রিত',
                'color_class' => 'green',
                'tags'        => ['দেশি জাত', 'সুস্থ-সবল', 'হালাল'],
                'sort_order'  => 1,
            ],
            [
                'name'        => 'Fresh Goat Meat',
                'name_bn'     => 'ছাগলের তাজা মাংস',
                'description_bn' => 'সম্পূর্ণ হালাল প্রক্রিয়ায় জবাই করা তাজা মাংস। পরিষ্কার, স্বাস্থ্যসম্মত ও সুস্বাদু।',
                'badge_text'  => 'তাজা',
                'color_class' => 'red',
                'tags'        => ['১০০% হালাল', 'তাজা', 'পরিষ্কার'],
                'sort_order'  => 2,
            ],
            [
                'name'        => 'Qurbani Goat',
                'name_bn'     => 'কোরবানির ছাগল',
                'description_bn' => 'ঈদুল আযহায় কোরবানির জন্য বিশেষভাবে প্রস্তুত বড় ও সুন্দর ছাগল। আগাম বুকিং করুন।',
                'badge_text'  => 'বিশেষ অর্ডার',
                'color_class' => 'gold',
                'tags'        => ['আগাম বুকিং', 'কোরবানি উপযোগী'],
                'sort_order'  => 3,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

        $whyItems = [
            ['icon' => '🌿', 'title_bn' => 'প্রাকৃতিক লালন-পালন',  'description_bn' => 'কোনো ক্ষতিকর কেমিক্যাল বা কৃত্রিম হরমোন ছাড়াই প্রাকৃতিক পরিবেশে পশু পালন করা হয়।', 'sort_order' => 1],
            ['icon' => '🕌', 'title_bn' => 'সম্পূর্ণ হালাল',       'description_bn' => 'ইসলামিক নিয়ম মেনে সম্পূর্ণ হালাল প্রক্রিয়ায় পশু জবাই ও মাংস সরবরাহ করা হয়।', 'sort_order' => 2],
            ['icon' => '💰', 'title_bn' => 'ন্যায্য মূল্য',        'description_bn' => 'বাজার মূল্যের তুলনায় সাশ্রয়ী ও সম্পূর্ণ ন্যায্য মূল্যে মানসম্পন্ন পণ্য সরবরাহ।', 'sort_order' => 3],
            ['icon' => '🚚', 'title_bn' => 'দ্রুত ডেলিভারি',       'description_bn' => 'অর্ডার করলে দ্রুততম সময়ের মধ্যে আপনার পছন্দের স্থানে পৌঁছে দেওয়া হয়।', 'sort_order' => 4],
            ['icon' => '🤝', 'title_bn' => 'বিশ্বস্ততা',           'description_bn' => 'প্রতিটি লেনদেনে সততা ও স্বচ্ছতা — আমাদের দীর্ঘদিনের গ্রাহকরাই আমাদের পরিচয়।', 'sort_order' => 5],
            ['icon' => '📞', 'title_bn' => 'সার্বক্ষণিক সেবা',     'description_bn' => 'যেকোনো প্রশ্ন বা অর্ডারের জন্য আমরা সবসময় আপনার পাশে আছি।', 'sort_order' => 6],
        ];

        foreach ($whyItems as $item) {
            WhyChooseUs::create(array_merge($item, ['title' => $item['title_bn'], 'description' => $item['description_bn']]));
        }

        ContactInfo::create([
            'phone_primary'    => '01718-867657',
            'phone_secondary'  => '01829-544486',
            'email'            => 'everfreshfarmbd@gmail.com',
            'address'          => 'East Chhilonia, Dhaka-Chittagong Highway, Chnuoa, Feni',
            'address_bn'       => 'পূর্ব ছিলোনিয়া, ঢাকা-চট্টগ্রাম মহাসড়ক পার্শে (লেমুয়া ব্রীজ সংলগ্ন), ছনুয়া, ফেনী',
            'working_hours'    => '8:00 AM – 9:00 PM (Daily)',
            'working_hours_bn' => 'সকাল ৮টা – রাত ৯টা (প্রতিদিন)',
        ]);
    }
}
