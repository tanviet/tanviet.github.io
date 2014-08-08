'use strict';

// // The Package is past automatically as first parameter
// module.exports = function(Feed, app, auth, database) {

//   app.get('/feed/example/anyone', function(req, res, next) {
//     res.send('Anyone can access this');
//   });

//   app.get('/feed/example/auth', auth.requiresLogin, function(req, res, next) {
//     res.send('Only authenticated users can access this');
//   });

//   app.get('/feed/example/admin', auth.requiresAdmin, function(req, res, next) {
//     res.send('Only users with Admin role can access this');
//   });

//   app.get('/feed/example/render', function(req, res, next) {
//     Feed.render('index', {
//       package: 'feed'
//     }, function(err, html) {
//       //Rendering a view from the Package server/views
//       res.send(html);
//     });
//   });
// };

var feeds = require('../controllers/feeds');

// Feeds authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.feed.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};
 
module.exports = function(Feeds, app, auth) {

    app.route('/feeds')
      .get(feeds.all)
      .post(auth.requiresLogin, feeds.create);
    app.route('/feeds/:feedId')
      .get(feeds.show)
      .put(auth.requiresLogin, hasAuthorization, feeds.update)
      .delete(auth.requiresLogin, hasAuthorization, feeds.destroy);
      
    // Finish with setting up the feedId param
    app.param('feedId', feeds.feed);
};
