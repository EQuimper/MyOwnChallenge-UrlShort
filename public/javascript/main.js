/* eslint-disable */

$('#btn-short').on('click', function() {
  $.ajax({
    url: '/api/v1/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: { longUrl: $('#url-to-short').val() },
    success: function(data) {
        const resultHTML = '<a class="result" href="' + data.url.shortUrl + '">'
            + 'http://shneed.com/' + data.url.shortUrl + '</a>';
        $('#link').html(resultHTML);
        $('#link').hide().fadeIn('slow');
    }
  });
});
