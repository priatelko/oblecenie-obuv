<?php

namespace App\Services;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\UserLoginRole;
use App\Entity\User;

class EntityManager {

	/**
	 * @var EntityManagerInterface
	 */
	public $em;

	public function __construct(EntityManagerInterface $em) {
		$this->em = $em;
	}
	
	public function saveEntity($entity) {
		$this->em->persist($entity);
        $this->em->flush();
	}
	
	public function getRepository($className) {
		return $this->em->getRepository($className);
	}
}
