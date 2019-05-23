function openPopup (elem) {
    window.open(
        elem.href,
        '',
        'width=' + screen.availWidth / 2 + ', height=' + screen.availHeight / 2 + ', top='
        + screen.availHeight / 4 + ', left=' + screen.availWidth / 4
    );

    return false;
}

(function($) {

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
            && location.hostname === this.hostname
        ) {
            var hash = this.hash;
            var target = $(hash);

            target = target.length ? target : $('[name=' + hash.slice(1) + ']');

            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top)
                }, 1000, 'easeInOutExpo', function () {
                    location.hash = hash;
                });

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
     * Простановка ссылок для раскрытия подкатов в медиа-элементах.
     */
    $('.media').each(function (index) {
        var body = $(this).find('.media-body').first();
        var height = parseInt(body.css('height'));
        if (
            !isNaN(height)
            && height > 140
        ) {
            /**
             * Урезаем текст, добавляем ссылку на подкат...
             */
            // ...
        }
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

                if (
                    elem.paragraphs.length > 0
                    && elem.paragraphs.join('').length > 0
                ) {
                    for (j = 0; j < elem.paragraphs.length; ++j) {
                        paragraphs += '<p>' + elem.paragraphs[j] + '</p>';
                    }
                } else {
                    paragraphs = '<p>Описание отсутствует.</p>';
                }

                var item = template.html()
                    .replace(/{{ id }}/g, i + 1)
                    .replace(/{{ name }}/g, elem.name)
                    .replace(/{{ authors }}/g, elem.authors)
                    .replace(/{{ description }}/g, elem.description)
                    .replace(/{{ paragraphs }}/g, paragraphs)
                    .replace(/( \d{4} г.)/g, '<strong>$1</strong>')
                ;

                html += item;

            }

            container.html(html);

        })

    ;

    /**
     * Загрузка данных в раздел "Видео".
     */
    $.getJSON( 'data/video.json')

        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log('Request Failed: ' + err);
        })

        .done(function(json) {

            var container = $('#video-container');
            var template = $('#video-item');

            var html = '';

            for (i = 0; i < json.length; ++i) {

                var elem = json[i];

                var paragraphs = '';

                if (
                    elem.paragraphs.length > 0
                    && elem.paragraphs.join('').length > 0
                ) {
                    for (j = 0; j < elem.paragraphs.length; ++j) {
                        paragraphs += '<p>' + elem.paragraphs[j] + '</p>';
                    }
                } else {
                    paragraphs = '';
                }

                var item = template.html()
                    .replace(/{{ code }}/g, elem.code)
                    .replace(/{{ caption }}/g, elem.caption)
                    .replace(/{{ paragraphs }}/g, paragraphs)
                ;

                html += item;

            }

            container.html(html);

        })

    ;

}) (jQuery);
