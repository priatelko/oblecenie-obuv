<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ObuvZavazovanie
 *
 * @ORM\Table(name="obuv_zavazovanie")
 * @ORM\Entity
 */
class ObuvZavazovanie
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
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\Obuv", mappedBy="obuvZavazovanie")
     */
    private $obuv;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->obuv = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set nazov
     *
     * @param string $nazov
     *
     * @return ObuvZavazovanie
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
     * @return ObuvZavazovanie
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
     * Add obuv
     *
     * @param \CommonBundle\Entity\Obuv $obuv
     *
     * @return ObuvZavazovanie
     */
    public function addObuv(\CommonBundle\Entity\Obuv $obuv)
    {
        $this->obuv[] = $obuv;

        return $this;
    }

    /**
     * Remove obuv
     *
     * @param \CommonBundle\Entity\Obuv $obuv
     */
    public function removeObuv(\CommonBundle\Entity\Obuv $obuv)
    {
        $this->obuv->removeElement($obuv);
    }

    /**
     * Get obuv
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getObuv()
    {
        return $this->obuv;
    }
}
