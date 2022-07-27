var util = {};

util.로그인여부 = function(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.redirect('/auth/kakao')
  }
}

util.관리자여부 = function(req, res, next){
  if(req.user.user.role != '관리자'){
    res.redirect('/')
  }
  else{
    next()
  }
}

module.exports = util;