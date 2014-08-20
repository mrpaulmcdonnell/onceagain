var index;
var images;
var tvObj;
var tvImg;
var timer;
function init(){
	index = 1;
	images = ['img1.jpg','img2.jpg','img3.jpg','img4.jpg','img5.jpg'];
	tvObj = document.getElementById("box");
	tvImg = tvObj.getElementsByTagName("img")[0];
	if(timer){
		clearInterval(timer);
	}else{
		timer = setInterval("changeImg()",1000);
	}
}

function changeImg(){
	tvImg.src="images/"+images[index];
	index++;
	if(index==5){index=0;}
}

window.onload=function(){
	init();	
	document.getElementById("audio1").play();
}

$(document).ready(function() {
    $("#music1").click(function() {
     document.getElementById("audio1").play();
	 document.getElementById("audio2").pause();
	 document.getElementById("audio3").pause();
	 document.getElementById("audio4").pause();
    });
    $("#music2").click(function() {
     document.getElementById("audio2").play();
	 document.getElementById("audio1").pause();
	 document.getElementById("audio3").pause();
	 document.getElementById("audio4").pause();
    });
	$("#music3").click(function() {
     document.getElementById("audio3").play();
	 document.getElementById("audio1").pause();
	 document.getElementById("audio2").pause();
	 document.getElementById("audio4").pause();
    });
	$("#music4").click(function() {
     document.getElementById("audio4").play();
	 document.getElementById("audio1").pause();
	 document.getElementById("audio2").pause();
	 document.getElementById("audio3").pause();
    });
	$("#stop").click(function() {
     document.getElementById("audio1").pause();
	 document.getElementById("audio2").pause();
	 document.getElementById("audio3").pause();
	 document.getElementById("audio4").pause();
    });

});