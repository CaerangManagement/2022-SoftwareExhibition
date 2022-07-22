var express  = require('express');
var router = express.Router();
var Comment = require('../models/Comment');
var Post = require('../models/Post');
var util = require('../util');


router.use(util.로그인여부)
// create
router.post('/', function(req, res){ // 1
  req.body.author = req.user.user.nickname; // 2
  req.body.post = req.body.postId;
  Comment.create(req.body, function(err, comment){
    if(err){
      req.flash('commentForm', { _id: null, form:req.body });                 // 3
      req.flash('commentError', { _id: null, errors:util.parseError(err) });  // 3
    }
    return res.redirect('/posts/'+req.body.post+res.locals.getPostQueryString()); //4
  });
});

// destroy // 3
router.delete('/:id', function(req, res){
  const post_id = req.body.postId;
  Comment.findOne({_id:req.params.id}, function(err, comment){
    if(err) return res.json(err);

    // save updated comment
    comment.isDeleted = true;
    comment.save(function(err, comment){
      if(err) return res.json(err);
      return res.redirect('/posts/'+post_id+res.locals.getPostQueryString());
    });
  });
});

module.exports = router;