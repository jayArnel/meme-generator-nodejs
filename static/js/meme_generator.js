$(document).ready(function() {
    $('.text label').click(function() {
        var parent = $(this).parent();
        var input = parent.find('input');
        $(input).focus();
    });
});