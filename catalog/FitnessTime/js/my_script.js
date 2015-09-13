//Site scrolling
$('body').scrollspy({
  target: '.site-header',
  offset: 100
})

$('.my-nav a').on('click', function(event) {
  event.preventDefault();
  var hash = this.hash;

  $('html, body').animate({
    scrollTop: $(hash).offset().top - 99
  }, 700);
});

//hide .hot-tell button
$(window).on('scroll', function() {
  this.pageYOffset >= 100 ? 
    $('.site-header > .container').addClass('hot-tell-scroll') :
    $('.site-header > .container').removeClass('hot-tell-scroll')
});

//Carousel partners
$('#carousel-brand .carousel-brand-control').on('click', function(event) {
  event.preventDefault();

  var shift;
  $(this).hasClass('right') ? shift = 300 : $(this).hasClass('left') ? shift = -300 : false;
  shift += $('#carousel-brand ul').scrollLeft();

  $('#carousel-brand ul').animate({
    scrollLeft: shift
  }, 500, function() {
    $(this).scrollLeft(shift);
  });
});

//Gallery
$('#gellery').magnificPopup({
  delegate: 'a',
  type: 'image',
  gallery: {
    enabled: true,
    preload: [0,1]
  },
  zoom: {
    enabled: true,
    duration: 300
  }
});