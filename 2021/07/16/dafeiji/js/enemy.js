//敌机的生成方法
//三种飞机
//big  mid small
function Enamy(type){
	//生成飞机
	this.ele = document.createElement('div');
	this.hp = 0;
	this.speed = 0;
	this.dieImg = [];
	
	//id
	this.id = parseInt(Math.random()*100000)+"";
	
	this.init = function(){
		//初始的时候有三种可能
		//big  mid small
		switch(type){
			case this.Enamy_proto_type_big:
				this.hp = this.Enamy_proto_hp_big;
				this.speed = this.Enamy_proto_speed_big;
				this.ele.className = 'enemy-large';
				this.dieImg = ['images/plane3_die1.png','images/plane3_die2.png','images/plane3_die3.png','images/plane3_die4.png','images/plane3_die5.png','images/plane3_die6.png']
				//创建大飞机
				break;
			case this.Enamy_proto_type_mid:
				//创建中飞机
				this.hp = this.Enamy_proto_hp_mid;
				this.speed = this.Enamy_proto_speed_mid;
				this.ele.className = 'enemy-middle';
				this.dieImg = ['images/plane2_die1.png','images/plane2_die2.png','images/plane2_die3.png','images/plane2_die4.png'];
				
				break;
			case this.Enamy_proto_type_small:
				//创建小飞机飞机
				this.hp = this.Enamy_proto_hp_small;
				this.speed = this.Enamy_proto_speed_small;
				this.ele.className = 'enemy-small';
				this.dieImg = ['images/plane1_die1.png','images/plane1_die2.png','images/plane1_die3.png'];
				break;
		}
		//所以飞机相同的部分
		//添加飞机到游戏界面上
		gameEngine.ele.appendChild(this.ele);
		//添加至游戏控制器的敌机数组中
		gameEngine.enemys[this.id] = this;
		//初始化位置
		this.ele.style.top = -this.ele.offsetHeight + 'px';
		//随机的 水平位置
		var  left = parseInt(Math.random() * (gameEngine.ele.offsetWidth-this.ele.offsetWidth) )
		this.ele.style.left = left +'px';
		
		return this;
	};
	
	this.move = function(){
		var self = this;
		this.timer = setInterval(function(){
			var top = self.ele.offsetTop + self.speed;//移动后的位置
			if(top>gameEngine.ele.offsetHeight){
				clearInterval(self.timer);
				gameEngine.ele.removeChild(self.ele);
				delete gameEngine.enemys[self.id];
			}else{
				self.ele.style.top = top +'px';
			}
		},30);
	}
	this.hurt = function(){
		this.hp--;
		
		if(this.hp==0){
			//敌机爆炸
			this.boom();
		}
	}
	this.boom = function(){
		var self = this;
		var n = 0;
		var aImg= this.dieImg;
		delete gameEngine.enemys[self.id];
		var  timer = setInterval(function(){
			n++;
//			console.log(n);
			//通过修改loading 的背景图片实现动画
			if(n>aImg.length-1){
				clearInterval(timer);
				gameEngine.ele.removeChild(self.ele);
			}else{
				self.ele.style.background = 'url('+aImg[n%aImg.length]+')';
			}
		},100);
	}
}



Enamy.prototype = {
	//飞机的类型
	Enamy_proto_type_big : 0,
	Enamy_proto_type_mid : 1,
	Enamy_proto_type_small : 2,
	//飞机的血量
	Enamy_proto_hp_big : 10,
	Enamy_proto_hp_mid : 5,
	Enamy_proto_hp_small : 1,
	//飞机的速度
	Enamy_proto_speed_big : 2,
	Enamy_proto_speed_mid : 4,
	Enamy_proto_speed_small : 8
}
