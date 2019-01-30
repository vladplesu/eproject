/* eslint-disable no-undef */
const $searchResultsSmall = $('#search-sm'),
      $searchResultsLarge = $('#search-md'),
      $searchFieldSmall   = $('#search-input-sm'),
      $searchFieldLarge   = $('#search-input-md'),
      $carouselActions    = $('[id^="carousel-actions"]'),
      $productActions     = $('[id^="product-actions"]'),
      $productCards       = $('.card'),
      $blogNews           = $('[id^="blog-news"]'),
      $twitterPosts       = $('[id^="post"]'),
      $flickers           = $('#flicker-widget').children('div').children('a'),
      $socialMedia        = $('#social-media').children('a'),
      $newsletterForm     = $('#newsletter').parent('div').parent('form'),
      $loginForm          = $('#email').parent('div').parent('form'),
      $listSwitch         = $( "#list" ),
      $gridSwitch          = $( "#grid" );

// Default layout depending on screen width
if ( $( window ).width() < 768 ) {
    switchLayout();
    $productCards.off( "mouseenter mouseleave" );
    $productActions.css( "display", "" );
}

// Switch products layout to a list layout
$listSwitch.on( "click", function() {
    if ( !$productCards.hasClass( "card-custom" ) ) {
        switchLayout();
        $( "[id^='products']" )
            .children( "div:nth-child(n+2)" )
            .children( "div:last-child" )
            .removeClass( "mr-md-3" );
        $productCards.off( "mouseenter mouseleave" );
        $productActions.css( "display", "" );
    }
} );

// Switch product layout to a grid layout
$gridSwitch.on( "click", function() {
    if ( $productCards.hasClass( "card-custom" ) ) {
        switchLayout();
        showActionBtns();
    }
} );

// Add hover effect for cart and wishlist buttons
$( ".navbar a" ).hover(
    function() {
        $( this ).find( "span" ).toggleClass( [ "badge-secondary", "badge-info text-white" ] );
    },
    function() {
        $( this ).find( "span" ).toggleClass( [ "badge-info text-white", "badge-secondary" ] );
    }
    );

// Add hover effect for carousel action buttons
setHover( $carouselActions.find( "a" ) );

// Add hover effect for product action buttons
setHover( $productActions.find( "a" ) );

// Add hover effect for social media buttons
setHover( $socialMedia );

// Add sliding effect for product buttons on card hover
showActionBtns();
function showActionBtns() {
    if ( $( window ).width() >= 768 ) {
        $productActions.hide();
        $productCards
        .on( "mouseenter", function() {
                $( this ).find( "[id^='product-actions']" ).show( "slow" );
} )
                .on( "mouseleave", function() {
                    $( this ).find( "[id^='product-actions']" ).slideUp( "slow" );
            } );
        }
    }

// get search result from json file on keyup event for medium and large devices
setSearchItems( $searchFieldLarge, $searchResultsLarge,  " bg-secondary text-light rounded-0" );

// get search result from json file on keyup event for small devices
setSearchItems( $searchFieldSmall, $searchResultsSmall );

// update blog news
updateNews();
setInterval( updateNews, 5000 );

function updateNews() {
    $.getJSON('./data/news.json', function(data) {
        let first = getRandom(5);
        let second = first < data.length - 1 ? first + 1 : 0;
        let arr = [ first, second ];
        $.each( $blogNews, function( i, val ) {
            $( val ).html( "" ).append(
                "<div class='bg-info text-white py-2 px-3 text-center'>" +
                    "<p class='h11 font-weight-bold m-0 text-uppercase'>" +
                        data[ arr[ i ] ].month +
                    "</p>" +
                    "<p class='h9 font-weight-bold m-0'>" +
                        data[ arr[ i ] ].day +
                    "</p>" +
                "</div>" +
                "<div class='col'>" +
                    "<h4 class='h8 font-weight-bold mb-0'>" +
                        data[ arr[ i ] ].newsTitle +
                    "</h4>" +
                    "<p class='h10'>" + data[ arr[ i ] ].content + "</p>" +
                "</div>" );
            } );
    } );
}

// update twitter posts
updatePosts();
setInterval( updatePosts, 5000 );

function updatePosts() {
    $.getJSON('./data/posts.json', function(data) {
        let first = getRandom(5);
        let second = first < data.length - 1 ? first + 1 : 0;
        let arr = [ first, second ];
        $.each( $twitterPosts, function( i, val ) {
            $( val ).html( "" ).append(
                "<p class='mb-0'>" +
                    "<a href='#' class='text-info'>@" +
                        data[ arr[ i ] ].user + " </a>" + data[ arr[ i ] ].post +
                    "<a href='#' class='text-info'>" +
                        ( data[ arr[ i ] ].shoutouts.length === 0 ? "" : " @" +
                            data[ arr[ i ] ].shoutouts ) +
                "</a></p><span><small><em>" +
                getDays( data[ arr[ i ] ].date ) + " days ago</em></small></span>"
            );
        } );
    } );
}

// open flicker images
$flickers.on( "click", function( e ) {
    e.preventDefault();
    let src = $( this ).children( "img" ).attr( "src" );
    let alt = $( this ).children( "img" ).attr( "alt" );
    let img = $( "#flicker" ).find( ".modal-body" ).children( "img" );
    img.attr( "src", src ).attr( "alt", alt );
    $( "#flicker" ).modal( "show" );
} );

// newsletter form validation
$('.modal-footer').find('[type="submit"]').on('click', function(event){
    if ($loginForm[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    $loginForm.addClass('was-validated');
});

// newsletter form validation
$('#newsletter').keyup(function() {
    if ($newsletterForm[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    $newsletterForm.addClass('was-validated');
})
$newsletterForm.find('[type="submit"]').on('click', function(event){
    if ($newsletterForm[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    $newsletterForm.addClass('was-validated');
});

// helper functions
function getRandom( max ) {
    return Math.floor( Math.random() * Math.floor( max ) );
}

function getDays( date ) {
    let today = Date.now();
    return Math.round( ( today - Date.parse( date ) ) / ( 1000 * 60 * 60 * 24 ) );
}

function setHover( $elem ) {
    $elem.hover(
        function() {

            //$(this).removeClass('text-secondary').addClass('text-info');
            $( this ).toggleClass( [ "text-secondary", "text-info" ] );
        },
        function() {

            //$(this).removeClass('text-info').addClass('text-secondary');
            $( this ).toggleClass( [ "text-secondary", "text-info" ] );
        }
        );
}

function setSearchItems( $searchField, $searchResults, itemsClass = "" ) {
    $searchField.keyup( function() {
        $searchResults.html( "" ).show();
        let searchVal = $searchField.val();
        let expression = new RegExp(searchVal, 'i');
        $.getJSON('./data/data.json', function (data) {
            $.each(data, function (key, value) {
                if (value.result.search(expression) !== -1) {
                    $searchResults.append('<a href="#" class="list-group-item list-group-item-action border-0' + itemsClass + '">' + value.result + '</a>');
                    $searchResults.find('a').click(function (e) {
                        $searchField.val(e.target.textContent);
                        $searchResults.slideUp('slow');
                    });
                }
            } );
        } );
    } );
}

function switchLayout() {
    let cardClasses = [ "card-custom", "col-md", "mr-md-3" ];
    let cardBodyClasses = [
        "card-body-custom",
        "pl-3",
        "border-top",
        "mx-0",
        "py-0",
        "d-flex",
        "flex-column",
        "justify-content-center" ];
    let spanClasses = [ "p-1", "rounded", "px-2", "position-absolute", "nowrap" ];
    $( "[id^='products']" ).children( "div:nth-child(n+2)" ).toggleClass( "flex-column" );
    $productCards.toggleClass( cardClasses );
    $productCards.children( "img" ).toggleClass( "card-img-top" );
    $productCards.children( "div" ).toggleClass( cardBodyClasses );
    $productCards
        .children( "div" )
        .children( "span" )
        .not( ".out-of-stock" )
        .toggleClass( [ ...spanClasses, "py-4" ] );
    $productCards
        .children( "div" )
        .children( "span" )
        .filter( ".out-of-stock" )
        .toggleClass( [ ...spanClasses, "py-3" ] );
    $productCards.children( "div" ).children( "p" ).toggleClass( "d-md-block" );
}
