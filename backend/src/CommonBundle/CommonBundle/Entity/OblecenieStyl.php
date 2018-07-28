<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * OblecenieStyl
 *
 * @ORM\Table(name="oblecenie_styl")
 * @ORM\Entity
 */
class OblecenieStyl
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
     * @ORM\Column(name="nazov", type="string", length=255, precision=0, scale=0, nullable=false, unique=false)
     */
    private $nazov;

    /**
     * @var integer
     *
     * @ORM\Column(name="zorad", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $zorad;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\Oblecenie", mappedBy="oblecenieStyl")
     */
    private $oblecenie;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->oblecenie = new \Doctrine\Common\Collections\ArrayCollection();
    }

}

