var express  = require('express');
var router = express.Router();
var Comment = require('../models/Comment');
var Post = require('../models/Post');
var util = require('../util');


router.use(util.로그인여부)
// create
router.post('/', function(req, res){ // 1
  let comment = new Comment();
  comment.contents = req.body.contents;
  comment.author = req.user.user.nickname;
  console.log(comment)

  Post.findOneAndUpdate({_id : req.body.id}, 
    { $push: { comments : comment}}, function (에러, 결과) {
      if(에러){
          console.log(에러);
          res.status(500).send('댓글작성 실패')
      }
      // res.redirect('/post/'+요청.body.id);\
      res.status(200).send('댓글작성 성공')
  });
});

// destroy // 3
router.delete('/', function(req, res){
  let c_id = req.body.c_index;
  Post.findOneAndUpdate({_id:req.body.id},
    { $pull: {comments:{_id:c_id}}}, (err)=>{
      if(err){
        console.log(err)
        res.status(500).send('댓글삭제 실패')
      }
      else{
        res.status(200).send('댓글삭제 성공')
      }
    })
  
  
});

module.exports = router;