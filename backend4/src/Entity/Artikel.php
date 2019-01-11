<?php

namespace App\Entity;

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
     * @var boolean
     *
     * @ORM\Column(name="aktivny", type="boolean", nullable=false)
     */
    private $aktivny;

    /**
     * @var boolean
     *
     * @ORM\Column(name="schovany", type="boolean", nullable=false)
     */
    private $schovany;

    /**
     * @var boolean
     *
     * @ORM\Column(name="vymazany", type="boolean", nullable=false)
     */
    private $vymazany;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="datum_pridania", type="datetime", nullable=false)
     */
    private $datumPridania;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="datum_aktualizacie", type="datetime", nullable=true)
     */
    private $datumAktualizacie;

    /**
     * @var integer
     *
     * @ORM\Column(name="gallery_id", type="integer", nullable=true)
     */
    private $galleryId;

    /**
     * @var string
     *
     * @ORM\Column(name="titulok", type="string", length=255, nullable=false)
     */
    private $titulok;

    /**
     * @var string
     *
     * @ORM\Column(name="cena", type="decimal", precision=9, scale=2, nullable=true)
     */
    private $cena;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=255, nullable=true)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="popis", type="text", length=16777215, nullable=false)
     */
    private $popis;

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
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=false)
     * })
     */
    private $user;

    /**
     * @var \App\Entity\Znacka
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Znacka")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="znacka_id", referencedColumnName="id")
     * })
     */
    private $znacka;

    /**
     * @var \App\Entity\Currency
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Currency")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="currency_id", referencedColumnName="id")
     * })
     */
    private $currency;

    /**
     * @var \App\Entity\Expiracia
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Expiracia")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="expiracia_id", referencedColumnName="id")
     * })
     */
    private $expiracia;

    /**
     * @var \App\Entity\Katalog
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Katalog")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="katalog_id", referencedColumnName="id")
     * })
     */
    private $katalog;

    /**
     * @var \App\Entity\ArtikelTyp
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ArtikelTyp")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="artikel_typ_id", referencedColumnName="id")
     * })
     */
    private $artikelTyp;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Material", inversedBy="artikel")
     * @ORM\JoinTable(name="artikel_x_material",
     *   joinColumns={
     *     @ORM\JoinColumn(name="artikel_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="material_id", referencedColumnName="id")
     *   }
     * )
     */
    private $material;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Obdobie", inversedBy="artikel")
     * @ORM\JoinTable(name="artikel_x_obdobie",
     *   joinColumns={
     *     @ORM\JoinColumn(name="artikel_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="obdobie_id", referencedColumnName="id")
     *   }
     * )
     */
    private $obdobie;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Prekoho", inversedBy="artikel")
     * @ORM\JoinTable(name="artikel_x_prekoho",
     *   joinColumns={
     *     @ORM\JoinColumn(name="artikel_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="prekoho_id", referencedColumnName="id")
     *   }
     * )
     */
    private $prekoho;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Stav", inversedBy="artikel")
     * @ORM\JoinTable(name="artikel_x_stav",
     *   joinColumns={
     *     @ORM\JoinColumn(name="artikel_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="stav_id", referencedColumnName="id")
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


    /**
     * Set aktivny
     *
     * @param boolean $aktivny
     *
     * @return Artikel
     */
    public function setAktivny($aktivny)
    {
        $this->aktivny = $aktivny;

        return $this;
    }

    /**
     * Get aktivny
     *
     * @return boolean
     */
    public function getAktivny()
    {
        return $this->aktivny;
    }

    /**
     * Set schovany
     *
     * @param boolean $schovany
     *
     * @return Artikel
     */
    public function setSchovany($schovany)
    {
        $this->schovany = $schovany;

        return $this;
    }

    /**
     * Get schovany
     *
     * @return boolean
     */
    public function getSchovany()
    {
        return $this->schovany;
    }

    /**
     * Set vymazany
     *
     * @param boolean $vymazany
     *
     * @return Artikel
     */
    public function setVymazany($vymazany)
    {
        $this->vymazany = $vymazany;

        return $this;
    }

    /**
     * Get vymazany
     *
     * @return boolean
     */
    public function getVymazany()
    {
        return $this->vymazany;
    }

    /**
     * Set datumPridania
     *
     * @param \DateTime $datumPridania
     *
     * @return Artikel
     */
    public function setDatumPridania($datumPridania)
    {
        $this->datumPridania = $datumPridania;

        return $this;
    }

    /**
     * Get datumPridania
     *
     * @return \DateTime
     */
    public function getDatumPridania()
    {
        return $this->datumPridania;
    }

    /**
     * Set datumAktualizacie
     *
     * @param \DateTime $datumAktualizacie
     *
     * @return Artikel
     */
    public function setDatumAktualizacie($datumAktualizacie)
    {
        $this->datumAktualizacie = $datumAktualizacie;

        return $this;
    }

    /**
     * Get datumAktualizacie
     *
     * @return \DateTime
     */
    public function getDatumAktualizacie()
    {
        return $this->datumAktualizacie;
    }

    /**
     * Set galleryId
     *
     * @param integer $galleryId
     *
     * @return Artikel
     */
    public function setGalleryId($galleryId)
    {
        $this->galleryId = $galleryId;

        return $this;
    }

    /**
     * Get galleryId
     *
     * @return integer
     */
    public function getGalleryId()
    {
        return $this->galleryId;
    }

    /**
     * Set titulok
     *
     * @param string $titulok
     *
     * @return Artikel
     */
    public function setTitulok($titulok)
    {
        $this->titulok = $titulok;

        return $this;
    }

    /**
     * Get titulok
     *
     * @return string
     */
    public function getTitulok()
    {
        return $this->titulok;
    }

    /**
     * Set cena
     *
     * @param string $cena
     *
     * @return Artikel
     */
    public function setCena($cena)
    {
        $this->cena = $cena;

        return $this;
    }

    /**
     * Get cena
     *
     * @return string
     */
    public function getCena()
    {
        return $this->cena;
    }

    /**
     * Set url
     *
     * @param string $url
     *
     * @return Artikel
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set popis
     *
     * @param string $popis
     *
     * @return Artikel
     */
    public function setPopis($popis)
    {
        $this->popis = $popis;

        return $this;
    }

    /**
     * Get popis
     *
     * @return string
     */
    public function getPopis()
    {
        return $this->popis;
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
     * Set user
     *
     * @param \App\Entity\User $user
     *
     * @return Artikel
     */
    public function setUser(\App\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \App\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set znacka
     *
     * @param \App\Entity\Znacka $znacka
     *
     * @return Artikel
     */
    public function setZnacka(\App\Entity\Znacka $znacka = null)
    {
        $this->znacka = $znacka;

        return $this;
    }

    /**
     * Get znacka
     *
     * @return \App\Entity\Znacka
     */
    public function getZnacka()
    {
        return $this->znacka;
    }

    /**
     * Set currency
     *
     * @param \App\Entity\Currency $currency
     *
     * @return Artikel
     */
    public function setCurrency(\App\Entity\Currency $currency = null)
    {
        $this->currency = $currency;

        return $this;
    }

    /**
     * Get currency
     *
     * @return \App\Entity\Currency
     */
    public function getCurrency()
    {
        return $this->currency;
    }

    /**
     * Set expiracia
     *
     * @param \App\Entity\Expiracia $expiracia
     *
     * @return Artikel
     */
    public function setExpiracia(\App\Entity\Expiracia $expiracia = null)
    {
        $this->expiracia = $expiracia;

        return $this;
    }

    /**
     * Get expiracia
     *
     * @return \App\Entity\Expiracia
     */
    public function getExpiracia()
    {
        return $this->expiracia;
    }

    /**
     * Set katalog
     *
     * @param \App\Entity\Katalog $katalog
     *
     * @return Artikel
     */
    public function setKatalog(\App\Entity\Katalog $katalog = null)
    {
        $this->katalog = $katalog;

        return $this;
    }

    /**
     * Get katalog
     *
     * @return \App\Entity\Katalog
     */
    public function getKatalog()
    {
        return $this->katalog;
    }

    /**
     * Set artikelTyp
     *
     * @param \App\Entity\ArtikelTyp $artikelTyp
     *
     * @return Artikel
     */
    public function setArtikelTyp(\App\Entity\ArtikelTyp $artikelTyp = null)
    {
        $this->artikelTyp = $artikelTyp;

        return $this;
    }

    /**
     * Get artikelTyp
     *
     * @return \App\Entity\ArtikelTyp
     */
    public function getArtikelTyp()
    {
        return $this->artikelTyp;
    }

    /**
     * Add material
     *
     * @param \App\Entity\Material $material
     *
     * @return Artikel
     */
    public function addMaterial(\App\Entity\Material $material)
    {
        $this->material[] = $material;

        return $this;
    }

    /**
     * Remove material
     *
     * @param \App\Entity\Material $material
     */
    public function removeMaterial(\App\Entity\Material $material)
    {
        $this->material->removeElement($material);
    }

    /**
     * Get material
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getMaterial()
    {
        return $this->material;
    }

    /**
     * Add obdobie
     *
     * @param \App\Entity\Obdobie $obdobie
     *
     * @return Artikel
     */
    public function addObdobie(\App\Entity\Obdobie $obdobie)
    {
        $this->obdobie[] = $obdobie;

        return $this;
    }

    /**
     * Remove obdobie
     *
     * @param \App\Entity\Obdobie $obdobie
     */
    public function removeObdobie(\App\Entity\Obdobie $obdobie)
    {
        $this->obdobie->removeElement($obdobie);
    }

    /**
     * Get obdobie
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getObdobie()
    {
        return $this->obdobie;
    }

    /**
     * Add prekoho
     *
     * @param \App\Entity\Prekoho $prekoho
     *
     * @return Artikel
     */
    public function addPrekoho(\App\Entity\Prekoho $prekoho)
    {
        $this->prekoho[] = $prekoho;

        return $this;
    }

    /**
     * Remove prekoho
     *
     * @param \App\Entity\Prekoho $prekoho
     */
    public function removePrekoho(\App\Entity\Prekoho $prekoho)
    {
        $this->prekoho->removeElement($prekoho);
    }

    /**
     * Get prekoho
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPrekoho()
    {
        return $this->prekoho;
    }

    /**
     * Add stav
     *
     * @param \App\Entity\Stav $stav
     *
     * @return Artikel
     */
    public function addStav(\App\Entity\Stav $stav)
    {
        $this->stav[] = $stav;

        return $this;
    }

    /**
     * Remove stav
     *
     * @param \App\Entity\Stav $stav
     */
    public function removeStav(\App\Entity\Stav $stav)
    {
        $this->stav->removeElement($stav);
    }

    /**
     * Get stav
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getStav()
    {
        return $this->stav;
    }
}
