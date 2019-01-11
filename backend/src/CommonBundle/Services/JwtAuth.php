<?php

namespace CommonBundle\Services;

use Firebase\JWT\JWT;
use CommonBundle\Services\Helpers;

class JwtAuth {

	public $manager;
	public $key;
	public $helpers;

	public function __construct($manager, Helpers $helpers) {
		$this->manager = $manager;
		$this->key = 'thisIsANiceKey!@#!3!!21$%ˆ&*()';
		$this->helpers = $helpers;
	}

	public function signup($email, $password, $role, $getHash = null) {
		$user = $this->manager->getRepository('CommonBundle:User')->findOneBy(array(
			"email" => $email,
			"password" => $password
		));

		if(!is_object($user)) {
			return false;
		}
		
		//update user role
		$role = $this->helpers->getEntityById('CommonBundle:UserLoginRole', $role);
		$user->setLoginRole($role);
		$this->helpers->save($user);

		//generate token
		$token = array(
			"sub" => $user->getId(),
			"email" => $user->getEmail(),
			"name" => $user->getName(),
			"surname" => $user->getSurname(),
			"role" => $user->getLoginRole()->getId(),
			"iat" => time(),
			"exp" => time() + (7*24*60*60)
		);

		$jwt 		= JWT::encode($token, $this->key, 'HS256');
		$decoded 	= JWT::decode($jwt, $this->key, array('HS256'));

		if($getHash == null){
			$data = $jwt;
		}else{
			$data = $decoded;
		}

		return $data;
	}

	public function checkToken($jwt, $getIdentity = false) {
		$auth = false;

		try {
			$decoded = JWT::decode($jwt, $this->key, array('HS256'));
		} catch(\UnexpectedValueException $e) {
			$auth = false;
		} catch(\DomainException $e){ 
			$auth = false;
		}

		if (isset($decoded) && is_object($decoded) && isset($decoded->sub)) {
			$auth = true;
		} else {
			$auth = false;
		}

		if($getIdentity == false) {
			return $auth;
		} else {
			return $decoded;
		}
	}
}