<?php

namespace CommonBundle\Entity;

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
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="subject", type="string", length=50, precision=0, scale=0, nullable=true, unique=false)
     */
    private $subject;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="text", length=65535, precision=0, scale=0, nullable=true, unique=false)
     */
    private $text;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_create", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $dateCreate;

    /**
     * @var boolean
     *
     * @ORM\Column(name="is_active", type="boolean", precision=0, scale=0, nullable=false, unique=false)
     */
    private $isActive;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_reading", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $dateReading;

    /**
     * @var \CommonBundle\Entity\Uzivatel
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\Uzivatel")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_user_to", referencedColumnName="id", nullable=true)
     * })
     */
    private $idUserTo;

    /**
     * @var \CommonBundle\Entity\Sprava
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\Sprava")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_parent", referencedColumnName="id", nullable=true)
     * })
     */
    private $idParent;

    /**
     * @var \CommonBundle\Entity\Uzivatel
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\Uzivatel")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_user_from", referencedColumnName="id", nullable=true)
     * })
     */
    private $idUserFrom;

    /**
     * @var \CommonBundle\Entity\Artikel
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\Artikel")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_artikel", referencedColumnName="id", nullable=true)
     * })
     */
    private $idArtikel;


}

