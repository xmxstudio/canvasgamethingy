let emitters= [];
let particle = (x,y,xvel,yvel,c,size)=>{
	return {
		x:x,
		y:y,
		c: c || 'rgba(0,0,0,1)',//`#${Math.floor(Math.random()*16777215).toString(16)}`, 
		o: 1,
		size: size,
		a: Math.floor((Math.random() * 360)/5),
		xvel: xvel || Math.random()>.5?Math.random():-Math.random(),
		yvel: yvel || -1,
		life: 0.04,
		update: function(){
			this.o -= this.life;
			this.c = c || `rgba(0,0,0,${this.o})`;
			this.x += Math.cos(this.a) * this.xvel ;
			this.y -= Math.sin(this.a) * this.yvel + gravity;
			if(this.o<=0){
				this.dead=true
			}
		},
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = this.c;
			ctx.fillRect(this.x-(size/2), this.y-(size/2), size,size);
		}
	}	
}
let textparticle = (text,x,y,xvel,yvel,c,size)=>{
	return {
		text: text,
		x:x,
		y:y,
		c: c || 'rgba(0,0,0,1)',//`#${Math.floor(Math.random()*16777215).toString(16)}`, 
		o: 1,
		size: size,
		a: Math.floor((Math.random() * 360)/5),
		xvel: xvel || Math.random()>.5?Math.random():-Math.random(),
		yvel: yvel || -1,
		life: 0.01,
		update: function(){
			this.o -= this.life;
			this.c = c || `rgba(0,0,0,${this.o})`;
			// this.x += Math.cos(this.a) * this.xvel ;
			this.y += Math.sin(this.a) *  gravity * Math.random() * 3;
			if(this.o<=0){
				this.dead=true
			}
		},
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = this.c;
			ctx.fillText(this.text,this.x,this.y);
		}
	}	
}

let particleEmitter = (x,y,xvel,yvel,c,num=5,size=4)=>{
	
	let part={
		nodes: [],
		dead: false,
		update: function(){
			this.nodes.forEach(p=>{
				p.update();
				if(p.dead){
					this.dead = true;
				}
		});
		},
		draw: function(){
		 this.nodes.forEach(p=>p.draw());
		}
};

	for(i =1;i<num;i++){
		part.nodes.push(particle(x,y,xvel,yvel,c,size));
	}

	return part;//emitters.push(part);
}
let textEmitter = (text, x,y,xvel,yvel,c,num=5,size=4)=>{
	
	let part={
		nodes: [],
		dead: false,
		update: function(){
			this.nodes.forEach(p=>{
				p.update();
				if(p.dead){
					this.dead = true;
				}
		});
		},
		draw: function(){
		 this.nodes.forEach(p=>p.draw());
		}
};
	for(i =1;i<num;i++){
		part.nodes.push(textparticle(text, x,y,xvel,yvel,c,size));
	}

	return part;//emitters.push(part);
}