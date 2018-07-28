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
     * @ORM\Column(name="popis", type="string", length=255, nullable=false)
     */
    private $popis;

    /**
     * @var string
     *
     * @ORM\Column(name="id", type="string", length=255)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;



    /**
     * Set popis
     *
     * @param string $popis
     *
     * @return ArtikelTyp
     */
    public function setPopis($popis)
    {
        $this->popis = $popis;

        return $this;
    }

    /**
     * Get popis
     *
     * @return string
     */
    public function getPopis()
    {
        return $this->popis;
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
}
