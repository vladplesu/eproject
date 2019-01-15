$('a').hover(
    function() {
        $(this).find('span').removeClass('badge-secondary').addClass('badge-info text-white');
    },
    function() {
        $(this).find('span').removeClass('badge-info text-white').addClass('badge-secondary');
    }
);