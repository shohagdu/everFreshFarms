<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteSettingResource\Pages;
use App\Models\SiteSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SiteSettingResource extends Resource
{
    protected static ?string $model = SiteSetting::class;
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Site Settings';
    protected static ?string $navigationGroup = 'Settings';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Site Identity')->schema([
                Forms\Components\TextInput::make('site_name')->required(),
                Forms\Components\TextInput::make('site_name_bn')->label('Site Name (Bangla)'),
                Forms\Components\TextInput::make('tagline'),
                Forms\Components\TextInput::make('tagline_bn')->label('Tagline (Bangla)'),
            ])->columns(2),

            Forms\Components\Section::make('Logo & Favicon')->schema([
                Forms\Components\FileUpload::make('logo')->image()->directory('logos'),
                Forms\Components\FileUpload::make('favicon')->image()->directory('favicons'),
            ])->columns(2),

            Forms\Components\Section::make('Footer & Social')->schema([
                Forms\Components\Textarea::make('footer_text')->rows(3),
                Forms\Components\TextInput::make('facebook_url')->url(),
                Forms\Components\TextInput::make('whatsapp_url')->url(),
                Forms\Components\TextInput::make('instagram_url')->url(),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('site_name'),
            Tables\Columns\ImageColumn::make('logo'),
            Tables\Columns\TextColumn::make('updated_at')->dateTime()->sortable(),
        ])->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageSiteSettings::route('/'),
        ];
    }
}
