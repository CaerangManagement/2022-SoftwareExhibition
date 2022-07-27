const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Check = require('../models/Check'); // 1

const util = require('../util');
const multer = require('multer');
const path = require('path');


// Index 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});

var upload = multer({ storage: storage })

// New
router.get('/new', util.로그인여부, util.관리자여부, function (req, res) {
  res.render('posts/new');
});



router.get('/:team', function (req, res) {
  Post.find({ team: req.params.team })                  // 1
    .sort('-createdAt')            // 1
    .exec(function (err, posts) {    // 1
      if (err) return res.json(err);
      res.render('posts/index', { posts: posts, team: req.params.team });
    });
});

// show
router.get('/detail/:id', util.로그인여부, function (req, res) {
  Post.findOne({ _id: req.params.id }, function (err, post) {
    if (err) return res.json(err);

    Check.findOne({id:req.params.id+req.user.user.id}, (err, check)=>{
      if(check){
        res.render('posts/show', { post: post, team: post.team , isLiked : check.isLiked});
      }
      else{
        res.render('posts/show', { post: post, team: post.team , isLiked : false});
      }
    })
    
  });
});

// create
router.post('/', util.로그인여부, util.관리자여부, upload.single("image"), function (req, res) {
  let post = new Post();

  post.author = req.user.user.nickname;
  post.title = req.body.title;
  post.contents = req.body.contents;
  post.team = req.body.team;

  if (req.file) {
    post.image = `images/${req.file.filename}`;
  }

  console.log(post)

  post.save(function (err) {
    if (err) {
      console.log(err);
      res.redirect(`/posts/${req.body.team}`);
    }
    res.redirect(`/posts/${req.body.team}`);
  });
});



// edit
router.get('/edit/:id', util.로그인여부, util.관리자여부, function (req, res) {
  Post.findOne({ _id: req.params.id }, function (err, post) {
    if (err) return res.json(err);
    res.render('posts/edit', { post: post, team: post.team });
  });
});

// update
router.put('/:id', util.로그인여부, util.관리자여부, upload.single("image"), function (req, res) {
  req.body.updatedAt = Date.now(); //2

  if (req.file) {
    req.body.image = `images/${req.file.filename}`;
  }


  Post.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, post) {
    if (err) return res.json(err);
    res.redirect(`/posts/detail/${req.params.id}`);
  });
});
// destroy
router.delete('/:team/:id', util.로그인여부, util.관리자여부, function (req, res) {
  Post.deleteOne({ _id: req.params.id }, function (err) {
    if (err) return res.json(err);
    res.redirect('/posts/' + req.params.team);
  });
});



//좋아요기능
router.post('/like', util.로그인여부, (req, res) => {
  let check_id = req.body.post_id+req.body.user_id

  Check.findOne({id:check_id}, (err, check) => {
    if (check!=null) { //check 스키마가 존재할때 -> 이미 한번 눌렀었던것 
          if (check.isLiked === true) { //그값이 True이면
            //업데이트로 isliked false로 수정
            console.log(req.body.post_id, 1)
            Post.findOneAndUpdate({ _id: req.body.post_id },
              { $inc: { like: -1 } }, (err, post)=>{
                console.log(err, post)
                change(false)
                res.status(200).send('좋아요취소')
              })
          }
          else {
            console.log(req.body.post_id, 2)
            Post.findOneAndUpdate({ _id: req.body.post_id },
              { $inc: { like: 1 } }, (err, post)=>{
                console.log(err, post)
                change(true)
                res.status(200).send('좋아요')
              })
          }
    }
    else { //체크 스키마가 만들어지기 전이니 처음 눌렀을때  
      let check = new Check();
      check.id = check_id;
      check.isLiked = true;

      console.log(req.body.post_id, 3)
      check.save((err) => {
        if (err) { console.log(err) }
      })

      Post.findOneAndUpdate({ _id: req.body.post_id },
        { $inc: { like: 1 } }, (err, post)=>{
          console.log(err, post)
          res.status(200).send('첫좋아요')
        })
    }
  })


  let change = (bool) => {
    Check.findOneAndUpdate({ id:check_id },
      { $set: { isLiked: bool } }, (err, check) => {
      });
  }
})

module.exports = router;
