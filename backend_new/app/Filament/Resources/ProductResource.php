<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
    protected static ?string $navigationLabel = 'Products';
    protected static ?string $navigationGroup = 'Content';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Product Info')->schema([
                Forms\Components\TextInput::make('name')->required(),
                Forms\Components\TextInput::make('name_bn')->label('Name (Bangla)'),
                Forms\Components\Textarea::make('description')->rows(3),
                Forms\Components\Textarea::make('description_bn')->label('Description (Bangla)')->rows(3),
            ])->columns(2),

            Forms\Components\Section::make('Image & Badge')->schema([
                Forms\Components\FileUpload::make('image')->image()->directory('products'),
                Forms\Components\TextInput::make('badge_text'),
                Forms\Components\Select::make('color_class')->options([
                    'green' => 'Green',
                    'red'   => 'Red',
                    'gold'  => 'Gold',
                    'blue'  => 'Blue',
                ])->default('green'),
                Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
                Forms\Components\Toggle::make('is_active')->default(true),
            ])->columns(3),

            Forms\Components\Section::make('Tags')->schema([
                Forms\Components\TagsInput::make('tags'),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('image'),
            Tables\Columns\TextColumn::make('name_bn')->label('Name'),
            Tables\Columns\TextColumn::make('badge_text'),
            Tables\Columns\TextColumn::make('sort_order')->sortable(),
            Tables\Columns\IconColumn::make('is_active')->boolean(),
        ])->defaultSort('sort_order')
        ->reorderable('sort_order')
        ->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
        ])->bulkActions([
            Tables\Actions\BulkActionGroup::make([
                Tables\Actions\DeleteBulkAction::make(),
            ]),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit'   => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
