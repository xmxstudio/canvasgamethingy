let targets = [];
let target = (x,y,r)=>{
	return { 
		x: Math.random() * 790 + 1,
		y: Math.random() * 200 + 1,
		r: Math.random() * 30+10,
		dead: false,
		c: `#${Math.floor(Math.random()*16777215).toString(16)}`,
		update: function(){
			this.r-=0.02;
			if(this.r <=0){
				this.r = 0.1;
				this.dead=true;
				targets.push(target());
			}
		},
		draw: function(){
			ctx.beginPath();
			ctx.strokeStyle = '#000';
			ctx.fillStyle = this.c;
			ctx.arc(this.x,this.y,this.r, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
		}
	}
}