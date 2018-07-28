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


    /**
     * Set nazov
     *
     * @param string $nazov
     *
     * @return OblecenieStyl
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
     * @return OblecenieStyl
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
     * @param \CommonBundle\Entity\Oblecenie $oblecenie
     *
     * @return OblecenieStyl
     */
    public function addOblecenie(\CommonBundle\Entity\Oblecenie $oblecenie)
    {
        $this->oblecenie[] = $oblecenie;

        return $this;
    }

    /**
     * Remove oblecenie
     *
     * @param \CommonBundle\Entity\Oblecenie $oblecenie
     */
    public function removeOblecenie(\CommonBundle\Entity\Oblecenie $oblecenie)
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
}
