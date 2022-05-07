<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Services\SocialProvider;

/**
 * User
 * 
 * @ORM\Table(name="user")
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 */
class User implements UserInterface
{
	const ROLE_USER = 'ROLE_USER';
	const ROLE_ADMIN = 'ROLE_ADMIN';

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;
	
	/**
     * @ORM\Column(type="string", unique=true, nullable=true)
     */
    private $apiToken;
    
    /**
     * @ORM\Column(type="string", length=20, columnDefinition="ENUM('local', 'facebook', 'google')"), options={"default" : "local"})
     */
    private $provider;
	
	/**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false)
     */
    private $createdAt;
	
	/**
     * @var \DateTime
     *
     * @ORM\Column(name="updated", type="datetime", nullable=false)
     */
    private $updatedAt;
	
	/**
     * @var \DateTime
     *
     * @ORM\Column(name="last_login", type="datetime", nullable=false)
     */
    private $lastLogin;
	
	/**
     * @var boolean
     *
     * @ORM\Column(name="confirmed", type="string", length=64, nullable=true)
     */
    private $confirmation;
	
	/**
     * @var boolean
     *
     * @ORM\Column(name="reset_password", type="string", length=64, nullable=true)
     */
    private $resetPassword;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string", nullable=true)
     */
    private $password;
	
	/**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50, nullable=false, options={"default":""})
     */
    private $name = '';

    /**
     * @var string
     *
     * @ORM\Column(name="surname", type="string", length=50, nullable=false, options={"default":""})
     */
    private $surname = '';
	
	/**
     * @var \App\Entity\UserLoginRole
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\UserLoginRole")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="login_role", referencedColumnName="id")
     * })
     */
    private $loginRole;

    /**
     * @var boolean
     *
     * @ORM\Column(name="vip", type="boolean")
     */
    private $vip;

    public function getId() {
        return $this->id;
    }
	
	public function getApiToken() {
        return $this->apiToken;
    }

    public function setApiToken(?string $token): self {
        $this->apiToken = $token;

        return $this;
    }

    public function isSocial() {
      return in_array($this->getProvider(), SocialProvider::$providers);
    }
    
    public function getProvider() {
        return $this->provider;
    }

    public function setProvider(string $provider): self {
        $this->provider = $provider;

        return $this;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }
	
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }
	
	public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }
	
	public function setLastLogin($lastLogin)
    {
        $this->lastLogin = $lastLogin;

        return $this;
    }

    public function getLastLogin()
    {
        return $this->lastLogin;
    }
	
    public function setConfirmation( $confirmation ) {
        $this->confirmation = $confirmation;

        return $this;
    }

    public function getConfirmation() {
        return $this->confirmation;
    }
	
	public function setResetPassword( $resetPassword ) {
        $this->resetPassword = $resetPassword;

        return $this;
    }

    public function getResetPassword() {
        return $this->resetPassword;
    }
	
    public function setLoginRole(\App\Entity\UserLoginRole $loginRole = null)
    {
        $this->loginRole = $loginRole;

        return $this;
    }

    public function getLoginRole()
    {
        return $this->loginRole;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = self::ROLE_USER;

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }
	
	/**
     * Set name
     *
     * @param string $name
     *
     * @return User
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set surname
     *
     * @param string $surname
     *
     * @return User
     */
    public function setSurname($surname)
    {
        $this->surname = $surname;

        return $this;
    }

    /**
     * Get surname
     *
     * @return string
     */
    public function getSurname()
    {
        return $this->surname;
    }

/**
     * Set VIP
     *
     * @param boolean $bool
     *
     * @return boolean
     */
    public function setVip($bool)
    {
        $this->vip = $bool;

        return $this;
    }

    /**
     * Get VIP
     *
     * @return boolean
     */
    public function getVip()
    {
        return $this->vip;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

	
	public function toArray(): array {
		return [
			'id' => (string) $this->getId(),
			'token' => (string) $this->getApiToken(),
			'email' => (string) $this->getEmail(),
			'name' => (string) $this->getName(),
			'surname' => (string) $this->getSurname(),
      'roles' => $this->getRoles(),
			'createdAt' => (string) $this->getCreatedAt()->format(\DateTime::ATOM),
			'updatedAt' => (string) $this->getUpdatedAt()->format(\DateTime::ATOM),
			'lastLogin' => (string) $this->getLastLogin()->format(\DateTime::ATOM),
			'loginRole' => (string) $this->getLoginRole(),
      'provider' => (string) $this->getProvider(),
      'vip' => (boolean) $this->getVip(),
		];
	}


	/**
     * @ORM\PrePersist
     */
    public function prePersist() {
        $this->createdAt = new \Datetime("now");
        $this->updatedAt = new \Datetime("now");
        $this->lastLogin = new \Datetime("now");

        $this->provider = SocialProvider::local;
        $this->vip = false;
    }
}
