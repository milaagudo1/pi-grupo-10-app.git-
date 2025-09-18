module.exports = {
    productDetail: function (req, res) {
        res.render('productDetail', { title: 'Express' });
    },
    addProduct: function (req, res) {
        res.render('addProduct', { title: 'Express' });
    }
}