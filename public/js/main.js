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

  $('#back').click(() => {
    let pw = prompt('관리자 비밀번호를 입력해주세요')

    $.ajax({
      method: 'post',
      url: '/auth/back',
      data: {
        pw: pw
      }
    }).done(function (결과) {
      alert('일반 계정으로 전환 되었습니다.')
      location.href = '/'
    }).fail(function (a, b, c) {
      alert('비밀번호가 일치하지 않습니다.')
    });

  })

  //헤더 메뉴 누르면 그 영역에 스크롤 내려가게 하기
  $(".scroll_move").click(function(event){
      console.log(".scroll_move");         
      event.preventDefault();
      $('html,body').animate({scrollTop:$(this.hash).offset().top}, 100);
  });

  //section2 스크롤 인지 후 애니메이션
  $('.section2_box1').each(function(){
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        
        if( bottom_of_window > bottom_of_object/2 ){
            $(this).animate({'opacity':'1'},2000);
        }
  }); 
  
  $('.section2_box2').each(function(){
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        
        if( bottom_of_window > bottom_of_object/2 ){
            $(this).animate({'opacity':'1'},3000);
        }
  }); 
   
  $('.section2_box3').each(function(){
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        
        if( bottom_of_window > bottom_of_object/2 ){
            $(this).animate({'opacity':'1'},4000);
        }
  }); 

  //section3 스크롤 인지 후 애니메이션
  $('.team1_select').each(function() {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        if( bottom_of_window > bottom_of_object/2) {
            $(this).animate({'opacity':'1'},2000);
        }
  });

  $('.team2_select').each(function() {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        if( bottom_of_window > bottom_of_object/2) {
            $(this).animate({'opacity':'1'},2000);
        }
  });

  $('.team3_select').each(function() {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        if( bottom_of_window > bottom_of_object/2) {
            $(this).animate({'opacity':'1'},2000);
        }
  });

  $('.team4_select').each(function() {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        if( bottom_of_window > bottom_of_object/2) {
            $(this).animate({'opacity':'1'},2000);
        }
  });

  $('.team5_select').each(function() {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        if( bottom_of_window > bottom_of_object/2) {
            $(this).animate({'opacity':'1'},2000);
        }
  });

});
