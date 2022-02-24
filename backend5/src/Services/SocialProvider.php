<?php

namespace App\Services;

use App\Services\ProjectConfig;

class SocialProvider {
    
    /**
	 * @var ProjectConfig
	 */
	private $projectConfig;
    
    const facebook      = 'facebook';
    const google        = 'google';

    const GOOGLE_CREDENTIALS_FILE = __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'Resources'. DIRECTORY_SEPARATOR .'client_google_credentials.json';
    
    private $providers = [self::facebook, self::google];
    
    public function __construct(ProjectConfig $projectConfig) {
        $this->projectConfig = $projectConfig;
    }
    
    function isProviderValid($provider) {
        return in_array($provider, $this->providers);
    }
    
    // Doriesit zapametanie na nejaky cas, nech sa vkuse nepripaja na APIcka
    function getUser($provider, $token) {
        if (!$this->isProviderValid($provider)) {
            throw new \InvalidArgumentException( 'Social provider is not valid' );
        }
        
        switch ($provider) {
            case self::facebook:
                return $this->getFacebookUser($token);
            case self::google:
                return $this->getGoogleUser($token);
        }
    }
    
    /**
     * @param type $token
     * @return \Facebook\GraphNodes\GraphUser
     * @throws \InvalidArgumentException
     */
    private function getFacebookUser($token) {
        $fb = new \Facebook\Facebook([
            'app_id' => $this->projectConfig->getParam('facebook')->id,
            'app_secret' => $this->projectConfig->getParam('facebook')->secret,
            'default_graph_version' => 'v2.10',
        ]);
        
        try {
            $response = $fb->get('/me', $token);
        } catch(\Facebook\Exceptions\FacebookResponseException $e) {
            // When Graph returns an error
            throw new \InvalidArgumentException( 'Graph returned an error: ' . $e->getMessage() );
        } catch(\Facebook\Exceptions\FacebookSDKException $e) {
            // When validation fails or other local issues
            throw new \InvalidArgumentException( 'Facebook SDK returned an error: ' . $e->getMessage() );
        }
        
        $result = $response->getGraphUser();
        
        // Developer mode
        if (!isset($result['email'])) {
            $result['email'] = $this->projectConfig->getParam('rootMailFrom');
        }

        return $result;
    }
    
    private function getGoogleUser($token) {
        $client = new \Google_Client();
        $client->setAccessType('offline');
        $client->setAuthConfig(self::GOOGLE_CREDENTIALS_FILE);
        $client->addScope(\Google_Service_Oauth2::USERINFO_PROFILE);
        
        $client->setRedirectUri('http://localhost:4200');
        $client->refreshToken('ya29.a0AfH6SMDjhT4vkAnrYCrGFNcX7I2Om3ykv5TaHar_6eZEU23aNDBUuCEldzCEWreEOsYeJxlPIf2NIDN8zCaLuPs5f8iFFc6vBRwt2dC1ClN8vAEOoU-IXVXMe7LNLZuFmsIyK66DW8fxXXpnVFdaWm9-MmkqQ0jnwc9M');
        
        $token = $client->fetchAccessTokenWithAuthCode('ya29.a0AfH6SMDjhT4vkAnrYCrGFNcX7I2Om3ykv5TaHar_6eZEU23aNDBUuCEldzCEWreEOsYeJxlPIf2NIDN8zCaLuPs5f8iFFc6vBRwt2dC1ClN8vAEOoU-IXVXMe7LNLZuFmsIyK66DW8fxXXpnVFdaWm9-MmkqQ0jnwc9M');
        
        dump('sdf11', $token); exit;
        
//        $client = new \Google_Client();
//        //$client->setAccessType('offline');
//        $client->setAuthConfig(self::GOOGLE_CREDENTIALS_FILE);
//        $client->addScope(\Google_Service_Oauth2::USERINFO_PROFILE);
//        
//        $client->setRedirectUri($this->projectConfig->getParam('google')->redirectUri);
//        
//        $token = $client->fetchAccessTokenWithAuthCode($token);
//        
//        dump('sdf', $token); exit;
    }
}
