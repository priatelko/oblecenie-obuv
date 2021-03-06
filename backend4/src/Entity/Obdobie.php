<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Obdobie
 *
 * @ORM\Table(name="obdobie")
 * @ORM\Entity
 */
class Obdobie implements \App\Interfaces\ToStringInterface, \App\Interfaces\ToArrayObjectInterface
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
     * @ORM\Column(name="zorad", type="integer", nullable=false)
     */
    private $zorad;

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
     * @ORM\ManyToMany(targetEntity="App\Entity\Artikel", mappedBy="obdobie")
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
     * @return Obdobie
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
     * Set zorad
     *
     * @param integer $zorad
     *
     * @return Obdobie
     */
    public function setZorad($zorad)
    {
        $this->zorad = $zorad;

        return $this;
    }

    /**
     * Get zorad
     *
     * @return integer
     */
    public function getZorad()
    {
        return $this->zorad;
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
     * @param \App\Entity\Artikel $artikel
     *
     * @return Obdobie
     */
    public function addArtikel(\App\Entity\Artikel $artikel)
    {
        $this->artikel[] = $artikel;

        return $this;
    }

    /**
     * Remove artikel
     *
     * @param \App\Entity\Artikel $artikel
     */
    public function removeArtikel(\App\Entity\Artikel $artikel)
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
	
	public function __toString() {
		return $this->getNazov();
	}
	
	public function toArrayObject() {
		return [
			'id' => $this->getId(),
			'nazov' => $this->getNazov()
		];
	}
}
