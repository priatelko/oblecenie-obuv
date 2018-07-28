<?php

namespace CommonBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ObuvVelkostPodpadku
 *
 * @ORM\Table(name="obuv_velkost_podpadku")
 * @ORM\Entity
 */
class ObuvVelkostPodpadku
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
     * @ORM\Column(name="nazov", type="string", length=255, precision=0, scale=0, nullable=false, unique=false)
     */
    private $nazov;

    /**
     * @var integer
     *
     * @ORM\Column(name="zorad", type="integer", precision=0, scale=0, nullable=false, unique=false)
     */
    private $zorad;


}

