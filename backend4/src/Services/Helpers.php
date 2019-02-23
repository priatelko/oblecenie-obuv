<?php

namespace App\Services;

use Symfony\Component\Cache\Adapter\FilesystemAdapter;

class Helpers {
	public static function arrayToObject($array) {
		return json_decode(json_encode($array));
	}
	
	public static function trimArray(array $array) {
	   return array_map('trim', $array);
   }
   
   public static function getCacheStorage($namespace, $lifeTime = 0) {
	   return new FilesystemAdapter($namespace, $lifeTime, 'cache');
   }
   
   public static function mapParams(string $string, array $params) {
		foreach($params as $paramKey => $paramValue) {
			$string = str_replace($paramKey, $paramValue, $string);
		}

		return $string;
   }
}
