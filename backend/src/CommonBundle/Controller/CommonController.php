<?php

namespace CommonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

use CommonBundle\Services\Helpers;

class CommonController extends Controller
{
    /**
     * @Route("/get/{code}", name="get_databaze")
	 * @Method({"GET"})
     */
    public function indexAction($code) {
		$helpers = $this->get(Helpers::class);
		$em = $this->getDoctrine()->getManager();
		
		switch($code) {
			case 'role':
				return $helpers->returnJson($em->getRepository('CommonBundle:UserLoginRole')->findAll(), true);

			default:
				throw new \InvalidArgumentException( 'Code is not valid' );
		}
    }
}
