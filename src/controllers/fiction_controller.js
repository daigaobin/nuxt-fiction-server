const fictionService = require('../services/fiction_service');

const getHotFictionList = async (ctx,next) =>{
    try{
        ctx.body = await fictionService.getHotFictionList();
    }catch(e){
        ctx.body = {
            error:1,
            info:e
        }
    }
}

const saveFiction = async (ctx,next) =>{
    try{
        await fictionService.saveFiction({
            bookName: 'BBBB',
            author: 'gb',
            latestChapter: '第100章 大战',
            source: '起点',
            updateTime: '2018-08-08'
        });
        ctx.body = '保存成功';
    }catch(e){
        ctx.body = {
            error:1,
            info:e
        }
    }
}



module.exports = {
    getHotFictionList,
    saveFiction
}
