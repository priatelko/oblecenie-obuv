<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Artikel
 *
 * @ORM\Table(name="artikel", indexes={@ORM\Index(name="IDX_A4375C33DFEB2608", columns={"katalog_id"}), @ORM\Index(name="IDX_A4375C33113C1FD1", columns={"znacka_id"}), @ORM\Index(name="IDX_A4375C33ED70AA70", columns={"artikel_typ_id"}), @ORM\Index(name="IDX_A4375C3338248176", columns={"currency_id"}), @ORM\Index(name="IDX_A4375C334E7AF8F", columns={"gallery_id"}), @ORM\Index(name="IDX_A4375C334A20E996", columns={"expiracia_id"}), @ORM\Index(name="fk_artikel_user_dx", columns={"user_id"})})
 * @ORM\Entity
 */
class Artikel
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
     * @var boolean
     *
     * @ORM\Column(name="aktivny", type="boolean", precision=0, scale=0, nullable=false, unique=false)
     */
    private $aktivny;

    /**
     * @var boolean
     *
     * @ORM\Column(name="schovany", type="boolean", precision=0, scale=0, nullable=false, unique=false)
     */
    private $schovany;

    /**
     * @var boolean
     *
     * @ORM\Column(name="vymazany", type="boolean", precision=0, scale=0, nullable=false, unique=false)
     */
    private $vymazany;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="datum_pridania", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $datumPridania;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="datum_aktualizacie", type="datetime", precision=0, scale=0, nullable=true, unique=false)
     */
    private $datumAktualizacie;

    /**
     * @var integer
     *
     * @ORM\Column(name="gallery_id", type="integer", precision=0, scale=0, nullable=true, unique=false)
     */
    private $galleryId;

    /**
     * @var string
     *
     * @ORM\Column(name="titulok", type="string", length=255, precision=0, scale=0, nullable=false, unique=false)
     */
    private $titulok;

    /**
     * @var string
     *
     * @ORM\Column(name="cena", type="decimal", precision=9, scale=2, nullable=true, unique=false)
     */
    private $cena;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=255, precision=0, scale=0, nullable=true, unique=false)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="popis", type="text", length=16777215, precision=0, scale=0, nullable=false, unique=false)
     */
    private $popis;

    /**
     * @var \CommonBundle\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $user;

    /**
     * @var \CommonBundle\Entity\Znacka
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\Znacka")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="znacka_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $znacka;

    /**
     * @var \CommonBundle\Entity\Currency
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\Currency")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="currency_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $currency;

    /**
     * @var \CommonBundle\Entity\Expiracia
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\Expiracia")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="expiracia_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $expiracia;

    /**
     * @var \CommonBundle\Entity\Katalog
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\Katalog")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="katalog_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $katalog;

    /**
     * @var \CommonBundle\Entity\ArtikelTyp
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ArtikelTyp")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="artikel_typ_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $artikelTyp;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\Material", inversedBy="artikel")
     * @ORM\JoinTable(name="artikel_x_material",
     *   joinColumns={
     *     @ORM\JoinColumn(name="artikel_id", referencedColumnName="id", nullable=true)
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="material_id", referencedColumnName="id", nullable=true)
     *   }
     * )
     */
    private $material;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\Obdobie", inversedBy="artikel")
     * @ORM\JoinTable(name="artikel_x_obdobie",
     *   joinColumns={
     *     @ORM\JoinColumn(name="artikel_id", referencedColumnName="id", nullable=true)
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="obdobie_id", referencedColumnName="id", nullable=true)
     *   }
     * )
     */
    private $obdobie;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\Prekoho", inversedBy="artikel")
     * @ORM\JoinTable(name="artikel_x_prekoho",
     *   joinColumns={
     *     @ORM\JoinColumn(name="artikel_id", referencedColumnName="id", nullable=true)
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="prekoho_id", referencedColumnName="id", nullable=true)
     *   }
     * )
     */
    private $prekoho;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\Stav", inversedBy="artikel")
     * @ORM\JoinTable(name="artikel_x_stav",
     *   joinColumns={
     *     @ORM\JoinColumn(name="artikel_id", referencedColumnName="id", nullable=true)
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="stav_id", referencedColumnName="id", nullable=true)
     *   }
     * )
     */
    private $stav;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->material = new \Doctrine\Common\Collections\ArrayCollection();
        $this->obdobie = new \Doctrine\Common\Collections\ArrayCollection();
        $this->prekoho = new \Doctrine\Common\Collections\ArrayCollection();
        $this->stav = new \Doctrine\Common\Collections\ArrayCollection();
    }

}

