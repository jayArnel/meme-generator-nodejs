$(document).ready(function() {
    var canvas = document.getElementById('preview');
    var ctx = canvas.getContext('2d');
    canvas.width = 1000
    canvas.height = 700
    var memeImg;

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
            memeImg.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    });

    // updating text
    $('.title input[type="text"]').on('keyup', function() {
        var input = $(this).val();
        var canvas = $('#preview')[0];
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0, canvas.width, canvas.height);

        var canvasTopMiddle = canvas.width / 2;
        ctx.font = '50px Impact'
        ctx.fillStyle = '#FFF'
        ctx.strokeStyle = '#000'
        ctx.textAlign="center";

        wrapText(ctx, input, canvasTopMiddle, 65, canvas.width, 45);
    });
});

function wrapText(context, text, x, y, maxWidth, lineHeight) {
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
