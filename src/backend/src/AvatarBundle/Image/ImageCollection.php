<?php
namespace AvatarBundle\Image;

class ImageCollection implements \JsonSerializable
{
    private $images;

    static public function createFromJson(array $json = null ): self
    {
        $collection = new ImageCollection();

        if(count($json)>1){
            foreach($json as $item => $value)
            {
                $collection->addImage(new Image($value['storage_path'], $value['public_path'], $item ));
            }
        }
        return $collection;
    }

    public function addImage(Image $image)
    {
        $this->images[$image->getName() ?? null] = $image;

        return $this;
    }

    function jsonSerialize()
    {
        if(is_null($this->images)) return [];

        return array_map(function(Image $image){
            return $image->jsonSerialize();
        }, $this->images);
    }

}