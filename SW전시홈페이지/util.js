var util = {};

util.로그인여부 = function(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.write("<script>alert('Login is required.') \r location.href='/auth/kakao'</script>");
    // res.redirect('/auth/kakao')
  }
}

util.관리자여부 = function(req, res, next){
  if(req.user.user.role != '관리자'){
    res.write("<script>alert('admin privileges required.') \r history.back()</script>");
  }
  else{
    next()
  }
}

module.exports = util;