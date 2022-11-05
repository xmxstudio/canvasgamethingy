let player = {
	
	name: 'xmetrix',
	x: 400,
	y: 0,	
	xvel: 0,
	yvel: 0,
	isPlatformGrounded: false,
	isGrounded: true,
	c: '#625359',
	pickups: [],
	update: function(){ 
		if(this.xvel){
			if(this.x+this.xvel > 0 && this.x+this.xvel < 800){
				this.x+=this.xvel;
			}
		}
		this.y+=this.yvel;
		if(!player.isGrounded) this.yvel+= gravity; //always pull the person down... gg.
		if(!player.isGrounded && (this.y==0 || this.y < 0)) {
			if(this.yvel > 2){
				//sounds.fallLOW.play();
			}
			this.y =0;
			this.yvel=0;
			player.isGrounded = true;
			sounds.land.play();
		}
		
		if(this.xvel !=0){
			this.xvel -= this.xvel < 0 ? -elapsed:elapsed;
			if(Math.abs(this.xvel) < 0.1){this.xvel = 0;}
		}
		
		//	let x = t.x - that.x;
		// let y = t.y - that.y;
		// let d =  Math.sqrt(x * x + y * y);
		 platforms.forEach(platform=>{
		 let 	playerY = 250-player.y;
		 

			// if(player.x >= platform.bounds.left && player.x <= platform.bounds.right && (250-player.y) >= platform.bounds.top && (250-player.y) <= platform.bounds.bottom){
			// 	player.xvel = 0;
			// 	platform.c = player.c;
			// 	delete input.a;
			//}
			// if((250-player.y) >= platform.y && (250-player.y) >= platform.y + platform.h && player.x >= platform.x && player.x <= platform.x+platform.w){
			// 	player.y = (250-platform.y);
			// 	player.yvel = 0;
			// } 
			if(player.x > platform.x && (250-player.y) > platform.y && (250-player.y) < platform.y+platform.h && player.x < platform.x+platform.w){
				platform.c = player.c;
				player.xvel = -player.xvel;
				// player.yvel = -player.yvel;
				player.isPlatformGrounded = true;
				if(platform.xvel ){
					player.xvel = platform.xvel;
				}
				player.yvel = 0;
				console.log(250-player.y, platform.bounds.top);
				if(Math.abs((250-player.y) - platform.bounds.top) <5 && (player.x >= platform.bounds.x && player.x <= platform.bounds.right)){
				  player.y = (250-platform.bounds.top); 
					player.yvel = 0;
					player.isPlatformGroundead = true;
					player.platform = platform;
				}else{
					
					player.platform = '';
				}
			}
		});
		pickups.forEach(pickup=>{
			let x = pickup.x - player.x;
			let y = pickup.y - (250-player.y);
			let d = Math.sqrt(x * x + y*y) 
			console.log(d);
			if (d<5){
				emitters.push(particleEmitter(pickup.x, pickup.y,0,0,player.c,5));
				emitters.push(textEmitter(pickup.name, pickup.x, pickup.y,0,0,player.c,3));
				pickup.dead = true;
				player.pickups.push(pickup.name);
				sounds.pickup.play();
			}
				//		let d =  Math.sqrt(x * x + y * y);
		})
	},
	draw: function(){
		ctx.fillStyle=this.c;
		ctx.fillRect(this.x,(250-this.y)-4,4,4);
		// ctx.beginPath();
		// ctx.moveTo(this.x,250- this.y);
		// let grad= ctx.createRadialGradient(player.x, 250-player.y, 0, player.x, 250-player.y, 100)
		// grad.addColorStop(0, '#FF00FFFF');
		// grad.addColorStop(1, '#0000FF00');
		// ctx.strokeStyle=grad;
		// ctx.lineTo(mouse.x, mouse.y);
		ctx.stroke();
		ctx.fillText(this.name,this.x-10,240-this.y)

		this.pickups.forEach((pickup,i)=>{
			ctx.fillText(pickup, 500,  (i*15)+ 10);
		})
	}
}