<?php

namespace UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;

use CommonBundle\Services\Helpers;
use CommonBundle\Services\JwtAuth;
use CommonBundle\Entity\User;

class CommonController extends Controller
{
	const ROLE_USER		= 'user';
	
    /**
	 * @Route("/new", name="new-user")
     */
    public function newAction(Request $request) {
		/* @var $helpers \CommonBundle\Services\Helpers */
		$helpers = $this->get(Helpers::class);
		
		$returnData = array(
			'error'	 => 1,	// Common error
		);

		if (!empty($request->request->all())) {
			$createdAt = new \Datetime("now");
			$role = self::ROLE_USER;
			$email = (!is_null($request->get('email'))) ? $request->get('email') : null;
			$password = (!is_null($request->get('passwords')['password'])) ? $request->get('passwords')['password'] : null;
			$emailConstraint = new Assert\Email();
			$validate_email = $this->get("validator")->validate($email, $emailConstraint);
			
			if (!$validate_email) {
				$returnData['error'] = 2;	// Email is not validate
				return $helpers->returnJson($returnData);
			}
			
			$em = $this->getDoctrine()->getManager();
			$isset_user = $em->getRepository('CommonBundle:User')->findBy(array(
				"email" => $email
			));

			if (count($isset_user)) {
				$returnData['error'] = 3;	// Email exists
				return $helpers->returnJson($returnData);
			}
			
			$user = new User();
			$user->setCreatedAt($createdAt);
			$user->setRole($role);
			$user->setEmail($email);
			$user->setLoginRole($helpers->getEntityById('CommonBundle:UserLoginRole', $request->get('role')));
			$pwd = hash('sha256',$password);
			$user->setPassword($pwd);

			$em->persist($user);
			$em->flush();
			$returnData = array(
				'error'	 => 0,
				'user' 	 => $user
			);
		}

		return $helpers->returnJson($returnData);
    }
	
	/**
	 * @Route("/login", name="login-user")
     */
	public function loginAction(Request $request){
        $helpers = $this->get(Helpers::class);
		
		$returnData = array(
			'error'	 => 1,	// Common error
		);

        if (!empty($request->request->all())) {
            $email = (!is_null($request->get('email'))) ? $request->get('email') : null;
            $password = (!is_null($request->get('password'))) ? $request->get('password') : null;
            $getHash = (!is_null($request->get('getHash'))) ? $request->get('getHash') : null;

            $emailConstraint = new Assert\Email();
            $validate_email = $this->get('validator')->validate($email, $emailConstraint);
			
			if (!$validate_email) {
				$returnData['error'] = 2;	// Email is not validate
				return $helpers->returnJson($returnData);
			}

            $pwd = hash('sha256', $password);

            if(count($validate_email) == 0 && $password != null) {

                $jwt_auth = $this->get(JwtAuth::class);

                if($getHash == null || $getHash == false) {
                    $signup = $jwt_auth->signup($email, $pwd);
                } else {
                    $signup = $jwt_auth->signup($email, $pwd, true);
                }

				dump($signup);exit;

                return $helpers->returnJson($signup);

            } else {
                $returnData = array(
                    'error' => 3,	// Email or password not valid
                );
            }
        }

        return $helpers->returnJson($returnData);
    }
}
