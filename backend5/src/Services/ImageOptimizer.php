<?php

namespace App\Services;

use Symfony\Component\HttpKernel\KernelInterface;
use Imagine\Gd\Imagine;
use Imagine\Image\Box;
use App\Services\Helpers;

class ImageOptimizer {
    private const MAX_WIDTH = 1200;
    private const MAX_HEIGHT = 800;
    private const MAX_FILE_SIZE = 5; //MB

    private $imagine;
    private $homeDir;

    public function __construct(KernelInterface $appKernel) {
      $this->homeDir = $appKernel->getProjectDir();
      $this->imagine = new Imagine();
    }

    public function saveTemp(string $filename): void {
        list($iwidth, $iheight) = getimagesize($filename);
        $ratio = $iwidth / $iheight;
        $width = self::MAX_WIDTH;
        $height = self::MAX_HEIGHT;
        if ($width / $height > $ratio) {
            $width = $height * $ratio;
        } else {
            $height = $width / $ratio;
        }

        $photo = $this->imagine->open($filename);
        
        $photo->resize(new Box($width, $height))->save($this->homeDir.'/public/img/articles/test.jpg');
    }
}