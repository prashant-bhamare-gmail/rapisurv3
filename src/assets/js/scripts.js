/* Template: Tivo - SaaS App HTML Landing Page Template
   Author: Inovatik
   Created: Sep 2019
   Description: Custom JS file
*/

(function ($) {
  'use strict';

  /* Preloader */
  $(window).on('load', function () {
    var preloaderFadeOutTime = 500;
    function hidePreloader() {
      var preloader = $('.spinner-wrapper');
      setTimeout(function () {
        preloader.fadeOut(preloaderFadeOutTime);
      }, 500);
    }
    hidePreloader();
  });

  /* Sign Up Form */
  $('#signUpForm')
    .validator()
    .on('submit', function (event) {
      if (event.isDefaultPrevented()) {
        // handle the invalid form...
        sformError();
        ssubmitMSG(false, 'Please fill all fields!');
      } else {
        // everything looks good!
        event.preventDefault();
        ssubmitForm();
      }
    });

  function ssubmitForm() {
    // initiate variables with form content
    var email = $('#semail').val();
    var name = $('#sname').val();
    var password = $('#spassword').val();
    var terms = $('#sterms').val();

    $.ajax({
      type: 'POST',
      url: 'php/signupform-process.php',
      data:
        'email=' +
        email +
        '&name=' +
        name +
        '&password=' +
        password +
        '&terms=' +
        terms,
      success: function (text) {
        if (text == 'success') {
          sformSuccess();
        } else {
          sformError();
          ssubmitMSG(false, text);
        }
      },
    });
  }

  function sformSuccess() {
    $('#signUpForm')[0].reset();
    ssubmitMSG(true, 'Sign Up Submitted!');
    $('input').removeClass('notEmpty'); // resets the field label after submission
  }

  function sformError() {
    $('#signUpForm')
      .removeClass()
      .addClass('shake animated')
      .one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function () {
          $(this).removeClass();
        }
      );
  }

  function ssubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = 'h3 text-center tada animated';
    } else {
      var msgClasses = 'h3 text-center';
    }
    $('#smsgSubmit').removeClass().addClass(msgClasses).text(msg);
  }

  /* Log In Form */
  $('#logInForm')
    .validator()
    .on('submit', function (event) {
      if (event.isDefaultPrevented()) {
        // handle the invalid form...
        lformError();
        lsubmitMSG(false, 'Please fill all fields!');
      } else {
        // everything looks good!
        event.preventDefault();
        lsubmitForm();
      }
    });

  function lsubmitForm() {
    // initiate variables with form content
    var email = $('#lemail').val();
    var password = $('#lpassword').val();

    $.ajax({
      type: 'POST',
      url: 'php/loginform-process.php',
      data: 'email=' + email + '&password=' + password,
      success: function (text) {
        if (text == 'success') {
          lformSuccess();
        } else {
          lformError();
          lsubmitMSG(false, text);
        }
      },
    });
  }

  function lformSuccess() {
    $('#logInForm')[0].reset();
    lsubmitMSG(true, 'Log In Submitted!');
    $('input').removeClass('notEmpty'); // resets the field label after submission
  }

  function lformError() {
    $('#logInForm')
      .removeClass()
      .addClass('shake animated')
      .one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function () {
          $(this).removeClass();
        }
      );
  }

  function lsubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = 'h3 text-center tada animated';
    } else {
      var msgClasses = 'h3 text-center';
    }
    $('#lmsgSubmit').removeClass().addClass(msgClasses).text(msg);
  }

  /* Newsletter Form */
  $('#newsletterForm')
    .validator()
    .on('submit', function (event) {
      if (event.isDefaultPrevented()) {
        // handle the invalid form...
        nformError();
        nsubmitMSG(false, 'Please fill all fields!');
      } else {
        // everything looks good!
        event.preventDefault();
        nsubmitForm();
      }
    });

  function nsubmitForm() {
    // initiate variables with form content
    var email = $('#nemail').val();
    var terms = $('#nterms').val();
    $.ajax({
      type: 'POST',
      url: 'php/newsletterform-process.php',
      data: 'email=' + email + '&terms=' + terms,
      success: function (text) {
        if (text == 'success') {
          nformSuccess();
        } else {
          nformError();
          nsubmitMSG(false, text);
        }
      },
    });
  }

  function nformSuccess() {
    $('#newsletterForm')[0].reset();
    nsubmitMSG(true, 'Subscribed!');
    $('input').removeClass('notEmpty'); // resets the field label after submission
  }

  function nformError() {
    $('#newsletterForm')
      .removeClass()
      .addClass('shake animated')
      .one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function () {
          $(this).removeClass();
        }
      );
  }

  function nsubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = 'h3 text-center tada animated';
    } else {
      var msgClasses = 'h3 text-center';
    }
    $('#nmsgSubmit').removeClass().addClass(msgClasses).text(msg);
  }

  /* Privacy Form */
  $('#privacyForm')
    .validator()
    .on('submit', function (event) {
      if (event.isDefaultPrevented()) {
        // handle the invalid form...
        pformError();
        psubmitMSG(false, 'Please fill all fields!');
      } else {
        // everything looks good!
        event.preventDefault();
        psubmitForm();
      }
    });

  function psubmitForm() {
    // initiate variables with form content
    var name = $('#pname').val();
    var email = $('#pemail').val();
    var select = $('#pselect').val();
    var terms = $('#pterms').val();

    $.ajax({
      type: 'POST',
      url: 'php/privacyform-process.php',
      data:
        'name=' +
        name +
        '&email=' +
        email +
        '&select=' +
        select +
        '&terms=' +
        terms,
      success: function (text) {
        if (text == 'success') {
          pformSuccess();
        } else {
          pformError();
          psubmitMSG(false, text);
        }
      },
    });
  }

  function pformSuccess() {
    $('#privacyForm')[0].reset();
    psubmitMSG(true, 'Request Submitted!');
    $('input').removeClass('notEmpty'); // resets the field label after submission
  }

  function pformError() {
    $('#privacyForm')
      .removeClass()
      .addClass('shake animated')
      .one(
        'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function () {
          $(this).removeClass();
        }
      );
  }

  function psubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = 'h3 text-center tada animated';
    } else {
      var msgClasses = 'h3 text-center';
    }
    $('#pmsgSubmit').removeClass().addClass(msgClasses).text(msg);
  }
})(jQuery);
