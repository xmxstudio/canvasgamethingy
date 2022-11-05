let pickups = [];
let pickup = (x,y,s)=>{
	return { 
		x:  x || Math.random() * 790 + 1,
		y: y ||  Math.random() * 200 + 1,
		size: s ||  Math.random()*2+0.1,
		dead: false,
		life: 10,
		name: ['piercing','jumpboots','shotgun'][Math.floor(Math.random() * 3)],
		c: `rgba(${Math.random() * 255},0,${Math.random() * 255},1)`,
		update: function(){

		},
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle = this.c;
			ctx.fillRect(this.x-this.size/2,this.y-this.size,this.size,this.size);
		}
	}
}