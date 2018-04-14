function ajax(URL,fnSucc,fnFailed){
    //创建ajax对象
	if(XMLHttpRequest){
		//创建Ajax对象 获取浏览器内部的一个XMLHttpRequest对象,创建该对象.(非IE6)
		var oAjax = new XMLHttpRequest();
	}else{
		//ie6
		var oAjax = new ActiveXObject("Microsoft.XMLHTTP");				
	}

	//连接服务器
	//open(方法,亟待读取文件名,异步传输) 
	//将文件名设置随系统时间改变而改变，这样可以避免浏览器缓存旧数据
	oAjax.open('GET',URL+'?t='+new Date().getTime(),true);

	//发送请求
	oAjax.send();

	//接收返回
	//0 （未初始化）还没有调用open方法
	//1 （载入）已经调用send（）方法，正在发送请求
	//2（载入完成）已收到全部响应内容
	//3（解析）正在解析响应内容
	//4（完成）响应内容解析完成，可以在客户端调用
	oAjax.onreadystatechange=function(){
		//oAjax.readyState浏览器和服务器的交互情况
		if(oAjax.readyState == 4)//读取完成
		{
			if(oAjax.status==200)//http状态码,用来判断是否成功接受并返回文件
			{
				fnSucc(oAjax.responseText);
			}else{
				if(fnFailed){
					fnFailed(oAjax.status);
				}
			}
		}
	};
}



