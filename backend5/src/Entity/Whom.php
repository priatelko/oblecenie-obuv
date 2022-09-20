<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Whom // Pre koho
 *
 * @ORM\Table(name="whom")
 * @ORM\Entity
 */
class Whom implements \App\Interfaces\ToStringInterface, \App\Interfaces\ToArrayObjectInterface
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
     * Constructor
     */
    public function __construct() {}


    /**
     * Set title
     *
     * @param string $title
     *
     * @return Whom
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
     * @return Whom
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
