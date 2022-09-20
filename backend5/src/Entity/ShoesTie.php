<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ShoesTie // Zapinanie
 *
 * @ORM\Table(name="shoes_tie")
 * @ORM\Entity
 */
class ShoesTie
{
    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=false)
     */
    private $title;

    /**
     * @var integer
     *
     * @ORM\Column(name="order", type="integer", nullable=false)
     */
    private $order;

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
     * @ORM\ManyToMany(targetEntity="App\Entity\Shoes", mappedBy="shoesTie")
     */
    private $shoes;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->shoes = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set title
     *
     * @param string $title
     *
     * @return ShoesTie
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set order
     *
     * @param integer $order
     *
     * @return ShoesTie
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
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Add shoes
     *
     * @param \App\Entity\Shoes $shoes
     *
     * @return ShoesTie
     */
    public function addShoes(\App\Entity\Shoes $shoes)
    {
        $this->shoes[] = $shoes;

        return $this;
    }

    /**
     * Remove shoes
     *
     * @param \App\Entity\Shoes $shoes
     */
    public function removeShoes(\App\Entity\Shoes $shoes)
    {
        $this->shoes->removeElement($shoes);
    }

    /**
     * Get shoes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getShoes()
    {
        return $this->shoes;
    }
}
