const express  = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment'); // 1
const util = require('../util');
const multer = require('multer');
const path = require('path');

router.use(express.static('public'));
router.use(util.로그인여부)
// Index 
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "public/images/");
  },
  filename: function(req, file, cb){
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" +Date.now()+ext);
  },
});

var upload = multer({storage: storage})



// New
router.get('/new', function(req, res){
  res.render('posts/new');
});



router.get('/:team', function(req, res){
  Post.find({team:req.params.team})                  // 1
  .sort('-createdAt')            // 1
  .exec(function(err, posts){    // 1
    if(err) return res.json(err);
    res.render('posts/index', {posts:posts, team:req.params.team});
  });
});

// show
router.get('/detail/:id', function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render('posts/show', {post:post, team:post.team});
  });
});

// create
router.post('/', upload.single("image") ,function(req, res){
  let post = new Post();

  post.author = req.user.user.nickname;
  post.image = `images/${req.file.filename}`;
  post.title = req.body.title;
  post.contents = req.body.contents;
  post.team = req.body.team;

  console.log(post)

  post.save(function (err) {
    if(err){
      console.log(err);
      res.redirect(`/posts/${req.body.team}`);
    }
    res.redirect(`/posts/${req.body.team}`);
  });
});



// edit
router.get('/edit/:id', function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render('posts/edit', {post:post, team:post.team});
  });
});

// update
router.put('/:id', upload.single("image"), function(req, res){
  req.body.updatedAt = Date.now(); //2
  
  req.body.image = `images/${req.file.filename}`;

  Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect(`/posts/detail/${req.params.id}`);
  });
});
// destroy
router.delete('/:team/:id', function(req, res){
  Post.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/posts/'+req.params.team);
  });
});

module.exports = router;
