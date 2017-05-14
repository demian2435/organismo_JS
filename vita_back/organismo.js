//===========================================
// ORGANISMO
//===========================================

function organismo (gen1, gen2,b_gem) {
TUTTI+=1;
NATI +=1;
 this.puberta=random(12,16);
 this.MALE=false;
 this.genitore=this.puberta;
 this.vivo = true;
 this.mangiato = false;
 this.x = floor(random(can_x));
 this.y = floor(random(can_y));
 this.life_time = random(0,70);
 this.limite=random(50,70);
 
 if(random(1) < 0.5) {
 this.sex = "M";
 this.massa = floor(random(10,15));
 } else {
 this.sex = "F";
 this.menopausa=random(45,55);
 this.massa = floor(random(8,12));
 };
 
 if(gen1 !== undefined) {
   this.life_time = 0;
   this.limite = random(gen1.limite,gen2.limite);
   this.massa = random(gen1.massa, gen2.massa);
   this.x=gen1.x+(random(-1,1));
   this.y=gen1.y+(random(-1,1));
 };
 
 if(b_gem !== undefined) {
 this.life_time = 0;
 this.MALE=true;
 this.massa = (gen1.massa + gen2.massa)/4;
 };

}

organismo.prototype.disegna = function () {
//noStroke();
 if (this.vivo) {
	 
if(this.sex == "M" && this.MALE == false){
	if (this.life_time < this.puberta) {
		fill(167,243,255);
		ellipse(this.x,this.y,this.massa/2);
	}
	if (this.life_time >= this.puberta && this.life_time < 70){
		fill(39,49,216);
		ellipse(this.x,this.y,this.massa);
	}
	if (this.life_time >= 70){
		fill(77,97,113);
		ellipse(this.x,this.y,this.massa);
	}
};

if(this.sex == "F" && this.MALE == false){
	if (this.life_time < this.puberta) {
		fill(255,183,242);
		ellipse(this.x,this.y,this.massa/2);
	}
	if (this.life_time >= this.puberta && this.life_time < 70){
		fill(255,62,146);
		ellipse(this.x,this.y,this.massa);
	}
	if (this.life_time >= 70){
		fill(134,101,120);
		ellipse(this.x,this.y,this.massa);
	}
};

if(this.MALE==true) {
	fill(240,230,140);
	ellipse(this.x,this.y,this.massa);
}

}  else {fill(255); ellipse(this.x,this.y,this.massa);}
 

}


organismo.prototype.muovi = function() {
	if (this.vivo){
	  
		if(this.life_time > this.puberta && this.life_time < 70) {
			switch ( floor ( random (4) ) ) {
				case 0:
					this.x += this.massa/10;
					break;
				case 1:
					this.x -= this.massa/10;
					break;
				case 2:
					this.y += this.massa/10;
					break;
				case 3:
					this.y -= this.massa/10;
					break;
			};
		};	
		if (this.life_time < this.puberta || this.life_time >= 70) {
			switch ( floor ( random (4) ) ) {
			case 0:
				this.x += this.massa/50;
				break;
			case 1:
				this.x -= this.massa/50;
				break;
			case 2:
				this.y += this.massa/50;
				break;
			case 3:
				this.y -= this.massa/50;
				break;
			};
		};

	    if ((this.x+(this.massa/2)) > can_x)
			this.x = can_x-(this.massa/2);
		
		if ((this.x-(this.massa/2)) < 0)
			this.x = this.massa/2;
	   
		if ((this.y+(this.massa/2)) > can_y)
			this.y = can_y-(this.massa/2);

		if((this.y-(this.massa/2)) < 0)
			this.y= this.massa/2;
	};
};

organismo.prototype.eta = function () {
  if (this.vivo){
  if (this.life_time < this.limite) {
  this.life_time += 0.01;
  } else {
  this.vivo = false;
  VECCHI +=1;
  MORTI +=1;
  TUTTI -=1;
  };
};
}

organismo.prototype.famiglia = function (vicino) {

  if (this.sex =="F" && vicino.sex == "M" &&  this.vivo ==  vicino.vivo && this.FERTILE() && vicino.life_time > vicino.puberta && this.MALE==false && vicino.MALE==false){

	if (random(100) < random(9,12) && this.life_time <  20){
		 ABORTO+=1;
		 this.genitore=this.life_time+(random(0.1,0.25));
		 return;
	 };
	 
	if (random(100) < random(20,30) && this.life_time >=  20 && this.life_time < 45 ){
		 ABORTO+=1;
		 this.genitore=this.life_time+(random(0.1,0.25));
		 return;
	 }; 
	 
	 if (random(100) < random(50,70) && this.life_time >= 45){
		 ABORTO+=1;
		 this.genitore=this.life_time+(random(0.1,0.25));
		 return;
	 }; 

  if(random(100) < 8){
    organismi.push(new organismo(this,vicino,true));
    STERILI+=1;
	this.genitore=this.life_time+1;
	return;
  };
  
  organismi.push(new organismo(this,vicino));
  this.genitore=this.life_time+1;
  return;
  };

   if (this.sex =="M" && vicino.sex == "F" &&  this.vivo ==  vicino.vivo  && vicino.FERTILE()  && this.life_time > this.puberta && this.MALE!=true && vicino.MALE!=true){
  
	if (random(100) < random(9,12) && vicino.life_time <  20){
		 ABORTO+=1;
		 vicino.genitore=vicino.life_time+(random(0.1,0.25));
		 return;
	 };
	 
	if (random(100) < random(20,30) && vicino.life_time >=  20 && vicino.life_time < 45 ){
		 ABORTO+=1;
		 vicino.genitore=vicino.life_time+(random(0.1,0.25));
		 return;
	 }; 
	 
	 if (random(100) < random(50,70) && vicino.life_time >= 45){
		 ABORTO+=1;
		 vicino.genitore=vicino.life_time+(random(0.1,0.25));
		 return;
	 }; 

	if(random(100) < 8){
		organismi.push(new organismo(vicino,this,true));
		STERILI+=1;
		vicino.genitore=vicino.life_time+1;
		return;
	};

  organismi.push(new organismo(vicino,this));
  vicino.genitore=vicino.life_time+1;
  return;
  };
}

organismo.prototype.mangia = function (vicino) {
	
  if (this.vivo == true && vicino.vivo == false && vicino.mangiato==false && this.life_time > this.puberta){
  this.limite += vicino.limite/10;
  //this.massa += vicino.massa/10;
  vicino.mangiato = true;
  //EVOLUTI += 1;
  };
  if (this.vivo == false && vicino.vivo == true && this.mangiato==false && vicino.life_time > vicino.puberta){
  vicino.life_time += this.limite/10;
  //vicino.massa += this.massa/10;
  this.mangiato = true;
  //EVOLUTI += 1;
  }; 
}

organismo.prototype.guerra = function (vicino) {

  if (this.sex == vicino.sex &&  this.life_time > this.puberta && vicino.life_time > vicino.puberta && this.vivo == true && vicino.vivo == true && this.mangiato == false && vicino.mangiato==false) {
 
	if (this.massa/this.life_time < vicino.massa/vicino.life_time) {
		this.mangiato=true;
		this.vivo=false;
		GUERRA +=1;
		MORTI +=1;
		TUTTI -=1;
	} else {
		vicino.mangiato=true;
		vicino.vivo=false;
		GUERRA +=1;
		MORTI +=1;
		TUTTI -=1;
	}

};
}

organismo.prototype.DM = function (vicino) {
	
	if (        //DESTRA
			(this.x + (this.massa/2)) > (vicino.x-(vicino.massa/2))
			&&
			(this.x + (this.massa/2)) < (vicino.x+(vicino.massa/2))
			|| //SINISTRA
			(this.x - (this.massa/2)) < (vicino.x+(vicino.massa/2))
			&&
			(this.x - (this.massa/2)) > (vicino.x-(vicino.massa/2))
			|| //INTERO
			(this.x + (this.massa/2)) > (vicino.x-(vicino.massa/2))
			&&
			(this.x - (this.massa/2)) < (vicino.x+(vicino.massa/2))			
		) {
		
				if (         //SU
						(this.y + (this.massa/2)) > (vicino.y-(vicino.massa/2))
						&&
						(this.y + (this.massa/2)) < (vicino.y+(vicino.massa/2))
						|| //GIU
						(this.y - (this.massa/2)) < (vicino.y+(vicino.massa/2))
						&&
						(this.y - (this.massa/2)) > (vicino.y-(vicino.massa/2))
						|| //INTERO
						(this.y + (this.massa/2)) > (vicino.y-(vicino.massa/2))
						&&
						(this.y - (this.massa/2)) < (vicino.y+(vicino.massa/2))
					) {

							return true;
						};
						
					return false;
			};
					
	return false;
}

organismo.prototype.FERTILE = function () {
	
	if(this.life_time > this.puberta && this.life_time < this.menopausa && this.life_time > this.genitore){
		if (random(100)<23) {
			return true;
		}
			return false;
	}
	return false;
}