function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function eraseCookie(name, path) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}


document.addEventListener('DOMContentLoaded', () => {

    $(document).on('click', '.SENDVICH_PANELI .show_more', function (e) {
        $('.SENDVICH_PANELI').toggleClass('show_all');
        if ($('.SENDVICH_PANELI').hasClass('show_all')) {
            $(this).html('Скрыть');
        } else {
            $(this).html('Показать еще');
        }
    })

    $(document).on('click', '.SKETCH_list .show_more', function (e) {
        $('.SKETCH_list').toggleClass('show_all');
        if ($('.SKETCH_list').hasClass('show_all')) {
            $(this).html('Скрыть');
        } else {
            $(this).html('Показать еще');
        }
    })

    $('.product-item__link').click(function (event) {
        console.log('delete cookie on' + event.target.pathname);
        eraseCookie(`color_panel`, `${event.target.pathname}`);
    });

    // Создать страницу подборки цвета / task-94803
    //При переходе со страницы цвета в любую карточку товара создаем куки с цветом в данной карточке товара
    $('*[data-color^="ral"]').click(function (event) {
        let color = $(this).attr('data-color');

        if (event.target.classList.contains('product-item__link')) {
            setCookie('color_panel', color, { path: `${event.target.pathname}` });
        }
    })

    //смена цветов в карточке товара и в листинге, запоминание куки с цветом
    $(".product-item-scu-item-color, .color-item .jsDivSelectingColor").click(function () {

        eraseCookie(`color_panel`, `${document.location.pathname}`);

        let _class;

        $(".product-item-detail-info-container .product-item-scu-item-color").closest('.product-item-scu-item-color-container').removeClass('active');
        $(this).closest('.product-item-scu-item-color-container').addClass('active');

        _class = $(this).attr('class');
        console.log(_class, $('.product-item-detail-slider-image .st0'));

        //st0
        $('.product-item-detail-slider-image .st0')
        .removeClass() // Удаляем все классы
        .addClass('st0 ' + _class); // Добавляем классы st0 и новые классы

        $('.product-item-image .st0').attr({ class: 'st0' }).addClass(_class);

        //st10
        $('.product-item-detail-slider-image .st10').attr({ class: 'st10' }).addClass(_class);
        $('.product-item-image .st10').attr({ class: 'st10' }).addClass(_class);

        _class = _class.replace('product-item-scu-item-color ', '');

        setCookie('color_panel', _class);

    });


    //смена цветов на странице Цвета
    $(".product-item-scu-container .color-item div[data-color]").click(function () {

        let _class;

        $('.product-item-scu-container .color-item').removeClass('active');
        $(this).closest('.color-item').addClass('active');

        _class = $(this).attr('class');
        console.log(_class);

        //st0
        $('.product-item-detail-slider-image .st0').attr({ class: 'st0' }).addClass(_class);
        $('.product-item-image .st0').attr({ class: 'st0' }).addClass(_class);

        //st10
        $('.product-item-detail-slider-image .st10').attr({ class: 'st10' }).addClass(_class);
        $('.product-item-image .st10').attr({ class: 'st10' }).addClass(_class);

    });
});