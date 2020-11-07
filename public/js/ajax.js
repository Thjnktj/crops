(function ($) {
  var origin = window.location.origin;
  var href = window.location.href;
  $.get(origin, function () {
    var listClass = ['about', 'crops', 'news']
    for (var i = 0; i < listClass.length; i++) {
      if (href == origin + '/') {
        document.getElementById('home').className = 'nav-item active';
      }
      else if (href.split('/')[3] == listClass[i]) {
        document.getElementById(listClass[i]).className = 'nav-item active';
      }
    }
  })

  $.get(href, function () {
    var search = href.split('/');
    if (search.length > 2 && search[3].split('crops').length > 1) {
      var str = search[search.length - 1].split('?page=');
      var page = '?page=' + str[1];
      if(str.length > 1)
        document.getElementById(page).className = 'active';
      else
        document.getElementById('?page=1').className = 'active';
    }
  })
  
})(jQuery);

$(document).ready(function () {
  $('.autoplay').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  });

  $('.responsive').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
})
