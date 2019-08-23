<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Znacka
 *
 * @ORM\Table(name="znacka")
 * @ORM\Entity
 */
class Znacka implements \App\Interfaces\ToStringInterface, \App\Interfaces\ToArrayObjectInterface
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
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;



    /**
     * Set nazov
     *
     * @param string $nazov
     *
     * @return Znacka
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
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
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
