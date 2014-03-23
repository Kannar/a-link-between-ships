window.onload = function(){
    var Titre = document.getElementById("Titre");
   TweenLite.to(Titre, 0.5, {left:"25%"});

   var BoutonStart = document.getElementById("BoutonStart");
   TweenLite.from(BoutonStart, 2, {opacity:0, left:"100%"});

  $("#BoutonStart").hover(function() {
	TweenLite.to($("#BoutonStart"), 0.5, {scale:1.5, opacity:1});
	}, function() {
    TweenLite.to($("#BoutonStart"), 0.5, {scale:1, opacity:1});
  });

  $("#BoutonStart").click(function() {
	TweenLite.to($("#BoutonStart"), 0.1, {scale:0.5, opacity:1});
	window.location="index.html";
});
}

