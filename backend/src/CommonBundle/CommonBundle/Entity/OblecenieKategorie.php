<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * OblecenieKategorie
 *
 * @ORM\Table(name="oblecenie_kategorie")
 * @ORM\Entity
 */
class OblecenieKategorie
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
     * @var integer
     *
     * @ORM\Column(name="rodic", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $rodic;

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


}

