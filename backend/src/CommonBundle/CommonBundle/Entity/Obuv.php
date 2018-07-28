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
     * @ORM\Column(name="velkost_cislo", type="decimal", precision=4, scale=1, nullable=false, unique=false)
     */
    private $velkostCislo;

    /**
     * @var \CommonBundle\Entity\ObuvKategorie
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ObuvKategorie")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="kategoria_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $kategoria;

    /**
     * @var \CommonBundle\Entity\ObuvVyska
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ObuvVyska")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="vyska_obuvy", referencedColumnName="id", nullable=true)
     * })
     */
    private $vyskaObuvy;

    /**
     * @var \CommonBundle\Entity\ObuvSpicka
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ObuvSpicka")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="spicka", referencedColumnName="id", nullable=true)
     * })
     */
    private $spicka;

    /**
     * @var \CommonBundle\Entity\ObuvVelkostPodrazky
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ObuvVelkostPodrazky")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="velkost_podrazky", referencedColumnName="id", nullable=true)
     * })
     */
    private $velkostPodrazky;

    /**
     * @var \CommonBundle\Entity\ObuvMaterialPodrazky
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ObuvMaterialPodrazky")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="material_podrazky", referencedColumnName="id", nullable=true)
     * })
     */
    private $materialPodrazky;

    /**
     * @var \CommonBundle\Entity\ObuvVelkostPodpadku
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\ObuvVelkostPodpadku")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="velkost_podpadku", referencedColumnName="id", nullable=true)
     * })
     */
    private $velkostPodpadku;

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
     * @ORM\ManyToMany(targetEntity="CommonBundle\Entity\ObuvZavazovanie", inversedBy="obuv")
     * @ORM\JoinTable(name="obuv_x_zavazovanie",
     *   joinColumns={
     *     @ORM\JoinColumn(name="obuv_id", referencedColumnName="id", nullable=true)
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="obuv_zavazovanie_id", referencedColumnName="id", nullable=true)
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

}

