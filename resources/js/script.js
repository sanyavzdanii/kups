import 'slick-carousel';

const $lineTab = $('.tab-component__tab');
const $buttonMore = $('.lines .opti-btn-3--dark-green');
const $mainProductSlider = $('.main-product-slider');
const $mainNavProductSlider = $('.product-nav-slider');
const $productGallery = $('.product-gallery');
const $cityBtn = $('#mirs-city-input');
const $cityList = $('.search-city__list');
const $cityItem = $('.search-city__list-item');
const $noResultItem = $('.search-city-no-result');
const $body = $('body');
const hideClass = 'd-none';
const hideMdClass = 'd-md-none';
const openClass = 'open';
const overflowClass = 'overflow-hidden';
const openGalleryClass = 'open-gallery';
const selectedClass = 'selected';
const slickIndexAttr = 'data-slick-index';
const initialSlideIndex = $mainProductSlider.attr('data-has-video') === 'true' ? 1 : 0;
const focusClass = 'focus';
const hideMinusClass = 'hide-minus';
const hidePlusClass = 'hide-plus';

// changing productSlider after hover on navProductSLider. Only desktop
$(document).on('mouseenter', '.product-nav-slider .slick-slide', function() {
    if($(window).width() >= 1200) {
        $mainProductSlider.slick('slickGoTo', $(this).attr(slickIndexAttr));
    }
})

// if tablet/mobile -> init meatSlider else unslick meatSlider
$(window).on('load resize', function() {
    if ($(window).width() <= 1199) {
        $('.meat__slider').not('.slick-initialized').slick({
            speed: 300,
            slidesToShow: 1,
            infinite: false,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        arrows: true,
                        dots: true,
                    }
                }
            ]
        });
    } else {
        $('.meat__slider.slick-initialized').slick('unslick');
    }
});

$('.bkt-tabs__item-mobile-toggle').on('click', function() {
    $(this).closest('.bkt-tabs__item').toggleClass(openClass);
});

$lineTab.on('click', function() {
    const activeClass = 'active';

    $lineTab.removeClass(activeClass);
    $(this).addClass(activeClass)
        .closest('section.tab-component:not(.bkt-tabs)')
        .find('.tab-component__inner')
        .addClass(hideClass)
        .eq($(this).index())
        .removeClass(hideClass);
    $(this).closest('section.bkt-tabs.tab-component')
        .find('.tab-component__inner')
        .addClass(hideMdClass)
        .eq($(this).index())
        .removeClass(hideMdClass);
});

$mainNavProductSlider.on('init', function(event, slick){
    if (slick.options.initialSlide > 0) {
        $mainNavProductSlider.find('.slick-track').addClass('notransform');
    }

    if (slick.slideCount <= 4) {
        $mainNavProductSlider.find('.slick-slide').addClass('static-width');
    }
}).on('afterChange', function (event, slick, currentSlide, nextSlide) {
    if (slick.slideCount > 4) {
        $mainNavProductSlider.find('.slick-track').removeClass('notransform');
    }
});

$(document).ready(() => {
    // init all slickSliders
    slickInit();

    // showMore lines btn - mainPage
    $buttonMore.on('click', function() {
         $(this).addClass(hideClass)
             .closest('section.lines .lines__inner')
             .eq($(this).index())
             .find('.lines__inner-item.d-none')
             .removeClass(hideClass);
    });

    // animate scroll to block with id
    $('.why-block__item, .mirs-product-rating').on('click', function() {
        const offset = window.innerWidth > 768 ? 20 : -20;

        window.scrollTo({top: ($($(this).attr('data-anchor')).offset().top - offset), behavior: 'smooth'});
    });

    // show/hide seo text on mainPage. Block - ХАРЧУВАННЯ OPTIMEAL
    $('.toggle-text-btn').on('click', function () {
        const $text = $(this).find('span');

        $('#seo-block').toggleClass('show-text');
        $text.text($text.text() === $text.attr('data-show-text') ? $text.attr('data-hide-text') : $text.attr('data-show-text'));
    });

    // hide text in feedbackSlider on mainPage, if his height > 65px
    $('.feedback-toggle-text').each(function () {
        const $this = $(this);

        if($this.height() > 65) {
            $this.parents('.feedback-slider__item').addClass('hidden-text')
        }
    });

    // show text in feedbackSlider on mainPage
    $('.feedback-toggle-btn').on('click', function () {
        $(this).parents('.feedback-slider__item').removeClass('hidden-text')
    });

    // show deliveryModal && hide main scrollBar
    $(document).on('click', '.mirs-product-delivery', () => {
        $body.addClass(overflowClass);
        $('#select-delivery-city').addClass(openClass);
    });
    // hide deliveryModal && show main scrollBar
    $(document).on('click', '.select-city-modal__close', () => {
        $body.removeClass(overflowClass);
        $('#select-delivery-city').removeClass(openClass);
    });

    // select delivery city in modal
    $(document).on('click', '.select-city-modal__fast-select div, .search-city__list-item', function () {
        const $this = $(this);
        const cityName = $this.attr('data-city');

        $('.select-city-modal__fast-select div').removeClass(selectedClass);
        $this.addClass(selectedClass);
        $('#mirs-city-input').val(cityName);
    });

    // global select delivery city (in modal && on page)
    $(document).on('click', '#select-city', function () {
        const cityName = $('.selected').attr('data-city');

        $('.mirs-delivery-city').html(cityName);
        $body.removeClass(overflowClass);
        $('#select-delivery-city').removeClass(openClass);
    });

    $(document).on('click', '#select-delivery-city', function (e) {
        const $this = $(this);
        const $selectModal = $('.select-city-modal');

        if(!$selectModal.is(e.target) && $selectModal.has(e.target).length === 0 && $this.hasClass(openClass)) {
            $this.removeClass(openClass);
            $body.removeClass(overflowClass);
        }
    });

    // search city input on focus
    $(document).on('focus', '#mirs-city-input', function () {
        $cityBtn.val('');
        $cityItem.show();
        $cityList.show();
    });

    // hide cityList on click outside
    $(document).on('click', function (e) {
        if((!$cityBtn.is(e.target) && $cityBtn.has(e.target).length === 0) && $('#select-delivery-city').hasClass(openClass)) {
            $cityList.hide();
        }
    });

    // search city logic on keyUp
    $cityBtn.keyup(function(){
        const $cityBtnVal = $(this).val().toUpperCase();

        if ($cityItem.text().toUpperCase().includes($cityBtnVal)) {
            $noResultItem.addClass(hideClass);
            $cityItem.hide();

            $cityItem.each(function () {
                const $this = $(this);

                $this.text().toUpperCase().includes($cityBtnVal) && $this.show();
            })
        } else if($cityBtnVal.length === 0) {
            $noResultItem.addClass(hideClass);
            $cityItem.show()
        }  else {
            $cityItem.hide();
            $noResultItem.removeClass(hideClass);
        }
    });
});

// open the gallery by clicking on the slide, the active slide corresponds to the one that was clicked
$(document).on('click', '.main-product-slider .slick-slide', function () {
    if($(window).width() >= 768) {
        $body.addClass(overflowClass);
        $productGallery.addClass(openGalleryClass);

        $mainProductSlider.slick('setPosition');
        $mainNavProductSlider.slick('setPosition');
        $mainProductSlider.slick('slickGoTo', $(this).attr(slickIndexAttr));
    }
});

// close gallery
$(document).on('click', '.close-gallery', function () {
    $body.removeClass(overflowClass);
    $productGallery.removeClass(openGalleryClass);
});

$(document).on('click', '.mirs-minus', function () {
    const $input = $(this).parent().find('.mirs-counter-input');
    let count = parseInt($input.val()) - 1;

    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();

    return false;
});

$(document).on('click', '.mirs-plus', function () {
    const $input = $(this).parent().find('.mirs-counter-input');
    let count = parseInt($input.val()) + 1;

    count = count > 99 ? 99 : count;
    $input.val(count);
    $input.change();

    return false;
});

$(document).on('change', '.mirs-counter-input', function () {
    const $input = $(this);

    if(parseInt($input.val()) === 1) {
        $input.parents('.mirs-product-counter').addClass(hideMinusClass);
        $input.parents('.mirs-product-counter').removeClass(hidePlusClass);
    } else if(parseInt($input.val()) === 99) {
        $input.parents('.mirs-product-counter').addClass(hidePlusClass);
        $input.parents('.mirs-product-counter').removeClass(hideMinusClass);
    } else {
        $input.parents('.mirs-product-counter').removeClass(hideMinusClass);
        $input.parents('.mirs-product-counter').removeClass(hidePlusClass);
    }
});

$(document).on('focus', '.mirs-counter-input', function () {
    const $this = $(this);

    $this.parents('.mirs-product-counter__input').addClass(focusClass);
});

$(document).on('blur', '.mirs-counter-input', function () {
    const $this = $(this);

    if(($this.val() <= 0) || (!/[0-9]/.test($this.val()))) {
        $this.val(1);
        $this.parents('.mirs-product-counter').addClass(hideMinusClass);
    }

    $this.parents('.mirs-product-counter__input').removeClass(focusClass);
});

$(document).on('input', '.mirs-counter-input', function () {
    const $this = $(this);

    if($this.val() < 0) {
        $this.val(1);
        $this.parents('.mirs-product-counter').addClass(hideMinusClass);
    } else if($this.val() > 99) {
        $this.val(99);
        $this.parents('.mirs-product-counter').addClass(hidePlusClass);
    } else {
        $this.parents('.mirs-product-counter').removeClass(hideMinusClass);
        $this.parents('.mirs-product-counter').removeClass(hidePlusClass);
    }
});

function slickInit() {
    // init mainBannerSlider on mainPage
    $('.main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 8000,
        fade: true,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        adaptiveHeight: true,
    });

    // init productSliders on mainPage && productPage (popularProduct and other)
    $('.products-list-slider').slick({
        speed: 300,
        slidesToShow: 6,
        infinite: false,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 1.10,
                    dots: false,
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    arrows: false,
                    slidesToShow: 2.63,
                    dots: false,
                }
            },
            {
                breakpoint: 1999,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 2540,
                settings: {
                    slidesToShow: 5,
                }
            }
        ]
    });

    // init vitaminySlider on mainPage && productPage
    $('.vitaminy__slider').slick({
        speed: 300,
        slidesToShow: 9,
        infinite: false,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 2.10,
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    arrows: false,
                    slidesToShow: 4.7,
                }
            },
            {
                breakpoint: 2540,
                settings: {
                    slidesToShow: 6,
                    arrows: true,
                }
            }
        ]
    });

    // init feedbackSlider on mainPage
    $('.feedback-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        infinite: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 1580,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    // init productSlider on productPage
    $mainProductSlider.not('.slick-initialized').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: initialSlideIndex,
        infinite: false,
        arrows: true,
        fade: true,
        asNavFor: '.product-nav-slider',
    });

    // init nav productSlider on productPage
    $mainNavProductSlider.not('.slick-initialized').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: false,
        initialSlide: initialSlideIndex,
        asNavFor: '.main-product-slider',
        dots: false,
        arrows: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 5
                }
            }
        ]
    });
}
