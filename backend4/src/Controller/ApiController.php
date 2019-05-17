<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

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
				return $this->respond($this->entityToArray($em->getRepository('\App\Entity\UserLoginRole')->findAll()));

			case 'add-dress-article':
				$preKoho = $this->entityToArray($em->getRepository('\App\Entity\Prekoho')->findBy([], ['zorad' => 'ASC']));
				$obdobie = $this->entityToArray($em->getRepository('\App\Entity\Obdobie')->findBy([], ['zorad' => 'ASC']));
				$kategorie = $em->getRepository('\App\Entity\OblecenieKategorie')->getDataToSelectForm();
				
				return $this->respond([
					'preKoho' => $preKoho,
					'obdobie' => $obdobie,
					'kategorie' => $kategorie
				]);
			default:
				throw new \InvalidArgumentException( 'Code is not valid' );
		}
    }
	
	private function entityToArray(array $entityItems) {
		$result = [];
		
		/* @var $item \App\Entity\UserLoginRole */
		foreach ($entityItems as $item) {
			if (!$item instanceof \App\Interfaces\ToArrayObjectInterface) {
				throw new \InvalidArgumentException( 'Entity is not a right interface of toArray' );
			}

			$result[] = $item->toArrayObject();
		}

		return $result;
	}
}
