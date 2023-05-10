const activeClass = 'active';
const openClass = 'open';
const showClass = 'show';
const overflowClass = 'overflow-hidden';
const $menuWrapper = $('.header__menu');
const $menuBtns = $('.header__menu-btn');
const $shadow = $('.shadow');

$(document).ready(() => {
    // toggle tablet/mobile menu
    $('.header__menu-btn').on('click', () => {
        $menuBtns.toggleClass('d-none');
        $shadow.toggleClass(showClass);
        $menuWrapper.toggleClass(openClass);
        $('body').toggleClass(overflowClass);
    });

    // close menu in outside click
    $(document).on('click', function (e) {
        const menu = $('.header__menu, .header__menu-btn');

        if (!menu.is(e.target) && menu.has(e.target).length === 0 && $menuWrapper.hasClass(openClass)) {
            $menuBtns.toggleClass('d-none');
            $shadow.toggleClass(showClass);
            $menuWrapper.removeClass(openClass);
            $('body').removeClass(overflowClass);
        }
    });

    $(window).on('resize', function() {
        if ($(window).width() > 1199 && $menuWrapper.hasClass(openClass)) {
            $menuBtns.toggleClass('d-none');
            $shadow.removeClass(showClass);
            $('body').removeClass(overflowClass);
            $menuWrapper.removeClass(openClass);
        }
    });
})