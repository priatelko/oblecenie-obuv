<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserLoginRole
 *
 * @ORM\Table(name="user_login_role")
 * @ORM\Entity
 */
class UserLoginRole implements \App\Interfaces\ToStringInterface, \App\Interfaces\ToArrayObjectInterface
{
	const ROLE_BUYER			= 'ROLE_BUYER';
	const ROLE_SELLER			= 'ROLE_SELLER';
	
    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255, nullable=false)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="id", type="string", length=255, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * Set description
     *
     * @param string $description
     *
     * @return UserLoginRole
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Get id
     *
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }
	
	public function __toString() {
		return $this->getId();
	}
	
	public function toArrayObject() {
		return [
			'id' => $this->getId(),
			'description' => $this->getDescription()
		];
	}
}
