<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use App\Services\UserManager;
use App\Constant\ApiCodes;
use App\Entity\UserLoginRole;
use App\Entity\User;

/**
* @Route("/api/user")
*/

class UserController extends BaseController {

	/**
	 * @var UserManager
	 */
	private $userManager;

	/**
	 * @var UserPasswordEncoderInterface
	 */
	private $passwordEncoder;

	/**
	 * @var EventDispatcherInterface
	 */
	private $eventDispatcher;
	
	public function __construct(UserPasswordEncoderInterface $passwordEncoder, UserManager $userManager) {
		$this->passwordEncoder = $passwordEncoder;
		$this->userManager = $userManager;
	}
	
    /**
	 * @Route("/new", name="new-user")
	 * @Method({"POST"})
     */
    public function newAction(Request $request) {
		$post = $this->transformJsonBody($request)->request;

		if (!empty($request->request->all())) {
			if (!$this->userManager->emailValid($post->get('email'))) {
				return $this->respondError(ApiCodes::INVALID_EMAIL);	// Email is not validate
			}

			if ($this->userManager->userEmailExists($post->get('email')) &&
				  // New user			   // Edit user
				(!$this->isAuthorized() || $this->getUser()->getEmail() != $post->get('email'))
			) {
				return $this->respondError(ApiCodes::EMAIL_EXISTS);	// Email already exists
			}

			/* @var $user User */
			if (!$this->isAuthorized()) {		// New user
				$user = $this->userManager->createUser($post->get('email'), $post->get('password'), $post->get('role'));
				$returnData = $user->toArray();
			} else {		// Edit user
				$this->userManager->updateUser($this->getUser(), $post->get('email'), $post->get('password'), $post->get('name'), $post->get('surname'));
				$returnData = $this->getUser()->toArray();
			}

			return $this->respondSuccess((!$this->isAuthorized() ? ApiCodes::USER_CREATED : ApiCodes::USER_UPDATED), $returnData);

		}
		
		return $this->respondError(ApiCodes::COMMON_ERROR);	// Common error

    }
	
	/**
	 * @Route("/login", name="login-user")
	 * @Method({"POST"})
     */
	public function loginAction(Request $request){
        $post = $this->transformJsonBody($request)->request;

        if (!empty($request->request->all())) {

            if (!$this->userManager->emailValid($post->get('email'))) {
				return $this->respondError(ApiCodes::INVALID_EMAIL);	// Email is not validate
			}

			/* @var $user \App\Entity\User */
			if (!($user = $this->userManager->getUserByEmail($post->get('email'))) || !$this->passwordEncoder->isPasswordValid($user, $post->get('password'))) {
				return $this->respondError(ApiCodes::USER_PASS_NOT_MATCH);	// User and password not match any user
			}

			if (!is_null($user->getConfirmation())) {
				return $this->respondError(ApiCodes::USER_NOT_CONFIRMED);	// User has no confirm registration 
			}

			// Update user role
			$user->setLastLogin(new \Datetime("now"));
			$this->userManager->updateUserRole($user, $post->get('role'));

			// Login in
			return $this->respondSuccess(ApiCodes::USER_LOGGED, $user->toArray());
        }

        return $this->respondError(ApiCodes::COMMON_ERROR);	// Common error
    }
	
	/**
     * @Route("/send-confirmation/{email}", name="send-confirmation")
	 * @Method({"GET"})
     */
    public function sendConfirmationAction($email) {
		$email = str_replace('%DOT%', '.', $email);
		
		/* @var $user User */
		if (!($user = $this->userManager->getUserByEmail($email)) instanceof User) {
			return $this->respondError(ApiCodes::EMAIL_NOT_EXISTS);	// Email not exists
		}
		
		if (is_null($user->getConfirmation())) {
			return $this->respondError(ApiCodes::CONFIRMATION_HASH_NOT_FOUND);	// Registration was already confirmed
		}
		
		if (!$this->userManager->sendConfirmation($user)) {
			return $this->respondError(ApiCodes::CONFIRMATION_EMAIL_ALREADY_SENT);	// Email confirmation was sent some time ago
		}

        return $this->respondSuccess(ApiCodes::REGIST_CONFIRMATION_SENT);
    }
	
	/**
     * @Route("/apply-confirmation/{hash}", name="apply-confirmation")
	 * @Method({"GET"})
     */
    public function applyConfirmationAction($hash) {
		if (!$this->userManager->confirmRegistration($hash)) {
			return $this->respondError(ApiCodes::CONFIRMATION_HASH_NOT_FOUND);	// Confirmation hash not found
		}

        return $this->respondSuccess(ApiCodes::CONFIRMATION_SUCCESS);
    }
	
	/**
     * @Route("/forgotten-password/{email}", name="forgotten-password")
	 * @Method({"GET"})
     */
    public function forgottenPasswordAction($email) {
		$email = str_replace('%DOT%', '.', $email);
		
		/* @var $user User */
		if (!($user = $this->userManager->getUserByEmail($email)) instanceof User) {
			return $this->respondError(ApiCodes::EMAIL_NOT_EXISTS);	// Email not exists
		}
		
		if (!is_null($user->getConfirmation())) {
			return $this->respondError(ApiCodes::USER_NOT_CONFIRMED);	// User not confirmed
		}
		
		if (!$this->userManager->sendForgottenPassword($user)) {
			return $this->respondError(ApiCodes::FORGOTTEN_EMAIL_ALREADY_SENT);	// Forgotten password was sent some time ago
		}
		
		return $this->respondSuccess(ApiCodes::FORGOTTEN_PASSWORD_SENT);
	}
	
	/**
     * @Route("/confirm-forgotten-password/{hash}", name="confirm-forgotten-password")
	 * @Method({"GET"})
     */
    public function confirmForgottenPasswordAction($hash) {
		if (!($user = $this->userManager->getUserByForgottenHash($hash)) instanceof User) {
			return $this->respondError(ApiCodes::FORGOTTEN_HASH_NOT_EXISTS);	// Forgotten hash not exists
		}

		if (!$this->userManager->resetPassword($user)) {
			return $this->respondError(ApiCodes::NEW_PASSWORD_SENT_FAIL);	// Fail sent new password
		}
		
		$this->userManager->cancelResetPassword($user);
		
		return $this->respondSuccess(ApiCodes::NEW_PASSWORD_RESET);
	}


	/**
	 * AUTHORIZED METHODS
	 */
	
	/**
     * @Route("/change-role", name="change-role")
	 * @Method({"GET"})
     */
    public function changeRoleAction() {
		if (!$this->isAuthorized()) {
			return $this->respondUnauthorized();
		}

		$changeToRole = $this->getUser()->getLoginRole() == UserLoginRole::ROLE_BUYER ? UserLoginRole::ROLE_SELLER : UserLoginRole::ROLE_BUYER;
		$this->userManager->updateUserRole($this->getUser(), $changeToRole);

        return $this->respondSuccess(ApiCodes::CHANGE_ROLE_SUCCESS, $this->getUser()->toArray());
    }
}
