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
      successClick(data);
      resetAppear();
    },
    error: function(err) {
      errorAppear(err);
      resetAppear();
    }
  });
};

const errorAppear = function(err) {
  $('input[name=url]').parent().addClass('has-error');
  $('input[name=url]').val(err.responseJSON.message);
  $('input[name=url]').prop('readOnly', true);
  $('#btn-short').prop('disabled', true);
  $('#btn-short').html('Error Happen');
  $('#btn-short').addClass('btn-danger');
}

const successClick = function(data) {
  $('input[name=url]').val(`shneed.com/${data.url.shortUrl}`);
  $('input[name=url]').prop('readOnly', true);
  $('input[name=url]').parent().addClass('has-success');
  $('#btn-short').unbind('click.shorten');
  new Clipboard('#btn-short');
  $('#btn-short').html('<i class="fa fa-clipboard" aria-hidden="true"></i>');
  $('#btn-short').addClass('btn-success');
  $('#btn-short').attr({
    'data-placement': 'right',
    'data-clipboard-target': '#url-to-short',
    'data-toggle': 'tooltip',
    'title': 'Copy to clipboard'
  });
  $('#btn-short').tooltip();
}

const resetClick = function() {
  $('#reset-link').empty();
  $('#btn-short').bind('click.shorten', shorten);
  $('input[name=url]').val('');
  $('input[name=url]').prop('readOnly', null);
  $('#btn-short').html('Short Need');
  $('#btn-short').removeClass('btn-success btn-danger');
  // cancel tooltip
  $('#btn-short').tooltip('disable');
  // remove add attributes
  $('#btn-short').attr({
    'data-toggle': null,
    'data-placement': null,
    'title': null,
    'disabled': null,
    'data-clipboard-target': null
  });
  $('input[name=url]').parent().removeClass('has-error has-success');
  $('.github-link').css('margin-top', '');
};

const resetAppear = function() {
  const resetHTML = '<button class="btn btn-danger btn-lg" id="reset-btn">Reset</button>';
  $('.github-link').css('margin-top', '3%');
  $('#reset-link').html(resetHTML)
  $('#reset-link').hide().fadeIn('slow');
  $('#reset-btn').click(resetClick);
}
