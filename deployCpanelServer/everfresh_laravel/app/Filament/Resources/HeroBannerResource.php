<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HeroBannerResource\Pages;
use App\Models\HeroBanner;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class HeroBannerResource extends Resource
{
    protected static ?string $model = HeroBanner::class;
    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $navigationLabel = 'Hero Banner';
    protected static ?string $navigationGroup = 'Content';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Banner Content')->schema([
                Forms\Components\TextInput::make('badge_text'),
                Forms\Components\TextInput::make('title'),
                Forms\Components\TextInput::make('title_bn')->label('Title (Bangla)'),
                Forms\Components\TextInput::make('tagline'),
                Forms\Components\Textarea::make('description')->rows(3),
                Forms\Components\Textarea::make('description_bn')->label('Description (Bangla)')->rows(3),
            ])->columns(2),

            Forms\Components\Section::make('Buttons')->schema([
                Forms\Components\TextInput::make('primary_btn_text'),
                Forms\Components\TextInput::make('primary_btn_link'),
                Forms\Components\TextInput::make('secondary_btn_text'),
                Forms\Components\TextInput::make('secondary_btn_link'),
            ])->columns(2),

            Forms\Components\Section::make('Background & Status')->schema([
                Forms\Components\FileUpload::make('background_image')->image()->directory('hero'),
                Forms\Components\Toggle::make('is_active')->default(true),
            ]),

            Forms\Components\Section::make('Stats')->schema([
                Forms\Components\Repeater::make('stats')->schema([
                    Forms\Components\TextInput::make('number')->required(),
                    Forms\Components\TextInput::make('label')->required(),
                ])->columns(2)->defaultItems(3),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('title_bn'),
            Tables\Columns\ImageColumn::make('background_image'),
            Tables\Columns\IconColumn::make('is_active')->boolean(),
            Tables\Columns\TextColumn::make('updated_at')->dateTime(),
        ])->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageHeroBanners::route('/'),
        ];
    }
}
