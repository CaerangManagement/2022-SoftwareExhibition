$('.itemImg').click((e)=>{
  let post_id = e.target.dataset.id
  location.href='/posts/detail/'+post_id
})