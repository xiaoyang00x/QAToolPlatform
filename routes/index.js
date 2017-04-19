module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/signin');
  });

  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
  app.use('/home', require('./home'));
  app.use('/postman', require('./postman'));
  //app.use('/postman/getToken', require('./postman'));

	  // 404 page
	app.use(function (req, res) {
	  if (!res.headersSent) {
	    res.render('404');
	  }
	});
};