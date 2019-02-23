<?php

namespace App\Services;

use Symfony\Component\Config\Loader\FileLoader;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\HttpFoundation\RequestStack;

use App\Services\Helpers;

class ProjectConfig {

	/**
	 * @var Request
	 */
	private $request;
	private $configValues;
	private $lang;

	public function __construct(RequestStack $requestStack) {
		$this->request = $requestStack;

		if ($this->request->getCurrentRequest()->isXmlHttpRequest()
				&& $this->request->getCurrentRequest()->getMethod() != 'OPTIONS'
				&& !$this->request->getCurrentRequest()->headers->has('x-lang')) {
			throw new \InvalidArgumentException('Header language provider error');
		}
		
		$sep = DIRECTORY_SEPARATOR;
		$this->lang = $this->request->getCurrentRequest()->headers->get('x-lang');
		$resource = __DIR__."$sep..$sep..{$sep}config{$sep}{$this->lang}.yml";

		$this->configValues = Yaml::parse(file_get_contents($resource));
		$this->configValues = Helpers::arrayToObject($this->configValues);
	}
	
	public function getLang() {
		return $this->lang;
	}
	
	public function getParam($key) {
		return $this->configValues->parameters->{$key};
	}
	
	public function getReferer() {
		$url = (object) parse_url($this->request->getMasterRequest()->server->get('HTTP_REFERER'));
		return $url->scheme . '://' . $url->host . ($url->port ? ':' . $url->port : '') . '/';
	}
	
	public function getTemplatePath() {
		$sep = DIRECTORY_SEPARATOR;
		return __DIR__.$sep.'..'.$sep.'Resources'.$sep.'MailTemplates'.$sep.$this->getLang();
	}
	
	public function loadTemplate($fileName, array $params) {
		$sep = DIRECTORY_SEPARATOR;
		$body = file_get_contents($this->getTemplatePath().$sep.$fileName);
		
		return Helpers::mapParams($body, $params);
	}
}
