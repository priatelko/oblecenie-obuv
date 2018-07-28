<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserLoginRole
 *
 * @ORM\Table(name="user_login_role")
 * @ORM\Entity
 */
class UserLoginRole
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="string", length=255, precision=0, scale=0, nullable=false, unique=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255, precision=0, scale=0, nullable=false, unique=false)
     */
    private $description;


}

