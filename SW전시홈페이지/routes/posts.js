var express  = require('express');
var router = express.Router();
var Post = require('../models/Post');

function 로그인여부(요청, 응답, next) {
  if (요청.user) {
    next()
  } else {
    응답.redirect('/auth/kakao')
  }
}

router.use(로그인여부)
// Index 
router.get('/', function(req, res){
  Post.find({})                  // 1
  .sort('-createdAt')            // 1
  .exec(function(err, posts){    // 1
    if(err) return res.json(err);
    res.render('posts/index', {posts:posts});
  });
});

// New
router.get('/new', function(req, res){
  res.render('posts/new');
});

// create
router.post('/', function(req, res){
  req.body.author = req.user.user.nickname; // 2
  Post.create(req.body, function(err, post){
    if(err){
      console.log(err)
      return res.redirect('/posts/new');
    }
    res.redirect('/posts');
  });
});

// show
router.get('/:id', function(req, res){
  Post.findOne({_id:req.params.id}) // 3
    .populate('author')             // 3
    .exec(function(err, post){      // 3
      if(err) return res.json(err);
      res.render('posts/show', {post:post});
    });
});

// edit
router.get('/:id/edit', function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render('posts/edit', {post:post});
  });
});

// update
router.put('/:id', function(req, res){
  req.body.updatedAt = Date.now(); //2
  Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect("/posts/"+req.params.id);
  });
});

// destroy
router.delete('/:id', function(req, res){
  Post.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/posts');
  });
});

module.exports = router;