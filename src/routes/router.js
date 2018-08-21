const router = require('koa-router')();
const fictionController = require('../controllers/fiction_controller');

router.prefix('/api');
/*插入文章接口*/
router.get('/getHotFictionList',fictionController.getHotFictionList);
router.get('/saveFiction',fictionController.saveFiction);
/*router.post('/article/insertBack',backArticle.insertArticle);*/

module.exports = router;