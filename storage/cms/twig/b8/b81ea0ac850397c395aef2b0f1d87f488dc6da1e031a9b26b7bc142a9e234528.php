<?php

/* /home/roman/scripts/alexeev/themes/responsiv-clean/pages/home.htm */
class __TwigTemplate_4dbf8315973945f995c36182fc00d52782b2853411b6d6d85b6400e9063400da extends Twig_Template
{
    private $source;

    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 1
        echo "<div
    id=\"homePosts\"
    class=\"post-list home-posts\">
    ";
        // line 4
        $context['__cms_partial_params'] = [];
        echo $this->env->getExtension('Cms\Twig\Extension')->partialFunction("home/posts"        , $context['__cms_partial_params']        , true        );
        unset($context['__cms_partial_params']);
        // line 5
        echo "</div>
<div
    class=\"text-center\"
    data-control=\"auto-pager\"
    data-request=\"onPagePosts\"
    data-request-update=\"'home/posts': '@#homePosts'\"
    data-current-page=\"1\"
    data-last-page=\"";
        // line 12
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["posts"] ?? null), "lastPage", []), "html", null, true);
        echo "\">
    <a class=\"text-muted oc-loading\">Fetching posts..</a>
</div>";
    }

    public function getTemplateName()
    {
        return "/home/roman/scripts/alexeev/themes/responsiv-clean/pages/home.htm";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  41 => 12,  32 => 5,  28 => 4,  23 => 1,);
    }

    public function getSourceContext()
    {
        return new Twig_Source("<div
    id=\"homePosts\"
    class=\"post-list home-posts\">
    {% partial 'home/posts' %}
</div>
<div
    class=\"text-center\"
    data-control=\"auto-pager\"
    data-request=\"onPagePosts\"
    data-request-update=\"'home/posts': '@#homePosts'\"
    data-current-page=\"1\"
    data-last-page=\"{{ posts.lastPage }}\">
    <a class=\"text-muted oc-loading\">Fetching posts..</a>
</div>", "/home/roman/scripts/alexeev/themes/responsiv-clean/pages/home.htm", "");
    }
}
