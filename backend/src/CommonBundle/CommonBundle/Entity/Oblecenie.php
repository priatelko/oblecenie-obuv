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
     * @ORM\Column(name="velkost_cislo", type="decimal", precision=4, scale=1, nullable=true, unique=false)
     */
    private $velkostCislo;

    /**
     * @var \CommonBundle\Entity\OblecenieKategorie
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\OblecenieKategorie")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="kategoria_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $kategoria;

    /**
     * @var \CommonBundle\Entity\OblecenieVelkost
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\OblecenieVelkost")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="velkost_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $velkost;

    /**
     * @var \CommonBundle\Entity\OblecenieZostrih
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\OblecenieZostrih")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="zostrih_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $zostrih;

    /**
     * @var \CommonBundle\Entity\Artikel
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\Artikel")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="artikel_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $artikel;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\ObleceniePrilezitost", inversedBy="oblecenie")
     * @ORM\JoinTable(name="oblecenie_x_prilezitost",
     *   joinColumns={
     *     @ORM\JoinColumn(name="oblecenie_id", referencedColumnName="id", nullable=true)
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="oblecenie_prilezitost_id", referencedColumnName="id", nullable=true)
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
     *     @ORM\JoinColumn(name="oblecenie_id", referencedColumnName="id", nullable=true)
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="oblecenie_styl_id", referencedColumnName="id", nullable=true)
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
     *     @ORM\JoinColumn(name="oblecenie_id", referencedColumnName="id", nullable=true)
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="oblecenie_zapinanie_id", referencedColumnName="id", nullable=true)
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

}

