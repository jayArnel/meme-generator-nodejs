$(document).ready(function() {
    var canvas = document.getElementById('preview');
    var ctx = canvas.getContext('2d');
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
});