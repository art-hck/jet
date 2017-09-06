<?php
namespace PostBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlankValidator;

class PostFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add("title", TextType::class, [
                'required' => true,
//                "constraints" => [
//                    new NotBlankValidator()
//                ]
            ])
            ->add('tags', TextareaType::class, [
            ])
            ->add('attachments', TextareaType::class)
        ;
    }
}