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
     * @ORM\Column(name="rodic", type="integer", nullable=true)
     */
    private $rodic;

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
     * Set rodic
     *
     * @param integer $rodic
     *
     * @return OblecenieKategorie
     */
    public function setRodic($rodic)
    {
        $this->rodic = $rodic;

        return $this;
    }

    /**
     * Get rodic
     *
     * @return integer
     */
    public function getRodic()
    {
        return $this->rodic;
    }

    /**
     * Set nazov
     *
     * @param string $nazov
     *
     * @return OblecenieKategorie
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
     * @return OblecenieKategorie
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
}
