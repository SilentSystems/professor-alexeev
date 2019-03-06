<?php

/* /home/roman/scripts/alexeev/themes/responsiv-clean/partials/site/header.htm */
class __TwigTemplate_271e843bf5ce4eb0e0d5356f053f399fd395dea5649817fd1be555d722477cff extends Twig_Template
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
        echo "<div class=\"row\">
    <div class=\"col-sm-9\">
        <h1 class=\"site-name\">
            <a href=\"";
        // line 4
        echo $this->extensions['Cms\Twig\Extension']->pageFilter("home");
        echo "\">";
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["this"] ?? null), "theme", []), "site_name", []), "html", null, true);
        echo "</a>
        </h1>
        <p class=\"site-motto\">
            ";
        // line 7
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["this"] ?? null), "theme", []), "site_motto", []), "html", null, true);
        echo "
        </p>
    </div>
    <div class=\"col-sm-3\">
        <button type=\"button\" class=\"sidebar-toggle\" onclick=\"toggleSidebar()\">
            <span class=\"icon-bars\">
                <span class=\"icon-bar\"></span>
                <span class=\"icon-bar\"></span>
                <span class=\"icon-bar\"></span>
            </span>
            <span class=\"menu-text\">Menu</span>
        </button>
    </div>
</div>";
    }

    public function getTemplateName()
    {
        return "/home/roman/scripts/alexeev/themes/responsiv-clean/partials/site/header.htm";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  36 => 7,  28 => 4,  23 => 1,);
    }

    public function getSourceContext()
    {
        return new Twig_Source("<div class=\"row\">
    <div class=\"col-sm-9\">
        <h1 class=\"site-name\">
            <a href=\"{{ 'home'|page }}\">{{ this.theme.site_name }}</a>
        </h1>
        <p class=\"site-motto\">
            {{ this.theme.site_motto }}
        </p>
    </div>
    <div class=\"col-sm-3\">
        <button type=\"button\" class=\"sidebar-toggle\" onclick=\"toggleSidebar()\">
            <span class=\"icon-bars\">
                <span class=\"icon-bar\"></span>
                <span class=\"icon-bar\"></span>
                <span class=\"icon-bar\"></span>
            </span>
            <span class=\"menu-text\">Menu</span>
        </button>
    </div>
</div>", "/home/roman/scripts/alexeev/themes/responsiv-clean/partials/site/header.htm", "");
    }
}
