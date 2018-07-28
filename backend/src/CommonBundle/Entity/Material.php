<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Material
 *
 * @ORM\Table(name="material")
 * @ORM\Entity
 */
class Material
{
    /**
     * @var string
     *
     * @ORM\Column(name="nazov", type="string", length=255, nullable=false)
     */
    private $nazov;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\Artikel", mappedBy="material")
     */
    private $artikel;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->artikel = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set nazov
     *
     * @param string $nazov
     *
     * @return Material
     */
    public function setNazov($nazov)
    {
        $this->nazov = $nazov;

        return $this;
    }

    /**
     * Get nazov
     *
     * @return string
     */
    public function getNazov()
    {
        return $this->nazov;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Add artikel
     *
     * @param \CommonBundle\Entity\Artikel $artikel
     *
     * @return Material
     */
    public function addArtikel(\CommonBundle\Entity\Artikel $artikel)
    {
        $this->artikel[] = $artikel;

        return $this;
    }

    /**
     * Remove artikel
     *
     * @param \CommonBundle\Entity\Artikel $artikel
     */
    public function removeArtikel(\CommonBundle\Entity\Artikel $artikel)
    {
        $this->artikel->removeElement($artikel);
    }

    /**
     * Get artikel
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getArtikel()
    {
        return $this->artikel;
    }
}
