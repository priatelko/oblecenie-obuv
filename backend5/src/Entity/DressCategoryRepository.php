<?php

namespace App\Entity;

class DressCategoryRepository extends AbstractEntityRepository {

	public function getDataToSelectForm() {
		$categories = $this->findBy( ['parent' => 0], ['order' => 'ASC'] );

		$realCategories = [];
		/* @var $category \App\Entity\DressCategory */
		foreach ($categories as $category) {
			$realCategories[] = [
				'item' => $category->getTitle(),
				'children' => $this->getCategoryChild( $category->getId() )
			];
		}
		return $realCategories;
	}

	private function getCategoryChild( $parentId ) {
		$categories = $this->findBy( ['parent' => $parentId], ['order' => 'ASC'] );

		return $this->returnAsSimpleArray($categories, true);
	}

}
