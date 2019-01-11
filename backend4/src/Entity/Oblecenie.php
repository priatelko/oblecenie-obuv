<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Oblecenie
 *
 * @ORM\Table(name="oblecenie", uniqueConstraints={@ORM\UniqueConstraint(name="UNIQ_FAF6ECDAEEDF290A", columns={"artikel_id"})}, indexes={@ORM\Index(name="IDX_FAF6ECDA359B0684", columns={"kategoria_id"}), @ORM\Index(name="IDX_FAF6ECDAE992B21", columns={"zostrih_id"}), @ORM\Index(name="IDX_FAF6ECDA3A51F8D0", columns={"velkost_id"})})
 * @ORM\Entity
 */
class Oblecenie
{
    /**
     * @var string
     *
     * @ORM\Column(name="velkost_cislo", type="decimal", precision=4, scale=1, nullable=true)
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
     * @var \App\Entity\OblecenieKategorie
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\OblecenieKategorie")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="kategoria_id", referencedColumnName="id")
     * })
     */
    private $kategoria;

    /**
     * @var \App\Entity\OblecenieVelkost
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\OblecenieVelkost")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="velkost_id", referencedColumnName="id")
     * })
     */
    private $velkost;

    /**
     * @var \App\Entity\OblecenieZostrih
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\OblecenieZostrih")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="zostrih_id", referencedColumnName="id")
     * })
     */
    private $zostrih;

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
     * @ORM\ManyToMany(targetEntity="App\Entity\ObleceniePrilezitost", inversedBy="oblecenie")
     * @ORM\JoinTable(name="oblecenie_x_prilezitost",
     *   joinColumns={
     *     @ORM\JoinColumn(name="oblecenie_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="oblecenie_prilezitost_id", referencedColumnName="id")
     *   }
     * )
     */
    private $obleceniePrilezitost;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\OblecenieStyl", inversedBy="oblecenie")
     * @ORM\JoinTable(name="oblecenie_x_styl",
     *   joinColumns={
     *     @ORM\JoinColumn(name="oblecenie_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="oblecenie_styl_id", referencedColumnName="id")
     *   }
     * )
     */
    private $oblecenieStyl;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\OblecenieZapinanie", inversedBy="oblecenie")
     * @ORM\JoinTable(name="oblecenie_x_zapianie",
     *   joinColumns={
     *     @ORM\JoinColumn(name="oblecenie_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="oblecenie_zapinanie_id", referencedColumnName="id")
     *   }
     * )
     */
    private $oblecenieZapinanie;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->obleceniePrilezitost = new \Doctrine\Common\Collections\ArrayCollection();
        $this->oblecenieStyl = new \Doctrine\Common\Collections\ArrayCollection();
        $this->oblecenieZapinanie = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set velkostCislo
     *
     * @param string $velkostCislo
     *
     * @return Oblecenie
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
     * @param \App\Entity\OblecenieKategorie $kategoria
     *
     * @return Oblecenie
     */
    public function setKategoria(\App\Entity\OblecenieKategorie $kategoria = null)
    {
        $this->kategoria = $kategoria;

        return $this;
    }

    /**
     * Get kategoria
     *
     * @return \App\Entity\OblecenieKategorie
     */
    public function getKategoria()
    {
        return $this->kategoria;
    }

    /**
     * Set velkost
     *
     * @param \App\Entity\OblecenieVelkost $velkost
     *
     * @return Oblecenie
     */
    public function setVelkost(\App\Entity\OblecenieVelkost $velkost = null)
    {
        $this->velkost = $velkost;

        return $this;
    }

    /**
     * Get velkost
     *
     * @return \App\Entity\OblecenieVelkost
     */
    public function getVelkost()
    {
        return $this->velkost;
    }

    /**
     * Set zostrih
     *
     * @param \App\Entity\OblecenieZostrih $zostrih
     *
     * @return Oblecenie
     */
    public function setZostrih(\App\Entity\OblecenieZostrih $zostrih = null)
    {
        $this->zostrih = $zostrih;

        return $this;
    }

    /**
     * Get zostrih
     *
     * @return \App\Entity\OblecenieZostrih
     */
    public function getZostrih()
    {
        return $this->zostrih;
    }

    /**
     * Set artikel
     *
     * @param \App\Entity\Artikel $artikel
     *
     * @return Oblecenie
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
     * Add obleceniePrilezitost
     *
     * @param \App\Entity\ObleceniePrilezitost $obleceniePrilezitost
     *
     * @return Oblecenie
     */
    public function addObleceniePrilezitost(\App\Entity\ObleceniePrilezitost $obleceniePrilezitost)
    {
        $this->obleceniePrilezitost[] = $obleceniePrilezitost;

        return $this;
    }

    /**
     * Remove obleceniePrilezitost
     *
     * @param \App\Entity\ObleceniePrilezitost $obleceniePrilezitost
     */
    public function removeObleceniePrilezitost(\App\Entity\ObleceniePrilezitost $obleceniePrilezitost)
    {
        $this->obleceniePrilezitost->removeElement($obleceniePrilezitost);
    }

    /**
     * Get obleceniePrilezitost
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getObleceniePrilezitost()
    {
        return $this->obleceniePrilezitost;
    }

    /**
     * Add oblecenieStyl
     *
     * @param \App\Entity\OblecenieStyl $oblecenieStyl
     *
     * @return Oblecenie
     */
    public function addOblecenieStyl(\App\Entity\OblecenieStyl $oblecenieStyl)
    {
        $this->oblecenieStyl[] = $oblecenieStyl;

        return $this;
    }

    /**
     * Remove oblecenieStyl
     *
     * @param \App\Entity\OblecenieStyl $oblecenieStyl
     */
    public function removeOblecenieStyl(\App\Entity\OblecenieStyl $oblecenieStyl)
    {
        $this->oblecenieStyl->removeElement($oblecenieStyl);
    }

    /**
     * Get oblecenieStyl
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOblecenieStyl()
    {
        return $this->oblecenieStyl;
    }

    /**
     * Add oblecenieZapinanie
     *
     * @param \App\Entity\OblecenieZapinanie $oblecenieZapinanie
     *
     * @return Oblecenie
     */
    public function addOblecenieZapinanie(\App\Entity\OblecenieZapinanie $oblecenieZapinanie)
    {
        $this->oblecenieZapinanie[] = $oblecenieZapinanie;

        return $this;
    }

    /**
     * Remove oblecenieZapinanie
     *
     * @param \App\Entity\OblecenieZapinanie $oblecenieZapinanie
     */
    public function removeOblecenieZapinanie(\App\Entity\OblecenieZapinanie $oblecenieZapinanie)
    {
        $this->oblecenieZapinanie->removeElement($oblecenieZapinanie);
    }

    /**
     * Get oblecenieZapinanie
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getOblecenieZapinanie()
    {
        return $this->oblecenieZapinanie;
    }
}
