<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Katalog
 *
 * @ORM\Table(name="katalog", indexes={@ORM\Index(name="IDX_28C37C209B3651C6", columns={"user_id"})})
 * @ORM\Entity
 */
class Katalog
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
     * @ORM\Column(name="titulok", type="string", length=255, precision=0, scale=0, nullable=false, unique=false)
     */
    private $titulok;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="datum_pridania", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $datumPridania;

    /**
     * @var \CommonBundle\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $user;


}

