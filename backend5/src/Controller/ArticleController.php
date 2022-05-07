<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

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
}
