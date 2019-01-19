const $searchResults = $('#search-sm');
const $searchField = $('input[type="search"]');
const imgPaths = [
    '../../../public/img/carousel/pink_shoes_top_05.jpg',
    '../../../public/img/carousel/white_shoes.jpg',
    '../../../public/img/carousel/kids_shoes.jpg'
]
const $carouselItems = $('.carousel-item');

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
        $(this).children('.card-body #productBtns').show();
    },
    function() {
    }
);

// hide search suggestions
$searchResults.hide();
$searchField.focusout(function() {
    $searchResults.slideUp('slow');
})
// show search suggestio on click
$searchField.on('click', function() {
    $searchResults.slideDown('slow');
});
// get value of searchResults into searchField
$($searchResults).find('a').click(function(e) {
    $searchField.val(e.target.textContent);
})

// carousel items background img for small devices
if ($(window).width() < 768) {
    jQuery.each($carouselItems, function(i, $carouselItem) {
        $(this).css('background', 'url(' + imgPaths[i] + ')')
               .css('background-size', 'cover');
    })
} else {
    jQuery.each($carouselItems, function(i, $carouselItem) {
        $(this).css('background', 'initial');
    })
}
