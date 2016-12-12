/* eslint-disable */

$(function() {
  $('#btn-short').bind('click.shorten', shorten);
})

const shorten = function() {
  $.ajax({
    url: '/api/v1/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: { longUrl: $('#url-to-short').val() },
    success: function(data) {
      $('input[name=url]').val(`shneed.com/${data.url.shortUrl}`);
      $('input[name=url]').prop('readOnly', true);
      $('#btn-short').unbind('click.shorten');
      $('#btn-short').html('<span class="glyphicon glyphicon-copy" aria-hidden="true"></span>');
      $('#btn-short').prop('data-toggle', 'tooltip');
      $('#btn-short').prop('data-placement', 'right');
      $('#btn-short').prop('title', 'Copy to clipboard');
      $('#btn-short').tooltip();

      const resetHTML = '<button class="btn btn-danger btn-lg" id="reset-btn">Reset</button>';

      $('#reset-link').html(resetHTML)
      $('#reset-link').hide().fadeIn('slow');

      $('#reset-btn').click(function() {
        $('#reset-link').empty();
        $('#btn-short').bind('click.shorten', shorten);
        $('input[name=url]').val('');
        $('input[name=url]').prop('readOnly', false);
        $('#btn-short').html('Short Need');
        $('#btn-short').prop('data-toggle', false);
        $('#btn-short').prop('data-placement', false);
        $('#btn-short').prop('title', false);
      });
    }
  });
};
