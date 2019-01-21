const $searchResultsSmall = $('#search-sm');
const $searchResultsLarge = $('#search-md');
const $searchFieldSmall = $('#search-input-sm');
const $searchFieldLarge = $('#search-input-md');

$('.navbar a').hover(
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
$searchResultsSmall.hide();
$searchResultsLarge.hide();
$searchFieldSmall.focusout(function() {
    $searchResultsSmall.slideUp('slow');
})
$searchFieldLarge.focusout(function () {
    $searchResultsLarge.slideUp('slow');
})
// show search suggestio on click
$searchFieldSmall.on('click', function() {
    $searchResultsSmall.slideDown('slow');
});
$searchFieldLarge.on('click', function () {
    $searchResultsLarge.html('');
    $searchResultsLarge.slideDown('slow');
});
// get value of searchResults into searchField
$($searchResultsSmall).find('a').click(function(e) {
    $searchFieldSmall.val(e.target.textContent);
});


$($searchFieldLarge).keyup(function () {
    $searchResultsLarge.html('');
    let searchVal = $searchFieldLarge.val();
    let expression = new RegExp(searchVal, 'i');
    $.getJSON('../../public/data.json', function (data) {
        $.each(data, function (key, value) {
            if (value.result.search(expression) !== -1) {
                $searchResultsLarge.append('<a href="#" class="list-group-item list-group-item-action border-0 bg-secondary text-light rounded-0">' + value.result + '</a>');
                $searchResultsLarge.find('a').click(function (e) {
                    $searchFieldLarge.val(e.target.textContent);
                });
            }
        })
    })
})
