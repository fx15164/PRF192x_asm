const API_KEY = 'e13f37a8dca02d217e82d4a84d32b1d4';

$(document).ready(function () {
    fetchNews();
    // Toogle searchbox
    $('.header i').click(showSearchBox);
    $('.search_box i, .backdrop').click(hideSearchBox);

    // Submit searchbox
    $('.search_btn').click(function () {
        const keywords = $('#keywords').val();
        if (keywords) {
            hideSearchBox();
            searchNews(keywords);
            $('#keywords').val('');
        }
    });
});


function searchNews(keywords) {
    showLoading();
    fetch(`https://gnews.io/api/v4/search?q=${keywords}&token=${API_KEY}`)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Request failed!')
        })
        .then(data => appendNews(data))
}

function fetchNews() {
    showLoading();
    fetch(`https://gnews.io/api/v4/top-headlines?&token=${API_KEY}`)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Request failed!')
        })
        .then(data => appendNews(data))
}

function appendNews(list) {
    $('.news_list').empty();
    // append list
    for (let item of list.articles) {
        const { title, image, url, publishedAt, description } = item;

        const html = `<div class="news_item col-lg-6"><div class="news_img"><img src="${image}" alt=""></div>`
            + `<div class="news_info"><h3 class="news_title"><a href="${url}" target="_blank">${title}</a></h3>`
            + `<p class="news_time">${publishedAt}</p><p class="news_des">${description}</p></div></div>`;

        $('.news_list').append(html);
    }
}

function showLoading() {
    $('.news_list')
        .empty()
        .append('<div class="loader"></div>')
}

function hideSearchBox() {
    $('.search_box').hide();
    $('.backdrop').fadeOut();
}

function showSearchBox() {
    $('.search_box').show();
    $('.backdrop').fadeIn();
}