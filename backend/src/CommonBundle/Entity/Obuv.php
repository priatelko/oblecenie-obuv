<?php

namespace CommonBundle\Entity;

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
     * @var \CommonBundle\Entity\ObuvKategorie
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ObuvKategorie")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="kategoria_id", referencedColumnName="id")
     * })
     */
    private $kategoria;

    /**
     * @var \CommonBundle\Entity\ObuvVyska
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ObuvVyska")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="vyska_obuvy", referencedColumnName="id")
     * })
     */
    private $vyskaObuvy;

    /**
     * @var \CommonBundle\Entity\ObuvSpicka
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ObuvSpicka")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="spicka", referencedColumnName="id")
     * })
     */
    private $spicka;

    /**
     * @var \CommonBundle\Entity\ObuvVelkostPodrazky
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ObuvVelkostPodrazky")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="velkost_podrazky", referencedColumnName="id")
     * })
     */
    private $velkostPodrazky;

    /**
     * @var \CommonBundle\Entity\ObuvMaterialPodrazky
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ObuvMaterialPodrazky")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="material_podrazky", referencedColumnName="id")
     * })
     */
    private $materialPodrazky;

    /**
     * @var \CommonBundle\Entity\ObuvVelkostPodpadku
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ObuvVelkostPodpadku")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="velkost_podpadku", referencedColumnName="id")
     * })
     */
    private $velkostPodpadku;

    /**
     * @var \CommonBundle\Entity\Artikel
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\Artikel")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="artikel_id", referencedColumnName="id")
     * })
     */
    private $artikel;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\ObuvZavazovanie", inversedBy="obuv")
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
     * @param \CommonBundle\Entity\ObuvKategorie $kategoria
     *
     * @return Obuv
     */
    public function setKategoria(\CommonBundle\Entity\ObuvKategorie $kategoria = null)
    {
        $this->kategoria = $kategoria;

        return $this;
    }

    /**
     * Get kategoria
     *
     * @return \CommonBundle\Entity\ObuvKategorie
     */
    public function getKategoria()
    {
        return $this->kategoria;
    }

    /**
     * Set vyskaObuvy
     *
     * @param \CommonBundle\Entity\ObuvVyska $vyskaObuvy
     *
     * @return Obuv
     */
    public function setVyskaObuvy(\CommonBundle\Entity\ObuvVyska $vyskaObuvy = null)
    {
        $this->vyskaObuvy = $vyskaObuvy;

        return $this;
    }

    /**
     * Get vyskaObuvy
     *
     * @return \CommonBundle\Entity\ObuvVyska
     */
    public function getVyskaObuvy()
    {
        return $this->vyskaObuvy;
    }

    /**
     * Set spicka
     *
     * @param \CommonBundle\Entity\ObuvSpicka $spicka
     *
     * @return Obuv
     */
    public function setSpicka(\CommonBundle\Entity\ObuvSpicka $spicka = null)
    {
        $this->spicka = $spicka;

        return $this;
    }

    /**
     * Get spicka
     *
     * @return \CommonBundle\Entity\ObuvSpicka
     */
    public function getSpicka()
    {
        return $this->spicka;
    }

    /**
     * Set velkostPodrazky
     *
     * @param \CommonBundle\Entity\ObuvVelkostPodrazky $velkostPodrazky
     *
     * @return Obuv
     */
    public function setVelkostPodrazky(\CommonBundle\Entity\ObuvVelkostPodrazky $velkostPodrazky = null)
    {
        $this->velkostPodrazky = $velkostPodrazky;

        return $this;
    }

    /**
     * Get velkostPodrazky
     *
     * @return \CommonBundle\Entity\ObuvVelkostPodrazky
     */
    public function getVelkostPodrazky()
    {
        return $this->velkostPodrazky;
    }

    /**
     * Set materialPodrazky
     *
     * @param \CommonBundle\Entity\ObuvMaterialPodrazky $materialPodrazky
     *
     * @return Obuv
     */
    public function setMaterialPodrazky(\CommonBundle\Entity\ObuvMaterialPodrazky $materialPodrazky = null)
    {
        $this->materialPodrazky = $materialPodrazky;

        return $this;
    }

    /**
     * Get materialPodrazky
     *
     * @return \CommonBundle\Entity\ObuvMaterialPodrazky
     */
    public function getMaterialPodrazky()
    {
        return $this->materialPodrazky;
    }

    /**
     * Set velkostPodpadku
     *
     * @param \CommonBundle\Entity\ObuvVelkostPodpadku $velkostPodpadku
     *
     * @return Obuv
     */
    public function setVelkostPodpadku(\CommonBundle\Entity\ObuvVelkostPodpadku $velkostPodpadku = null)
    {
        $this->velkostPodpadku = $velkostPodpadku;

        return $this;
    }

    /**
     * Get velkostPodpadku
     *
     * @return \CommonBundle\Entity\ObuvVelkostPodpadku
     */
    public function getVelkostPodpadku()
    {
        return $this->velkostPodpadku;
    }

    /**
     * Set artikel
     *
     * @param \CommonBundle\Entity\Artikel $artikel
     *
     * @return Obuv
     */
    public function setArtikel(\CommonBundle\Entity\Artikel $artikel = null)
    {
        $this->artikel = $artikel;

        return $this;
    }

    /**
     * Get artikel
     *
     * @return \CommonBundle\Entity\Artikel
     */
    public function getArtikel()
    {
        return $this->artikel;
    }

    /**
     * Add obuvZavazovanie
     *
     * @param \CommonBundle\Entity\ObuvZavazovanie $obuvZavazovanie
     *
     * @return Obuv
     */
    public function addObuvZavazovanie(\CommonBundle\Entity\ObuvZavazovanie $obuvZavazovanie)
    {
        $this->obuvZavazovanie[] = $obuvZavazovanie;

        return $this;
    }

    /**
     * Remove obuvZavazovanie
     *
     * @param \CommonBundle\Entity\ObuvZavazovanie $obuvZavazovanie
     */
    public function removeObuvZavazovanie(\CommonBundle\Entity\ObuvZavazovanie $obuvZavazovanie)
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
