<?php

namespace App\Entity;

class OblecenieKategorieRepository extends AbstractEntityRepository {
	
	public function getDataToSelectForm() {
		$categories = $this->findBy( ['rodic' => 0], ['zorad' => 'ASC'] );
		
		$realCategories = [];
		/* @var $category \App\Entity\OblecenieKategorie */
		foreach ($categories as $category) {
			$realCategories[] = [
				'item' => $category->getNazov(),
				'children' => $this->getCategoryChild( $category->getId() )
			];
		}
		return $realCategories;
	}
	
	private function getCategoryChild( $parentId ) {
		$categories = $this->findBy( ['rodic' => $parentId], ['zorad' => 'ASC'] );
		
		return $this->returnAsSimpleArray($categories, true);
	}
	
}
