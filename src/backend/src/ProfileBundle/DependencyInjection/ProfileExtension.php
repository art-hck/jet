<?php
namespace ProfileBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

class ProfileExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');

        $container->setParameter('profile.limit', $config['limit']);
        $container->setParameter('profile.min_age', $config['min_age']);
        $container->setParameter('profile.max_age', $config['max_age']);
        $container->setParameter('profile.avatar.absolute_path', $config['avatar']['absolute_path']);
        $container->setParameter('profile.avatar.web_path', $config['avatar']['web_path']);
    }
}