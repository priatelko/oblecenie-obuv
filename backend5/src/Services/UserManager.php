<?php

namespace App\Services;

use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\RequestStack;

use App\Services\EntityManager;
use App\Entity\User;
use App\Entity\UserLoginRole;
use App\Services\ProjectConfig;
use App\Constant\CacheNamespace;
use App\Services\SocialProvider;

class UserManager {

  const ANONYMOUS_RESPONSE       = ['loginRole' => UserLoginRole::ANONYMOUS];

	/**
	 * @var RequestStack
	 */
	private $requestStack;

	/**
	 * @var ProjectConfig
	 */
	private $projectConfig;

	/**
	 * @var \Swift_Mailer
	 */
	private $mailer;

	/**
	 * @var ValidatorInterface
	 */
	private $validator;

	/**
	 * @var EntityManager
	 */
	private $entityManager;

	/**
	 * @var UserPasswordEncoderInterface
	 */
	private $passwordEncoder;
    
    /**
     * @var SocialProvider 
     */
    private $socialProvider;

	public function __construct(EntityManager $entityManager, UserPasswordEncoderInterface $passwordEncoder, 
			ValidatorInterface $validator, \Swift_Mailer $mailer, ProjectConfig $projectConfig, RequestStack $requestStack,
            SocialProvider $socialProvider) {
		$this->entityManager = $entityManager;
		$this->passwordEncoder = $passwordEncoder;
		$this->validator = $validator;
		$this->mailer = $mailer;
		$this->projectConfig = $projectConfig;
		$this->requestStack = $requestStack;
    $this->socialProvider = $socialProvider;
	}
	
	/**
	 * CHECK
	 */
	public function emailValid($email): bool {
		$emailConstraint = new Assert\Email();
		return (bool) !$this->validator->validate($email, $emailConstraint)->count();
	}
	
	/**
	 * GET 
	 */
	public function getLoginRole($role): UserLoginRole {
		return $this->entityManager->getRepository(UserLoginRole::class)->findOneById($role);
	}
	
	public function getUserByEmail($email): ?User {
		return $this->entityManager->getRepository(User::class)->findOneByEmail($email);
	}

	public function userEmailExists($email): bool {
		return $this->getUserByEmail($email) instanceof User;
	}
	
	public function getUserByForgottenHash($hash) {
		return $this->entityManager->getRepository(User::class)->findOneByResetPassword($hash);
	}
	
	public function generatePassword() {
		return substr(md5(uniqid('OO') . time()), 0, 20);
	}

	/**
	 * CREATE
	 */
	public function createUser($email, $password, $provider = SocialProvider::local, $fname = '', $lname = ''): User {
		/* @var $user User */
		$user = new User();
		$user->setEmail($email);
		$user->setRoles([User::ROLE_USER]);
    $user->setApiToken(null);
    $user->setName($fname);
    $user->setSurname($lname);
    $user->setProvider($provider);

    if ($provider == SocialProvider::local) {
      $user->setPassword($this->passwordEncoder->encodePassword($user, $password));
      $confirmHash = md5(str_shuffle(uniqid() . $email)) . md5(str_shuffle(time() . $password));
      $user->setConfirmation($confirmHash);
    }

		$this->entityManager->saveEntity($user);
		$this->sendConfirmation($user);

		return $user;
	}

  public function logout(?User $user) {
    $user->setApiToken(null);
		$this->entityManager->saveEntity($user);
    return true;
  }

  public function createSocialUser($provider, $email, $fname, $lname, $token): ?User {
    $socialUser = $this->socialProvider->getUser($provider, $token);
    if (!$socialUser) {
      return null;
    }

    /* @var $user User */
    if (!($user = $this->getUserByEmail($email))) {
      $user = $this->createUser($email, '', $provider, $fname, $lname);
    }

    return $user;
  }
	
	/**
	 * UPDATE 
	 */
	public function updateUser(User $user, $post) {
    $email = $post->get('email');
    $password = $post->get('password');
    $name = $post->get('name');
    $surname = $post->get('surname');
    $avatar = $post->get('avatar');
dump($avatar); exit;

    $user->setAvatar($avatar ?? null);
		$user->setName($name);
		$user->setSurname($surname);
		$user->setUpdatedAt(new \Datetime("now"));

    if(!$user->isSocial()) {
      $user->setEmail($email);
      $user->setPassword($this->passwordEncoder->encodePassword($user, $password));
    }

		$this->entityManager->saveEntity($user);
	}
	
	public function updateUserRole(User $user, $role) {
		$user->setLoginRole($this->getLoginRole($role));
		$this->entityManager->saveEntity($user);
	}
	
	public function confirmRegistration($hash): bool {
		/* $user User */
		$user = $this->entityManager->getRepository(User::class)->findOneByConfirmation($hash);
		
		if (!$user instanceof User) {
			return false;
		}
		
		$user->setConfirmation(null);
		$this->entityManager->saveEntity($user);
		
		return true;
	}
	
	/**
	 * VOID
	 */
	public function sendConfirmation(User $user) {
		$body = $this->projectConfig->loadTemplate($this->projectConfig->getParam('registConfirmBodyTemplate'), [
			'%CONFIRM_URL%' => $this->projectConfig->getReferer().'?cR='.$user->getConfirmation()
		]);
		
		$message = (new \Swift_Message($this->projectConfig->getParam('projectName') . ' - ' . $this->projectConfig->getParam('registConfirmSubject')))
        ->setFrom($this->projectConfig->getParam('rootMailFrom'))
        ->setTo($user->getEmail())
        ->setBody($body);
		
		// Ulozime a overime stav, ze confirmacia bola odoslana, nech to nemoze klient spamovat
		$cache = Helpers::getCacheStorage(CacheNamespace::USER, CacheNamespace::ACTION_DELAY_LIFETIME);

		/* @var $confirmation \Symfony\Component\Cache\CacheItem */
		$confirmation = $cache->getItem(CacheNamespace::REGIST_SENT_CONFIRMATION);
		if (!$confirmation->isHit()) {
			$confirmation->set(true);
			$cache->save($confirmation);
			
			return $this->mailer->send($message);
		} else {
			return false;
		}
	}
	
	public function sendForgottenPassword(User $user) {
		$user->setResetPassword(md5(str_shuffle(uniqid() . $user->getEmail())) . md5(str_shuffle(time() . $user->getPassword())));
		$this->entityManager->saveEntity($user);
		
		$body = $this->projectConfig->loadTemplate($this->projectConfig->getParam('forgottenBodyTemplate'), [
			'%RESET_PASSWORD_URL%' => $this->projectConfig->getReferer().'?fP='.$user->getResetPassword()
		]);
		
		$message = (new \Swift_Message($this->projectConfig->getParam('projectName') . ' - ' . $this->projectConfig->getParam('forgottenSubject')))
        ->setFrom($this->projectConfig->getParam('rootMailFrom'))
        ->setTo($user->getEmail())
        ->setBody($body);
		
		// Ulozime a overime stav, ze email bol odoslany, nech to nemoze klient spamovat
		$cache = Helpers::getCacheStorage(CacheNamespace::USER, CacheNamespace::ACTION_DELAY_LIFETIME);

		/* @var $confirmation \Symfony\Component\Cache\CacheItem */
		$confirmation = $cache->getItem(CacheNamespace::FORGOTTEN_PASSWORD_SENT_CONFIRMATION);
		if (!$confirmation->isHit()) {
			$confirmation->set(true);
			$cache->save($confirmation);
			
			return $this->mailer->send($message);
		} else {
			return false;
		}
	}
	
	public function resetPassword(User $user): bool {
		$user->setPassword($this->passwordEncoder->encodePassword($user, $newPassword = $this->generatePassword()));
		$this->entityManager->saveEntity($user);
		
		$body = $this->projectConfig->loadTemplate($this->projectConfig->getParam('newPasswordBodyTemplate'), [
			'%NEW_PASSWORD%' => $newPassword
		]);
		
		$message = (new \Swift_Message($this->projectConfig->getParam('projectName') . ' - ' . $this->projectConfig->getParam('newPasswordSubject')))
        ->setFrom($this->projectConfig->getParam('rootMailFrom'))
        ->setTo($user->getEmail())
        ->setBody($body);

		return $this->mailer->send($message) ? true : false;
	}
	
	public function cancelResetPassword(User $user) {
		$user->setResetPassword(null);
		$this->entityManager->saveEntity($user);
	}
}
