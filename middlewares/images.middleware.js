const db = require('../models/db');

module.exports = {
    images: (req, res, next) => {
        const img = ['lua.jpg', 'lua.jpg', 'lua.jpg', 'ngo-1.jpg', 'khoai.jpg', 'san.jpg'];
        const crops = db.get('crops').value();
        const seeds = db.get('seeds').find({ id: req.params.id }).value();
        const list = db.get('crops').find({ id: seeds.crops }).value();
        const result = [];
        for (var i = 0; i < crops.length; i++){
            if (crops[i].id == list.id && seeds.type == 'GKIfj0e80') {
                result[0] = 'khoai-tay.jpg';
            }
            else if (crops[i].id == list.id) {
                result[0] = img[i];
            }
            else {

            }
        }
        req.images = result;
        next();
    },
    loadImages: (req, res, next) => {
        const img = ['lua.jpg', 'lua.jpg', 'lua.jpg', 'ngo-1.jpg', 'khoai.jpg', 'san.jpg'];
        const crops = db.get('crops').value();
        const types1 = db.get('types').find({ id: req.params.load }).value();
        const list = db.get('crops').find({ id: types1.crops }).value();
        const result = [];
        for (var i = 0; i < crops.length; i++) {
            if (crops[i].id == list.id && types1.id == 'GKIfj0e80') {
                result[0] = 'khoai-tay.jpg';
            }
            else if (crops[i].id == list.id) {
                result[0] = img[i];
            }
            else {
                
            }
        }
        req.images = result;
        next();
    }
}