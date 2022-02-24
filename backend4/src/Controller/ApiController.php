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
				$preKoho = Helpers::entityToArray($em->getRepository('\App\Entity\Prekoho')->findBy([], ['zorad' => 'ASC']));
				$obdobie = Helpers::entityToArray($em->getRepository('\App\Entity\Obdobie')->findBy([], ['zorad' => 'ASC']));
				$kategorie = $em->getRepository('\App\Entity\OblecenieKategorie')->getDataToSelectForm();
				$znacka = Helpers::entityToArray($em->getRepository('\App\Entity\Znacka')->findBy([], ['nazov' => 'ASC']));
                $prilezitost = Helpers::entityToArray($em->getRepository('\App\Entity\ObleceniePrilezitost')->findBy([], ['zorad' => 'ASC']));
                $zostrih = Helpers::entityToArray($em->getRepository('\App\Entity\OblecenieZostrih')->findBy([], ['zorad' => 'ASC']));
                $velkost = Helpers::entityToArray($em->getRepository('\App\Entity\OblecenieVelkost')->findBy([], ['zorad' => 'ASC']));
                $styl = Helpers::entityToArray($em->getRepository('\App\Entity\OblecenieStyl')->findBy([], ['zorad' => 'ASC']));
                $stav = Helpers::entityToArray($em->getRepository('\App\Entity\Stav')->findBy([], ['zorad' => 'ASC']));
                $zapinanie = Helpers::entityToArray($em->getRepository('\App\Entity\OblecenieZapinanie')->findBy([], ['zorad' => 'ASC']));
                $material = Helpers::entityToArray($em->getRepository('\App\Entity\Material')->findBy([], ['nazov' => 'ASC']));
				
				return $this->respond([
					'preKoho' => $preKoho,
					'obdobie' => $obdobie,
					'kategorie' => $kategorie,
					'znacka' => $znacka,
                    'prilezitost' => $prilezitost,
                    'zostrih' => $zostrih,
                    'velkost' => $velkost,
                    'styl' => $styl,
                    'stav' => $stav,
                    'zapinanie' => $zapinanie,
                    'material' => $material,
				]);
			default:
				throw new \InvalidArgumentException( 'Code is not valid' );
		}
    }
    
    /**
     * @Route("/upload-images")
     * @Method({"POST"})
     */
    public function uploadImagesAction() {
        // dump($this->uploadedFiles);
    }
}
