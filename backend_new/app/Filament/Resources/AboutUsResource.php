<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AboutUsResource\Pages;
use App\Models\AboutUs;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class AboutUsResource extends Resource
{
    protected static ?string $model = AboutUs::class;
    protected static ?string $navigationIcon = 'heroicon-o-information-circle';
    protected static ?string $navigationLabel = 'About Us';
    protected static ?string $navigationGroup = 'Content';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('About Content')->schema([
                Forms\Components\TextInput::make('title'),
                Forms\Components\TextInput::make('title_bn')->label('Title (Bangla)'),
                Forms\Components\Textarea::make('content')->rows(4),
                Forms\Components\Textarea::make('content_bn')->label('Content (Bangla)')->rows(4),
            ])->columns(2),

            Forms\Components\Section::make('Image & Badge')->schema([
                Forms\Components\FileUpload::make('image')->image()->directory('about'),
                Forms\Components\TextInput::make('badge_number'),
                Forms\Components\TextInput::make('badge_label'),
            ])->columns(3),

            Forms\Components\Section::make('Features')->schema([
                Forms\Components\Repeater::make('features')->schema([
                    Forms\Components\TextInput::make('icon')->default('✅'),
                    Forms\Components\TextInput::make('text')->required(),
                ])->columns(2),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('title_bn'),
            Tables\Columns\ImageColumn::make('image'),
            Tables\Columns\TextColumn::make('updated_at')->dateTime(),
        ])->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageAboutUs::route('/'),
        ];
    }
}
