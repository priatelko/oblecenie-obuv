<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Constant\ApiCodes;
use App\Services\Helpers;
use App\Entity\User;

class BaseController extends AbstractController {

    /**
     * @var integer HTTP status code - 200 (OK) by default
     */
    protected $statusCode = 200;
	
	public function getUser(): ?User {
		return parent::getUser();
	}
	
    /**
     * Gets the value of statusCode.
     *
     * @return integer
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * Sets the value of statusCode.
     *
     * @param integer $statusCode the status code
     *
     * @return self
     */
    protected function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    /**
     * Returns a JSON response
     *
     * @param array $data
     * @param array $headers
     *
     * @return Symfony\Component\HttpFoundation\JsonResponse
     */
    public function respond($data, $headers = [])
    {
        return new JsonResponse(['data' => $data], $this->getStatusCode(), $headers);
    }

    /**
     * Sets an error API code and returns a JSON response
     *
     * @param string $code
     *
     * @return Symfony\Component\HttpFoundation\JsonResponse
     */
    public function respondError($code, $data = [], $headers = [])
    {
        $data = [
            'error' => $code,
			'data' => $data
        ];

        return new JsonResponse($data, $this->getStatusCode(), $headers);
    }
	
	/**
     * Sets an success API code and returns a JSON response
     *
     * @param string $code
     *
     * @return Symfony\Component\HttpFoundation\JsonResponse
     */
    public function respondSuccess($code, $data = [], $headers = [])
    {
        $data = [
            'success' => $code,
			'data' => $data
        ];

        return new JsonResponse($data, $this->getStatusCode(), $headers);
    }

    /**
     * Returns a 401 Unauthorized http response
     *
     * @param string $code
     *
     * @return Symfony\Component\HttpFoundation\JsonResponse
     */
    public function respondUnauthorized($code = ApiCodes::UNAUTHORIZED)
    {
        return $this->setStatusCode(401)->respondError($code);
    }
	
	/**
	* Returns a 422 Unprocessable Entity
	*
	* @param string $message
	*
	* @return Symfony\Component\HttpFoundation\JsonResponse
	*/
   public function respondValidationError($message = 'Validation errors')
   {
	   return $this->setStatusCode(422)->respondError($message);
   }

   /**
	* Returns a 404 Not Found
	*
	* @param string $message
	*
	* @return Symfony\Component\HttpFoundation\JsonResponse
	*/
   public function respondNotFound($message = 'Not found!')
   {
	   return $this->setStatusCode(404)->respondError($message);
   }

   /**
	* Returns a 201 Created
	*
	* @param array $data
	*
	* @return Symfony\Component\HttpFoundation\JsonResponse
	*/
   public function respondCreated($data = [])
   {
	   return $this->setStatusCode(201)->respond($data);
   }

   // this method allows us to accept JSON payloads in POST requests 
   // since Symfony 4 doesn't handle that automatically:

   protected function transformJsonBody(\Symfony\Component\HttpFoundation\Request $request)
   {
	   $data = json_decode($request->getContent(), true);

	   if (json_last_error() !== JSON_ERROR_NONE) {
		   return null;
	   }

	   if ($data === null) {
		   return $request;
	   }

	   $request->request->replace(Helpers::trimArray($data));

		return $request;
   }
   
   /**
	* Is authorized
	*
	* @return bool
	*/
   public function isAuthorized(): bool
   {
		return ($this->getUser() instanceof \App\Entity\User);
   }
}