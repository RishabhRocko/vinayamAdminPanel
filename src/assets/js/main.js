// --------------------------multi menu js start
$(function() {
    var $ul = $('.multiMenu-navigation > ul');

    $ul.find('li a').click(function(e) {
        var $li = $(this).parent();

        if ($li.find('ul').length > 0) {
            e.preventDefault();

            if ($li.hasClass('selected')) {
                $li.removeClass('selected').find('li').removeClass('selected');
                $li.find('ul').slideUp(400);
            } else {

                if ($li.parents('li.selected').length == 0) {
                    $ul.find('li').removeClass('selected');
                    $ul.find('ul').slideUp(400);
                } else {
                    $li.parent().find('li').removeClass('selected');
                    $li.parent().find('> li ul').slideUp(400);
                }

                $li.addClass('selected');
                $li.find('>ul').slideDown(400);
            }
        }
    });

    $('.multiMenu-navigation > ul ul').each(function(i) {
        if ($(this).find('>li>ul').length > 0) {
            var paddingLeft = $(this).parent().parent().find('>li>a').css('padding-left');
            var pIntPLeft = parseInt(paddingLeft);
            var result = pIntPLeft + 15;

            $(this).find('>li>a').css('padding-left', result);
        } else {
            var paddingLeft = $(this).parent().parent().find('>li>a').css('padding-left');
            var pIntPLeft = parseInt(paddingLeft);
            var result = pIntPLeft + 15;

            $(this).find('>li>a').css('padding-left', result).parent().addClass('selected--last');
        }
    });

    var t = ' li > ul ';
    for (var i = 1; i <= 10; i++) {
        $('.multiMenu-navigation > ul > ' + t.repeat(i)).addClass('subMenuColor' + i);
    }

    var activeLi = $('li.selected');
    if (activeLi.length) {
        opener(activeLi);
    }

    function opener(li) {
        var ul = li.closest('ul');
        if (ul.length) {

            li.addClass('selected');
            ul.addClass('open');

            if (ul.closest('li').length) {
                opener(ul.closest('li'));
            } else {
                return false;
            }

        }
    }

});

// $(function () {
//     var selector = '.multiMenu-navigation-inner li a';

//     $(selector).on('click', function () {
//         $(selector).removeClass('mm-active');
//         $(this).addClass('mm-active');
//     });
// });

$(document).ready(function() {
    // --------------------------sidebar toggle js start
    $(".sidebar-toggle").click(function() {
        $(".sidebar").toggleClass("collapsed");
    });

    // --------------------------toggle buttons js start
    $('.cb-value').click(function() {
        var mainParent = $(this).parent('.toggle-btn');
        if ($(mainParent).find('input.cb-value').is(':checked')) {
            $(mainParent).addClass('active');
        } else {
            $(mainParent).removeClass('active');
        }

    });

});

// --------------------------tooltip js start

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})