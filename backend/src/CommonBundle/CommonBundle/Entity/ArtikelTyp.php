<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ArtikelTyp
 *
 * @ORM\Table(name="artikel_typ")
 * @ORM\Entity
 */
class ArtikelTyp
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
     * @ORM\Column(name="popis", type="string", length=255, precision=0, scale=0, nullable=false, unique=false)
     */
    private $popis;


}

