function randomUserAgent() {
    const userAgentList = [
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89;GameHelper",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:46.0) Gecko/20100101 Firefox/46.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
        "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
        "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)",
        "Mozilla/5.0 (Windows NT 6.3; Win64, x64; Trident/7.0; rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.10586",
        "Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1"
    ];
    const num = Math.floor(Math.random() * userAgentList.length);
    return userAgentList[num];
}


/**
 * 获取依赖
 * @type {*}
 */
const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
/**
 * 定义请求地址
 * @type {*}
 */
let currentPage = 1;
const reptileUrl = "https://www.qidian.com/all?orderId=&style=1&pageSize=20&siteid=1&pubflag=0&hiddenField=0&page=";
let totalPage = 1000;
/**
 * 处理空格和回车
 * @param text
 * @returns {string}
 */
function replaceText(text) {
    return text.replace(/\n/g, "").replace(/\s/g, "");
}

/**
 * 核心业务
 * 发请求，解析数据，生成数据
 */
const fictionService = require('../services/fiction_service');

const writeErrorLog = (error) => {
    fs.writeFile(__dirname + '/errorLog.json', JSON.stringify({
        status: 200,
        data: error
    }), function (err) {
        if (err) throw err;
        console.log('写入完成');
    });
}

const reptile = (page) => {
    superagent.get(reptileUrl + page).set('User-Agent', randomUserAgent()).end(function (err, res) {
        // 抛错拦截
        if (err) {
            return writeErrorLog(err);
        }
        // 解析数据
        let $ = cheerio.load(res.text);
        console.log(page);

        //totalPage = $('.page-box .lbf-pagination-item-list li.lbf-pagination-page').attr('data-page');

        /**
         * 存放数据容器
         * @type {Array}
         */
        let data = [];
        // 获取数据
        $('.all-book-list .all-img-list li').each(function (i, elem) {
            let _this = $(elem);
            data.push({
                id: _this.find('.book-img-box a').attr('data-bid'),
                href: _this.find('.book-img-box a').attr('href'),
                thumbnails: _this.find('.book-img-box a img').attr('src'),
                bookName: _this.find('.book-mid-info h4 a').text(),
                author: _this.find('.book-mid-info .author .name').text(),
                type: _this.find('.book-mid-info .author a[data-eid="qd_B60"]').text(),
                subType: _this.find('.book-mid-info .author .go-sub-type').text(),
                desc: replaceText(_this.find('.book-mid-info .intro').text()),
                /*wordCount: _this.find('.book-mid-info .update .PntsiZJM').text(),*/
            });
        });

        fictionService.createFiction(data);

        // 生成数据
        // 写入数据, 文件不存在会自动创建
        /*fs.writeFile(__dirname + '/article.json', JSON.stringify({
            status: 200,
            data: data
        }), function (err) {
            if (err) throw err;
            console.log('写入完成');
        });*/
    });

    if(!totalPage || currentPage > totalPage){
        return;
    }

    currentPage++;

    reptile(currentPage);
}

module.exports = reptile;