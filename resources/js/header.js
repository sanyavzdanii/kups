const activeClass = 'active';
const openClass = 'open';
const overflowClass = 'overflow-hidden';
const $burgerAndMenu = $('.burger, .header-mobile-menu');
const $searchInput = $('.mirs-search-input');
let searchTimeOut;
let searchFocusTimeOut;

$(document).ready(() => {
    // toggle tablet/mobile menu
    $('.burger, .close-icon').on('click', () => {
        $burgerAndMenu.toggleClass(openClass);
        $('body').toggleClass(overflowClass);
    });

    // close menu in outside click
    $(document).on('click', function (e) {
        const menu = $('#header, .header-mobile-menu-inner, .header-mobile-bottom');

        if (!menu.is(e.target) && menu.has(e.target).length === 0 && $burgerAndMenu.hasClass(openClass)) {
            $burgerAndMenu.removeClass(openClass);
            $('body').removeClass(overflowClass);
        }
    });

    // toggle tab content on tabletMenu
    $('.menu-item-tab').on('click', function (e) {
        window.innerWidth >= 768 && e.preventDefault();
        const $this = $(this);

        $('.menu-item-tab').removeClass(activeClass);
        $this.addClass(activeClass);
        $('.menu-content').removeClass(activeClass);
        $(`.menu-${$this.attr('data-tab')}-content`).addClass(activeClass);
    });

    // toggle searchInput
    $('.mirs-search-btn, .close-search-icon').on('click', function () {
        $('#site-header').toggleClass('search-open');
    });

    $('.mirs-search-btn').on('click', () => {
        clearTimeout(searchFocusTimeOut);
        searchFocusTimeOut = setTimeout(() => {
            $('#search-input').focus();
        }, 100)
    })

    $('.bg-mask').on('click', () => {
        $burgerAndMenu.removeClass(openClass);
        $('header').removeClass('search-open');
    });

    // show/hide search result
    $searchInput.on('input', () => {
        clearTimeout(searchTimeOut);
        let value = $searchInput.val().trim();
        const $searchResult = $('.search-result');
        const $searchResultItem = $('.search-result-wrapper a');

        if (value.length > 2) {
            searchTimeOut = setTimeout(function () {
                // request must be here
                $searchResult.show();
                const newItemText = $searchResultItem.text().replace(value, `<span class="search-word">${value}</span>`)
                $searchResultItem.html(newItemText);
            }, 400);
        } else {
            $searchResult.hide();
        }
    });

    // go to searchResult page
    $('.search-icon, .search-result__btn').on('click', function () {
        if($searchInput.val().trim().length > 2) location.href = `/search?search=${$searchInput.val().trim()}`;
    })

    $('.footer-links__btn').on('click', () => {
        $('.footer-links').toggleClass('open-footer-menu');
    })
})