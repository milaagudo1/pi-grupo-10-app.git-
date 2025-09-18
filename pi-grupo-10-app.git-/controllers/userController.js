module.exports = {
    profile: function (req, res) {
        res.render('profile', { title: 'Express' });
    },
    login: function (req, res) {
        res.render('login', { title: 'Express' });
    },
    register: function (req, res) {
        res.render('register', { title: 'Express' });
    }
}