let stars = [];
let star = (x,y,r)=>{
	return { 
		x: Math.random() * 790 + 1,
		y: Math.random() * 200 + 1,
		size: Math.random()*2+0.1,
		xvel: Math.random() * 1,
		dead: false,
		c: `rgba(255,255,255,${Math.random()})`,
		update: function(){
			this.x += this.xvel; 
			if(this.x >= 800){
				this.x = 0 - (Math.random()*50);
			}
		},
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = this.c;
			ctx.fillRect(this.x,this.y,this.size,this.size);
		}
	}
}