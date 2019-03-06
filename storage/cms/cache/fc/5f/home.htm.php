<?php 
class Cms5c7fe687156b7393555354_191d5b3225f602d3ca16bc7c6aa0abddClass extends Cms\Classes\PageCode
{
public function onPagePosts()
{
    $this->blogPosts->setProperty('pageNumber', post('page'));
    $this->pageCycle();
}
}
