<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Credit
 *
 * @ORM\Table(name="credit", uniqueConstraints={@ORM\UniqueConstraint(name="UNIQ_1CC16EFE77153098", columns={"code"})}, indexes={@ORM\Index(name="IDX_1CC16EFE38248176", columns={"currency_id"}), @ORM\Index(name="IDX_1CC16EFE930E25E3", columns={"id_credit_type"}), @ORM\Index(name="IDX_1CC16EFE9B3651C6", columns={"user_id"})})
 * @ORM\Entity
 */
class Credit
{
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_create", type="datetime", nullable=false)
     */
    private $dateCreate;

    /**
     * @var string
     *
     * @ORM\Column(name="code", type="string", length=12, nullable=false)
     */
    private $code;

    /**
     * @var boolean
     *
     * @ORM\Column(name="used", type="boolean", nullable=false)
     */
    private $used;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

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
     * @var \App\Entity\CreditType
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\CreditType")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_credit_type", referencedColumnName="id")
     * })
     */
    private $idCreditType;

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
     * Set dateCreate
     *
     * @param \DateTime $dateCreate
     *
     * @return Credit
     */
    public function setDateCreate($dateCreate)
    {
        $this->dateCreate = $dateCreate;

        return $this;
    }

    /**
     * Get dateCreate
     *
     * @return \DateTime
     */
    public function getDateCreate()
    {
        return $this->dateCreate;
    }

    /**
     * Set code
     *
     * @param string $code
     *
     * @return Credit
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code
     *
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * Set used
     *
     * @param boolean $used
     *
     * @return Credit
     */
    public function setUsed($used)
    {
        $this->used = $used;

        return $this;
    }

    /**
     * Get used
     *
     * @return boolean
     */
    public function getUsed()
    {
        return $this->used;
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
     * Set currency
     *
     * @param \App\Entity\Currency $currency
     *
     * @return Credit
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
     * Set idCreditType
     *
     * @param \App\Entity\CreditType $idCreditType
     *
     * @return Credit
     */
    public function setIdCreditType(\App\Entity\CreditType $idCreditType = null)
    {
        $this->idCreditType = $idCreditType;

        return $this;
    }

    /**
     * Get idCreditType
     *
     * @return \App\Entity\CreditType
     */
    public function getIdCreditType()
    {
        return $this->idCreditType;
    }

    /**
     * Set user
     *
     * @param \App\Entity\User $user
     *
     * @return Credit
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
