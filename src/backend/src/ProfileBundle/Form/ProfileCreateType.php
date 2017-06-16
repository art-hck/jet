<?php

namespace ProfileBundle\Form;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

class ProfileCreateType extends AbsctractProfileType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder
            ->add("name", TextType::class, [
                "constraints" => [
                    new NotBlank()
                ]
            ])
        ;
    }
    
}