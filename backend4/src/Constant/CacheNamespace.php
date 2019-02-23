<?php

namespace App\Constant;

class CacheNamespace {
	
	// Namespaces
	const USER										= 'user';
	
	// Keys
	const REGIST_SENT_CONFIRMATION					= 'registSentConfirmation';
	const FORGOTTEN_PASSWORD_SENT_CONFIRMATION		= 'forgottenPasswordSentConfirmation';
	
	// Lifetime
	const ACTION_DELAY_LIFETIME						= 60;
}
