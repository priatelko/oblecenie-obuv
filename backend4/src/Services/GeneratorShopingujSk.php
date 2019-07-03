<?php

namespace App\Services;

class GeneratorShopingujSk implements \App\Interfaces\FeedGenerator {
	const FEED = 'https://www.shopinguj.sk/media/feed/heureka.sk.xml';
	
	static public function generate() {
		$feed = simplexml_load_file(self::FEED);
		
		$i = 0;
		foreach($feed as $item) {
			if (!$item->DESCRIPTION) {
				continue;
			}
			
			$i++;
			dump($item->DESCRIPTION);
			
			if ($i > 10) {
				break;
			}
		}
	}
}
