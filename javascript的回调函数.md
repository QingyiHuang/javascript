javascript中回调函数非常重要,它们无处不在；
###定义回调函数

函数A作为参数(函数引用)传递到另一个函数B中，并且这个函数B执行函数A。我们就说函数A叫做回调函数。如果没有名称(函数表达式)，就叫做匿名回调函数


###函数就是对象
javascipt中函数就是对象，准确来说函数就是Function()构造函数

###传递函数作为回调
把一个函数作为参数传递

	function fn (arg1,arg2,callback){
		var num=Math.ceil(Math.random()*(arg1-arg2)+arg2);
		callback(num);//传递结果
	}
	fn(10,20,function(num){
		console.log("Callback 的num："+num)
	})	

> 但是，当函数的实现过程非常漫长，你是选择等待函数完成处理，还是使用回调函数进行异步处理呢？这种情况下，使用回调函数变得至关重要

	
	
	function foo(){
	 var a = 10;
	 return function(){
	  a *= 2;
	  return a;  
	 }; 
	}
	var f = foo();
	f(); //return 20.
	f(); //return 40.

> 函数在外部调用，依然可以访问变量a。这都是因为javascript中的作用域是词法性的。函数式运行在定义它们的作用域中（上述例子中的foo内部的作用域），而不是运行此函数的作用域中。只要f被定义在foo中，它就可以访问foo中定义的所有的变量，即便是foo的执行已经结束。因为它的作用域会被保存下来，但也只有返回的那个函数才可以访问这个保存下来的作用域。返回一个内嵌匿名函数是创建闭包最常用的手段。

####一个同步(阻塞)中使用回调的例子

	//目的是在func1代码执行完成后执行func2。

	var func1=function(callback){
	  setTimeout(function(){console.log("done")},5000)
	  (callback && typeof(callback) === "function") && callback();
	}
	 
	func1(func2);
	  var func2=function(){
	}

####回调函数什么时候执行和其使用场合

> 回调函数，一般在同步情境下是最后执行的，而在异步情境下有可能不执行，因为事件没有被触发或者条件不满足。

> 资源加载：动态加载js文件后执行回调，加载iframe后执行回调，ajax操作回调，图片加载完成执行回调，AJAX等等。
DOM事件及Node.js事件基于回调机制(Node.js回调可能会出现多层回调嵌套的问题)。
setTimeout的延迟时间为0，这个hack经常被用到，settimeout调用的函数其实就是一个callback的体现
链式调用：链式调用的时候，在赋值器(setter)方法中(或者本身没有返回值的方法中)很容易实现链式调用，而取值器(getter)相对来说不好实现链式调用，因为你需要取值器返回你需要的数据而不是this指针，如果要实现链式方法，可以用回调函数来实现setTimeout、setInterval的函数调用得到其返回值。由于两个函数都是异步的，即：他们的调用时序和程序的主流程是相对独立的，所以没有办法在主体里面等待它们的返回值，它们被打开的时候程序也不会停下来等待，否则也就失去了setTimeout及setInterval的意义了，所以用return已经没有意义，只能使用callback。callback的意义在于将timer执行的结果通知给代理函数进行及时处理。

	
	$.get('myhtmlpage.html', myCallBack);//这是对的
	$.get('myhtmlpage.html', myCallBack('foo', 'bar'));//这是错的，那么要带参数呢？
	$.get('myhtmlpage.html', function(){//带参数的使用函数表达式
	myCallBack('foo', 'bar');
	});


	另外，最好保证回调存在且必须是函数引用或者函数表达式：
	(callback && typeof(callback) === "function") && callback();