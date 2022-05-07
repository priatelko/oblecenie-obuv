<?php

namespace App\Services;

use \Symfony\Component\HttpFoundation\File\UploadedFile;
use Imagine\Gd\Imagine;
use Imagine\Image\Box;
use App\Services\Helpers;
use App\Services\ProjectConfig;

class ImageOptimizer {

    const SEP       = DIRECTORY_SEPARATOR;

    private const MAX_WIDTH = 1200;
    private const MAX_HEIGHT = 800;
    private const MAX_FILE_SIZE = 5; //MB

    private $imagine;
    private $projectConfig;

    public function __construct(ProjectConfig $projectConfig) {
      $this->projectConfig = $projectConfig;
      $this->imagine = new Imagine();
    }

    public function saveTemp(UploadedFile $file): string {
        list($iwidth, $iheight) = getimagesize($file->getPathname());

        $ratio = $iwidth / $iheight;
        $width = self::MAX_WIDTH;
        $height = self::MAX_HEIGHT;
        if ($width / $height > $ratio) {
            $width = $height * $ratio;
        } else {
            $height = $width / $ratio;
        }

        $fileRelativePath = '/img/articles/temp/'.$file->getClientOriginalName();
        $photo = $this->imagine->open($file->getPathname());
        $photo->resize(new Box($width, $height))->save($this->projectConfig->getProjetAbsRoot(). self::SEP.'public' .$fileRelativePath);

        return $fileRelativePath;
    }
}