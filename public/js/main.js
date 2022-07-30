$(document).ready(function($) {
  $('#role').click(() => {
    let pw = prompt('관리자 비밀번호를 입력해주세요')

    $.ajax({
      method: 'post',
      url: '/auth/role',
      data: {
        pw: pw
      }
    }).done(function (결과) {
      alert('관리자 계정으로 전환 되었습니다.')
      location.href = '/'
    }).fail(function (a, b, c) {
      alert('비밀번호가 일치하지 않습니다.')
    });

  })

  $(".scroll_move").click(function(event){
      console.log(".scroll_move");         
      event.preventDefault();
      $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
  });
});