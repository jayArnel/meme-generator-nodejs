$(document).ready(function() {
    var canvas = document.getElementById('preview');
    canvas.width = 1000;
    canvas.height = 700;
    var ctx;
    var memeImg;
    var title = "";
    var subtitle = "";

    function initContext() {
        ctx = canvas.getContext('2d');
        ctx.font = '50px Impact'
        ctx.fillStyle = '#FFF'
        ctx.strokeStyle = '#000'
        ctx.textAlign="center";
    }

    initContext();
    drawMeme();

    $('.text label').click(function() {
        var parent = $(this).parent();
        var input = parent.find('input');
        $(input).focus();
    });

    $('#download').on('click', function() {
        this.href = document.getElementById('preview').toDataURL('image/jpeg');
        this.download = 'meme.jpeg';
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
                if (!isCanvasBlank(canvas) || !(title.length == 0 && subtitle.length == 0)  ) {
                    $('#download').removeAttr('hidden');
                    console.log(title.length, subtitle.length);
                } else {
                    $('#download').attr('hidden', true);
                }
                drawMeme();
            }
            memeImg.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    });

    // updating text
    $('.title input[type="text"]').on('keyup', function() {
        title = $(this).val();
        subtitle = $('.subtitle input[type="text"]').val();

        if (!isCanvasBlank(canvas) || !(title.length == 0 && subtitle.length == 0)  ) {
            $('#download').removeAttr('hidden');
        } else {
            $('#download').attr('hidden', true);
        }

        ctx.clearRect(0,0, canvas.width, canvas.height);
        drawMeme();
    });

    $('.subtitle input[type="text"]').on('keyup', function() {
        subtitle = $(this).val();
        title = $('.title input[type="text"]').val();

        if (!isCanvasBlank(canvas) || !(title.length == 0 && subtitle.length == 0)  ) {
            $('#download').removeAttr('hidden');
            console.log(title.length, subtitle.length);
        } else {
            $('#download').attr('hidden', true);
        }

        ctx.clearRect(0,0, canvas.width, canvas.height);
        drawMeme();
    });


    function drawMemeImage() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (memeImg) {
            canvas.height = memeImg.height;
            canvas.width = memeImg.width;
            initContext();    
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(memeImg,0,0);
        }
    }


    function drawTitle(context, text, x, y, maxWidth, lineHeight) {
        try {
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
        } catch(err) {
            return null;
        }
    }

    function drawSubtitle(context, text, x, y, maxWidth, lineHeight) {
        try {
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
        } catch(err) {
            return null;
        }
    }

    function isCanvasBlank(cnvs) {
        var blank = document.createElement('canvas');
        blank.width = cnvs.width;
        blank.height = cnvs.height;

        return cnvs.toDataURL() == blank.toDataURL();
    }

    $('#clear').on('click', function(e) {
        e.preventDefault();
        ctx.clearRect(0,0, canvas.width, canvas.height);
        $('.title input[type="text"]').val('');
        $('.subtitle input[type="text"]').val('');
        $('#download').attr('hidden', true);
    });
    function drawMeme() {
        drawMemeImage();
        drawTitle(ctx, title, (canvas.width / 2), 65, canvas.width, 45);
        drawSubtitle(ctx, subtitle, (canvas.width / 2), (canvas.height - 35), canvas.width, 45);
    }
});
