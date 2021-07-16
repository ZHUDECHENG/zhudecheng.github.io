//游戏控制器
//唯一的 
//单例模式
//使用字面量构造对象的时候  构造的对象是唯一的  不可能有相同的对象
gameEngine = {
	//需要对游戏界面进行维护
	ele:null,  //游戏画面
	bullets:[],//子弹数组
	enemys:[],
	isCashMypalne:false,  //是否碰撞小飞机、
	score:null, //分数节点
	//必须的
	init:function(){
		//初始方法
		this.ele = document.getElementById('main_body') //将游戏界面绑定在游戏控制器上
		//gameEngine.init().stat()
		return this;
	},
	
	start:function(){
		//控制器开始运行
		//调用控制器的其他方法
	
		//调用的第一个方法
		//加载游戏
		gameEngine.loading(function(){
			//添加小飞机
			myPlane.init().fire();
			
			//添加控制小飞机的方法
			//通过游戏控制器控制小飞机
			//启动键盘监听
			gameEngine.keyListen();
			//创建敌机
			gameEngine.createEnemmy();
			
			//检测碰撞
			gameEngine.carsPlane();
			
		});
	
	},
	//callback回调函数  在加载动画结束以后执行
	loading :function(callback){
		
		//添加logo图标
		var logo = document.createElement('div');
		logo.className = 'logo';
		gameEngine.ele.appendChild(logo); //添加在游戏界面上
		
		//加载loading动画
		var loading = document.createElement('div');
		loading.className = 'loading';
		gameEngine.ele.appendChild(loading); //添加在游戏界面上
		
		var aImg = ['images/loading1.png','images/loading2.png','images/loading3.png'];
		
		//设置计时器 
		var n = 0
		var  timer = setInterval(function(){
			n++;
			console.log(n);
			//通过修改loading 的背景图片实现动画
			if(n>2){
				clearInterval(timer);
				//其他操作
				//移除logo 和loading
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(loading);
				//执行
				if(callback){
					callback();
				}
			}else{
				
				loading.style.background = 'url('+aImg[n%3]+')';
			}
		},500);
	},
	keyListen:function(){
		var speed = 0;
		var ySpeed = 0;
		window.onkeydown =function(evt){
			var e = evt  ||evevt
			var keycode = e.keyCode // 取查找当前点击的按键
			 //控制小飞机的移动的距离
			//如果speed 小于零  小飞机会往左运动
			//如果speed 大于零  小飞机会往右运动
			console.log(keycode);
			if(keycode==39){
				//小飞机要往右运动
				speed = 10;
			}else if(keycode==37){
				//小飞机往左运动
				speed = -10;
			}
			if(keycode==38){
				//小飞机要往右运动
				ySpeed = -10;
			}else if(keycode==40){
				//小飞机往左运动
				ySpeed = 10;
			}
			//还要监听上和下 使小飞机能够上下运动
		}
		
		window.onkeyup = function(){
			speed = 0;//当按键弹起的时候 小飞机停止运动
			ySpeed = 0;
		}
		
		
		setInterval(function(){
			var x = myPlane.ele.offsetLeft +speed ;//运动后的位置
			var y = myPlane.ele.offsetTop +ySpeed ;//运动后的位置
			
			if(x<=0){
				x = 0;
			}else if( x>=gameEngine.ele.offsetWidth- myPlane.ele.offsetWidth){
				x = gameEngine.ele.offsetWidth- myPlane.ele.offsetWidth;
			}
			if(y<=0){
				y = 0;
			}else if( y>=gameEngine.ele.offsetHeight- myPlane.ele.offsetHeight){
				y = gameEngine.ele.offsetHeight- myPlane.ele.offsetHeight;
			}
			
			myPlane.ele.style.left = x +'px';
			myPlane.ele.style.top = y +'px';
		},30)
	},
	createEnemmy:function(){
		//分别创建三种飞机
		//设置大飞机的计时器
		setInterval(function(){
			var flag = Math.random()>0.5?true:false;
			if(flag){
				var plane = new Enamy(Enamy.prototype.Enamy_proto_type_big);
				plane.init().move();
			}
		},6000);
		
		setInterval(function(){
			var flag = Math.random()>0.5?true:false;
			if(flag){
				var plane = new Enamy(Enamy.prototype.Enamy_proto_type_mid);
				plane.init().move();
			}
		},2000);
		setInterval(function(){
			var flag = Math.random()>0.3?true:false;
			if(flag){
				var plane = new Enamy(Enamy.prototype.Enamy_proto_type_small);
				plane.init().move();
			}
		},1000);
	},
	carsPlane :function(){

		this.timer = setInterval(function(){
					//小飞机与敌机的碰撞
			//遍历敌机 让小飞机与敌机对比
			for(var key in gameEngine.enemys){
			//gameEngine.enemys[key] 遍历到的每一架敌机
				var bool = crashTest(gameEngine.enemys[key].ele,myPlane.ele);
				
				//console.log(bool);
				if(bool){
//					console.log(bool);
					//小飞机爆炸
					clearInterval(gameEngine.timer);
					myPlane.boom();
				}
			}
			
			for(var key in gameEngine.bullets){
				//gameEngine.bullets[key]
				
				for(var k in gameEngine.enemys){
					 //gameEngine.enemys[k]
//					 console.log(gameEngine.enemys[k],gameEngine.bullets[key]);
					 var bool = crashTest(gameEngine.enemys[k].ele,gameEngine.bullets[key].ele);
					 if(bool){
					 	//敌机掉血
					 	gameEngine.enemys[k].hurt();
					 	//子弹boom
					 	gameEngine.bullets[key].boom();
					 	
					 	return ;
					 	
					 }
				}
			}
			//子弹与敌机之间的处理
		},30);

	}
	
	
	
	
};
