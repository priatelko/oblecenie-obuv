<?php

namespace App\Services;

use App\Services\ProjectConfig;

class SocialProvider {
    
    /**
	 * @var ProjectConfig
	 */
	private $projectConfig;

  const local         = 'local';
  const facebook      = 'facebook';
  const google        = 'google';

  const GOOGLE_CREDENTIALS_FILE = __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'Resources'. DIRECTORY_SEPARATOR .'client_google_credentials.json';

  public static $providers = [self::facebook, self::google];

  public function __construct(ProjectConfig $projectConfig) {
    $this->projectConfig = $projectConfig;
  }

  function isProviderValid($provider) {
    return in_array($provider, self::$providers);
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
   * @param string $token
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
      $user = $response->getGraphUser();
    } /*catch(\Facebook\Exceptions\FacebookResponseException $e) {
        // When Graph returns an error
        throw new \InvalidArgumentException( 'Graph returned an error: ' . $e->getMessage() );
    } catch(\Facebook\Exceptions\FacebookSDKException $e) {
        // When validation fails or other local issues
        throw new \InvalidArgumentException( 'Facebook SDK returned an error: ' . $e->getMessage() );
    }*/ catch (\Exception $e) {
      return false;
    }

    return $user;
  }

  private function getGoogleUser($token) {
    // init configuration
    $clientID = $this->projectConfig->getParam('google')->id;
    $clientSecret = $this->projectConfig->getParam('google')->secret;
    $redirectUri = $this->projectConfig->getParam('google')->redirectUri;

    // create Client Request to access Google API
    $client = new \Google_Client();
    $client->setClientId($clientID);
    $client->setClientSecret($clientSecret);
    $client->setRedirectUri($redirectUri);
    $client->addScope("email");
    $client->addScope("profile");

    // authenticate code from Google OAuth Flow
    $client->setAccessToken($token);

    try {
      // get profile info
      $google_oauth = new \Google_Service_Oauth2($client);
      $google_account_info = $google_oauth->userinfo->get();
    } catch (\Exception $e) {
      return false;
    }

    return $google_account_info;
  }
}
