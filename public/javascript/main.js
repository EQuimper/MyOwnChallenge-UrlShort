/* eslint-disable */

$('#btn-short').on('click', function() {
  // AJAX call to /api/shorten with the URL that the user entered in the input box
  $.ajax({
    url: '/api/v1/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: { longUrl: $('#url-to-short').val() },
    success: function(data) {

        console.log(data);
        // display the shortened URL to the user that is returned by the server
        var resultHTML = '<a class="result" href="' + data.url.shortUrl + '">'
            + 'https://shortmethis.herokuapp.com/' + data.url.shortUrl + '</a>';
        $('#link').html(resultHTML);
        $('#link').hide().fadeIn('slow');
    }
  });
});
