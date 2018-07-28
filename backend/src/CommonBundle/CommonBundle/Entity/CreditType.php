<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CreditType
 *
 * @ORM\Table(name="credit_type", indexes={@ORM\Index(name="IDX_8B1CE81438248176", columns={"currency_id"})})
 * @ORM\Entity
 */
class CreditType
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="string", length=255, precision=0, scale=0, nullable=false, unique=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255, precision=0, scale=0, nullable=false, unique=false)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="price", type="decimal", precision=9, scale=2, nullable=false, unique=false)
     */
    private $price;

    /**
     * @var \CommonBundle\Entity\Currency
     *
     * @ORM\ManyToOne(targetEntity="CommonBundle\Entity\Currency")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="currency_id", referencedColumnName="id", nullable=true)
     * })
     */
    private $currency;


}

