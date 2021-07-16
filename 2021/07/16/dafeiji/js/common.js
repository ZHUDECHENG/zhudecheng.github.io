//公共方法

//碰撞检测
//飞机 obj
function crashTest(obj1,obj2){
	//obj1.ele   飞机div 飞机节点
	//水平的位移
	var  leftSide = obj1.offsetLeft - obj2.offsetWidth/2;
	var  rightSide = obj1.offsetLeft + obj1.offsetWidth + obj2.offsetWidth/2;
	
	var midX = obj2.offsetWidth/2 +obj2.offsetLeft;
	//垂直方向
	var  topSide = obj1.offsetTop - obj2.offsetHeight/2;
	var  bottomSide = obj1.offsetTop + obj1.offsetHeight + obj2.offsetHeight/2;
	
	var midY = obj2.offsetHeight/2 +obj2.offsetTop;
	
	if(leftSide<midX && rightSide> midX && topSide<midY && bottomSide>midY){
		return true;
	}else{
		return false;
	}
}
