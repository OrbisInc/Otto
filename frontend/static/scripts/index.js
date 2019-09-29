/**
 * index.js
 * - All our useful JS goes here, awesome!
 */
// $(document).ready(function(){
// 			$('.owl-carousel').owlCarousel();
// 		});
// From Traditional UI:
$(document).ready(function(){



  // Side menu drop-downs
  $('.js--menu__link').click(function(){
    $(this).next().toggleClass('is--expanded');
  });

  // Hide or Show Side Nav
  $('.js--hide-side-menu').click(function(){
    $('.js--side-nav').toggleClass('is--hidden');
    $('.main--alt').toggleClass('is--fullscreen');
  });

  // Display Navigation on Mobile
  $('.js--btn-toggle-side-menu').click(function(){
    $('.navigation--mobile, .header--admin__nav-search').toggleClass('is--visible');
    $('.footer--bottom').toggleClass('is--hidden');
  });

  // Sticky Nav on Scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      $('.js--admin-header, .js--admin-nav, .js--side-nav, .js--admin-header .logo__holder.left, .js--back-to-top, .universal-search, .settings-menu, .js--resume-buttons, .js--resume-title--alt').addClass('sticky');
    } else {
      $('.js--admin-header, .js--admin-nav, .js--side-nav, .js--admin-header .logo__holder.left, .js--back-to-top, .universal-search, .settings-menu, .js--resume-buttons, .js--resume-title--alt').removeClass('sticky');
    }
  });
});

$(document).ready(function () {



  // Open or Close a menu
  $('.js--btn--pilar').click(function(){
    $(this).next().toggleClass('is--open');
    $(this).toggleClass('is--active');
    // Close any other menu that might be open:
    $('.js--btn--pilar').not(this).next().removeClass('is--open');
    if($(this).next().hasClass('is--open')){
      // Make sure the menu and buttons/links are tabbable
      $(this).next().removeAttr("tabindex");
      $(this).next().find("a, button").removeAttr("tabindex");

      // Make everything besides the menu have negative tabindex
      $('body button, body a, body input, body select').not(this).not($(this).next().find("a, button")).attr("tabindex", "-1");

    }
    else{

      $(this).next().attr("tabindex", "-1");
      $(this).next().find("a, button").attr("tabindex", "-1");

      $('.js--menu--main, .js--menu--main *').attr("tabindex", "-1");
      $('.js--btn--pilar, .js--btn-header-search, .js--btn--recent-menu, .js--btn--account-menu, .js--interaction-btn').removeAttr("tabindex");
      $('body button, body a, body input, body select').not('.js--interaction-menu *, .js--pilar--menu *, .js--header-search *').removeAttr("tabindex");
    }
  });

  // Dedicated Close: this will be generic
  $('.js--btn-close-menu').click(function(){
    $(this).parent().removeClass('is--open');
    $('.js--btn--pilar').removeClass('is--active');
    $(this).attr("tabindex", "-1");
    $(this).parent().find("a").attr("tabindex", "-1");
    // Remove tabindex from everything besides the menu have negative tabindex
    $('.js--btn--pilar, .js--btn-header-search, .js--btn--recent-menu, .js--btn--account-menu, .js--interaction-btn').removeAttr("tabindex");
    $('body button, body a, body input, body select').not('.js--interaction-menu *, .js--pilar--menu *, .js--header-search *').removeAttr("tabindex");
  });

  // Open Search in top banner:
  $('.js--btn-header-search').click(function(){
    $('.js--header-search').toggleClass('is--visible');
    $('.js--header-search input').focus();
    $('.js--header-search, .js--header-search *').removeAttr("tabindex");
    $('.js--menu-user').removeClass('is--visible');
    $('.js--menu-recent').removeClass('is--visible');

    // Make everything besides the menu have negative tabindex
    $('body button, body a, body input, body select').not('.js--header-search, .js--header-search *').attr("tabindex", "-1");
  });
  //Close Search in top banner:
  $('.js--btn-close-header-search').click(function(){
    $('.js--header-search').removeClass('is--visible');
    $('.js--header-search input').blur();
    $('.js--header-search, .js--header-search *').attr("tabindex", "-1");

    // Remove tabindex from everything besides the menu have negative tabindex
    $('body button, body a, body input, body select').not('.js--interaction-menu *, .js--pilar--menu *, .js--header-search *').removeAttr("tabindex");
  });

  // Interaction Menu Button
  $('.js--interaction-btn, .js--interaction-btn i').click(function(){
    $('.js--interaction-menu').toggleClass('is--visible');
    $('.js--interaction-menu *').removeAttr("tabindex");
    // Make everything besides the menu have negative tabindex
    $('body button, body a, body input, body select').not('.js--interaction-menu *').attr("tabindex", "-1");
  });



  $(document).click(function(event) {
    // Interaction Menu
    if(!$(event.target).closest('.js--interaction-menu, .js--interaction-btn').length) {
      if($('.js--interaction-menu').hasClass("is--visible")) {
        $('.js--interaction-menu').removeClass('is--visible');
        $('.js--interaction-menu, .js--interaction-menu *').attr("tabindex", "-1");
        // Remove the negative tabindex unless specified
        $('body button, body a, body input, body select').not('.js--pilar--menu *, .js--interaction-menu, .js--interaction-menu *, .js--mobile-nav *, .js--header-search, .js--header-search *').removeAttr("tabindex");
      }
    }
    // Drop-down Widget
    if(!$(event.target).closest('.js--drop-down__list, .js--drop-down__btn').length) {
      if($('.js--drop-down__list').hasClass("is--visible")) {
        $('.js--drop-down__list').removeClass('is--visible');
      }
      if($('.js--drop-down__list').hasClass("is--visible--top")) {
        $('.js--drop-down__list').removeClass('is--visible--top');
      }
    }
    $('.js--drop-down__list li a').click(function(){
      $(this).parent().parent().removeClass('is--visible--top is--visible');
    });

  });

  //Expand card
  $('.js--btn--expand__card').click(function(){
    $(this).parent().parent().prev().addClass('is--expanded');
  });
  //Collapse card
  $('.js--btn--close__card--fullscreen').click(function(){
    $(this).parent().removeClass('is--expanded');
  });
  // Expand Card
  $('.js--btn--expand__card').click(function(){
    $(this).toggleClass('is--expanded');
    $(this).parent().toggleClass('is--expanded');
  });
  // Generic Drop-Down
  $('.js--drop-down__btn').click(function(){
    // check if dropdown is too close to bottom of viewport
    if($(this).offset().top > ($(window).scrollTop() + $(window).height() - 200)){
      //True
      $(this).next().toggleClass('is--visible--top');
      $('.js--drop-down__btn').not(this).next().removeClass('is--visible is--visible--top');
    }
    else{
      $(this).next().toggleClass('is--visible');
      $('.js--drop-down__btn').not(this).next().removeClass('is--visible is--visible--top');
    }
  });

  // Expand a button row on small screens:
  $('.js--btn-row__btn--expand').click(function(){
    $(this).parent().toggleClass('is--expanded');
  });

  // Open/close Notificaton modal
  $('.js--btn--close--notification').click(function(){
    $(this).parent().toggleClass('is--visible');
  });

  // Open notification example
  $('.js--example-open-notification-modal').click(function(){
    $('.notification').toggleClass('is--visible');
  });

  // Close Modal
  $('.js--close--modal').click(function(){
    $(this).parents('.js--modal').removeClass('is--visible');
  });
  $('.js--modal').click(function(e){
    if (e.target !== this)
      return;
    $(this).removeClass('is--visible');
  });

  // Open example modal
  $('.js--open--modal').click(function(){
    $(this).next().toggleClass('is--visible');
  });

  // Floating Input / Label

  // Check if an input already has a value on load:
  $(function () {
    $('.js--floating-input').focusout(function () {
      var text_val = $(this).val();
      if (text_val === "") {
        $(this).prev().removeClass('has--value');
      } else {
        $(this).prev().addClass('has--value');
      }
    }).focusout();//trigger the focusout event manually
  });

  $('.js--floating-input').focus(function(){
    if($(this).val() == ''){

    }else{
      $(this).prev().removeClass('has--value');
    }
    $(this).prev().addClass('is--focused');
  });
  $('.js--floating-input').blur(function(){
    if($(this).val() == ''){
      $(this).prev().removeClass('is--focused');
    }else{
      $(this).prev().addClass('has--value');
    }
  });

  // Make the focus state of a select box still visible
  $('.select').focus(function(){
    $(this).parent().addClass('is--focused');
  });
  $('.select').blur(function(){
    $(this).parent().removeClass('is--focused');
  });

  // Range Slider Value
  var rangeSlider = function(){
    var slider = $('.input--range'),
      range = $('.input--range input'),
      value = $('.input--range__value');

    slider.each(function(){
      value.each(function(){
        var value = $(this).prev().attr('value');
        $(this).html(value);
      });
      range.on('input', function(){
        $(this).next(value).html(this.value);
      });
    });
  };
  rangeSlider();

  // Date Picker
  // $('#datePicker').datetimepicker({
  //   timepicker:false,
  //   mask:true,
  // });

  // Keyword/Tag Select:
  // $('#tokenize').tokenize({
  //   autosize : "True"
  // });
});


//   slider like-effect
var currentIndex = 0,
  items = $('.card--stat__data .card--stat__data-container'),
  itemAmt = items.length;

function cycleItems() {
  var item = $('.card--stat__data .card--stat__data-container').eq(currentIndex);
  items.fadeOut();
  item.fadeIn();
}

$('.next').click(function() {
  currentIndex += 1;
  if (currentIndex > itemAmt - 1) {
    currentIndex = 0;
  }
  cycleItems();
});

$('.prev').click(function() {
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = itemAmt - 1;
  }
  cycleItems();
});



$(document).ready(function () {
  /*
    By Osvaldas Valutis, www.osvaldas.info
    Available for use under the MIT License
  */

  'use strict';

  ;( function( $, window, document, undefined )
  {
    $( '.file-upload' ).each( function()
    {
      var $input	 = $( this ),
        $label	 = $input.next( 'label' ),
        labelVal = $label.html();

      $input.on( 'change', function( e )
      {
        var fileName = '';

        if( this.files && this.files.length > 1 )
          fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
        else if( e.target.value )
          fileName = e.target.value.split( '\\' ).pop();

        if( fileName )
          $label.find( 'span' ).html( fileName );
        else
          $label.html( labelVal );
      });

      // Firefox bug fix
      $input
        .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
        .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
    });
  })( jQuery, window, document );

});


// $(function () {
//     var chart = Highcharts.chart('myChart', {

//         chart: {
//             type: 'column'
//         },

//         title: {
//             text: ''
//         },

//         xAxis: {
//             categories: ['Apples', 'Oranges', 'Bananas'],
//             labels: {
//                 x: -10
//             }
//         },

//         yAxis: {
//             allowDecimals: false,
//             title: {
//                 // left title blank, but probably need it.
//                 text: ''
//             }
//         },

//         series: [{
//             name: 'Christmas Eve',
//             data: [1, 4, 3]
//         }, {
//             name: 'Christmas Day before dinner',
//             data: [6, 4, 2]
//         }, {
//             name: 'Christmas Day after dinner',
//             data: [8, 4, 3]
//         }],

//         responsive: {
//             rules: [{
//                 condition: {
//                     maxWidth: 284,
//                     maxHeight: 200
//                 },
//                 chartOptions: {
//                     legend: {
//                         align: 'center',
//                         verticalAlign: 'bottom',
//                         layout: 'horizontal'
//                     },
//                     yAxis: {
//                         labels: {
//                             align: 'left',
//                             x: 0,
//                             y: -5
//                         },
//                         title: {
//                             text: null
//                         }
//                     },
//                     subtitle: {
//                         text: null
//                     },
//                     credits: {
//                         enabled: false
//                     }
//                 }
//             }]
//         }
//     });
// });

// $(function () {

//     Highcharts.chart('containerRadar', {

//         chart: {
//             polar: true,
//             type: 'line'
//         },

//         title: {
//             text: 'Budget vs spending',
//             x: -80
//         },

//         pane: {
//             size: '80%'
//         },

//         xAxis: {
//             categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
//                     'Information Technology', 'Administration'],
//             tickmarkPlacement: 'on',
//             lineWidth: 0
//         },

//         yAxis: {
//             gridLineInterpolation: 'polygon',
//             lineWidth: 0,
//             min: 0
//         },

//         tooltip: {
//             shared: true,
//             pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
//         },

//         legend: {
//             align: 'right',
//             verticalAlign: 'top',
//             y: 70,
//             layout: 'vertical'
//         },

//         series: [{
//             name: 'Allocated Budget',
//             data: [43000, 19000, 60000, 35000, 17000, 10000],
//             pointPlacement: 'on'
//         }, {
//             name: 'Actual Spending',
//             data: [50000, 39000, 42000, 31000, 26000, 14000],
//             pointPlacement: 'on'
//         }]

//     });
// });

//Smartresize:
(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;

    return function debounced () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap)
          func.apply(obj, args);
        timeout = null;
      };

      if (timeout)
        clearTimeout(timeout);
      else if (execAsap)
        func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 300);
    };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

// Check if browser is resized in order to add/remove negative tabindex
$(document).ready(function () {
  var width = $(window).width();
  if(width >= 769) {
    // alert("Yar...");
    // add in negative tabindex when search is offscreen
    $('.js--mobile-nav *').attr("tabindex", "-1");
  }
  else {
    // remove negative tabindex when search is onscreen
    $('.js--mobile-nav *').removeAttr("tabindex");
  }
  $(window).smartresize(function(){
    var width = $(window).width();
    if(width >= 769) {
      // alert("Yar...");
      // add in negative tabindex when search is offscreen
      $('.js--mobile-nav *').attr("tabindex", "-1");
    }
    else {
      // remove negative tabindex when search is onscreen
      $('.js--mobile-nav *').removeAttr("tabindex");
    }
  });
});

// Tooltips
$(document).ready(function(){
  $.protip();
});


// Tab
$(document).ready(function() {

  checkTabsSize();
  $(window).on("resize", checkTabsSize);
  $("button.arrow-left").click({direction : 'left'}, scrollTabs);
  $("button.arrow-right").click({direction : 'right'}, scrollTabs);


  function checkTabsSize()
  {
    $('.tab-list').each(function(){
      if($(this).width() > $(this).parent().width())
      {
        $(this).css({"padding-left": "", "padding-right": "" }).parents(".cont-inception:first").css("padding", "").find("button").show();
      }
      else
      {
        $(this).css({"padding-left": 0, "padding-right": 0 }).parents(".cont-inception:first").css("padding", 0).find("button").hide();
      }
    });
  }

  function scrollTabs(e)
  {
    var $listCont = $(this).parents(".cont-inception:first").find("div.tab-list-cont");
    var scrollAmt = $listCont.width() * 0.7 * (e.data.direction === "left" ? -1 : 1);
    $listCont.animate({"scrollLeft": scrollAmt + $listCont.scrollLeft()}, 400);
  }
});

/* jQuery MaterialRipple Plugin */
/* 2014 Dominik Biedebach */

$.fn.materialripple = function(options) {
  var defaults = {
    rippleClass: 'ripple-wrapper'
  }
  $.extend(defaults, options);

  $('body').on('animationend webkitAnimationEnd oAnimationEnd', '.' + defaults.rippleClass, function () {
    removeRippleElement(this);
  });

  var addRippleElement = function(element, e) {
    $(element).append('<span class="added '+defaults.rippleClass+'"></span>');
    newRippleElement = $(element).find('.added');
    newRippleElement.removeClass('added');

    // get Mouse Position
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    // for each ripple element, set sizes
    elementWidth = $(element).outerWidth();
    elementHeight = $(element).outerHeight();
    d = Math.max(elementWidth, elementHeight);
    newRippleElement.css({'width': d, 'height': d});

    var rippleX = e.clientX - $(element).offset().left - d/2 + $(window).scrollLeft();
    var rippleY = e.clientY - $(element).offset().top - d/2 + $(window).scrollTop();

    // Position the Ripple Element
    newRippleElement.css('top', rippleY+'px').css('left', rippleX+'px').addClass('animated');
  }

  var removeRippleElement = function($element) {
    $element.remove();
  }

  // add Ripple-Wrapper to all Elements
  $(this).addClass('has-ripple');

  // Let it ripple on click
  $(this).bind('click', function(e){
    addRippleElement(this, e);
  });
}

$('.btn--ripple').materialripple();

// Make content after the hero element flow properly
$(".force-content-down").css({'height':($(".hero").height()+'px')});
$(".force-content-down-a").css({'height':($(".portfolio").height()+'px')});
// $(".force-content-down-a").css({'height':(($(".portfolio").height() + 0)+'px')});

// Preloader
$(document).ready(function() {
  $('body').delay(1000).queue(function(){
    $(this).addClass('loaded').clearQueue();
  });
});

// Detect if card is scrollable
$(document).ready(function() {
  $(".card--vanilla, .crd--004").each(function(){
    var contentHeight =  $(this).find('.card__content-height').height();
    var cardHeight = $(this).height();
    if(contentHeight > cardHeight){
      $(this).find('.is--scrollable').addClass('is--visible');
    }
  });
});


// Open Filter-temp
$(document).ready(function() {
  $('.js--btn-open-filters').click(function(){
    $('.sidebar--action').addClass('is--visible');
  });
  $('.js--btn-close-filters').click(function(){
    $('.sidebar--action').removeClass('is--visible');
  });
});

// Showing additional Config Options when activating parent option
$(document).ready(function(){
  $(".js--config-toggle-additional-options").click(function() {
    if($(this).find("input[type='checkbox']").is(":checked")) {
      $(this).parents('li').next().show();
    } else {
      $(this).parents('li').next().hide();
    }
  });
});


//OrbisApp stuffs


var orbisApp = (function($){


  var htmlStructures = {
    notification : {
      getNotification : 	function(){
        return 	'<div class="notification top--right">                                                                                ' +
          '	<button class="notification__btn--close js--btn--close--notification"><i class="material-icons">close</i></button>' +
          '	<span class="message"></span>                                                                                     ' +
          '</div>                                                                                                               '
      }
    }
  };

  var orbisAppObj = {
    buildForm : function(parameters, action, target){
      orbisApp.addComponent("json");

      var theForm = $(document.createElement("form")).attr("method", "post").attr("action", action).attr("enctype","multipart/form-data");

      if (target && typeof target === "string")
      {
        theForm.attr("target", target);
      }
      else if(target && typeof target === "boolean")
      {
        theForm.attr("target", '_BLANK' + Math.random()*100000);
      }

      $(theForm).insertObject(parameters);

      theForm.append($(document.createElement("input")).attr({
        type : "hidden",
        name : "rand",
        value : Math.floor(Math.random() * 100000)
      }));

      $(theForm).appendTo("body");
      return theForm;
    },

    checkAjaxResponse : function (xmlHttpRequest) {
      var happy = true;

      if (orbisApp.isEmpty(xmlHttpRequest))
      {
        happy = false;
        orbisApp.displayErrorMessage(i18n.c53266207);
      }
      else
      {
        if (!orbisApp.isEmpty(xmlHttpRequest.getResponseHeader("notLoggedIn")))
        {
          happy = false;
          window.parent.location = "/notLoggedIn.htm";
        }
        else if (!orbisApp.isEmpty(xmlHttpRequest.getResponseHeader("portalError")))
        {
          happy = false;
          window.parent.location = "/portalError.htm";
        }
        else if (orbisApp.isEmpty(xmlHttpRequest.status))
        {
          if(!unloadedProperly)
          {
            happy = false;
            orbisApp.displayErrorMessage(i18n.g92510331);
          }
        }
        else if (xmlHttpRequest.status != 200)
        {
          happy = false;
          orbisApp.displayErrorMessage(i18n.x410443028);
        }
      }

      return happy;
    },

    showNotification : function(message, type, duration){
      if(!type)
      {
        type = "info";
      }

      var $notification = $(htmlStructures.notification.getNotification());
      $notification.addClass(type);
      $notification.find(".message").html(message);
      $notification.appendTo(".js--notification__container").addClass("is--visible").animateCss("fadeInRight").delay(2000).queue(function(){
        orbisApp.hideNotification.apply(this);
      });
    },

    hideNotification : function(){
      $(this).animateCss("fadeOutRight", function(){
        $(this).remove();
      });
    },

    openModal : function(modalId){
      $("div#" + modalId).addClass('is--visible');
    },

    closeModal : function(modalId){
      $("div#" + modalId).removeClass('is--visible');
    },

    displayErrorMessage : function(message, timeOpen) {
      var opts = {
        message : message,
        icon : "/core/images/icons/close.png",
        title : i18n.j20071971,
        clazz : "alert-error",
        timeOpen : timeOpen ? timeOpen : 5000
      };
      orbisApp.manageMessageBoxQueue(opts);
    },

    displayWarningMessage : function(message, timeOpen) {
      var opts = {
        message : message,
        icon : "/core/images/icons/alert.png",
        title : i18n.j20071970,
        clazz : "alert",
        timeOpen : timeOpen ? timeOpen : 5000
      };
      orbisApp.manageMessageBoxQueue(opts);
    },

    displaySuccessMessage : function(message, timeOpen) {
      var opts = {
        message : message,
        icon : "/core/images/icons/agt_action_success_128.png",
        title : i18n.j20071968,
        clazz : "alert-success",
        timeOpen : timeOpen ? timeOpen : 5000
      };
      orbisApp.manageMessageBoxQueue(opts);
    },

    displayInfoMessage : function(message, timeOpen) {
      var opts = {
        message : message,
        icon : "/core/images/icons/information.png",
        title : i18n.j20071969,
        clazz : "alert-info",
        timeOpen : timeOpen ? timeOpen : 5000
      };
      orbisApp.manageMessageBoxQueue(opts);
    },

    manageMessageBoxQueue : function(opts) {
      if(opts)
      {
        orbisMessageBoxQueue.push(opts);
      }

      var messageInProgress = $("div.notificationDialog").is(":visible")
      if(!messageInProgress && orbisMessageBoxQueue.length > 0)
      {
        orbisApp.displayMessageBox(orbisMessageBoxQueue[0])
      }
    },

    displayMessageBox : function(opts) {
      orbisApp.buildMessageBox();

      $("div.notificationDialog").addClass(opts.clazz);
      $("h3.notificationDialog__heading").html(opts.title);
      $("p.notificationDialog__content").html(opts.message);
      $("div.notificationDialog").fadeIn("slow");
      if(opts.timeOpen !== true)
      {
        orbisMessageBoxTimeout = setTimeout(orbisApp.hideMessageBox, opts.timeOpen);
      }
    },

    hideMessageBox : function(){
      clearTimeout(orbisMessageBoxTimeout);
      $("div.notificationDialog").fadeOut("slow", function(){
        if(orbisMessageBoxQueue.length > 0)
        {
          orbisMessageBoxQueue.splice(0,1);
          orbisApp.manageMessageBoxQueue();
        }
      });
    },

    buildMessageBox : function(){
      if($("div.notificationDialog").length == 0)
      {
        var notificationDialog = "";

        notificationDialog += '<div class="notificationDialog">                                        ';
        notificationDialog += '	<button class="notificationDialog__btn--close" type="button">X</button>';
        notificationDialog += '	<h3 class="notificationDialog__heading"></h3>                          ';
        notificationDialog += '	<p class="notificationDialog__content">                                ';
        notificationDialog += '	                                                                       ';
        notificationDialog += '	</p>                                                                   ';
        notificationDialog += '</div>                                                                  ';

        $(notificationDialog).appendTo(".js--notification__container");
        $("button.notificationDialog__btn--close").click(orbisApp.hideMessageBox);
      }
      else
      {
        $("div.notificationDialog").removeClass("alert-block alert-error alert-success alert-info");
        $("h3.notificationDialog__heading").html(null);
        $("p.notificationDialog__content").html(null);
      }
    },

    isEmpty : function (obj)
    {
      var empty = false;

      if (typeof obj == "undefined" || obj == null || obj == "")
      {
        empty = true;
      }

      return empty;
    },

    addComponent : function(component, l2) {
      var c = components[component];

      if (c)
      {
        if (c.loaded === false)
        {
          if(l2 && c.l2)
          {
            $("head").append(c.l2);
          }
          else if(c.en)
          {
            $("head").append(c.en);
          }

          if(c.dependencies)
          {
            for(var i = 0; i < c.dependencies.length; i++)
            {
              this.addComponent(c.dependencies[i]);
            }
          }

          $("head").append(c.tag);
          c.loaded = true;
        }
      }
      else
      {
        alert("Error -> orbisApp.addComponent() -> Component '" + component + "' is undefined.", true, 300);
      }
    }
  };

  return orbisAppObj;
})(jQuery);


// NEW Dropdown
$(document).ready(function() {
  manageDropdownBehaviour();
});

function manageDropdownBehaviour()
{
  $('.js--dropdown-btn').on('click', function() {
    var $this = $(this);
    var $dropdown = $(this).next();

    $('.js--drop-down__btn').next().removeClass('is--visible');

    $dropdown.css({
      top : findSubmenuTop($this, $dropdown),
      left : findDropdownLeft($this, $dropdown)
    }).toggleClass("is--visible");
  });

  $(document).click(function(event) {
    $('.dropdown__list').scrollTop(0);
    if(!$(event.target).closest('.dropdown__scoutship, .dropdown__item.parent > .dropdown__wrapper, .js--dropdown-btn').length) {
      if($('.dropdown__scoutship, .dropdown__item.parent > .dropdown__wrapper').hasClass('is--visible')) {
        $('.dropdown__scoutship, .dropdown__item.parent > .dropdown__wrapper').removeClass('is--visible');
      }
      if($('.dropdown__scoutship, .dropdown__item.parent > .dropdown__wrapper').hasClass("is--visible--top")) {
        $('.dropdown__scoutship, .dropdown__item.parent > .dropdown__wrapper').removeClass('is--visible--top');
      }
    }
  });
  // whenever we click on a menu item that has a submenu
  $('.dropdown__item.parent').on('mouseenter', function() {
    var $parent = $(this);
    var $childContainer = $('> .dropdown__wrapper', $parent);
    // place the submenu in the correct position relevant to the menu item

    $childContainer.css({
      top: findSubmenuTop($parent, $childContainer),
      left: findSubmenuLeft($parent, $childContainer)
    }).addClass('is--visible');
  });

  // whenever we click on a menu item that has a submenu
  $('.dropdown__item.parent').on('mouseleave', function() {
    var $submenuWrapper = $('> .dropdown__wrapper', $(this));
    // place the submenu in the correct position relevant to the menu item
    $submenuWrapper.find('.dropdown__list').scrollTop(0);
    $submenuWrapper.removeClass('is--visible');
  });
}

function findSubmenuTop($parentItem, $childContainer)
{
  var submenuTop = 0;
  var parentPos = $parentItem.position().top;
  var parentOff = $parentItem.offset().top;
  var childHeight = $childContainer.outerHeight();
  var parentHeight = $parentItem.outerHeight();
  var isReallyChild = $.contains($parentItem.get(0), $childContainer.get(0)); //if false: Yer a sibling 'arry!


  if(parentOff + $childContainer.height() + (isReallyChild ? 0 : parentHeight) > $(document).height())
  {
    submenuTop = parentPos - childHeight + (isReallyChild ? parentHeight : 0);
    var topOffset = parentOff - submenuTop;
    if(topOffset < 0)
    {
      submenuTop -= topOffset;
    }
  }
  else
  {
    submenuTop = parentPos + (isReallyChild ? 0 : parentHeight);
  }

  return submenuTop;
}

function findSubmenuLeft($parentItem, $childContainer)
{
  var submenuLeft = 0;
  var parentPos = $parentItem.position();
  var parentOff = $parentItem.offset();

  if(parentOff.left + Math.round($parentItem.width() * 0.75) + $childContainer.width() > $(document).width())
  {
    submenuLeft = parentPos.left - $childContainer.width();
    var leftOffset = parentOff.left - submenuLeft;
    if(leftOffset < 0)
    {
      submenuLeft -= leftOffset;
    }
  }
  else
  {
    submenuLeft = parentPos.left + Math.round($parentItem.outerWidth() * 0.75);
  }

  return submenuLeft;
}

function findDropdownLeft($menuButton, $menu)
{
  var btnOff = $menuButton.offset();
  var buttonWidth = $menuButton.outerWidth();
  var menuWidth = $menu.outerWidth();
  var dropdownLeft = 0;

  if(btnOff.left + menuWidth > $(document).width())
  {
    dropdownLeft = buttonWidth - menuWidth;
  }

  return dropdownLeft;
}

// get the left and right position
function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;

  while (element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}
// END NEW Dropdown

$(document).ready(function(){
  $('.js--btn-close-crd--more').hide();
  $('.js--btn-crd--more').click(function(){
    $('.public-profile__header .btn--mail-user').addClass('is--hidden');
    $(this).parents('.crd__content').find('.crd--more').addClass('is--visible');
    $(this).parents('.crd__content').find('.js--btn-close-crd--more').fadeIn();

  });

  $('.js--btn-close-crd--more').click(function(){
    $(this).fadeOut();
    $('.public-profile__header .btn--mail-user').removeClass('is--hidden');
    $(this).parents('.crd--more').removeClass('is--visible');

  });

});

$(document).ready(function(){
  console.log($('.js--btn--landing-menu'));
  $('.js--btn--landing-menu').click(function(){
    console.log($('.js--landing-nav'));
    $('.js--landing-nav').toggleClass('is--visible');
  });
  $('.js--btn--menu-close').click(function(){
    $('.js--landing-nav').toggleClass('is--visible');
  });
});

// Filter Panel on Search / Catalogue
$(document).ready(function(){
  $('.js--activate--filters').click(function(){
    $('.js--filters').toggleClass('is--visible');
    $('.js--header--filters, .js--main--filters, .js--footer--filters').toggleClass('sidebar--fixed--right--large--is--visible');
    $('.js--search--experiences').toggleClass('is--hidden');
  });


  $('.js--saved-filters__btn, .js--active-filters__btn').click(function(){
    $('.sidebar--action__bottom__section.active, .sidebar--action__bottom__section.saved').toggleClass('is--visible');
  });

  $('.js--btn--saveFilters').click(function(){
    $('#saveFilters').toggleClass('is--visible');
  });

});

// Hide or Show Experiential or Portfolio cards
$(document).ready(function(){
  $('.js--btn--portfolio-cards').click(function(){
    $('.js--experience-cards .crd').addClass('is--hidden');

    // Hide Resume
    $('body').removeClass('resume--visible');
    $('.js--resume').removeClass('is--visible');
  });

  $('.js--btn--experience-cards').click(function(){
    $('.js--experience-cards .crd').removeClass('is--hidden');
  });
});

// Hide or Show Resume on Public Profile
$(document).ready(function(){
  $('.js--btn--resume-cards').click(function(){
    $('body').addClass('resume--visible');
    $('.js--resume').addClass('is--visible');
  });
});

// Experiential Schedules process flow
$(document).ready(function(){
  $('.js--btn--process-flow__item').click(function(){
    $(this).addClass('is--active');
    // $(this).find('span').hide();
  });
});

$(document).mouseup(function(event){
  var target = $(".js--btn--process-flow__item");
  if(!target.is(event.target) && !$("button").is(event.target) && target.hasClass("is--active")){
    target.removeClass("is--active");
    // }else{
    return false;
  }
});


// Experience Timeline
$(document).ready(function(){
  $('.js--btn--alumni-timeline, .js--btn-close-experience-timeline').click(function(){
    $('.js--experience-timeline').toggleClass('is--visible');
  });

  $('.js--btn-close-experience-timeline').click(function(){
    $('.js--experience-timeline__expanded-view').removeClass('is--visible');
  });

  $('.js--btn--experience-timeline__item').click(function(){
    $('.experience-timeline__help').hide();
  });

  $('.js--btn-close--experience').click(function(){
    $('.experience-timeline__help').show();
  });

  // $('.js--btn--experience-timeline__item').click(function(){
  // 	$('.js--experience-timeline__expanded-view').toggleClass('is--visible');
  // });
  $('.js--btn-close--experience').click(function(){
    $(this).parents('.js--experience-timeline__expanded-view').removeClass('is--visible');
  });

  $('#exBtn--001').click(function(){
    $('#experienceExpanded--001').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });

  $('#exBtn--002').click(function(){
    $('#experienceExpanded--002').addClass('is--visible');
    $('#experienceExpanded--001, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });

  $('#exBtn--003').click(function(){
    $('#experienceExpanded--003').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--001, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });

  $('#exBtn--004').click(function(){
    $('#experienceExpanded--004').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--001, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });

  $('#exBtn--005').click(function(){
    $('#experienceExpanded--005').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--001, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });

  $('#exBtn--006').click(function(){
    $('#experienceExpanded--006').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--001, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });

  $('#exBtn--007').click(function(){
    $('#experienceExpanded--007').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--001, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });

  $('#exBtn--008').click(function(){
    $('#experienceExpanded--008').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--001, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });
  $('#exBtn--009').click(function(){
    $('#experienceExpanded--009').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--001, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });
  $('#exBtn--010').click(function(){
    $('#experienceExpanded--010').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--001, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });
  $('#exBtn--011').click(function(){
    $('#experienceExpanded--011').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--001, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });
  $('#exBtn--012').click(function(){
    $('#experienceExpanded--012').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--001, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });
  $('#exBtn--013').click(function(){
    $('#experienceExpanded--013').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--001, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });
  $('#exBtn--014').click(function(){
    $('#experienceExpanded--014').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--001, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });
  $('#exBtn--015').click(function(){
    $('#experienceExpanded--015').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--001, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });
  $('#exBtn--016').click(function(){
    $('#experienceExpanded--016').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--001, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });
  $('#exBtn--017').click(function(){
    $('#experienceExpanded--017').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--001, #experienceExpanded--018, #experienceExpanded--019').removeClass('is--visible');
  });
  $('#exBtn--018').click(function(){
    $('#experienceExpanded--018').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--001, #experienceExpanded--019').removeClass('is--visible');
  });
  $('#exBtn--019').click(function(){
    $('#experienceExpanded--019').addClass('is--visible');
    $('#experienceExpanded--002, #experienceExpanded--003, #experienceExpanded--004, #experienceExpanded--005, #experienceExpanded--006, #experienceExpanded--007, #experienceExpanded--008, #experienceExpanded--009, #experienceExpanded--010, #experienceExpanded--011, #experienceExpanded--012, #experienceExpanded--013, #experienceExpanded--014, #experienceExpanded--015, #experienceExpanded--016, #experienceExpanded--017, #experienceExpanded--018, #experienceExpanded--001').removeClass('is--visible');
  });

  //  Custom Srollbars
  // $('#scrollable001, #scrollable002, .is--scrollable').perfectScrollbar();

});

$(document).ready(function(){
  $('.js--toggle-card-loading').click(function(){
    $('.is--loading').removeClass('fadeInRight').addClass('fadeOutLeft');
    $('.js--loading-crd-column').addClass('is--unloading');
  });
});

$(document).ready(function(){
  $('.js--btn--close--generic').click(function(){
    $(this).parent().removeClass('is--visible is--open');
  });
});

$(document).ready(function(){
  $('.js--btn-close-resume').click(function(){
    $('.js--public-profile__header').removeClass('is--hidden');
  });

  $('.js--btn-open-resume').click(function(){
    $('.js--public-profile__header').addClass('is--hidden');
    $('.js--resume').addClass('is--visible');
    $('.js--portfolio').removeClass('is--visible');
    $('.js--portfolio-item').removeClass('is--visible');
  });

  $('.nav--interaction__button').click(function(){
    $('.js--interaction-menu').removeClass('is--visible');
  });



  $('.js--btn-open-transcript').click(function(){
    $('.js--public-profile__header').removeClass('is--hidden');
    $('.js--resume').removeClass('is--visible');
    $('.js--portfolio').removeClass('is--visible');
    $('.js--portfolio-item').removeClass('is--visible');
  });


  // Open Portfolio
  $('.js--btn-open-portfolio').click(function(){
    $('.js--public-profile__header').addClass('is--hidden');
    $('.js--resume').removeClass('is--visible');
    $('.js--portfolio').addClass('is--visible');
  });

  // Move Portfolio Heading
  // Sticky Nav on Scroll
  $('.portfolio').scroll(function() {
    if ($(this).scrollTop() > 60) {
      $('.portfolio, .portfolio__title').addClass('sticky');
    } else {
      $('.portfolio, .portfolio__title').removeClass('sticky');
    }
  });

  // $('.js-tilt .crd').tilt({
  // glare: true,
  // maxGlare: .5,
  // 	scale: 1.2
  // });

  // Close portfolio item
  $('.js--btn-open-portfolio-item').click(function(){
    $('.js--portfolio-item').addClass('is--visible');
  });
  $('.js--btn-close-portfolio-item').click(function(){
    $('.js--portfolio-item').removeClass('is--visible');
  });
});

// Show all tags:
$(document).ready(function(){
  $('.js--view-all-tags').click(function(){
    $(this).parent().parent().toggleClass('is--expanded');
  });

// Expand Feed
  $(document).ready(function(){
    $('.js--btn--expand--feed').click(function(){
      $(this).parents('.js--feed').addClass('is--expanded');
      $(this).parents('.js--feed').contents().hide();
      $('.feed').addClass('is--hidden');
      $('.page, .page__header-bar').addClass('is--visible');
      $('.page, .page__header-bar').show();
    });





    $('.js--btn--close--feed').click(function(){
      $('.feed.is--expanded *').show();
      $('.feed.is--expanded').removeClass('is--expanded');
      $('.feed').removeClass('is--hidden');
      $('.page, .page__header-bar').removeClass('is--visible');
      $('.page, .page__header-bar').hide();
    });




  });


});

$(document).ready(function(){
  $('.js--btn-open-login, .js--btn-close-login').click(function(){
    $('.landing-page--003__content.is--login').toggleClass('is--visible');
  });

  $('.js--btn-close-login').click(function(){
    $('.btn--03').addClass('is--hidden');
  });

  $('.js--btn-open-school').click(function(){
    $('.js--login--school').removeClass('is--hidden');
  });

  $('.js--btn-open-industry').click(function(){
    $('.js--login--industry').removeClass('is--hidden');
  });

  $('.js--btn-open-gov').click(function(){
    $('.js--login--gov').removeClass('is--hidden');
  });

});

$(document).ready(function(){
  $('.js--btn--feed-grid').click(function(){
    var $container = $(this).parents('.js--feed');
    $container.addClass('is--grid');
    $container.find('.crd').removeClass('width--100 is--list').addClass('is--grid');
    $('.js--feed').not($container).hide();
    // $('.js--feed').toggleClass('is--visible');
  });
  $('.js--btn--feed-list').click(function(){
    var $container = $(this).parents('.js--feed');
    $container.removeClass('is--grid');
    $container.find('.crd').removeClass('is--grid').addClass('width--100 is--list');
    $('.js--feed').not($container).show();
    // $('.js--feed').toggleClass('is--visible');
  });
});






// gov charts

// 001
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--001");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         }
//       };
//    var data =
//         {
//           labels: ["Requirements Met", "Requirements Not Met"],
//           datasets: [{
//               label: '# of Votes',
//               data: [65, 35],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'pie',
//       data: data,
//       options: options
//   });
// });

// // 002
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--002");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         }
//       };
//    var data =
//         {
//           labels: ["Enrolled Full-Time", "Not Enrolled Full-Time"],
//           datasets: [{
//               label: '# of Votes',
//               data: [82, 18],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'pie',
//       data: data,
//       options: options
//   });
// });

// // 003
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--003");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         }
//       };
//    var data =
//         {
//           labels: ["Legally Entitled to Work in Canada", "Not Legally Entitled to Work in Canada"],
//           datasets: [{
//               label: '# of Votes',
//               data: [91, 9],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'pie',
//       data: data,
//       options: options
//   });
// });

// // 004
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--004");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         }
//       };
//    var data =
//         {
//           labels: ["Canadian Citizen, Permanent Resident, Refugee", "Other"],
//           datasets: [{
//               label: '# of Votes',
//               data: [50, 50],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'pie',
//       data: data,
//       options: options
//   });
// });

// // 005
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--005");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         }
//       };
//    var data =
//         {
//           labels: ["Studying in Fields Related to STEM", "Other Fields"],
//           datasets: [{
//               label: '# of Votes',
//               data: [34, 66],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'pie',
//       data: data,
//       options: options
//   });
// });

// // 006
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--006");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         }
//       };
//    var data =
//         {
//           labels: ["Male", "Female", "Decline to Answer"],
//           datasets: [{
//               label: '# of Votes',
//               data: [42, 38, 20],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
// 									'rgba(255, 206, 86, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'pie',
//       data: data,
//       options: options
//   });
// });

// // 007
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--007");
//   var options =
//       {
//         elements: {

//         },
// 				legend: false
//       };
//    var data =
//         {
//           labels: ["18", "19", "20", "21", "22"],
//           datasets: [{
// 							label: ["18", "19", "20", "21", "22"],
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'bar',
//       data: data,
//       options: options
//   });
// });

// // 008
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--008");
//   var options =
//       {
//         elements: {

//         },
// 				legend: false
//       };
//    var data =
//         {
//           labels: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"],
//           datasets: [{
// 							label: ["18", "19", "20", "21", "22"],
//               data: [49, 1512, 47, 1427, 181, 3333, 287, 989, 1123, 1010, 249, 777],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)',
// 									'rgba(255, 49, 12, 0.5)',
//                   'rgba(54, 16, 35, 0.5)',
//                   'rgba(25, 206, 86, 0.5)',
//                   'rgba(7, 92, 192, 0.5)',
//                   'rgba(13, 02, 255, 0.5)',
//                   'rgba(55, 59, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'bar',
//       data: data,
//       options: options
//   });
// });


// // 009
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--009");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 010
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--010");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 011
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--011");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 012
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--012");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 013
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--013");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 014
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--014");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 015
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--015");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 016
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--016");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 017
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--017");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 018
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--018");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 019
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--019");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 020
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--020");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 021
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--021");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 022
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--022");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 023
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--023");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 024
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--024");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 025
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--025");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 025
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--026");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 025
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--027");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 025
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--028");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 025
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--029");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 025
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--030");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 025
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--031");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });

// // 025
// $(document).ready(function(){
//   var ctx = document.getElementById("chart--032");
//   var options =
//       {
//         elements: {
//           arc: {
//             borderColor: "#000000"
//           }
//         },
//         legend: false,
//         cutoutPercentage: 90
//       };
//    var data =
//         {
//           labels: ["Positions Pending Approval", "Approved", "Declined", "Student Visibility: Active", "Student Visibility: Inactive"],
//           datasets: [{
//               label: '# of Votes',
//               data: [49, 1512, 47, 1427, 181],
//               backgroundColor: [
//                   'rgba(255, 99, 132, 0.5)',
//                   'rgba(54, 162, 235, 0.5)',
//                   'rgba(255, 206, 86, 0.5)',
//                   'rgba(75, 192, 192, 0.5)',
//                   'rgba(153, 102, 255, 0.5)',
//                   'rgba(255, 159, 64, 0.5)'
//               ],
//               borderWidth: 0
//           }]
//       };
//   var myChart = new Chart(ctx, {
//       type: 'doughnut',
//       data: data,
//       options: options
//   });
// });



