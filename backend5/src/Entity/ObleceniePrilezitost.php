<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ObleceniePrilezitost
 *
 * @ORM\Table(name="oblecenie_prilezitost")
 * @ORM\Entity
 */
class ObleceniePrilezitost implements \App\Interfaces\ToStringInterface, \App\Interfaces\ToArrayObjectInterface
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
     * @ORM\ManyToMany(targetEntity="App\Entity\Oblecenie", mappedBy="obleceniePrilezitost")
     */
    private $oblecenie;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->oblecenie = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set nazov
     *
     * @param string $nazov
     *
     * @return ObleceniePrilezitost
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
     * @return ObleceniePrilezitost
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
     * Add oblecenie
     *
     * @param \App\Entity\Oblecenie $oblecenie
     *
     * @return ObleceniePrilezitost
     */
    public function addOblecenie(\App\Entity\Oblecenie $oblecenie)
    {
        $this->oblecenie[] = $oblecenie;

        return $this;
    }

    /**
     * Remove oblecenie
     *
     * @param \App\Entity\Oblecenie $oblecenie
     */
    public function removeOblecenie(\App\Entity\Oblecenie $oblecenie)
    {
        $this->oblecenie->removeElement($oblecenie);
    }

    /**
     * Get oblecenie
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOblecenie()
    {
        return $this->oblecenie;
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
