let debug=true;
let c = document.querySelector('#c');c.width=800;c.height =250;
let ctx = c.getContext('2d');

// sounds.fire.volume=0.1;


let elapsed, ots, fps; 
let input = {}; 
let gravity = -0.1;
let bulletspeed=8;








const update=_=>{
	try{
		pickups = pickups.filter(p=>!p.dead);
		projectiles = projectiles.filter(p=>!p.dead);
		targets = targets.filter(t=>!t.dead);
		emitters  = emitters.filter(e=>!e.dead);
		if(input.a){	player.xvel = input.shift?-3:-1;}
		if(input.d){	player.xvel = input.shift?3:1;}
		if(input.space && (player.isGrounded || player.isPlatformGrounded)){  
			
			player.yvel =  player.pickups.includes('jumpboots') ? 5: 3 ;
			player.isGrounded = false;
			player.isPlatformGrounded = false;
			sounds.jump.play();
			;}
		player.update();
		projectiles.forEach(p=>p.update());
		targets.forEach(t=>t.update());
		emitters.forEach(e=>e.update());
		platforms.forEach(p=>p.update());
		stars.forEach(s=>{s.update();});
		
	}catch(e){
		// console.log(e);
	};
}

var grd = ctx.createLinearGradient(0, 0, 0, 250);
grd.addColorStop(0, "black");
grd.addColorStop(0.65, "#233D6D");
grd.addColorStop(1, "#ccc");



const draw=_=>{
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 800, 250);
	player.draw();
	stars.forEach(s=>{s.draw();});
	projectiles.forEach(p=>{p.draw();});
	targets.forEach(t=>{t.draw();});
	platforms.forEach(p=>{p.draw();});
	emitters.forEach(e=>{e.draw();});
	pickups.forEach(p=>{p.draw();});
	
	
}
const gameLoop=ts=>{
  	update();
    draw();  
		elapsed = (ts - ots) / 1000;
    ots = ts;
    fps = ~~(1/elapsed);
		// ctx.fillStyle='#FFF';
		// ctx.fillRect(0,0,100,13);
    ctx.fillStyle = '#fff';
    ctx.fillText(`FPS: ${fps}`,  5, 10);
	if(debug){
		ctx.fillText(`input: ${JSON.stringify(input)}`										,5, 20);
		ctx.fillText(`player: ${JSON.stringify(player)}`									,5, 30);
		ctx.fillText(`player x,xvel: ${player.x}, ${player.xvel}`					,5, 40);
		ctx.fillText(`ots: ${ots}`																				,5, 50);
		ctx.fillText(`elapsed: ${elapsed}`																,5, 60);
		ctx.fillText(`time: ${(ots/fps/10).toFixed(0)}`										,5, 70);
		ctx.fillText(`doubletime: ${(ots/(fps/2)/10).toFixed(0)}`					,5, 80);
		ctx.fillText(`projectiles: ${projectiles.length}`									,5, 90);
		ctx.fillText(`targets: ${targets.length}`													,5,100);
		ctx.fillText(`emitters: ${emitters.length}`												,5,110);
		ctx.fillText(`isPlatformGrounded: ${player.isPlatformGrounded}`												,225,20);
		}
	
    window.requestAnimationFrame(gameLoop);
}




document.addEventListener('keydown', e=>{	
if(e.key == "Escape"){
	debug=!debug;
	return;
}
	input[e.keyCode == 32 ? "space":e.key.toLowerCase()] = true  ;});
document.addEventListener('keyup'  , e=>{	
//	input[e.keyCode == 32 ? "space":e.key.toLowerCase()] = false ;
	if(e.keyCode ==32){
		delete input.space;
	}else{
		delete input[e.key.toLowerCase()];
	}
});
c.addEventListener('mousemove',e=>{
	mouse.x = e.offsetX;
	mouse.y = e.offsetY;
	mouse.buttons = e.buttons;
});

c.addEventListener('mousedown',e=>{
	e.preventDefault();
	if(e.buttons !=  1) return;
	let x = e.offsetX;
	let y = e.offsetY;
	ctx.fillRect(x,y,1,1);

	if(player.pickups.includes('shotgun')){
		let b1 = projectile(player.x,250-player.y, Math.atan2((y+ (Math.random()*30))-(250-player.y),(x + Math.random()*30) -player.x),player.isGrounded, player.name);
		let b2 = projectile(player.x,250-player.y, Math.atan2((y- (Math.random()*30))-(250-player.y),(x - Math.random()*30) -player.x),player.isGrounded, player.name);
		let b3 = projectile(player.x,250-player.y, Math.atan2((y- (Math.random()*30))-(250-player.y),(x - Math.random()*30) -player.x),player.isGrounded, player.name);
		let b4 = projectile(player.x,250-player.y, Math.atan2((y- (Math.random()*30))-(250-player.y),(x - Math.random()*30) -player.x),player.isGrounded, player.name);
		let b5 = projectile(player.x,250-player.y, Math.atan2((y- (Math.random()*30))-(250-player.y),(x - Math.random()*30) -player.x),player.isGrounded, player.name);
		projectiles.push(b1);
		projectiles.push(b2);
		projectiles.push(b3);
		projectiles.push(b4);
		projectiles.push(b5);
		

	}else{
		let bullet = projectile(player.x,250-player.y, Math.atan2(y-(250-player.y),x -player.x),player.isGrounded, player.name);
		projectiles.push(bullet);	
	}
	



	sounds.fire.play();
});

targets.push(target());//push an initial target onto the stack
targets.push(target());//push an initial target onto the stack
targets.push(target());//push an initial target onto the stack
targets.push(target());//push an initial target onto the stack
targets.push(target());//push an initial target onto the stack
targets.push(target());//push an initial target onto the stack
targets.push(target());//push an initial target onto the stack




platforms.push(platform());
platforms.push(platform(200,235,100,40,0));
platforms.push(platform(350,195,200,10,0));
for(let i=0;i< 100;i++){

	stars.push(star());
}
pickups.push(pickup(10,250,10));
pickups.push(pickup(40,250,10));
pickups.push(pickup(60,250,10));
pickups.push(pickup(80,250,10));
pickups.push(pickup(100,250,10));
pickups.push(pickup(120,250,10));

gameLoop();