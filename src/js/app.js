$('a i').siblings('span').hover(
    function() {
        console.log('test');
        $(this).removeClass('badge-secondary').addClass('badge-info text-white');
    },
    function() {
        $(this).removeClass('badge-info text-white').addClass('badge-secondary');
    }
);