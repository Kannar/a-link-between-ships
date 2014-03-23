window.onload = function(){
    var GameOver = document.getElementById("GameOver");
  TweenLite.to($("#GameOver"), 0, {scale:0, opacity:1});
   TweenLite.to($("#GameOver"), 1, {scale:1.5, opacity:1});
   GameOver.add(getParticlesAnimation(), "particles")
}
