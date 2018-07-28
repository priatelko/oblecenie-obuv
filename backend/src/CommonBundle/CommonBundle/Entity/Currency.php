<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Currency
 *
 * @ORM\Table(name="currency")
 * @ORM\Entity
 */
class Currency
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
     * @ORM\Column(name="name", type="string", length=10, precision=0, scale=0, nullable=false, unique=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255, precision=0, scale=0, nullable=true, unique=false)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="sign", type="string", length=5, precision=0, scale=0, nullable=false, unique=false)
     */
    private $sign;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="valid_from", type="date", precision=0, scale=0, nullable=false, unique=false)
     */
    private $validFrom;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="valid_to", type="date", precision=0, scale=0, nullable=false, unique=false)
     */
    private $validTo;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_create", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $dateCreate;


}

