var organismi = [];

var quanti = 100; // QUANTI ABITANTI DI PARTENZA

var can_x = 200; // LARGEZZA MONDO
var can_y = 200; // ALTEZZA MONDO

var out_1,out_2,out_3,out_4,out_5,out_6,out_7,out_8;

var NATI=0;
var MORTI=0;
var EVOLUTI=0;
var GRAND=0;
var VIT_MAX=0;
var STERILI=0;
var GUERRA=0;
var TUTTI=0;
var TUTTI_VIVI=0;
var VECCHI=0;
var TEMPO=0;
var ABORTO=0;
var FEMM=0;
var MASC=0;

function setup() {
  //frameRate(120);
  createCanvas(can_x, can_y);
  for (var i=0; i < quanti; i++) {
    organismi[i] = new organismo();
  }
 
 out_1= document.getElementById("output_1");
 out_2= document.getElementById("output_2");
 out_3= document.getElementById("output_3");
 out_4= document.getElementById("output_4");
 out_5= document.getElementById("output_5");
 out_6= document.getElementById("output_6");
 out_7= document.getElementById("output_7");
 out_8= document.getElementById("output_8");
}

function draw() {

	  background(128);
	
	  TUTTI=0;
	  MASC=0;
	  FEMM=0;
	  
  for (var t=0;t<organismi.length;t++) {
	  
	  if (organismi[t].vivo == true) {
		TUTTI +=1;
		VIT_MAX += organismi[t].limite;
		GRAND += organismi[t].massa;
		if(organismi[t].sex == "M")
			MASC+=1;
		else
			FEMM+=1;
	  }
  };
  
  GRAND = GRAND/organismi.length;
  VIT_MAX=VIT_MAX/organismi.length;

	out_1.innerHTML = "<b> (TOT) " + NATI  + " - (ABORTI) "+ ABORTO+  " - (STERILI) " + STERILI +"</b>";
	out_2.innerHTML = "<b> (TOT) " + MORTI + " - (SPAZIO RIDOTTO) " + GUERRA + " - (DI VECCHIAIA) " + VECCHI + "</b>";
	out_3.innerHTML = "<b>" + EVOLUTI + "</b>";
	out_5.innerHTML = "<b>"+ floor(VIT_MAX) + " (ANNI)"+"</b>";
	out_4.innerHTML = "<b>" + nf(GRAND,0,2) +"</b>";
	out_6.innerHTML = "<b>" + floor(TEMPO*10) + " (ANNI)" + "</b>";
	out_8.innerHTML = "<b>"  +"</b>";
  
  for (var ix=0; ix < organismi.length; ix++) {
	  organismi[ix].muovi();
	  organismi[ix].disegna();
	  organismi[ix].eta();
  };
 
   for (var i=0; i < organismi.length; i++) {
	   
  		for (var x = i; x < organismi.length; x++){
			
			if (i!=x && organismi[i].DM(organismi[x])==true){			organismi[i].famiglia(organismi[x]);
																							organismi[i].mangia(organismi[x]);
																							organismi[i].guerra(organismi[x]);
																					}
		}
   };
  
  if(TUTTI > 0)
  TEMPO+=0.001;

  for (var tx=0;tx<organismi.length;tx++) {  
	  	  if(organismi[tx].mangiato == true) {
		  organismi.splice(tx,1);
	  };
  };
  
    out_7.innerHTML = "<b> (TOT) " + TUTTI +" - (F) " + FEMM + " - (M) " + MASC + "</b>";
}