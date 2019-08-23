<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

use App\Services\Helpers;

/**
* @Route("/api")
*/

class ApiController extends BaseController {
	
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
				$preKoho = Helpers::entityToArray($em->getRepository('\App\Entity\Prekoho')->findBy([], ['zorad' => 'ASC']));
				$obdobie = Helpers::entityToArray($em->getRepository('\App\Entity\Obdobie')->findBy([], ['zorad' => 'ASC']));
				$kategorie = $em->getRepository('\App\Entity\OblecenieKategorie')->getDataToSelectForm();
				$znacka = Helpers::entityToArray($em->getRepository('\App\Entity\Znacka')->findBy([], ['nazov' => 'ASC']));
				
				return $this->respond([
					'preKoho' => $preKoho,
					'obdobie' => $obdobie,
					'kategorie' => $kategorie,
					'znacka' => $znacka
				]);
			default:
				throw new \InvalidArgumentException( 'Code is not valid' );
		}
    }
}
