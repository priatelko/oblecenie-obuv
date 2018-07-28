<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Expiracia
 *
 * @ORM\Table(name="expiracia")
 * @ORM\Entity
 */
class Expiracia
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

    /**
     * @var integer
     *
     * @ORM\Column(name="day_interval", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $dayInterval;

    /**
     * @var integer
     *
     * @ORM\Column(name="zorad", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $zorad;


}

