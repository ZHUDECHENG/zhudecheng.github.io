//生成子弹的方法
//由于子弹不是唯一的
//使用构造方法创建子弹

function Bullet(){
	this.ele = null;
	this.id = parseInt(Math.random()*100000)+"";
	
	//子弹的初始化
	this.init = function(){
		this.ele = document.createElement('div');
		this.ele.className = 'bullet';
		
		
		gameEngine.bullets[this.id] = this;
		
		//obj.key = value;
		//obj['key'] = value;
		//obj['k'+'e'+'y'] =vlaue
		
		//将子弹添加在页面上 并且初始位置
		gameEngine.ele.appendChild(this.ele);
		this.ele.style.top = myPlane.ele.offsetTop -this.ele.offsetHeight +'px';
		//修改中间位置
		this.ele.style.left = myPlane.ele.offsetLeft +myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2+1+'px';
		
		return this;
	}
	
	this.move = function(){
		var speed =10; //子弹的移动速度
		var self = this;
		this.timer = setInterval(function(){
			//子弹的移动
			var top = self.ele.offsetTop-10;
			if(top<=0){
				//清除计时器 并且移除子弹
				clearInterval(self.timer);
				gameEngine.ele.removeChild(self.ele);
				
				delete gameEngine.bullets[self.id] //从控器的子弹数组中移除子弹
			}else{
				//让子弹运动
				self.ele.style.top = top +'px';
			}
		},30);
	}
	
	this.boom = function(){
		clearInterval(this.timer);
		var self = this;
		var n = 0;
		delete gameEngine.bullets[self.id];
		var aImg= ['images/bullet.png','images/die1.png','images/die2.png'];
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
