let platforms = [];
let platform = (x =  Math.random() * 790 + 1,
y= Math.random() * 250 + 1,
w= Math.random() * 200 + 20,
h= Math.random() * 20 + 2,
m= Math.random() > 0.5)=>{
	return{
		x: x,y: y,w: w ,h: h,movable: m,
		bounds:{ 
			left: x,
			right: x+w,
			top: y,
			bottom: y+h
		},
		c: `#${Math.floor(Math.random()*16777215).toString(16)}`,
		update: function(){
			if(this.movable){
				this.x+=0.9;
			if(this.x > 800){
				this.x = -this.w;
			}
			this.bounds.left = this.x;
			this.bounds.right = this.x + this.w;
		}
		},
		draw: function(){
			ctx.beginPath();
			ctx.fillStyle="#000";			
			ctx.fillRect(this.x-1,this.y-1,this.w+2,this.h+2);
			ctx.fillStyle=this.c;
			ctx.fillRect(this.x,this.y,this.w,this.h);
			
		}
	}
	
}



