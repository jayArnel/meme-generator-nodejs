$(document).ready(function() {
    var canvas = document.getElementById('preview');
    var ctx = canvas.getContext('2d');
    canvas.width = 1000
    canvas.height = 700
    var memeImg;
    var title;
    var subtitle;
    ctx.font = '50px Impact'
    ctx.fillStyle = '#FFF'
    ctx.strokeStyle = '#000'
    ctx.textAlign="center";

    $('.text label').click(function() {
        var parent = $(this).parent();
        var input = parent.find('input');
        $(input).focus();
    });

    $('#download').on('click', function() {
        this.href = document.getElementById('preview').toDataURL();
        this.download = 'meme.png';
    });

    $('.upload').on('click', function(e) {
        $('#upload-meme').trigger('click');
    });

    $('#upload-meme').on('change', function (e) {
        var reader = new FileReader();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        reader.onload = function(event){
            memeImg = new Image();
            memeImg.onload = function(){
                drawMemeImage();
                drawTitle(ctx, title, (canvas.width / 2), 65, canvas.width, 45);
                drawSubtitle(ctx, subtitle, (canvas.width / 2), (canvas.height - 35), canvas.width, 45);
            }
            memeImg.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    });

    function drawMemeImage() {
        if (memeImg) {
            var ct = document.getElementById('measure');
            ct.appendChild(memeImg);
            var wrh = memeImg.width / memeImg.height;
            var newWidth = canvas.width;
            var newHeight = newWidth / wrh;
            if (newHeight > canvas.height) {
                newHeight = canvas.height;
                newWidth = newHeight * wrh;
            }
            ct.removeChild(memeImg);
            ctx.drawImage(memeImg,0,0, newWidth , newHeight);
        }
    }

    // updating text
    $('.title input[type="text"]').on('keyup', function() {
        title = $(this).val();
        subtitle = $('.subtitle input[type="text"]').val();
        ctx.clearRect(0,0, canvas.width, canvas.height);
        drawMemeImage();

        drawTitle(ctx, title, (canvas.width / 2), 65, canvas.width, 45);
        drawSubtitle(ctx, subtitle, (canvas.width / 2), (canvas.height - 35), canvas.width, 45);
    });

    $('.subtitle input[type="text"]').on('keyup', function() {
        subtitle = $(this).val();
        title = $('.title input[type="text"]').val();
        ctx.clearRect(0,0, canvas.width, canvas.height);
        drawMemeImage();

        drawTitle(ctx, title, (canvas.width / 2), 65, canvas.width, 45);
        drawSubtitle(ctx, subtitle, (canvas.width / 2), (canvas.height - 35), canvas.width, 45);
    });

    function drawTitle(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                context.strokeText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }

        context.fillText(line, x, y);
        context.strokeText(line, x, y);
    }

    function drawSubtitle(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        var topLineY = y - lineHeight;

        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, topLineY);
                context.strokeText(line, x, topLineY);
                line = words[n] + ' ';
                topLineY -= lineHeight;
            } else {
                line = testLine;
            }
        }

        context.fillText(line, x, y);
        context.strokeText(line, x, y);
    }
});
