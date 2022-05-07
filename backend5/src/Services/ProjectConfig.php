<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\KernelInterface;

use App\Services\Helpers;

class ProjectConfig {

  const SEP       = DIRECTORY_SEPARATOR;

	/**
	 * @var Request
	 */
	private $request;
  private $appKernel;
  private $configValues;
	private $lang;

	public function __construct($configValues, RequestStack $requestStack, KernelInterface $appKernel) {
		$this->request = $requestStack;
    $this->appKernel = $appKernel;

		if ($this->request->getCurrentRequest()->isXmlHttpRequest()
				&& $this->request->getCurrentRequest()->getMethod() != 'OPTIONS'
				&& !$this->request->getCurrentRequest()->headers->has('x-lang')) {
			throw new \InvalidArgumentException('Header language provider error');
		}
		
		$this->lang = $this->request->getCurrentRequest()->headers->get('x-lang') /*?? 'sk'*/;
//$this->lang = 'sk';
		$this->configValues = Helpers::arrayToObject($configValues[$this->lang]);
	}
	
	public function getLang() {
		return $this->lang;
	}

  public function getProjetAbsRoot() {
    return $this->appKernel->getProjectDir();
  }
	
	public function getParam($key) {
		return $this->configValues->{$key};
	}
	
	public function getReferer() {
		$url = (object) parse_url($this->request->getMasterRequest()->server->get('HTTP_REFERER'));
		return $url->scheme . '://' . $url->host . ($url->port ? ':' . $url->port : '') . '/';
	}
	
	public function getTemplatePath() {
		return __DIR__.self::SEP.'..'.self::SEP.'Resources'.self::SEP.'MailTemplates'.self::SEP.$this->getLang();
	}
	
	public function loadTemplate($fileName, array $params) {
		$body = file_get_contents($this->getTemplatePath().self::SEP.$fileName);
		
		return Helpers::mapParams($body, $params);
	}
}
