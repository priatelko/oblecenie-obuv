<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Article
 *
 * @ORM\Table(name="article", indexes={@ORM\Index(name="IDX_A4375C33DFEB2608", columns={"catalog_id"}), @ORM\Index(name="IDX_A4375C33113C1FD1", columns={"brand_id"}), @ORM\Index(name="IDX_A4375C33ED70AA70", columns={"article_type_id"}), @ORM\Index(name="IDX_A4375C3338248176", columns={"currency_id"}), @ORM\Index(name="IDX_A4375C334E7AF8F", columns={"gallery_id"}), @ORM\Index(name="IDX_A4375C334A20E996", columns={"expiration_id"}), @ORM\Index(name="fk_article_user_dx", columns={"user_id"})})
 * @ORM\Entity
 */
class Article
{
    /**
     * @var boolean
     *
     * @ORM\Column(name="disabled", type="boolean", nullable=false)
     */
    private $disabled;

    /**
     * @var boolean
     *
     * @ORM\Column(name="hidden", type="boolean", nullable=false)
     */
    private $hidden;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime", nullable=false)
     */
    private $created;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated", type="datetime", nullable=true)
     */
    private $updated;

    /**
     * @var integer
     *
     * @ORM\Column(name="gallery_id", type="integer", nullable=true)
     */
    private $galleryId;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=65, nullable=false)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="price", type="decimal", precision=9, scale=2, nullable=true)
     */
    private $price;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=255, nullable=true)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="text", length=1256, nullable=false)
     */
    private $text;

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
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=false)
     * })
     */
    private $user;

    /**
     * @var \App\Entity\Brand
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Brand")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="brand_id", referencedColumnName="id")
     * })
     */
    private $brand;

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
     * @var \App\Entity\Expiration
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Expiration")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="expiration_id", referencedColumnName="id")
     * })
     */
    private $expiration;

    /**
     * @var \App\Entity\Catalog
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Catalog")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="catalog_id", referencedColumnName="id")
     * })
     */
    private $catalog;

    /**
   * @var \App\Entity\ArticleType
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ArticleType")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="article_type_id", referencedColumnName="id")
     * })
     */
    private $articleType;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Material", inversedBy="article")
     * @ORM\JoinTable(name="article_x_material",
     *   joinColumns={
     *     @ORM\JoinColumn(name="article_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="material_id", referencedColumnName="id")
     *   }
     * )
     */
    private $material;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Season", inversedBy="article")
     * @ORM\JoinTable(name="article_x_season",
     *   joinColumns={
     *     @ORM\JoinColumn(name="article_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="season_id", referencedColumnName="id")
     *   }
     * )
     */
    private $season;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Whom", inversedBy="article")
     * @ORM\JoinTable(name="article_x_whom",
     *   joinColumns={
     *     @ORM\JoinColumn(name="article_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="whom_id", referencedColumnName="id")
     *   }
     * )
     */
    private $whom;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\State", inversedBy="article")
     * @ORM\JoinTable(name="article_x_state",
     *   joinColumns={
     *     @ORM\JoinColumn(name="article_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="state_id", referencedColumnName="id")
     *   }
     * )
     */
    private $state;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->material = new \Doctrine\Common\Collections\ArrayCollection();
        $this->season = new \Doctrine\Common\Collections\ArrayCollection();
        $this->whom = new \Doctrine\Common\Collections\ArrayCollection();
        $this->state = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set disabled
     *
     * @param boolean $disabled
     *
     * @return Article
     */
    public function setDisabled($disabled)
    {
        $this->disabled = $disabled;

        return $this;
    }

    /**
     * Get disabled
     *
     * @return boolean
     */
    public function getDisabled()
    {
        return $this->disabled;
    }

    /**
     * Set hidden
     *
     * @param boolean $hidden
     *
     * @return Article
     */
    public function setHidden($hidden)
    {
        $this->hidden = $hidden;

        return $this;
    }

    /**
     * Get hidden
     *
     * @return boolean
     */
    public function getHidden()
    {
        return $this->hidden;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Article
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     *
     * @return Article
     */
    public function setUpdated($updated)
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * Get updated
     *
     * @return \DateTime
     */
    public function getUpdated()
    {
        return $this->updated;
    }

    /**
     * Set galleryId
     *
     * @param integer $galleryId
     *
     * @return Article
     */
    public function setGalleryId($galleryId)
    {
        $this->galleryId = $galleryId;

        return $this;
    }

    /**
     * Get galleryId
     *
     * @return integer
     */
    public function getGalleryId()
    {
        return $this->galleryId;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Article
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set price
     *
     * @param string $price
     *
     * @return Article
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return string
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set url
     *
     * @param string $url
     *
     * @return Article
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set text
     *
     * @param string $text
     *
     * @return Article
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
    }

    /**
     * Get text
     *
     * @return string
     */
    public function getText()
    {
        return $this->text;
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
     * @return Article
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

    /**
     * Set brand
     *
     * @param \App\Entity\Brand $brand
     *
     * @return Article
     */
    public function setBrand(\App\Entity\Brand $brand = null)
    {
        $this->brand = $brand;

        return $this;
    }

    /**
     * Get brand
     *
     * @return \App\Entity\Brand
     */
    public function getBrand()
    {
        return $this->brand;
    }

    /**
     * Set currency
     *
     * @param \App\Entity\Currency $currency
     *
     * @return Article
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
     * Set expiration
     *
     * @param \App\Entity\Expiration $expiration
     *
     * @return Article
     */
    public function setExpiration(\App\Entity\Expiration $expiration = null)
    {
        $this->expiration = $expiration;

        return $this;
    }

    /**
     * Get expiration
     *
     * @return \App\Entity\Expiration
     */
    public function getExpiration()
    {
        return $this->expiration;
    }

    /**
     * Set catalog
     *
     * @param \App\Entity\Catalog $catalog
     *
     * @return Article
     */
    public function setCatalog(\App\Entity\Catalog $catalog = null)
    {
        $this->catalog = $catalog;

        return $this;
    }

    /**
     * Get catalog
     *
     * @return \App\Entity\Catalog
     */
    public function getCatalog()
    {
        return $this->catalog;
    }

    /**
     * Set articleType
     *
     * @param \App\Entity\ArticleType $articleType
     *
     * @return Article
     */
    public function setArticleType(\App\Entity\ArticleType $articleType = null)
    {
        $this->articleType = $articleType;

        return $this;
    }

    /**
     * Get articleType
     *
     * @return \App\Entity\ArticleType
     */
    public function getArticleType()
    {
        return $this->articleType;
    }

    /**
     * Add material
     *
     * @param \App\Entity\Material $material
     *
     * @return Article
     */
    public function addMaterial(\App\Entity\Material $material)
    {
        $this->material[] = $material;

        return $this;
    }

    /**
     * Remove material
     *
     * @param \App\Entity\Material $material
     */
    public function removeMaterial(\App\Entity\Material $material)
    {
        $this->material->removeElement($material);
    }

    /**
     * Get material
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getMaterial()
    {
        return $this->material;
    }

    /**
     * Add season
     *
     * @param \App\Entity\Season $season
     *
     * @return Article
     */
    public function addSeason(\App\Entity\Season $season)
    {
        $this->season[] = $season;

        return $this;
    }

    /**
     * Remove season
     *
     * @param \App\Entity\Season $season
     */
    public function removeSeason(\App\Entity\Season $season)
    {
        $this->season->removeElement($season);
    }

    /**
     * Get season
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSeason()
    {
        return $this->season;
    }

    /**
     * Add whom
     *
     * @param \App\Entity\Whom $whom
     *
     * @return Article
     */
    public function addWhom(\App\Entity\Whom $whom)
    {
        $this->whom[] = $whom;

        return $this;
    }

    /**
     * Remove whom
     *
     * @param \App\Entity\Whom $whom
     */
    public function removeWhom(\App\Entity\Whom $whom)
    {
        $this->whom->removeElement($whom);
    }

    /**
     * Get whom
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getWhom()
    {
        return $this->whom;
    }

    /**
     * Add state
     *
     * @param \App\Entity\State $state
     *
     * @return Article
     */
    public function addState(\App\Entity\State $state)
    {
        $this->state[] = $state;

        return $this;
    }

    /**
     * Remove state
     *
     * @param \App\Entity\State $state
     */
    public function removeState(\App\Entity\State $state)
    {
        $this->state->removeElement($state);
    }

    /**
     * Get state
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getState()
    {
        return $this->state;
    }
}
