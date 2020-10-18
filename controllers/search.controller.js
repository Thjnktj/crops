const { result } = require("../models/db");
const db = require("../models/db");

function persenChar(key, str) {
    var sum = 0, igre = 0; results = 0;
    var search = [];
    var a = key.split(' '), b = str.split(' ');

    for (var i = 0; i < a.length; i++){
        if (a[i] == 'lúa'|| a[i] == 'ngô'|| a[i] == 'khoai'|| a[i] == 'sắn'|| a[i] == 'hạt'|| a[i] == 'cao'|| a[i] == 'thấp'|| a[i] == 'do'|| a[i] == 'viện'|| a[i] == 'thân'|| a[i] == 'lá'|| a[i] == 'củ'|| a[i] == 'bắp' || a[i] == '1000') {
            search[igre++] = a[i];
        }
        else if (a[i] == 'PGS.TS.'|| a[i] == 'GS.VS.'|| a[i] == 'TS.'|| a[i] == 'KS.'|| a[i] == 'G.A.' || a[i] == 'củ/khóm') {search[igre++] = a[i];search[igre++] = a[i + 1];search[igre++] = a[i + 2];search[igre++] = a[i + 3];}
        else if ((a[i] == 'năng' && a[i + 1] == 'suất')|| (a[i] == 'khối' && a[i + 1] == 'lượng')|| (a[i] == 'thời' && a[i + 1] == 'gian')|| (a[i] == 'chất' && a[i + 1] == 'lượng')|| (a[i] == 'trung' && a[i + 1] == 'bình')|| (a[i] == 'sinh' && a[i + 1] == 'trưởng')|| (a[i] == 'khoa' && a[i + 1] == 'học')|| (a[i] == 'nông' && a[i + 1] == 'nghiệp')|| a[i] == 'đất') {
            search[igre++] = a[i];search[igre++] = a[i + 1];}
        else if (a[i] == 'tấn/ha'|| a[i] == 'tạ/ha'|| a[i] == 'cây/ha'|| a[i] == 'ngày' || a[i] == '%' || a[i] == 'g') {
            search[igre++] = a[i - 3];search[igre++] = a[i - 2];search[igre++] = a[i - 1];search[igre++] = a[i];}
    }

    if (search.length == 1 && str.toLowerCase().indexOf(search[0].toLowerCase()) > 0)
    { 
        sum = 1;
    }
    if (a.length <= 3) {
        for (var i = 0; i < b.length; i++) {
            if (b[i].toLowerCase() == a[a.length - 1].toLowerCase()) sum++;
        }
    }
    else if (search.length > 0 && a.length <= 4)
    {
        sum = 0;
    }
    else if(search.length > 0) {
        for (var i = 0; i < search.length; i++) {
            if (str.toLowerCase().indexOf(a[i].toLowerCase()) > 0) sum++; 
        }
    }
    else {
        sum = 0;
    }

    if (a.length <= 3 && sum == 1) {
        results = 1;
    }
    else {
        results = sum / igre;
    }
    return results;
}

module.exports.index = function (req, res, next) {
    var key = req.query.key;
    var seeds = db.get('seeds').value();
    var size = db.get('seeds').size().value();
    var list = {}, persen = [], resultSeeds = [];
    var count = 0;

    for (var i = 0; i < size; i++) {
        list[i] = {
            id: seeds[i].id,
            data: seeds[i].name + ' ' + seeds[i].origins + ' ' + seeds[i].biology + ' ' + seeds[i].techniques
        };
        
        if (persenChar(key, list[i].data) >= 0.5) {
            persen[count] = db.get('seeds').find({ id: list[i].id }).value()
            count++;
        }
    }

    if (count > 18) {
        for (var i = 0; i < 16; i++){
            resultSeeds[i] = persen[i];
        }
    }
    else {
        resultSeeds = persen;
    }

    res.render('search/index', {
        title: 'Search Page - Website about the Crops',
        seeds: resultSeeds,
        key: key,
        size: count,
        list: list
    });
}