/**
 * Попапы для открытия видео и фото.
 */
function open_popup (elem, coef = 2) {

    window.open(
        (elem.href) ? elem.href : elem.src,
        '',
        'width=' + (screen.availWidth / coef) + ', height=' + (screen.availHeight / coef) + ', top='
            + (screen.availHeight / coef / 2) + ', left=' + (screen.availWidth / coef / 2)
    );

    return false;
}

function auto_size(img, maxwidth, maxheight) {
    if (img.width > maxwidth) {
        width = img.width;
        height = img.height;
        img.width = maxwidth;
        img.height = (maxwidth * height) / width;
    }

    if (img.height > maxheight) {
        width = img.width;
        height = img.height;
        img.height = maxheight;
        img.width = (maxheight * width) / height;
    }
}

(function($) {

    var hashLinks = $('nav a.nav-link[href*="#"]:not([href="#"])');

    var hashSections = [];

    hashLinks.each(function (index) {
        hashSections.push($('section' + this.hash));
    });

    /**
     * Клик по ссылкам меню и плавный скролл по секциям.
     */
    hashLinks.click(function(e) {
        var locationPathname = location.pathname.replace(/^\//, '');
        var thisPathname = this.pathname.replace(/^\//, '');

        if (
            locationPathname === thisPathname
            && location.hostname === this.hostname
            && location.hash !== this.hash
        ) {
            e.preventDefault();

            console.log(e);

            hashLinks.removeClass('active');
            $(this).addClass('active');

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

    /**
     * Изменения в пунктах меню и в URL-хеше при скролле страницы.
     */
    $(window).on('scroll', function(e) {
        var shift = 10;
        var fromTop = $(this).scrollTop() + shift;
        hashSections.map(function (item) {
            var offsetTop = item.offset().top;
            if (fromTop > offsetTop) {
                console.log($(item).attr('id'), fromTop, offsetTop);

                hashLinks.removeClass('active');
                hashLinks.filter(function (subItem) {
                    if (subItem.href === '#' + item.id) {
                        console.log('###', subItem);
                        return subItem;
                    }
                }).addClass('active');
            }
        });
    });

    /**
     * Закрытие меню после клика на пункт (в мобильном режиме).
     */
    hashLinks.click(function() {
        // $('.navbar-collapse').hide('slow');
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
     * Загрузка данных в раздел "Статьи".
     */
    $.getJSON( 'data/articles.json')

        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log('Request Failed: ' + err);
        })

        .done(function(json) {
            var container = $('#articles-container');
            var template = $('#articles-item');
            var html = '';

            for (i = 0; i < json.length; ++i) {
                var elem = json[i];
                if (elem.text) {
                    var item = template.html()
                        .replace(/{{ text }}/g, elem.text)
                    ;
                    var tag1 = (elem.div) ? '<li class="div">' : '<li>';
                    var tag2 = '</li>';
                    html += tag1 + item + tag2;
                }
            }

            container.html(html);
        })

    ;

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

                /**
                 * Формируем параграфы.
                 * @type {string}
                 */
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

                /**
                 * Формируем изображения.
                 */

                var images = '';

                if (
                    elem.images.length > 0
                    && elem.images.join('').length > 0
                ) {
                    for (j = 0; j < elem.images.length; ++j) {
                        images += '<img src="/images/sections/bibliography/' + elem.images[j] + '" class="rounded" alt="' + elem.name + '">';
                    }
                }

                var item = template.html()
                    .replace(/{{ id }}/g, i + 1)
                    .replace(/{{ name }}/g, elem.name)
                    .replace(/{{ authors }}/g, elem.authors)
                    .replace(/{{ description }}/g, elem.description)
                    .replace(/{{ paragraphs }}/g, paragraphs)
                    .replace(/{{ images }}/g, images)
                    .replace(/( \d{4} г.)/g, '<strong>$1</strong>')
                ;

                html += item;

            }

            container.html(html);

        })

    ;

    /**
     * Загрузка данных в раздел "Фото".
     */
    $.getJSON( 'data/photo.json')

        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log('Request Failed: ' + err);
        })

        .done(function(json) {
            var container = $('#photo-container');
            var template = $('#photo-item');
            var html = '';

            for (i = 0; i < json.length; ++i) {
                var elem = json[i];
                var item = template.html()
                    .replace(/{{ name }}/g, elem.name)
                    .replace(/{{ alt }}/g, elem.alt)
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

                console.log(elem);

                var paragraphs = '';

                if (
                    elem.paragraphs.length > 0
                    && elem.paragraphs.join('').length > 0
                ) {
                    paragraphs = '<details><summary>Описание ...</summary>';
                    for (j = 0; j < elem.paragraphs.length; ++j) {
                        paragraphs += '<p>' + elem.paragraphs[j] + '</p>';
                    }
                    paragraphs += '</details>';
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
