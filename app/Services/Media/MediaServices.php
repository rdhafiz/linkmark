<?php

namespace App\Services\Media;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaServices
{
    public static function upload($file, $filename = null, $filePath = null)
    {
        if ($filePath == null) {
            $filePath = 'media/images';
        }
        if ($filename != null) {
            $path = $filePath . '/' . $filename . '.png';
            Storage::disk('public')->put($path, file_get_contents($file));
        } else {
            $path = Storage::disk('public')->put($filePath, $file);
        }
        return $path;
    }

    public static function uploadDummy($string)
    {
        $string = str_replace(' ', '+', $string);
        $filename = Str::slug($string) . '.png';
        $avatarStream = file_get_contents('https://ui-avatars.com/api/?name=' . $string);
        $imagePath = 'media/images/' . $filename;
        Storage::disk('public')->put($imagePath, $avatarStream);
        return $imagePath;
    }
}
