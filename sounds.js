let sounds ={
	 steps: [new Howl({src: ['sounds/step1.wav']}),new Howl({src: ['sounds/step2.wav']}),new Howl({src: ['sounds/step3.wav']}),new Howl({src: ['sounds/step4.wav']})],
	 jump: new Howl({src: ['sounds/jump.wav'],volume: 0.2}),
	 land: new Howl({src: ['sounds/land.wav'],volume: 0.2}),
	 pickup: new Howl({src: ['sounds/pickup.wav'],volume: 0.2}),
	 fallLOW: new Howl({src: ['sounds/fallLOW.wav'],volume: 0.2}),
	 fallHIGH:new Howl({src: ['sounds/fallHIGH.wav'],volume: 0.2}),
	fire: new Howl({src: ['sounds/laserShoot.wav'],volume: 0.2}),
	explosion:new Howl({src: ['sounds/explosion.wav'],volume: 0.2}),
	targetExplosion: new Howl({src:['sounds/targetexplosion.wav'],volume: 0.2}),
	step:  function(){ this.steps.push(this.steps.shift()); return this.steps[0]}
}

// Howler.volume=0.3;
// sounds.steps.forEach(s=>s.volume=0.1);      
// sounds.jump.volume=0.1;
// sounds.land.volume=0.1;