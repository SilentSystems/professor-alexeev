(function($) {

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
            && location.hostname === this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#sideNav'
    });

    /**
     * Загрузка данных в раздел "Библиография".
     */
    $.getJSON( 'data/bibliography.json')

        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log('Request Failed: ' + err);
        })

        .done(function(json) {

            var container = $('#bibliography-container');
            var template = $('#bibliography-item');

            var html = '';

            for (i = 0; i < json.length; ++i) {

                var elem = json[i];

                var paragraphs = '';
                for (j = 0; j < elem.paragraphs.length; ++j) {
                    paragraphs += '<p>' + elem.paragraphs[j] + '</p>';
                }

                var item = template.html()
                    .replace(/{{ id }}/g, i + 1)
                    .replace(/{{ name }}/g, elem.name)
                    .replace(/{{ authors }}/g, elem.authors)
                    .replace(/{{ description }}/g, elem.description)
                    .replace(/{{ paragraphs }}/g, paragraphs)
                ;

                html += item;

            }

            container.html(html);

        })

    ;

}) (jQuery);
