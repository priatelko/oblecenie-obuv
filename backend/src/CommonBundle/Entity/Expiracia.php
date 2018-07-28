<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Expiracia
 *
 * @ORM\Table(name="expiracia")
 * @ORM\Entity
 */
class Expiracia
{
    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255, nullable=false)
     */
    private $description;

    /**
     * @var integer
     *
     * @ORM\Column(name="day_interval", type="integer", nullable=false)
     */
    private $dayInterval;

    /**
     * @var integer
     *
     * @ORM\Column(name="zorad", type="integer", nullable=false)
     */
    private $zorad;

    /**
     * @var string
     *
     * @ORM\Column(name="id", type="string", length=255)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;



    /**
     * Set description
     *
     * @param string $description
     *
     * @return Expiracia
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set dayInterval
     *
     * @param integer $dayInterval
     *
     * @return Expiracia
     */
    public function setDayInterval($dayInterval)
    {
        $this->dayInterval = $dayInterval;

        return $this;
    }

    /**
     * Get dayInterval
     *
     * @return integer
     */
    public function getDayInterval()
    {
        return $this->dayInterval;
    }

    /**
     * Set zorad
     *
     * @param integer $zorad
     *
     * @return Expiracia
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
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }
}
