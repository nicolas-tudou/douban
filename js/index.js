var id = window.location.search.slice(1),
    searchUrl = "https://api.douban.com/v2/music/" + id;
console.log(id);
$.ajax({
    type: 'GET',
    url: searchUrl,
    dataType: 'jsonp',
    success: addInfo,
    error: function (err) {
        console.log(err);
    }
})

function addInfo(data) {
    console.log(data);
    var infoArr = data.attrs;
    var musicInfo = [];
    musicInfo.push('表演者：' + infoArr['singer'].join(','));
    musicInfo.push('专辑类型：' + infoArr['version'].join(','));
    musicInfo.push('介质：' + infoArr['media'].join(','));
    musicInfo.push('发布时间：' + infoArr['pubdate'].join(','));
    musicInfo.push('出版者：' + infoArr['publisher'].join(','));
    for (var i = 0; i < 5; i++) {
        $('.music_info p').eq(i).text(musicInfo[i]);
    }
    document.getElementById('music_pic').src = data.image;
}

var oAArr = $('.review_star_wrapper a');
for (var i = 0; i < oAArr.length; i++) {
    console.log(i);
    $(oAArr[i]).on('mouseover', (function (j) {
        return function () {
            for (var k = 0; k <= j; k++) {
                document.getElementById('img' + k).src = './imgs/star_onmouseover@2x.png';
            }
            switch (j) {
                case 0: $('.star_num').text('很差'); break;
                case 1: $('.star_num').text('较差'); break;
                case 2: $('.star_num').text('还行'); break;
                case 3: $('.star_num').text('推荐'); break;
                case 4: $('.star_num').text('力荐'); break;
            };
        }
    })(i))

    $(oAArr[i]).on('mouseleave', (function (j) {
        return function () {
            for (var k = 0; k <= j; k++) {
                document.getElementById('img' + k).src = './imgs/star_hollow_hover@2x.png';
            }
            $('.star_num').text('');
        }
    })(i))
}