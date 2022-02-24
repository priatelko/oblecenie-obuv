<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Sprava
 *
 * @ORM\Table(name="sprava", indexes={@ORM\Index(name="IDX_E5578BD43AE519E", columns={"id_user_from"}), @ORM\Index(name="IDX_E5578BD114DCF71", columns={"id_user_to"}), @ORM\Index(name="IDX_E5578BD1BB9D5A2", columns={"id_parent"}), @ORM\Index(name="IDX_E5578BD7AAAF543", columns={"id_artikel"})})
 * @ORM\Entity
 */
class Sprava
{
    /**
     * @var string
     *
     * @ORM\Column(name="subject", type="string", length=50, nullable=true)
     */
    private $subject;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="text", length=65535, nullable=true)
     */
    private $text;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_create", type="datetime", nullable=false)
     */
    private $dateCreate;

    /**
     * @var boolean
     *
     * @ORM\Column(name="is_active", type="boolean", nullable=false)
     */
    private $isActive = '1';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_reading", type="datetime", nullable=true)
     */
    private $dateReading;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \App\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_user_to", referencedColumnName="id")
     * })
     */
    private $idUserTo;

    /**
     * @var \App\Entity\Sprava
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Sprava")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_parent", referencedColumnName="id")
     * })
     */
    private $idParent;

    /**
     * @var \App\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_user_from", referencedColumnName="id")
     * })
     */
    private $idUserFrom;

    /**
     * @var \App\Entity\Artikel
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Artikel")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_artikel", referencedColumnName="id")
     * })
     */
    private $idArtikel;



    /**
     * Set subject
     *
     * @param string $subject
     *
     * @return Sprava
     */
    public function setSubject($subject)
    {
        $this->subject = $subject;

        return $this;
    }

    /**
     * Get subject
     *
     * @return string
     */
    public function getSubject()
    {
        return $this->subject;
    }

    /**
     * Set text
     *
     * @param string $text
     *
     * @return Sprava
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
    }

    /**
     * Get text
     *
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set dateCreate
     *
     * @param \DateTime $dateCreate
     *
     * @return Sprava
     */
    public function setDateCreate($dateCreate)
    {
        $this->dateCreate = $dateCreate;

        return $this;
    }

    /**
     * Get dateCreate
     *
     * @return \DateTime
     */
    public function getDateCreate()
    {
        return $this->dateCreate;
    }

    /**
     * Set isActive
     *
     * @param boolean $isActive
     *
     * @return Sprava
     */
    public function setIsActive($isActive)
    {
        $this->isActive = $isActive;

        return $this;
    }

    /**
     * Get isActive
     *
     * @return boolean
     */
    public function getIsActive()
    {
        return $this->isActive;
    }

    /**
     * Set dateReading
     *
     * @param \DateTime $dateReading
     *
     * @return Sprava
     */
    public function setDateReading($dateReading)
    {
        $this->dateReading = $dateReading;

        return $this;
    }

    /**
     * Get dateReading
     *
     * @return \DateTime
     */
    public function getDateReading()
    {
        return $this->dateReading;
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
     * Set idUserTo
     *
     * @param \App\Entity\User $idUserTo
     *
     * @return Sprava
     */
    public function setIdUserTo(\App\Entity\User $idUserTo = null)
    {
        $this->idUserTo = $idUserTo;

        return $this;
    }

    /**
     * Get idUserTo
     *
     * @return \App\Entity\User
     */
    public function getIdUserTo()
    {
        return $this->idUserTo;
    }

    /**
     * Set idParent
     *
     * @param \App\Entity\Sprava $idParent
     *
     * @return Sprava
     */
    public function setIdParent(\App\Entity\Sprava $idParent = null)
    {
        $this->idParent = $idParent;

        return $this;
    }

    /**
     * Get idParent
     *
     * @return \App\Entity\Sprava
     */
    public function getIdParent()
    {
        return $this->idParent;
    }

    /**
     * Set idUserFrom
     *
     * @param \App\Entity\User $idUserFrom
     *
     * @return Sprava
     */
    public function setIdUserFrom(\App\Entity\User $idUserFrom = null)
    {
        $this->idUserFrom = $idUserFrom;

        return $this;
    }

    /**
     * Get idUserFrom
     *
     * @return \App\Entity\User
     */
    public function getIdUserFrom()
    {
        return $this->idUserFrom;
    }

    /**
     * Set idArtikel
     *
     * @param \App\Entity\Artikel $idArtikel
     *
     * @return Sprava
     */
    public function setIdArtikel(\App\Entity\Artikel $idArtikel = null)
    {
        $this->idArtikel = $idArtikel;

        return $this;
    }

    /**
     * Get idArtikel
     *
     * @return \App\Entity\Artikel
     */
    public function getIdArtikel()
    {
        return $this->idArtikel;
    }
}
