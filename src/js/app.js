const $searchResults = $('#search-sm');
const $searchField = $('input[type="search"]');

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


