$(document).ready(function() {

  //헤더 메뉴 누르면 그 영역에 스크롤 내려가게 하기
  $(".scroll_move").click(function(event){
      console.log(".scroll_move");         
      event.preventDefault();
      $('html,body').animate({scrollTop:$(this.hash).offset().top}, 100);
  });

  //section2 스크롤 인지 후 애니메이션
  $(window).scroll( function() {
    $('.section2_box1').each(function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if( bottom_of_window > bottom_of_object/2 ){
          $(this).animate({'opacity':'1'},2000);
      }
    });
  }); 
  
  $(window).scroll( function() {
    $('.section2_box2').each(function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if( bottom_of_window > bottom_of_object/2 ){
          $(this).animate({'opacity':'1'},2000);
      }
    });
  }); 
   
  $(window).scroll( function() {
    $('.section2_box3').each(function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if( bottom_of_window > bottom_of_object/2 ){
          $(this).animate({'opacity':'1'},2000);
      }
    });
  }); 

  //section3 스크롤 인지 후 애니메이션
  $(window).scroll( function() {
    $('.team1_select').each(function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if( bottom_of_window > bottom_of_object ){
          $(this).animate({'opacity':'1'},1000);
      }
    });
  }); 

  $(window).scroll( function() {
    $('.team2_select').each(function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if( bottom_of_window > bottom_of_object ){
          $(this).animate({'opacity':'1'},1000);
      }
    });
  }); 

  $(window).scroll( function() {
    $('.team3_select').each(function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if( bottom_of_window > bottom_of_object ){
          $(this).animate({'opacity':'1'},1000);
      }
    });
  }); 

  $(window).scroll( function() {
    $('.team4_select').each(function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if( bottom_of_window > bottom_of_object ){
          $(this).animate({'opacity':'1'},1000);
      }
    });
  }); 

  $(window).scroll( function() {
    $('.team5_select').each(function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      
      if( bottom_of_window > bottom_of_object ){
          $(this).animate({'opacity':'1'},1000);
      }
    });
  }); 

  $(window).scroll(function() {
    $('.s3_title').each(function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if(bottom_of_window > bottom_of_object) {
        $(this).animate({'transition':'20px'}, 1000);
      }
    });
  });

});
