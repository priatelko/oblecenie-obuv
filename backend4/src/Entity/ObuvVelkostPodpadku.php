<?php

namespace App\Entity;

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
     * @var string
     *
     * @ORM\Column(name="nazov", type="string", length=255, nullable=false)
     */
    private $nazov;

    /**
     * @var integer
     *
     * @ORM\Column(name="zorad", type="integer", nullable=false)
     */
    private $zorad;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;



    /**
     * Set nazov
     *
     * @param string $nazov
     *
     * @return ObuvVelkostPodpadku
     */
    public function setNazov($nazov)
    {
        $this->nazov = $nazov;

        return $this;
    }

    /**
     * Get nazov
     *
     * @return string
     */
    public function getNazov()
    {
        return $this->nazov;
    }

    /**
     * Set zorad
     *
     * @param integer $zorad
     *
     * @return ObuvVelkostPodpadku
     */
    public function setZorad($zorad)
    {
        $this->zorad = $zorad;

        return $this;
    }

    /**
     * Get zorad
     *
     * @return integer
     */
    public function getZorad()
    {
        return $this->zorad;
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
}
