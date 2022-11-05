
let projectiles=[];
let projectile = (x,y,a,grounded,owner)=>{
	return {
		x: x,
		y: y,
		a: a,
		shotWhileGrounded: grounded,
		shotBy: owner,
		update: function(){
			this.x+=Math.cos(this.a)*bulletspeed;
			this.y+=Math.sin(this.a)*bulletspeed;
			if(this.x < 0 || this.x > 800 || this.y<0 || this.y > 250){	this.dead=true;	} //bullet out of bounds
			let that = this; //bullet /projectile
			targets.forEach(function(t){
					let x = t.x - that.x;
					let y = t.y - that.y;
					let d =  Math.sqrt(x * x + y * y);
					if(d <= t.r){
						t.r++;
						that.dead =true;
						t.dead=true;
						sounds.explosion.play();
						sounds.targetExplosion.play();
						//play death
						emitters.push(particleEmitter(t.x,t.y,0,0,t.c,t.r/2));
						setTimeout(function(){
							emitters.push(particleEmitter(t.x,t.y,0,0,"rgba(0,0,0,0.5)",10,3));
						},80);
						setTimeout(function(){
							emitters.push(particleEmitter(t.x,t.y,1,1,"rgba(0,0,0,0.15)",10,2));
						},120);
						// if(player.pickups.includes('shotgun')){

						// }else{
							targets.push(target()); //if shotgun mode is enabled we get way too many targetsa
						// }
						// let oldC = t.c;
						// t.c = 	`#${Math.floor(Math.random()*16777215).toString(16)}`;
					}
			})
			platforms.forEach(platform=>{
				if(that.x >= platform.bounds.left && that.x <= platform.bounds.right && that.y >= platform.bounds.top && that.y <= platform.bounds.bottom ){
					
					if(player.pickups.filter(p=>p.name==='piercing').length==0){
						that.dead = true;
					}
					sounds.explosion.play();
					emitters.push(particleEmitter(that.x,that.y,0,0));
				}
			});
			
		},
		draw: function(){
			ctx.beginPath();
		  ctx.fillStyle = '#fff';
			ctx.fillRect(this.x,this.y, 3,3);
			ctx.beginPath();
			ctx.moveTo(this.x,this.y);
			tmpx=this.x-(Math.cos(this.a)*bulletspeed*2);
			tmpy=this.y-(Math.sin(this.a)*bulletspeed*2);
			ctx.lineTo(tmpx,tmpy);
		}
	}
}
