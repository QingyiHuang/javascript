接3/8日21：15 /2017 
//以前学javaScript都是草草了事。现在发现不能糊弄啊，经验，羡慕能够写一手流利JS的人，感谢各位博er，让我能够沉浸在我的小世界几天，，
别忘了记得实战，用gulp less requre，运用上mvc框架 的实战--
//惰性加载 AJAX 
##js闭包##
	高阶函数除了可以接受函数作为参数外，还可以把函数作为结果值返回
	
reduce 函数运用在求和上的例子就是 f(f(f(x1,x2)x3)x4);
	
通常情况下我们来实现一个对Array的求和

    function sum(arr) {
    return arr.reduce(function (x, y) {
    return x + y;
    });
    }
    
    sum([1, 2, 3, 4, 5]); // 15

如果我们只是需要一个方法，一个函数
	
	function lazySum(arr){
		var sum=function(){
			return arr.reduce(function(x,y){
				return x+y;
			});
		}
		return sum;
	}
	
	var arr=[1,2,5,10];
	console.log(lazySum(arr));
	var f=lazySum(arr);
	console.log(f());
> 当我们调用lazy_sum()时，返回的并不是求和结果，而是求和函数
> 调用函数f时，才真正计算求和的结果
>     在这个例子中，我们在函数lazy_sum中又定义了函数sum，并且，内部函数sum可以引用外部函数lazy_sum的参数和局部变量，当lazy_sum返回函数sum时，相关参数和变量都保存在返回的函数中，这种称为“闭包（Closure）”的程序结构拥有极大的威力。
    
    请再注意一点，当我们调用lazy_sum()时，每次调用都会返回一个新的函数，即使传入相同的参数：
    
    var f1 = lazy_sum([1, 2, 3, 4, 5]);
    var f2 = lazy_sum([1, 2, 3, 4, 5]);
    f1 === f2; // false
    f1()和f2()的调用结果互不影响。


###看个例子理解闭包###
	function count() {
	    var arr = [];
	    for (var i=1; i<=3; i++) {
	        arr.push(function () {
	            return i * i;
	        });
	    }
	    return arr;
	}

	var results = count();
	var f1 = results[0];
	var f2 = results[1];
	var f3 = results[2];
结果：

	f1(); // 16
	f2(); // 16
	f3(); // 16
> 全部都是16！原因就在于返回的函数引用了变量i，但它并非立刻执行。等到3个函数都返回时，它们所引用的变量i已经变成了4，因此最终结果为16。
> 
> 返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。
	
如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续如何更改，已绑定到函数参数的值不变：
	
	function count() {
	    var arr = [];
	    for (var i=1; i<=3; i++) {
	        arr.push((function (n) {
	            return function () {
	                return n * n;
	            }
	        })(i));
	    }
	    return arr;
	}
	
	var results = count();
	var f1 = results[0];
	var f2 = results[1];
	var f3 = results[2];
	
	f1(); // 1
	f2(); // 4
	f3(); // 9
注意这里用了一个“创建一个匿名函数并立刻执行”的语法：
	
	(function (x) {
	    return x * x;
	})(3); // 9
理论上讲，创建一个匿名函数并立刻执行可以这么写：
	
	function (x) { return x * x } (3);
	但是由于JavaScript语法解析的问题，会报SyntaxError错误，因此需要用括号把整个函数定义括起来：
	
	(function (x) { return x * x }) (3);
通常，一个立即执行的匿名函数可以把函数体拆开，一般这么写：
	
	(function (x) {
	    return x * x;
	})(3);

###js冒泡和捕获###

> 事件传递有两种方式：冒泡与捕获。
> 事件传递定义了元素事件触发的顺序。 如果你将 <p元素插入到 <div元素中，用户点击 <p元素, 哪个元素的 "click" 事件先被触发呢？
> 在 冒泡 中，内部元素的事件会先被触发，然后再触发外部元素，即： <p元素的点击事件先触发，然后会触发 <div元素的点击事件。
> 在 捕获 中，外部元素的事件会先被触发，然后才会触发内部元素的事件，即： <div元素的点击事件先触发 ，然后再触发 <p元素的点击事件。
> addEventListener() 方法可以指定 "useCapture" 参数来设置传递类型：
>  addEventListener(event, function, useCapture);
> 默认值为 false, 即冒泡传递，当值为 true 时, 事件使用捕获传递。

实例：

	<p>实例演示了在添加不同事件监听时，冒泡与捕获的不同。</p>
	<div id="myDiv">
		<p id="myP">点击段落，我是冒泡。</p>
	</div><br>
	<div id="myDiv2">
		<p id="myP2">点击段落，我是捕获。 </p>
	</div>
	<script>
	document.getElementById("myP").addEventListener("click", function() {
	    alert("你点击了 P 元素!");
	}, false);
	document.getElementById("myDiv").addEventListener("click", function() {
	    alert(" 你点击了 DIV 元素 !");
	}, false);
	document.getElementById("myP2").addEventListener("click", function() {
	    alert("你点击了 P2 元素!");
	}, true);
	document.getElementById("myDiv2").addEventListener("click", function() {
	    alert("你点击了 DIV2 元素 !");
	}, true);
	</script>

##忽略后面补上ES6箭头函数 generator##

##js标准对象##
javascript 里面，一切都是对象

	typeof 123; // 'number'
	typeof NaN; // 'number'
	typeof 'str'; // 'string'
	typeof true; // 'boolean'
	typeof undefined; // 'undefined'
	typeof Math.abs; // 'function'
	typeof null; // 'object'
	typeof []; // 'object'
	typeof {}; // 'object'
##js包装对象##
number、boolean和string都有包装对象。没错，在JavaScript中，字符串也区分string类型和它的包装类型。包装对象用new创建：

    var n = new Number(123); // 123,生成了新的包装类型
    var b = new Boolean(true); // true,生成了新的包装类型
    var s = new String('str'); // 'str',生成了新的包装类型
虽然包装对象看上去和原来的值一模一样，显示出来也是一模一样，但他们的类型已经变为object了！所以，包装对象和原始值用===比较会返回false：

    typeof new Number(123); // 'object'
    new Number(123) === 123; // false
    
    typeof new Boolean(true); // 'object'
    new Boolean(true) === true; // false
    
    typeof new String('str'); // 'object'
    new String('str') === 'str'; // false
> 所以闲的蛋疼也不要使用包装对象！尤其是针对string类型！！！
> 
> 如果我们在使用Number、Boolean和String时，没有写new会发生什么情况？
> 
> 此时，Number()、Boolean和String()被当做普通函数，把任何类型的数据转换为number、boolean和string类型（注意不是其包装类型）：

	var n = Number('123'); // 123，相当于parseInt()或parseFloat()
	typeof n; // 'number'
	
	var b = Boolean('true'); // true
	typeof b; // 'boolean'
	
	var b2 = Boolean('false'); // true! 'false'字符串转换结果为true！因为它是非空字符串！
	var b3 = Boolean(''); // false
	
	var s = String(123.45); // '123.45'
	typeof s; // 'string'

###总结###
	不要使用new Number()、new Boolean()、new String()创建包装对象；
	
	用parseInt()或parseFloat()来转换任意类型到number；
	
	用String()来转换任意类型到string，或者直接调用某个对象的toString()方法；
	
	通常不必把任意类型转换为boolean再判断，因为可以直接写if (myVar) {...}；
	
	typeof操作符可以判断出number、boolean、string、function和undefined；
	
	判断Array要使用Array.isArray(arr)；
	
	判断null请使用myVar === null；
	
	判断某个全局变量是否存在用typeof window.myVar === 'undefined'；
	
	函数内部判断某个变量是否存在用typeof myVar === 'undefined'。
	
	最后有细心的同学指出，任何对象都有toString()方法吗？null和undefined就没有！确实如此，这两个特殊值要除外，虽然null还伪装成了object类型。
	
	更细心的同学指出，number对象调用toString()报SyntaxError：
	
	123.toString(); // SyntaxError
	遇到这种情况，要特殊处理一下：
	
	123..toString(); // '123', 注意是两个点！
	(123).toString(); // '123'
	不要问为什么，这就是JavaScript代码的乐趣！