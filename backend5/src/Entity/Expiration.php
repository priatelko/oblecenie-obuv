<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Expiration
 *
 * @ORM\Table(name="expiration")
 * @ORM\Entity
 */
class Expiration
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
     * @ORM\Column(name="order", type="integer", nullable=false)
     */
    private $order;

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
     * @return Expiration
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
     * @return Expiration
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
     * Set order
     *
     * @param integer $order
     *
     * @return Expiration
     */
    public function setOrder($order)
    {
        $this->order = $order;

        return $this;
    }

    /**
     * Get order
     *
     * @return integer
     */
    public function getOrder()
    {
        return $this->order;
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
