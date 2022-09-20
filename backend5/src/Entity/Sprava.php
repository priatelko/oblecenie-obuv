<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Message
 *
 * @ORM\Table(name="message", indexes={@ORM\Index(name="IDX_E5578BD43AE519E", columns={"id_user_from"}), @ORM\Index(name="IDX_E5578BD114DCF71", columns={"id_user_to"}), @ORM\Index(name="IDX_E5578BD1BB9D5A2", columns={"id_parent"}), @ORM\Index(name="IDX_E5578BD7AAAF543", columns={"id_article"})})
 * @ORM\Entity
 */
class Message
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
     * @ORM\Column(name="created", type="datetime", nullable=false)
     */
    private $created;

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
     * @var \App\Entity\Message
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Message")
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
     * @var \App\Entity\Article
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Article")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_article", referencedColumnName="id")
     * })
     */
    private $idArticle;



    /**
     * Set subject
     *
     * @param string $subject
     *
     * @return Message
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
     * @return Message
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
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Message
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set isActive
     *
     * @param boolean $isActive
     *
     * @return Message
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
     * @return Message
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
     * @return Message
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
     * @param \App\Entity\Message $idParent
     *
     * @return Message
     */
    public function setIdParent(\App\Entity\Message $idParent = null)
    {
        $this->idParent = $idParent;

        return $this;
    }

    /**
     * Get idParent
     *
     * @return \App\Entity\Message
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
     * @return Message
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
     * Set idArticle
     *
     * @param \App\Entity\Article $idArticle
     *
     * @return Message
     */
    public function setIdArticle(\App\Entity\Article $idArticle = null)
    {
        $this->idArticle = $idArticle;

        return $this;
    }

    /**
     * Get idArticle
     *
     * @return \App\Entity\Article
     */
    public function getIdArticle()
    {
        return $this->idArticle;
    }
}
