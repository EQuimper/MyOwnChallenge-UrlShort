/* eslint-disable */

$(function() {
  $('#btn-short').bind('click.shorten', shorten);
});

const shorten = () => {
  $.ajax({
    url: '/api/v1/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: { longUrl: $('#url-to-short').val() },
    success: data => {
      successClick(data);
      resetAppear();
    },
    error: err => {
      errorAppear(err);
      resetAppear();
    }
  });
};

const errorAppear = err => {
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
    'data-original-title': 'Copy to clipboard',
    'data-clipboard-target': '#url-to-short',
    'data-toggle': 'tooltip',
  });
  $('#btn-short').tooltip();
}

const resetClick = () => {
  $('#reset-link').empty();
  $('#btn-short').bind('click.shorten', shorten);
  $('input[name=url]').val('');
  $('input[name=url]').prop('readOnly', null);
  $('#btn-short').html('Short Need');
  $('#btn-short').removeClass('btn-success btn-danger');
  // remove add attributes
  $('#btn-short').removeAttr('data-toggle title');
  $('#btn-short').attr({
    'data-placement': null,
    'data-original-title': null,
    'disabled': null,
    'data-clipboard-target': null
  });
  $('input[name=url]').parent().removeClass('has-error has-success');
  $('.github-link').css('margin-top', '');
};

const resetAppear = () => {
  const resetHTML = '<button class="btn btn-danger btn-lg" id="reset-btn">Reset</button>';
  $('.github-link').css('margin-top', '3%');
  $('#reset-link').html(resetHTML)
  $('#reset-link').hide().fadeIn('slow');
  $('#reset-btn').click(resetClick);
}
