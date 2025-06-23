
var bx= document.getElementById('bingoSize').value;
var pas=bw/bx;
var size_regul=10-bx;

//lists

//for collapsible
var coll = document.getElementsByClassName("collapsible");
var i;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var fontList = ["bold ", (size_regul*7).toString(), "px ", "serif"];
context.font = "".concat(...fontList);


// Padding
var p = 10;
// Box size
canvas.height = window.innerHeight;
canvas.width = canvas.height;
var bw = canvas.height-p*2;
var bh = canvas.width-p*2;



function drawBoard(){
  
	bx= document.getElementById('bingoSize').value;
	pas=bw/bx;
	size_regul=12-bx;
	fontList = ["bold ", (size_regul*5).toString(), "px ", "serif"];
	context.font = "".concat(...fontList);
	context.fillStyle = "#2c2c6b";
	context.rect(0, 0, bw+p*2, bh+p*2);
	context.fill();
	
	context.beginPath();
	
    for (var x = 0; x <= bw; x += pas) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += pas) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }
	
	for (var x = 0; x <= bw; x += pas) {
	}
    context.strokeStyle = "#c4daed";
    context.stroke();
}

drawBoard();

function fillBingo() {	
	fontList = ["bold ", (size_regul*5).toString(), "px ", "serif"];
	context.font = "".concat(...fontList);
	let prompts = new Map([
			[ "ffivCharscheck", []], 
			[ "tayCharscheck",  [] ],
			[ "locationscheck",  [] ],
			[ "ffivElemcheck",  [] ],
			[ "ffivMusiccheck",  [] ],
			[ "creativecheck",  [] ],
			[ "angstcheck",  [] ],
			[ "fluffcheck",  [] ],
			[ "themecheck",  [] ],
			[ "writingcheck",  [] ],
			[ "visualcheck",  [] ],
		]);
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBoard();
	
			var keys = [];
			var keys_n=[];
            let checkboxes =
                document.getElementsByName('item');
            let result = "";
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
					prompts.get(checkboxes[i].className).push(checkboxes[i].value);
					if (keys.includes(checkboxes[i].className)==false){
						keys.push(checkboxes[i].className);
						keys_n.push(1)
					}else{
						keys_n[keys.indexOf(checkboxes[i].className)]=keys_n[keys.indexOf(checkboxes[i].className)]+1;
					}
                }
            }
			var cat_list=[];
			//number of category
			if ( (bx*bx) < keys.length){
				while (cat_list.length < (bx*bx)){
					var rand_cat= Math.floor(Math.random() * keys.length);
					if (!(cat_list.includes(keys[rand_cat]))){
						cat_list.push(keys[rand_cat]);
						keys_n[rand_cat]=keys_n[rand_cat]-1;
					}
				}
			}else {
				n_cat=Math.floor((bx*bx)/keys.length);
				for (var i = 0; i < keys.length; i++){
					for (var j = 0; j < n_cat; j++){
					if (0 < keys_n[i]){
					 cat_list.push(keys[i]);
					 keys_n[i]=keys_n[i]-1;
					}
					}
				}
			}
			var diff = bx*bx - cat_list.length
			for (var i = 0; i < diff; i++){
				var cat = keys_n.indexOf(Math.max(...keys_n));
				if (0 < keys_n[cat]){
				 cat_list.push(keys[cat]);
				 keys_n[cat]=keys_n[cat]-1
				}
			}
			
			console.log(cat_list)

			
			context.fillStyle = "#c4daed";
			for (var x = 0; x < bw; x += pas) {
				for (var y = 0; y < bh; y += pas) {
					console.log("a");
					console.log(cat_list);
					var curr_cat= Math.floor(Math.random() * cat_list.length);
					var elemRand = Math.floor(Math.random() * prompts.get(cat_list[curr_cat]).length);
					
					var prompt0 =prompts.get(cat_list[curr_cat])[elemRand];
					var promptn = prompt0.split(" ");
					var y2=0;
					
					
					for (var i = 0; i < promptn.length; i++){
						promptn[i]=promptn[i].replaceAll("_", " ");
						console.log(promptn[i])
						context.fillText(promptn[i], x+pas/2-promptn[i].length*size_regul, y+pas/2+y2);
						y2=y2+10+size_regul*5;
					}
					if (	context.fillStyle == "#c4daed"){
        	  context.fillStyle = "#dcde9c";
        	}else{
        	  context.fillStyle = "#c4daed";
        	}
					
					
					prompts.get(cat_list[curr_cat]).splice(elemRand,1); 
					console.log(prompts.get(cat_list[curr_cat]));
					if ( prompts.get(cat_list[curr_cat] == [])){
						console.log("b")
						for (var i = 0; i < cat_list.length; i++){
							if (cat_list[i] == curr_cat){
								cat_list.splice(i, 1);
							}
						}
					}else {
					cat_list.splice(curr_cat, 1);
					}
					console.log(cat_list)
				}
			}
        }
		

function openList(contentID) {
    var content = document.getElementById(contentID);
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  };
 function toggle(source,className) {
	console.log(className);
  checkboxes = document.getElementsByClassName(className);
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;
  }
}