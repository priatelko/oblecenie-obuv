<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Obuv
 *
 * @ORM\Table(name="obuv", uniqueConstraints={@ORM\UniqueConstraint(name="UNIQ_E27C7EBDEEDF290A", columns={"artikel_id"})}, indexes={@ORM\Index(name="IDX_E27C7EBD359B0684", columns={"kategoria_id"}), @ORM\Index(name="IDX_E27C7EBD6B315BC7", columns={"vyska_obuvy"}), @ORM\Index(name="IDX_E27C7EBD970FAEA0", columns={"material_podrazky"}), @ORM\Index(name="IDX_E27C7EBD855D289C", columns={"velkost_podrazky"}), @ORM\Index(name="IDX_E27C7EBDE093B9AD", columns={"velkost_podpadku"}), @ORM\Index(name="IDX_E27C7EBD75A51051", columns={"spicka"})})
 * @ORM\Entity
 */
class Obuv
{
    /**
     * @var string
     *
     * @ORM\Column(name="velkost_cislo", type="decimal", precision=4, scale=1, nullable=false)
     */
    private $velkostCislo;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \App\Entity\ObuvKategorie
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ObuvKategorie")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="kategoria_id", referencedColumnName="id")
     * })
     */
    private $kategoria;

    /**
     * @var \App\Entity\ObuvVyska
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ObuvVyska")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="vyska_obuvy", referencedColumnName="id")
     * })
     */
    private $vyskaObuvy;

    /**
     * @var \App\Entity\ObuvSpicka
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ObuvSpicka")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="spicka", referencedColumnName="id")
     * })
     */
    private $spicka;

    /**
     * @var \App\Entity\ObuvVelkostPodrazky
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ObuvVelkostPodrazky")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="velkost_podrazky", referencedColumnName="id")
     * })
     */
    private $velkostPodrazky;

    /**
     * @var \App\Entity\ObuvMaterialPodrazky
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ObuvMaterialPodrazky")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="material_podrazky", referencedColumnName="id")
     * })
     */
    private $materialPodrazky;

    /**
     * @var \App\Entity\ObuvVelkostPodpadku
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ObuvVelkostPodpadku")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="velkost_podpadku", referencedColumnName="id")
     * })
     */
    private $velkostPodpadku;

    /**
     * @var \App\Entity\Artikel
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Artikel")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="artikel_id", referencedColumnName="id")
     * })
     */
    private $artikel;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\ObuvZavazovanie", inversedBy="obuv")
     * @ORM\JoinTable(name="obuv_x_zavazovanie",
     *   joinColumns={
     *     @ORM\JoinColumn(name="obuv_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="obuv_zavazovanie_id", referencedColumnName="id")
     *   }
     * )
     */
    private $obuvZavazovanie;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->obuvZavazovanie = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set velkostCislo
     *
     * @param string $velkostCislo
     *
     * @return Obuv
     */
    public function setVelkostCislo($velkostCislo)
    {
        $this->velkostCislo = $velkostCislo;

        return $this;
    }

    /**
     * Get velkostCislo
     *
     * @return string
     */
    public function getVelkostCislo()
    {
        return $this->velkostCislo;
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
     * Set kategoria
     *
     * @param \App\Entity\ObuvKategorie $kategoria
     *
     * @return Obuv
     */
    public function setKategoria(\App\Entity\ObuvKategorie $kategoria = null)
    {
        $this->kategoria = $kategoria;

        return $this;
    }

    /**
     * Get kategoria
     *
     * @return \App\Entity\ObuvKategorie
     */
    public function getKategoria()
    {
        return $this->kategoria;
    }

    /**
     * Set vyskaObuvy
     *
     * @param \App\Entity\ObuvVyska $vyskaObuvy
     *
     * @return Obuv
     */
    public function setVyskaObuvy(\App\Entity\ObuvVyska $vyskaObuvy = null)
    {
        $this->vyskaObuvy = $vyskaObuvy;

        return $this;
    }

    /**
     * Get vyskaObuvy
     *
     * @return \App\Entity\ObuvVyska
     */
    public function getVyskaObuvy()
    {
        return $this->vyskaObuvy;
    }

    /**
     * Set spicka
     *
     * @param \App\Entity\ObuvSpicka $spicka
     *
     * @return Obuv
     */
    public function setSpicka(\App\Entity\ObuvSpicka $spicka = null)
    {
        $this->spicka = $spicka;

        return $this;
    }

    /**
     * Get spicka
     *
     * @return \App\Entity\ObuvSpicka
     */
    public function getSpicka()
    {
        return $this->spicka;
    }

    /**
     * Set velkostPodrazky
     *
     * @param \App\Entity\ObuvVelkostPodrazky $velkostPodrazky
     *
     * @return Obuv
     */
    public function setVelkostPodrazky(\App\Entity\ObuvVelkostPodrazky $velkostPodrazky = null)
    {
        $this->velkostPodrazky = $velkostPodrazky;

        return $this;
    }

    /**
     * Get velkostPodrazky
     *
     * @return \App\Entity\ObuvVelkostPodrazky
     */
    public function getVelkostPodrazky()
    {
        return $this->velkostPodrazky;
    }

    /**
     * Set materialPodrazky
     *
     * @param \App\Entity\ObuvMaterialPodrazky $materialPodrazky
     *
     * @return Obuv
     */
    public function setMaterialPodrazky(\App\Entity\ObuvMaterialPodrazky $materialPodrazky = null)
    {
        $this->materialPodrazky = $materialPodrazky;

        return $this;
    }

    /**
     * Get materialPodrazky
     *
     * @return \App\Entity\ObuvMaterialPodrazky
     */
    public function getMaterialPodrazky()
    {
        return $this->materialPodrazky;
    }

    /**
     * Set velkostPodpadku
     *
     * @param \App\Entity\ObuvVelkostPodpadku $velkostPodpadku
     *
     * @return Obuv
     */
    public function setVelkostPodpadku(\App\Entity\ObuvVelkostPodpadku $velkostPodpadku = null)
    {
        $this->velkostPodpadku = $velkostPodpadku;

        return $this;
    }

    /**
     * Get velkostPodpadku
     *
     * @return \App\Entity\ObuvVelkostPodpadku
     */
    public function getVelkostPodpadku()
    {
        return $this->velkostPodpadku;
    }

    /**
     * Set artikel
     *
     * @param \App\Entity\Artikel $artikel
     *
     * @return Obuv
     */
    public function setArtikel(\App\Entity\Artikel $artikel = null)
    {
        $this->artikel = $artikel;

        return $this;
    }

    /**
     * Get artikel
     *
     * @return \App\Entity\Artikel
     */
    public function getArtikel()
    {
        return $this->artikel;
    }

    /**
     * Add obuvZavazovanie
     *
     * @param \App\Entity\ObuvZavazovanie $obuvZavazovanie
     *
     * @return Obuv
     */
    public function addObuvZavazovanie(\App\Entity\ObuvZavazovanie $obuvZavazovanie)
    {
        $this->obuvZavazovanie[] = $obuvZavazovanie;

        return $this;
    }

    /**
     * Remove obuvZavazovanie
     *
     * @param \App\Entity\ObuvZavazovanie $obuvZavazovanie
     */
    public function removeObuvZavazovanie(\App\Entity\ObuvZavazovanie $obuvZavazovanie)
    {
        $this->obuvZavazovanie->removeElement($obuvZavazovanie);
    }

    /**
     * Get obuvZavazovanie
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getObuvZavazovanie()
    {
        return $this->obuvZavazovanie;
    }
}
