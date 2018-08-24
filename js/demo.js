$('.search_text').on('input', function () {
    $.ajax({
        type: 'GET',
        url: 'https://api.douban.com/v2/music/search',
        dataType: 'jsonp',
        data: 'q=' + this.value + '&count=6',
        success: addResponse
    })
})

$('.search_btn').on('click', function() {
    $('.music_list_wrapper').html("<h2>搜索" + $('.search_text').val() + "</h2>");
    $('.music_list_wrapper').append($('.search_resource_box li'));
})

var str = '';
function addResponse(data) {
    console.log(data)
    data.musics.forEach(function (ele, index) {
        var nameStr = [];
        ele.author.forEach(function(ele, index) {
            nameStr.push(ele.name);
        })
        nameStr.join(',');
        str += '<li>\
                    <a href=\"http://localhost/douban/index.html?' + ele.id + '\">\
                        <img src=' + ele.image + ' class=\"search_resource_img\" alt=' + ele.mobile_link + '>\
                        <p>' + ele.title + '</p>\
                        <p>表演者 ：' + nameStr + '</p>\
                    </a>\
                </li>';
    })
    $('.search_resource_box').html(str);
    str = '';
}