<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use App\Constant\ApiCodes;
use App\Services\ImageOptimizer;

/**
* @Route("/api")
*/
class CommonController extends BaseController {
  /**
	 * @Route("/upload-image")
	 * @Method({"POST"})
	 */
	public function uploadImagesAction(Request $request, ImageOptimizer $imgOptimizer) {
    /* @var $file \Symfony\Component\HttpFoundation\File\UploadedFile */
    $file = $request->files->get('file');

    if ($file->getError() > 0) {
      return $this->respondError(ApiCodes::UPLOAD_FILE_ERROR);
    }

    $fileRelativePath = $imgOptimizer->saveTemp( $file );

    return $this->respondSuccess(ApiCodes::VOID, [
      'imgPath' => $fileRelativePath
    ]);
	}
}
