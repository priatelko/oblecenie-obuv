<?php

namespace App\Entity;

use \App\Interfaces\ToStringInterface;
use \App\Interfaces\ToArrayObjectInterface;

class AbstractEntityRepository extends \Doctrine\ORM\EntityRepository {

    protected function returnAsCollectionOfObjects( $result ) {
        return new \Doctrine\Common\Collections\ArrayCollection( $result );
    }

    protected function returnAsSimpleArray( $result, $separateId = false ) {
        $rows = [];
        foreach ( $result as $row ) {

            if ( !($row instanceof ToStringInterface) ) {
                throw new \Exception( "AbstractEntityRepository::returnAsSimpleArray - Entity " . \get_class( $row ) . " have to implement \App\Interfaces\ToStringInterface!" );
            }

			if (!$separateId) {
				$rows[$row->getId()] = (string) $row;
			} else {
				if ( !($row instanceof ToArrayObjectInterface ) ) {
					throw new \Exception( "AbstractEntityRepository::returnAsSimpleArray - Entity " . \get_class( $row ) . " have to implement \App\Interfaces\ToArrayObjectInterface!" );
				}
				$rows[] = $row->toArrayObject();
			}
        }

        return $rows;
    }

    protected function returnAsCollectionOfSimpleArray( $result ) {
        return new \Doctrine\Common\Collections\ArrayCollection( $this->returnAsSimpleArray( $result ) );
    }

	/**
	 * Basic selectbox options
	 * @return type
	 */
	public function getDataToSelectForm() {
		return $this->findBy( [], ['order' => 'ASC'] );
	}

}
