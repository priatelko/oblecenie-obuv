<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Shoes
 *
 * @ORM\Table(name="shoes", uniqueConstraints={@ORM\UniqueConstraint(name="UNIQ_E27C7EBDEEDF290A", columns={"article_id"})}, indexes={@ORM\Index(name="IDX_E27C7EBD359B0684", columns={"category_id"}), @ORM\Index(name="IDX_E27C7EBD6B315BC7", columns={"shoes_height"}), @ORM\Index(name="IDX_E27C7EBD970FAEA0", columns={"sole_material"}), @ORM\Index(name="IDX_E27C7EBD855D289C", columns={"sole_size"}), @ORM\Index(name="IDX_E27C7EBDE093B9AD", columns={"heel_size"}), @ORM\Index(name="IDX_E27C7EBD75A51051", columns={"toe"})})
 * @ORM\Entity
 */
class Shoes
{
    /**
     * @var string
     *
     * @ORM\Column(name="size_num", type="decimal", precision=4, scale=1, nullable=false)
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
     * @var \App\Entity\ShoesCategory
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ShoesCategory")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     * })
     */
    private $category;

    /**
     * @var \App\Entity\ShoesHeight
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ShoesHeight")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="shoes_height", referencedColumnName="id")
     * })
     */
    private $shoesHeight;

    /**
     * @var \App\Entity\ShoesToe
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ShoesToe")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="toe", referencedColumnName="id")
     * })
     */
    private $toe;

    /**
     * @var \App\Entity\ShoesSoleSize
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ShoesSoleSize")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="sole_size", referencedColumnName="id")
     * })
     */
    private $soleSize;

    /**
     * @var \App\Entity\ShoesSoleMaterial
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ShoesSoleMaterial")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="sole_material", referencedColumnName="id")
     * })
     */
    private $soleMaterial;

    /**
     * @var \App\Entity\ShoesHeelSize
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\ShoesHeelSize")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="heel_size", referencedColumnName="id")
     * })
     */
    private $heelSize;

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
     * @ORM\ManyToMany(targetEntity="App\Entity\ShoesTie", inversedBy="shoes")
     * @ORM\JoinTable(name="shoes_x_tie",
     *   joinColumns={
     *     @ORM\JoinColumn(name="shoes_id", referencedColumnName="id")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="shoes_tie_id", referencedColumnName="id")
     *   }
     * )
     */
    private $shoesTie;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->shoesTie = new \Doctrine\Common\Collections\ArrayCollection();
    }


    /**
     * Set sizeNum
     *
     * @param string $sizeNum
     *
     * @return Shoes
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
     * @param \App\Entity\ShoesCategory $category
     *
     * @return Shoes
     */
    public function setCategory(\App\Entity\ShoesCategory $category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return \App\Entity\ShoesCategory
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set shoesHeight
     *
     * @param \App\Entity\ShoesHeight $shoesHeight
     *
     * @return Shoes
     */
    public function setShoesHeight(\App\Entity\ShoesHeight $shoesHeight = null)
    {
        $this->shoesHeight = $shoesHeight;

        return $this;
    }

    /**
     * Get shoesHeight
     *
     * @return \App\Entity\ShoesHeight
     */
    public function getShoesHeight()
    {
        return $this->shoesHeight;
    }

    /**
     * Set toe
     *
     * @param \App\Entity\ShoesToe $toe
     *
     * @return Shoes
     */
    public function setToe(\App\Entity\ShoesToe $toe = null)
    {
        $this->toe = $toe;

        return $this;
    }

    /**
     * Get toe
     *
     * @return \App\Entity\ShoesToe
     */
    public function getToe()
    {
        return $this->toe;
    }

    /**
     * Set soleSize
     *
     * @param \App\Entity\ShoesSoleSize $soleSize
     *
     * @return Shoes
     */
    public function setSoleSize(\App\Entity\ShoesSoleSize $soleSize = null)
    {
        $this->soleSize = $soleSize;

        return $this;
    }

    /**
     * Get soleSize
     *
     * @return \App\Entity\ShoesSoleSize
     */
    public function getSoleSize()
    {
        return $this->soleSize;
    }

    /**
     * Set soleMaterial
     *
     * @param \App\Entity\ShoesSoleMaterial $soleMaterial
     *
     * @return Shoes
     */
    public function setSoleMaterial(\App\Entity\ShoesSoleMaterial $soleMaterial = null)
    {
        $this->soleMaterial = $soleMaterial;

        return $this;
    }

    /**
     * Get soleMaterial
     *
     * @return \App\Entity\ShoesSoleMaterial
     */
    public function getSoleMaterial()
    {
        return $this->soleMaterial;
    }

    /**
     * Set heelSize
     *
     * @param \App\Entity\ShoesHeelSize $heelSize
     *
     * @return Shoes
     */
    public function setHeelSize(\App\Entity\ShoesHeelSize $heelSize = null)
    {
        $this->heelSize = $heelSize;

        return $this;
    }

    /**
     * Get heelSize
     *
     * @return \App\Entity\ShoesHeelSize
     */
    public function getHeelSize()
    {
        return $this->heelSize;
    }

    /**
     * Set article
     *
     * @param \App\Entity\Article $article
     *
     * @return Shoes
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
     * Add shoesTie
     *
     * @param \App\Entity\ShoesTie $shoesTie
     *
     * @return Shoes
     */
    public function addShoesTie(\App\Entity\ShoesTie $shoesTie)
    {
        $this->shoesTie[] = $shoesTie;

        return $this;
    }

    /**
     * Remove shoesTie
     *
     * @param \App\Entity\ShoesTie $shoesTie
     */
    public function removeShoesTie(\App\Entity\ShoesTie $shoesTie)
    {
        $this->shoesTie->removeElement($shoesTie);
    }

    /**
     * Get shoesTie
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getShoesTie()
    {
        return $this->shoesTie;
    }
}
