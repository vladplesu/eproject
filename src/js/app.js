$('a').hover(
    function() {
        $(this).find('span').removeClass('badge-secondary').addClass('badge-info text-white');
    },
    function() {
        $(this).find('span').removeClass('badge-info text-white').addClass('badge-secondary');
    }
);

$('.card').hover(
    function() {
        console.log('test');
        $(this).children('.card-body #productBtns').show();
    },
    function() {
        console.log('end');
    }
);