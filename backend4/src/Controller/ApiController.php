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

			default:
				throw new \InvalidArgumentException( 'Code is not valid' );
		}
    }
	
	private function entityToArray($entityArr) {
		return $this->recursiveEntity($entityArr);
	}

	private function recursiveEntity($array) {
		$new = [];

		// First array loop
		foreach($array as $key => $value){
			// Secondly object loop
			if(is_object($value)) {
				$objName = get_class($value);
				$value = (array) $value;
				$newO = [];
				foreach($value as $kO => $vO) {
					$realKey = trim(str_replace($objName, '', $kO));
					$newO += [$realKey => $vO];
				}

				$new[] = $newO;
			} else{
				die('what a');
			}
		}
		
		return $new;
	}
}
