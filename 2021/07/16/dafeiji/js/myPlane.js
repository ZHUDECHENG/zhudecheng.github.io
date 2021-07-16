//用户飞机的生成方法
//唯一
myPlane = {
	ele:null,//是小飞的节点
	bulletSpeed:30, //小飞机发射子弹的速度
	init:function(){
		//对小飞机进行初始化
		this.ele = document.createElement('div');
		this.ele.className = 'myplane';
		gameEngine.ele.appendChild(this.ele);
		
		//给小飞机初始的位置
		this.ele.style.bottom = 0;
		this.ele.style.left =gameEngine.ele.offsetWidth/2-this.ele.offsetWidth/2 +'px';
		return this;
	},
	fire:function(){
		//发射子弹
		setInterval(function(){
			var bullets = new Bullet();
			bullets.init().move()
		},this.bulletSpeed);
//		var bullets = new Bullet();
//		bullets.init().move()
	},
	//小飞机爆炸
	boom:function(){
		//重点 动画实现
		var self = this;
		var n = 0;
		var aImg= ['images/me_die1.png','images/me_die2.png','images/me_die3.png','images/me_die4.png'];
		var  timer = setInterval(function(){
			n++;
//			console.log(n);
			//通过修改loading 的背景图片实现动画
			if(n>aImg.length-1){
				clearInterval(timer);
				alert('game over');
				location.reload();
			}else{
				
				self.ele.style.background = 'url('+aImg[n%aImg.length]+')';
			}
		},30);
	}
}
