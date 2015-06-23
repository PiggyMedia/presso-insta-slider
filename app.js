/*
** Author: Thomas Carlsen @tcarlsen
** Company: PiggyMedia
*/

var
  i,
  user,
  image,
  getImages,
  showImage,
  images = [],
  hashtags = ['slagteriet', 'cocktailbaren', 'mojitobaren'],
  total = 2,
  count = 0;

getImages = function (hashtag, num) {
  'use strict';

  $('.image').instagram({
    hash: hashtag,
    count: num,
    clientId: 'c262a98cf071449fa6870ca48f9bb4d6'
  });
};

showImage = function (num) {
  'use strict';

  user = images[num].user.username;
  image = images[num].images.standard_resolution.url;

  $('.image').stop().animate({
    opacity: 0
  }, 500, function () {
    $(this)
      .css({
        'background-image': 'url(' + image + ')'
      })
      .animate({
        opacity: 1
      }, 500, function () {
        $('.user').text(user);
      });
  });

  setTimeout(function () {
    num += 1;

    if (num === images.length) {
      getImages();
    } else {
      showImage(num);
    }
  }, 8000);
};


$('.image').on('didLoadInstagram', function (event, response) {
  'use strict';

  event.preventDefault();

  images = images.concat(response.data);

  if (count === total) {
    images.sort(function () {
      return 0.5 - Math.random();
    });

    showImage(0);
  }

  count += 1;
});

for (i = 0; i <= total; i += 1) {
  getImages(hashtags[i], 10);
}
