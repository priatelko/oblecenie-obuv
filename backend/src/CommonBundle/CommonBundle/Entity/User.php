<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * User
 *
 * @ORM\Table(name="user", indexes={@ORM\Index(name="IDX_1C0F667E911B012F", columns={"login_role"})})
 * @ORM\Entity
 */
class User
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="role", type="string", length=25, precision=0, scale=0, nullable=false, unique=false)
     */
    private $role;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50, precision=0, scale=0, nullable=false, unique=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="surname", type="string", length=50, precision=0, scale=0, nullable=false, unique=false)
     */
    private $surname;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=50, precision=0, scale=0, nullable=false, unique=false)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=255, precision=0, scale=0, nullable=false, unique=false)
     */
    private $password;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $createdAt;

    /**
     * @var \CommonBundle\Entity\UserLoginRole
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\UserLoginRole")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="login_role", referencedColumnName="id", nullable=true)
     * })
     */
    private $loginRole;


}

