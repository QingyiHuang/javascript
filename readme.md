#ajax 通俗讲有四个步骤

1.创建Ajax对象<br>
2.链接到服务器<br>
3.发送请求<br>
4.接受返回值

#####1.创建对象
	if(window.XMLHttpRequest){
		//创建Ajax对象 获取浏览器内部的一个XMLHttpRequest对象,创建该对象.(非IE6)
		var oAjax = new XMLHttpRequest();
	}else{
		//ie6使用的自几特殊的东西
		var oAjax = new ActiveXObject("Microsoft.XMLHTTP");				
	}

对于前面要在if中加window判断是因为，浏览器会对未定义值的变量读取时报错 ，而对于window.variable不会报错，而是报undefined.

#####2.连接服务器
	
首先理解同步与异步<br>
同步：事情一件一件来<br>
异步：多件事情一起做<br>
而ajax就是为了异步而生的,例如用户请求表单后，提交到服务器的过程，用户不用等待，可以干别的事情。。。。。。

		//open(方法,亟待读取文件名,异步传输)
		oAjax.open('GET','./a.txt',true);

#####3发送请求
  很简单 一句

		//发送请求
		oAjax.send();


#####4.接受请求
主要是判断浏览器和服务器的交互进度和结果

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
						alert(oAjax.status+" Success" +oAjax.responseText);//读取响应文件里面的TEXT
					}else{
						alert(oAjax.status+" NotFound");
					}
				}
			};


###ajax清除缓存
		//将文件名设置随系统时间改变而改变，这样可以避免浏览器缓存旧数据
		oAjax.open('GET','./a.txt?t='+new Date().getTime(),true);
