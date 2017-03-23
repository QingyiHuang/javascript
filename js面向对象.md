##创建对象##
	/*var fucker={
		name:'fucker',
		age:20,
		say:function(){
			console.log('im fucking')
		}
	};
	var xiaoming={
		name:'xiaoming'
	}
	xiaoming.__proto__=fucker;
	xiaoming.say();*/
	
	var Student={
		name:"黄卿怡",
		age:20,
		play:function(){
			console.log('im playing H1Z1');
		}
	};
	
	function createStudent(name){
		//基于student原型创建一个新对象
		var hqy=Object.create(Student);
		//初始化新对象
		hqy.name=name;
		return hqy;
	}
	
	var huangqingyi=createStudent('HuangQingyi');
	huangqingyi.play();

# 旧版IE不支持 原型.__proto__=Student可以用 Object.creat(Student)来创建对象 #

> javaScript对每个创建的对象都会设置一个原型，指向它的原型对象
> 当我们用obj.xxx访问对象属性的时候，javascript引擎会先在当前对象上查找该属性，如果没有找到的话，就到原型对象上找，如果还没找到就一直上溯到object.prototype对象，都没哟就是undefined

创建一个Array对象

	var arr = [1, 2, 3];

原型链：
	
	arr---->Array.prototype---->Object.prototype---->null

> Array.prototype定义了indexOf（），shift()等方法，因此，可以在所有Array上直接用这些方法

当我们创建一个函数时：

	function foo() {
	    return 0;
	}
函数也是一个对象，它的原型链是：

	foo ----> Function.prototype ----> Object.prototype ----> null

由于Function.prototype定义了apply()等方法，因此，所有函数都可以调用apply()方法。

很容易想到，如果原型链很长，那么访问一个对象的属性就会因为花更多的时间查找而变得更慢，因此要注意不要把原型链搞得太长。

###构造函数###
> 除了直接用{...}创建一个对象以外，javascript还可以用构造函数方法创建对象

定义一个构造函数:

	function Student(name) {
	    this.name = name;
	    this.hello = function () {
	        alert('Hello, ' + this.name + '!');
	    }
	}

创建对象：

	var hqy=new Student('hqy');
	hqy.name;//hqy
	hqy.hello();//hello,hqy!

原型链:

	hqy--->Student.prototype--->Object.prototype--->null

如果我们通过 `new Student()` 创建了很多对象，这些对象的hello函数实际上只需要共享同一个函数就可以了，这样可以节省很多内存。

要让创建的对象共享一个hello函数，根据对象的属性查找原则，我们只要把hello函数移动到xiaoming、xiaohong这些对象共同的原型上就可以了，也就是`Student.prototype：`

	function Student(name) {
	    this.name = name;
	}
	
	Student.prototype.hello = function () {
	    alert('Hello, ' + this.name + '!');
	};

###创建对象可以用creat封装new###

例如

	function Student(props) {
	    this.name = props.name || '匿名'; // 默认值为'匿名'
	    this.grade = props.grade || 1; // 默认值为1
	}
	
	Student.prototype.hello = function () {
	    alert('Hello, ' + this.name + '!');
	};
	
	function createStudent(props) {
	    return new Student(props || {})
	}
	这个createStudent()函数有几个巨大的优点：一是不需要new来调用，二是参数非常灵活，可以不传，也可以这么传：
	
	var xiaoming = createStudent({
	    name: '小明'
	});
	
	xiaoming.grade; // 1

附上代码：

	/*111111111111111111111*/
	/*var fucker={
		name:'fucker',
		age:20,
		say:function(){
			console.log('im fucking')
		}
	};
	var xiaoming={
		name:'xiaoming'
	}
	xiaoming.__proto__=fucker;
	xiaoming.say();*/
	
	
	/*222222222222222222222222222*/
	/*var Student={
		name:"黄卿怡",
		age:20,
		play:function(){
			console.log('im playing H1Z1');
		}
	};
	
	function createStudent(name){
		//基于student原型创建一个新对象
		var hqy=Object.create(Student);
		//初始化新对象
		hqy.name=name;
		return hqy;
	}
	
	var huangqingyi=createStudent('HuangQingyi');
	huangqingyi.play();*/
	
	/*3333333333333333333333333333*/
	/*function Student(name){
		this.name=name;
	}
	Student.prototype.say=function(){
		alert('我好，你也好');
	}
	var hqy=new Student('hqy');
	hqy.say();
	alert(hqy.name);*/
	
	/*
	'use strict';
	
	function Cat(name) {
	    this.name = name || '匿名'
	}
	
	Cat.prototype.say = function(){
	return ('Hello, '+this.name+'!');
	}
	
	// 测试:
	var kitty = new Cat('Kitty');
	var doraemon = new Cat('哆啦A梦');
	if (kitty && kitty.name === 'Kitty' && kitty.say && typeof kitty.say === 'function' && kitty.say() === 'Hello, Kitty!' && kitty.say === doraemon.say) {
	    alert('测试通过!');
	} else {
	    alert('测试失败!');
	}*/

##原型继承##
我们先来回顾下Student的构造函数:

	function Student(obj){
		this.name=obj.name ||'unNamed';
	}
	Student.prototype.hello=function(){
	    alert('hello'+this.name);
	}