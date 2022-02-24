<?php

namespace App\Constant;

class ApiCodes {
	
	// ERRORS
	CONST COMMON_ERROR                      		= 1;
	CONST INVALID_EMAIL                       	= 2;
	CONST EMAIL_EXISTS                        	= 3;
	CONST USER_PASS_NOT_MATCH               		= 4;
	CONST UNAUTHORIZED                      		= 5;
	CONST USER_NOT_CONFIRMED              			= 6;
	CONST EMAIL_NOT_EXISTS                			= 7;
	CONST CONFIRMATION_EMAIL_ALREADY_SENT   		= 8;
	CONST CONFIRMATION_HASH_NOT_FOUND       		= 9;
	CONST FORGOTTEN_EMAIL_ALREADY_SENT     			= 10;
	CONST FORGOTTEN_HASH_NOT_EXISTS       			= 11;
	CONST NEW_PASSWORD_SENT_FAIL          			= 12;
	CONST USER_CREATED                      		= 13;
	CONST USER_UPDATED                  				= 14;
  CONST UPLOAD_FILE_ERROR                     = 15;

	// SUCCESS
	const REGIST_CONFIRMATION_SENT      				= 100;
	const CONFIRMATION_SUCCESS            			= 101;
	const FORGOTTEN_PASSWORD_SENT        				= 102;
	const NEW_PASSWORD_RESET              			= 103;
	const CHANGE_ROLE_SUCCESS             			= 104;
	const USER_LOGGED                       		= 105;
}
