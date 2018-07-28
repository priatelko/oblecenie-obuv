<?php

namespace CommonBundle\Entity;

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
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_create", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $dateCreate;

    /**
     * @var string
     *
     * @ORM\Column(name="code", type="string", length=12, precision=0, scale=0, nullable=false, unique=false)
     */
    private $code;

    /**
     * @var boolean
     *
     * @ORM\Column(name="used", type="boolean", precision=0, scale=0, nullable=false, unique=false)
     */
    private $used;

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
     * @var \CommonBundle\Entity\CreditType
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\CreditType")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_credit_type", referencedColumnName="id", nullable=true)
     * })
     */
    private $idCreditType;

    /**
     * @var \CommonBundle\Entity\User
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $user;


}

