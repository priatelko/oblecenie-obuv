<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\File\UploadedFile;

use App\Services\Helpers;

/**
* @Route("/api")
*/

class ApiController extends BaseController {
	
	private $uploadedFiles;

	public function __construct(/*UploadedFile $uploadedFiles*/) {
		//$this->uploadedFiles = $uploadedFiles;
	}
	
	/**
	 * @Route("/get/{code}")
	 * @Method({"GET"})
	 */
	public function indexAction($code) {
		$em = $this->getDoctrine();
		
		switch($code) {
			case 'role':
				return $this->respond(Helpers::entityToArray($em->getRepository('\App\Entity\UserLoginRole')->findAll()));

			case 'add-dress-article':
				//die('what?');
				$whom = Helpers::entityToArray($em->getRepository('\App\Entity\Whom')->findBy([], ['order' => 'ASC']));
				$season = Helpers::entityToArray($em->getRepository('\App\Entity\Season')->findBy([], ['order' => 'ASC']));
				$categories = $em->getRepository('\App\Entity\DressCategory')->getDataToSelectForm();
				$brand = Helpers::entityToArray($em->getRepository('\App\Entity\Brand')->findBy([], ['title' => 'ASC']));
				$occasion = Helpers::entityToArray($em->getRepository('\App\Entity\DressOccasion')->findBy([], ['order' => 'ASC']));
				$cut = Helpers::entityToArray($em->getRepository('\App\Entity\DressCut')->findBy([], ['order' => 'ASC']));
				$size = Helpers::entityToArray($em->getRepository('\App\Entity\DressSize')->findBy([], ['order' => 'ASC']));
				$style = Helpers::entityToArray($em->getRepository('\App\Entity\DressStyle')->findBy([], ['order' => 'ASC']));
				$state = Helpers::entityToArray($em->getRepository('\App\Entity\State')->findBy([], ['order' => 'ASC']));
				$fastening = Helpers::entityToArray($em->getRepository('\App\Entity\DressFastening')->findBy([], ['order' => 'ASC']));
				$material = Helpers::entityToArray($em->getRepository('\App\Entity\Material')->findBy([], ['title' => 'ASC']));
				
				return $this->respond([
					'whom' => $whom,
					'season' => $season,
					'categories' => $categories,
					'brand' => $brand,
					'occasion' => $occasion,
					'cut' => $cut,
					'size' => $size,
					'style' => $style,
					'state' => $state,
					'fastening' => $fastening,
					'material' => $material,
				]);
			default:
				throw new \InvalidArgumentException( 'Code is not valid' );
		}
	}
}
