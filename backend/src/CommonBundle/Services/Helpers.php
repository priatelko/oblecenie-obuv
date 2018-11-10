<?php

namespace CommonBundle\Services;

use Symfony\Component\HttpFoundation\RequestStack;

class Helpers {

	/**
	 * @var \Doctrine\ORM\EntityManager
	 */
	private $manager;

	/**
	 * @var RequestStack
	 */
	private $requestStack;
	
	public function __construct(\Doctrine\ORM\EntityManager $manager, RequestStack $requestStack) {
		$this->requestStack = $requestStack;
		$this->manager = $manager;
		
			// Adapt json requests
		if (0 === strpos($this->requestStack->getCurrentRequest()->headers->get('accept'), 'application/json')) {
			$data = json_decode($this->requestStack->getCurrentRequest()->getContent(), true);
			$this->requestStack->getCurrentRequest()->request->replace(is_array($data) ? $data : array());
		}
	}
	
	public function returnJson($data, $defaultValue = false) {
		$normalizers = array(new \Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer());
		$encoders = array("json" => new \Symfony\Component\Serializer\Encoder\JsonEncoder());
		
		if(is_object($data)) {
			$data = (array) $data;
		}
		
		if($defaultValue) {
			$data = array_merge([['default' => true]], $data);
		}

		$serializer = new \Symfony\Component\Serializer\Serializer($normalizers, $encoders);
		$json = $serializer->serialize(  $data, 'json');

		$response = new \Symfony\Component\HttpFoundation\Response();
		$response->setContent($json);
		$response->headers->set('Content-Type','application/json');

		return $response;
	}

	function getEntityById($entity, $id) {
		return $this->manager->getRepository($entity)->findOneById($id);
	}
	
	
}