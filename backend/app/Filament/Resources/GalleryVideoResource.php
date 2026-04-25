<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GalleryVideoResource\Pages;
use App\Models\GalleryVideo;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class GalleryVideoResource extends Resource
{
    protected static ?string $model = GalleryVideo::class;
    protected static ?string $navigationIcon = 'heroicon-o-video-camera';
    protected static ?string $navigationLabel = 'Gallery Videos';
    protected static ?string $navigationGroup = 'Gallery';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('title'),
            Forms\Components\TextInput::make('title_bn')->label('Title (Bangla)'),
            Forms\Components\TextInput::make('video_url')->url()->label('YouTube/External URL'),
            Forms\Components\FileUpload::make('video_file')->acceptedFileTypes(['video/*'])->directory('gallery/videos'),
            Forms\Components\FileUpload::make('thumbnail')->image()->directory('gallery/thumbnails'),
            Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
            Forms\Components\Toggle::make('is_active')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('thumbnail'),
            Tables\Columns\TextColumn::make('title_bn')->label('Title'),
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
            'index'  => Pages\ListGalleryVideos::route('/'),
            'create' => Pages\CreateGalleryVideo::route('/create'),
            'edit'   => Pages\EditGalleryVideo::route('/{record}/edit'),
        ];
    }
}
