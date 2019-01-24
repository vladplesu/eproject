const $searchResultsSmall = $('#search-sm'),
      $searchResultsLarge = $('#search-md'),
      $searchFieldSmall   = $('#search-input-sm'),
      $searchFieldLarge   = $('#search-input-md'),
      $carouselActions    = $('[id^="carousel-actions"]'),
      $productActions     = $('[id^="product-actions"]'),
      $productCards       = $('.card'),
      $blogNews           = $('[id^="blog-news"]'),
      $twitterPosts       = $('[id^="post"]'),
      $flickers           = $('#flicker-widget').children('div').children('a');;

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
updateNews();
setInterval(updateNews, 5000);

function updateNews() {
    $.getJSON('../../public/news.json', function(data) {
        let first = getRandom(5);
        let second = first < data.length - 1 ? first + 1 : 0;
        $($blogNews[0]).html('').append(
            '<div class="bg-info text-white py-2 px-3 text-center">\
                <p class="h11 font-weight-bold m-0 text-uppercase">' + data[first].month + '</p>\
                <p class="h9 font-weight-bold m-0">' + data[first].day + '</p>\
            </div>\
            <div class="col">\
                <h4 class="h8 font-weight-bold mb-0">' + data[first].newsTitle + '</h4>\
                <p class="h10">' + data[first].content + '</p>\
            </div>'
        );
        $($blogNews[1]).html('').append(
            '<div class="bg-info text-white py-2 px-3 text-center">\
                <p class="h11 font-weight-bold m-0 text-uppercase">' + data[second].month + '</p>\
                <p class="h9 font-weight-bold m-0">' + data[second].day + '</p>\
            </div>\
            <div class="col">\
                <h4 class="h8 font-weight-bold mb-0">' + data[second].newsTitle + '</h4>\
                <p class="h10">' + data[second].content + '</p>\
            </div>'
        );
    });
}

// update twitter posts
updatePosts();
setInterval(updatePosts, 5000);

function updatePosts() {
    $.getJSON('../../public/posts.json', function(data) {
        let first = getRandom(5);
        let second = first < data.length - 1 ? first + 1 : 0;
        $($twitterPosts[0]).html('').append(
            '<p class="mb-0">\
                <a href="#" class="text-info">@' + data[first].user + ' </a>' + data[first].post + '<a href="#" class="text-info">' + (data[first].shoutouts.length === 0 ? '' : ' @' + data[first].shoutouts) + '</a>\
            </p>\
            <span><small><em>' + getDays(data[first].date) + ' days ago</em></small></span>'
        );
        $($twitterPosts[1]).html('').append(
            '<p class="mb-0">\
                <a href="#" class="text-info">@' + data[second].user + ' </a>' + data[second].post + '<a href="#" class="text-info">' + (data[second].shoutouts.length === 0 ? '' : ' @' + data[second].shoutouts) + '</a>\
            </p>\
            <span><small><em>' + getDays(data[second].date) + ' days ago</em></small></span>'
        );
    });
}

// open flicker images
$flickers.on('click', function(e) {
    e.preventDefault();
    let src = $(this).children('img').attr('src');
    let alt = $(this).children('img').attr('alt')
    let img = $('#flicker').find('.modal-body').children('img');
    img.attr('src', src).attr('alt', alt);
    $('#flicker').modal('show');
});

function getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getDays(date) {
    let today = Date.now();
    return Math.round((today - Date.parse(date))/(1000*60*60*24));
}