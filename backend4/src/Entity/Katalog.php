<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Katalog
 *
 * @ORM\Table(name="katalog", indexes={@ORM\Index(name="IDX_28C37C209B3651C6", columns={"user_id"})})
 * @ORM\Entity
 */
class Katalog
{
    /**
     * @var string
     *
     * @ORM\Column(name="titulok", type="string", length=255, nullable=false)
     */
    private $titulok;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="datum_pridania", type="datetime", nullable=false)
     */
    private $datumPridania;

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
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;



    /**
     * Set titulok
     *
     * @param string $titulok
     *
     * @return Katalog
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
     * Set datumPridania
     *
     * @param \DateTime $datumPridania
     *
     * @return Katalog
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
     * @return Katalog
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
}
