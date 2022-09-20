<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Dress
 *
 * @ORM\Table(name="dress", uniqueConstraints={@ORM\UniqueConstraint(name="UNIQ_FAF6ECDAEEDF290A", columns={"article_id"})}, indexes={@ORM\Index(name="IDX_FAF6ECDA359B0684", columns={"category_id"}), @ORM\Index(name="IDX_FAF6ECDAE992B21", columns={"cut_id"}), @ORM\Index(name="IDX_FAF6ECDA3A51F8D0", columns={"size_id"})})
 * @ORM\Entity
 */
class Dress
{
    /**
     * @var string
     *
     * @ORM\Column(name="size_num", type="decimal", precision=4, scale=1, nullable=true)
     */
    private $sizeNum;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \App\Entity\DressCategory
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\DressCategory")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     * })
     */
    private $category;

    /**
     * @var \App\Entity\DressSize
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\DressSize")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="size_id", referencedColumnName="id")
     * })
     */
    private $size;

    /**
     * @var \App\Entity\DressCut
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\DressCut")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="cut_id", referencedColumnName="id")
     * })
     */
    private $cut;

    /**
     * @var \App\Entity\Article
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Article")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="article_id", referencedColumnName="id")
     * })
     */
    private $article;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\DressOccasion", inversedBy="dress")
     * @ORM\JoinTable(name="dress_x_occasion",
     *   joinColumns={
     *     @ORM\JoinColumn(name="dress_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="dress_occasion_id", referencedColumnName="id")
     *   }
     * )
     */
    private $dressOccasion;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\DressStyle", inversedBy="dress")
     * @ORM\JoinTable(name="dress_x_style",
     *   joinColumns={
     *     @ORM\JoinColumn(name="dress_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="dress_style_id", referencedColumnName="id")
     *   }
     * )
     */
    private $dressStyle;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\DressFastening", inversedBy="dress")
     * @ORM\JoinTable(name="dress_x_fastening",
     *   joinColumns={
     *     @ORM\JoinColumn(name="dress_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="dress_fastening_id", referencedColumnName="id")
     *   }
     * )
     */
    private $dressFastening;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->dressOccasion = new \Doctrine\Common\Collections\ArrayCollection();
        $this->dressStyle = new \Doctrine\Common\Collections\ArrayCollection();
        $this->dressFastening = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set sizeNum
     *
     * @param string $sizeNum
     *
     * @return Dress
     */
    public function setSizeNum($sizeNum)
    {
        $this->sizeNum = $sizeNum;

        return $this;
    }

    /**
     * Get sizeNum
     *
     * @return string
     */
    public function getSizeNum()
    {
        return $this->sizeNum;
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
     * Set category
     *
     * @param \App\Entity\DressCategory $category
     *
     * @return Dress
     */
    public function setCategory(\App\Entity\DressCategory $category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return \App\Entity\DressCategory
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set size
     *
     * @param \App\Entity\DressSize $size
     *
     * @return Dress
     */
    public function setSize(\App\Entity\DressSize $size = null)
    {
        $this->size = $size;

        return $this;
    }

    /**
     * Get size
     *
     * @return \App\Entity\DressSize
     */
    public function getSize()
    {
        return $this->size;
    }

    /**
     * Set cut
     *
     * @param \App\Entity\DressCut $cut
     *
     * @return Dress
     */
    public function setCut(\App\Entity\DressCut $cut = null)
    {
        $this->cut = $cut;

        return $this;
    }

    /**
     * Get cut
     *
     * @return \App\Entity\DressCut
     */
    public function getCut()
    {
        return $this->cut;
    }

    /**
     * Set article
     *
     * @param \App\Entity\Article $article
     *
     * @return Dress
     */
    public function setArticle(\App\Entity\Article $article = null)
    {
        $this->article = $article;

        return $this;
    }

    /**
     * Get article
     *
     * @return \App\Entity\Article
     */
    public function getArticle()
    {
        return $this->article;
    }

    /**
     * Add dressOccasion
     *
     * @param \App\Entity\DressOccasion $dressOccasion
     *
     * @return Dress
     */
    public function addDressOccasion(\App\Entity\DressOccasion $dressOccasion)
    {
        $this->dressOccasion[] = $dressOccasion;

        return $this;
    }

    /**
     * Remove dressOccasion
     *
     * @param \App\Entity\DressOccasion $dressOccasion
     */
    public function removeDressOccasion(\App\Entity\DressOccasion $dressOccasion)
    {
        $this->dressOccasion->removeElement($dressOccasion);
    }

    /**
     * Get dressOccasion
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getDressOccasion()
    {
        return $this->dressOccasion;
    }

    /**
     * Add dressStyle
     *
     * @param \App\Entity\DressStyle $dressStyle
     *
     * @return Dress
     */
    public function addDressStyle(\App\Entity\DressStyle $dressStyle)
    {
        $this->dressStyle[] = $dressStyle;

        return $this;
    }

    /**
     * Remove dressStyle
     *
     * @param \App\Entity\DressStyle $dressStyle
     */
    public function removeDressStyle(\App\Entity\DressStyle $dressStyle)
    {
        $this->dressStyle->removeElement($dressStyle);
    }

    /**
     * Get dressStyle
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getDressStyle()
    {
        return $this->dressStyle;
    }

    /**
     * Add dressFastening
     *
     * @param \App\Entity\DressFastening $dressFastening
     *
     * @return Dress
     */
    public function addDressFastening(\App\Entity\DressFastening $dressFastening)
    {
        $this->dressFastening[] = $dressFastening;

        return $this;
    }

    /**
     * Remove dressFastening
     *
     * @param \App\Entity\DressFastening $dressFastening
     */
    public function removeDressFastening(\App\Entity\DressFastening $dressFastening)
    {
        $this->dressFastening->removeElement($dressFastening);
    }

    /**
     * Get dressFastening
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getDressFastening()
    {
        return $this->dressFastening;
    }
}
