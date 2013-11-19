/*
 * jQuery Plugin : jConfirmAction
 * 
 * by Hidayat Sagita
 * http://www.webstuffshare.com
 * Licensed Under GPL version 2 license.
 *
 */
(function($){

	jQuery.fn.jConfirmAction = function (options) {
		
		// Some jConfirmAction options (limited to customize language) :
		// question : a text for your question.
		// yesAnswer : a text for Yes answer.
		// cancelAnswer : a text for Cancel/No answer.
		var theOptions = jQuery.extend ({
			question: "Are You Sure ?",
			yesAnswer: "Yes",
			cancelAnswer: "Cancel",
      onConfirm: null  // will set `this` to the initial link
		}, options);

    theOptions.question = $.isFunction(theOptions.question)
      ? theOptions.question.call()
      : theOptions.question;
    theOptions.answer = $.isFunction(theOptions.answer)
      ? theOptions.answer.call()
      : theOptions.answer;
    theOptions.cancelAnswer = $.isFunction(theOptions.cancelAnswer)
      ? theOptions.cancelAnswer.call()
      : theOptions.cancelAnswer;

		return this.each (function () {
			
			$(this).bind('click', function(e) {

				e.preventDefault();
        $link = $(this);
				thisHref	= $(this).attr('href');

				if($(this).next('.jconfirmaction-question').length <= 0)
					$(this).after('<div class="jconfirmaction-question">'+theOptions.question+'<br/> <span class="yes">'+theOptions.yesAnswer+'</span><span class="cancel">'+theOptions.cancelAnswer+'</span></div>');

				$(this).next('.jconfirmaction-question').animate({opacity: 1}, 300);

				$('.yes').bind('click', function(){
          if (!$.isFunction(theOptions.onConfirm)) {
            window.location = thisHref;
          }
          else {
            theOptions.onConfirm.call($link);
          }
        });

				$('.cancel').bind('click', function(){
					$(this).parents('.jconfirmaction-question').fadeOut(300, function() {
						$(this).remove();
					});
				});
				
			});
			
		});
	}
	
})(jQuery);