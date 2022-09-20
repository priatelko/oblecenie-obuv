<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DressOccasion // Prilezitost
 *
 * @ORM\Table(name="dress_occasion")
 * @ORM\Entity
 */
class DressOccasion implements \App\Interfaces\ToStringInterface, \App\Interfaces\ToArrayObjectInterface
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
     * @ORM\ManyToMany(targetEntity="App\Entity\Dress", mappedBy="dressOccasion")
     */
    private $dress;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->dress = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set title
     *
     * @param string $title
     *
     * @return DressOccasion
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
     * @return DressOccasion
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
     * Add dress
     *
     * @param \App\Entity\Dress $dress
     *
     * @return DressOccasion
     */
    public function addDress(\App\Entity\Dress $dress)
    {
        $this->dress[] = $dress;

        return $this;
    }

    /**
     * Remove dress
     *
     * @param \App\Entity\Dress $dress
     */
    public function removeDress(\App\Entity\Dress $dress)
    {
        $this->dress->removeElement($dress);
    }

    /**
     * Get dress
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getDress()
    {
        return $this->dress;
    }

    public function __toString() {
		return $this->getTitle();
	}

	public function toArrayObject() {
		return [
			'id' => $this->getId(),
			'title' => $this->getTitle()
		];
	}
}
