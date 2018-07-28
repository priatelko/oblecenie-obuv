<?php

namespace CommonBundle\Entity;

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
     * @var \CommonBundle\Entity\OblecenieKategorie
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\OblecenieKategorie")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="kategoria_id", referencedColumnName="id")
     * })
     */
    private $kategoria;

    /**
     * @var \CommonBundle\Entity\OblecenieVelkost
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\OblecenieVelkost")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="velkost_id", referencedColumnName="id")
     * })
     */
    private $velkost;

    /**
     * @var \CommonBundle\Entity\OblecenieZostrih
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\OblecenieZostrih")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="zostrih_id", referencedColumnName="id")
     * })
     */
    private $zostrih;

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
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\ObleceniePrilezitost", inversedBy="oblecenie")
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
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\OblecenieStyl", inversedBy="oblecenie")
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
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\OblecenieZapinanie", inversedBy="oblecenie")
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
     * @param \CommonBundle\Entity\OblecenieKategorie $kategoria
     *
     * @return Oblecenie
     */
    public function setKategoria(\CommonBundle\Entity\OblecenieKategorie $kategoria = null)
    {
        $this->kategoria = $kategoria;

        return $this;
    }

    /**
     * Get kategoria
     *
     * @return \CommonBundle\Entity\OblecenieKategorie
     */
    public function getKategoria()
    {
        return $this->kategoria;
    }

    /**
     * Set velkost
     *
     * @param \CommonBundle\Entity\OblecenieVelkost $velkost
     *
     * @return Oblecenie
     */
    public function setVelkost(\CommonBundle\Entity\OblecenieVelkost $velkost = null)
    {
        $this->velkost = $velkost;

        return $this;
    }

    /**
     * Get velkost
     *
     * @return \CommonBundle\Entity\OblecenieVelkost
     */
    public function getVelkost()
    {
        return $this->velkost;
    }

    /**
     * Set zostrih
     *
     * @param \CommonBundle\Entity\OblecenieZostrih $zostrih
     *
     * @return Oblecenie
     */
    public function setZostrih(\CommonBundle\Entity\OblecenieZostrih $zostrih = null)
    {
        $this->zostrih = $zostrih;

        return $this;
    }

    /**
     * Get zostrih
     *
     * @return \CommonBundle\Entity\OblecenieZostrih
     */
    public function getZostrih()
    {
        return $this->zostrih;
    }

    /**
     * Set artikel
     *
     * @param \CommonBundle\Entity\Artikel $artikel
     *
     * @return Oblecenie
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
     * Add obleceniePrilezitost
     *
     * @param \CommonBundle\Entity\ObleceniePrilezitost $obleceniePrilezitost
     *
     * @return Oblecenie
     */
    public function addObleceniePrilezitost(\CommonBundle\Entity\ObleceniePrilezitost $obleceniePrilezitost)
    {
        $this->obleceniePrilezitost[] = $obleceniePrilezitost;

        return $this;
    }

    /**
     * Remove obleceniePrilezitost
     *
     * @param \CommonBundle\Entity\ObleceniePrilezitost $obleceniePrilezitost
     */
    public function removeObleceniePrilezitost(\CommonBundle\Entity\ObleceniePrilezitost $obleceniePrilezitost)
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
     * @param \CommonBundle\Entity\OblecenieStyl $oblecenieStyl
     *
     * @return Oblecenie
     */
    public function addOblecenieStyl(\CommonBundle\Entity\OblecenieStyl $oblecenieStyl)
    {
        $this->oblecenieStyl[] = $oblecenieStyl;

        return $this;
    }

    /**
     * Remove oblecenieStyl
     *
     * @param \CommonBundle\Entity\OblecenieStyl $oblecenieStyl
     */
    public function removeOblecenieStyl(\CommonBundle\Entity\OblecenieStyl $oblecenieStyl)
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
     * @param \CommonBundle\Entity\OblecenieZapinanie $oblecenieZapinanie
     *
     * @return Oblecenie
     */
    public function addOblecenieZapinanie(\CommonBundle\Entity\OblecenieZapinanie $oblecenieZapinanie)
    {
        $this->oblecenieZapinanie[] = $oblecenieZapinanie;

        return $this;
    }

    /**
     * Remove oblecenieZapinanie
     *
     * @param \CommonBundle\Entity\OblecenieZapinanie $oblecenieZapinanie
     */
    public function removeOblecenieZapinanie(\CommonBundle\Entity\OblecenieZapinanie $oblecenieZapinanie)
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
