const $searchResultsSmall = $('#search-sm');
const $searchResultsLarge = $('#search-md');
const $searchFieldSmall = $('#search-input-sm');
const $searchFieldLarge = $('#search-input-md');
const $carouselActions = $('[id^="carousel-actions"]');
const $productActions = $('[id^="product-actions"]');
const $productCards = $('.card');

// Add hover effect for cart and wishlist buttons
$('.navbar a').hover(
    function() {
        $(this).find('span').removeClass('badge-secondary').addClass('badge-info text-white');
    },
    function() {
        $(this).find('span').removeClass('badge-info text-white').addClass('badge-secondary');
    }
);

// Add hover effect for carousel action buttons
$carouselActions.find('a').hover(
    function() {
        console.log("test");
        $(this).removeClass('text-secondary').addClass('text-info');
    },
    function() {
        $(this).removeClass('text-info').addClass('text-secondary');
    }
);

// Add hover effect for product action buttons
$productActions.find('a').hover(
    function() {
        $(this).removeClass('text-secondary').addClass('text-info');
    },
    function() {
        $(this).removeClass('text-info').addClass('text-secondary');
    }
);

// Add sliding effect for product buttons on card hover
$productActions.hide();
$productCards.hover(
    function() {
        $(this).find('[id^="product-actions"]').prev().hide('slow');
        $(this).find('[id^="product-actions"]').show('slow');
    },
    function() {
        $(this).find('[id^="product-actions"]').prev().show('slow');
        $(this).find('[id^="product-actions"]').hide('slow');
    }
)

// get search result from json file on keyup event for medium and large devices
$searchFieldLarge.keyup(function () {
    $searchResultsLarge.html('').show();
    let searchVal = $searchFieldLarge.val();
    let expression = new RegExp(searchVal, 'i');
    $.getJSON('../../public/data.json', function (data) {
        $.each(data, function (key, value) {
            if (value.result.search(expression) !== -1) {
                $searchResultsLarge.append('<a href="#" class="list-group-item list-group-item-action border-0 bg-secondary text-light rounded-0">' + value.result + '</a>');
                $searchResultsLarge.find('a').click(function (e) {
                    $searchFieldLarge.val(e.target.textContent);
                    $searchResultsLarge.slideUp('slow');
                });
            }
        });
    });
});

// get search result from json file on keyup event for small devices
$searchFieldSmall.keyup(function () {
    $searchResultsSmall.html('').show();
    let searchVal = $searchFieldSmall.val();
    let expression = new RegExp(searchVal, 'i');
    $.getJSON('../../public/data.json', function (data) {
        $.each(data, function (key, value) {
            if (value.result.search(expression) !== -1) {
                $searchResultsSmall.append('<a href="#" class="list-group-item list-group-item-action border-0">' + value.result + '</a>');
                $searchResultsSmall.find('a').click(function (e) {
                    $searchFieldSmall.val(e.target.textContent);
                    $searchResultsSmall.slideUp('slow');
                });
            }
        });
    });
});

// update blog news
setInterval(updateNews, 5000);

function updateNews() {
    $.getJSON('../../public/news.json', function(data) {

    })
}
