<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use App\Constant\ApiCodes;
use App\Services\ImageOptimizer;

/**
* @Route("/api/article")
*/
class ArticleController extends BaseController {
	
	/**
	 * @Route("/add", name="add-article")
	 * @Method({"POST"})
     */
	function addArticleAction(Request $request) {
		$post = $this->transformJsonBody($request)->request;

		dump($post); exit;
	}
    
    /**
	 * @Route("/upload-images")
	 * @Method({"POST"})
	 */
	public function uploadImagesAction(Request $request, ImageOptimizer $imgOptimizer) {
    /* @var $files \Symfony\Component\HttpFoundation\File\UploadedFile */
    $files = $request->files->get('file');

    if ($files->getError() > 0) {
      return $this->respondError(ApiCodes::UPLOAD_FILE_ERROR);
    }

    $imgOptimizer->saveTemp( $request->files->get('file')->getPathname() );
    //dump(\App\Services\Helpers::resizeImage($request->files->get('file')->getPathname()));
	}
}
