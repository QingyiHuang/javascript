###ECMAscript是js的规范###
js 基础到高阶函数一部分 2017/3/8毕  为了方便查阅启用第二个md
###js的开头运用 'use strict' 遵循严格的ECMA规范禁止变量不加var直接赋值等###
###js== 与 ===###
    false == 0; // true
    false === 0; // false
#####另一个例外是NaN这个特殊的Number与所有其他值都不相等，包括它自己#####
    NaN === NaN; // false
    isNaN(NaN); // true
###js对象###
    avaScript的对象是一组由键-值组成的无序集合，例如：
    
    var person = {
	    name: 'Bob',
	    age: 20,
	    tags: ['js', 'web', 'mobile'],
	    city: 'Beijing',
	    hasCar: true,
	    zipcode: null
    };
> JavaScript对象的键都是字符串类型，值可以是任意数据类型。上述person对象一共定义了6个键值对，其中每个键又称为对象的属性，例如，person的name属性为'Bob'，zipcode属性为null
###获取js对象的属性###
    要获取一个对象的属性，我们用对象变量.属性名的方式：
    
    person.name; // 'Bob'
    person.zipcode; // null
###字符串的连接 ES6模板字符串###
    要把多个字符串连接起来，可以用+号连接：
    
    var name = '小明';
    var age = 20;
    var message = '你好, ' + name + ', 你今年' + age + '岁了!';
    alert(message);

    如果有很多变量需要连接，用+号就比较麻烦。ES6新增了一种模板字符串，表示方法和上面的多行字符串一样，但是它会自动替换字符串中的变量：
    //注意，反的单引号
    var name = '小明';
    var age = 20;
    var message = `你好, ${name}, 你今年${age}岁了!`;
    alert(message);

	//多行字符串，遵ES6
    `这是一个
    多行
    字符串`;
##js数组##
###indexOf###
    与String类似，Array也可以通过indexOf()来搜索一个指定的元素的位置：
    
    var arr = [10, 20, '30', 'xyz'];
    arr.indexOf(10); // 元素10的索引为0
    arr.indexOf(20); // 元素20的索引为1
    arr.indexOf(30); // 元素30没有找到，返回-1
    arr.indexOf('30'); // 元素'30'的索引为2
###slice###
    slice()就是对应String的substring()版本，它截取Array的部分元素，然后返回一个新的Array：
    
    var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    arr.slice(0, 3); // 从索引0开始，到索引3结束，但不包括索引3: ['A', 'B', 'C']
    arr.slice(3); // 从索引3开始到结束: ['D', 'E', 'F', 'G']
如果不给slice()传递任何参数，它就会从头到尾截取所有元素。利用这一点，我们可以很容易地复制一个Array

    var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    var aCopy = arr.slice();
    aCopy; // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    aCopy === arr; // false
###push和pop用来操纵数组尾部###
push()向Array的末尾添加若干元素，pop()则把Array的最后一个元素删除掉：

    var arr = [1, 2];
    arr.push('A', 'B'); // 返回Array新的长度: 4
    arr; // [1, 2, 'A', 'B']
    arr.pop(); // pop()返回'B'
    arr; // [1, 2, 'A']
    arr.pop(); arr.pop(); arr.pop(); // 连续pop 3次
    arr; // []
    arr.pop(); // 空数组继续pop不会报错，而是返回undefined
    arr; // []
###unshift和shift用来操纵数组头部###
如果要往Array的头部添加若干元素，使用unshift()方法，shift()方法则把Array的第一个元素删掉：

    var arr = [1, 2];
    arr.unshift('A', 'B'); // 返回Array新的长度: 4
    arr; // ['A', 'B', 1, 2]
    arr.shift(); // 'A'
    arr; // ['B', 1, 2]
    arr.shift(); arr.shift(); arr.shift(); // 连续shift 3次
    arr; // []
    arr.shift(); // 空数组继续shift不会报错，而是返回undefined
    arr; // []
###sort对数组排序###
sort()可以对当前Array进行排序，它会直接修改当前Array的元素位置，直接调用时，按照默认顺序排序：

    var arr = ['B', 'C', 'A'];
    arr.sort();
    arr; // ['A', 'B', 'C']，

    排序算法
    
    排序也是在程序中经常用到的算法。无论使用冒泡排序还是快速排序，排序的核心是比较两个元素的大小。如果是数字，我们可以直接比较，但如果是字符串或者两个对象呢？直接比较数学上的大小是没有意义的，因此，比较的过程必须通过函数抽象出来。通常规定，对于两个元素x和y，如果认为x < y，则返回-1，如果认为x == y，则返回0，如果认为x > y，则返回1，这样，排序算法就不用关心具体的比较过程，而是根据比较结果直接排序。
    
    JavaScript的Array的sort()方法就是用于排序的，但是排序结果可能让你大吃一惊：
    
    // 看上去正常的结果:
    ['Google', 'Apple', 'Microsoft'].sort(); // ['Apple', 'Google', 'Microsoft'];
    
    // apple排在了最后:
    ['Google', 'apple', 'Microsoft'].sort(); // ['Google', 'Microsoft", 'apple']
    
    // 无法理解的结果:
    [10, 20, 1, 2].sort(); // [1, 10, 2, 20]
    第二个排序把apple排在了最后，是因为字符串根据ASCII码进行排序，而小写字母a的ASCII码在大写字母之后。
    
    第三个排序结果是什么鬼？简单的数字排序都能错？
    
    这是因为Array的sort()方法默认把所有元素先转换为String再排序，结果'10'排在了'2'的前面，因为字符'1'比字符'2'的ASCII码小。
    
    douwo
    
    如果不知道sort()方法的默认排序规则，直接对数字排序，绝对栽进坑里！
    
    幸运的是，sort()方法也是一个高阶函数，它还可以接收一个比较函数来实现自定义的排序。
    
    要按数字大小排序，我们可以这么写：
    
    var arr = [10, 20, 1, 2];
    arr.sort(function (x, y) {
    if (x < y) {
    return -1;
    }
    if (x > y) {
    return 1;
    }
    return 0;
    }); // [1, 2, 10, 20]
    如果要倒序排序，我们可以把大的数放前面：
    
    var arr = [10, 20, 1, 2];
    arr.sort(function (x, y) {
    if (x < y) {
    return 1;
    }
    if (x > y) {
    return -1;
    }
    return 0;
    }); // [20, 10, 2, 1]
    默认情况下，对字符串排序，是按照ASCII的大小比较的，现在，我们提出排序应该忽略大小写，按照字母序排序。要实现这个算法，不必对现有代码大加改动，只要我们能定义出忽略大小写的比较算法就可以：
    
    var arr = ['Google', 'apple', 'Microsoft'];
    arr.sort(function (s1, s2) {
    x1 = s1.toUpperCase();
    x2 = s2.toUpperCase();
    if (x1 < x2) {
    return -1;
    }
    if (x1 > x2) {
    return 1;
    }
    return 0;
    }); // ['apple', 'Google', 'Microsoft']
    忽略大小写来比较两个字符串，实际上就是先把字符串都变成大写（或者都变成小写），再比较。
    
    从上述例子可以看出，高阶函数的抽象能力是非常强大的，而且，核心代码可以保持得非常简洁。
    
    最后友情提示，sort()方法会直接对Array进行修改，它返回的结果仍是当前Array：
    
    var a1 = ['B', 'A', 'C'];
    var a2 = a1.sort();
    a1; // ['A', 'B', 'C']
    a2; // ['A', 'B', 'C']
    a1 === a2; // true, a1和a2是同一对象
###reverse对数组反转###
    var arr = ['one', 'two', 'three'];
    arr.reverse(); 
    arr; // ['three', 'two', 'one']
###splice()修改数组万能方法###
splice()方法是修改Array的“万能方法”，它可以从指定的  索引 开始删除若干元素，然后再从该位置添加若干元素：

    var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
    // 从索引2开始删除3个元素,然后再添加两个元素:
    arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
    arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
    // 只删除,不添加:
    arr.splice(2, 2); // ['Google', 'Facebook']
    arr; // ['Microsoft', 'Apple', 'Oracle']
    // 只添加,不删除:
    arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
    arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
###两个数组的concat连接###
concat()方法把当前的Array和另一个Array连接起来，并返回一个新的Array：

    var arr = ['A', 'B', 'C'];
    var added = arr.concat([1, 2, 3]);
    added; // ['A', 'B', 'C', 1, 2, 3]
    arr; // ['A', 'B', 'C']
    请注意，concat()方法并没有修改当前Array，而是返回了一个新的Array。
    
    实际上，concat()方法可以接收任意个元素和Array，并且自动把Array拆开，然后全部添加到新的Array里：
    
    var arr = ['A', 'B', 'C'];
    arr.concat(1, 2, [3, 4]); // ['A', 'B', 'C', 1, 2, 3, 4]
##js的循环##
###for...in###
for循环的一个变体是for ... in循环，它可以把一个对象的所有属性依次循环出来：
    
    var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
    };
    for (var key in o) {
    alert(key); // 'name', 'age', 'city'
    }
    要过滤掉对象继承的属性，用hasOwnProperty()来实现：
    
    var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
    };
    for (var key in o) {
    if (o.hasOwnProperty(key)) {
    alert(key); // 'name', 'age', 'city'
    }
    }
    由于Array也是对象，而它的每个元素的索引被视为对象的属性，因此，for ... in循环可以直接循环出Array的索引：
    
    var a = ['A', 'B', 'C'];
    for (var i in a) {
    alert(i); // '0', '1', '2'
    alert(a[i]); // 'A', 'B', 'C'
    }
    请注意，for ... in对Array的循环得到的是String而不是Number。
###Map和Set /ES6新增数据类型###
###Map###
Map是一组键值对的结构，具有极快的查找速度。

举个例子，假设要根据同学的名字查找对应的成绩，如果用Array实现，需要两个Array：

    var names = ['Michael', 'Bob', 'Tracy'];
    var scores = [95, 75, 85];
    给定一个名字，要查找对应的成绩，就先要在names中找到对应的位置，再从scores取出对应的成绩，Array越长，耗时越长。
    
    如果用Map实现，只需要一个“名字”-“成绩”的对照表，直接根据名字查找成绩，无论这个表有多大，查找速度都不会变慢。用JavaScript写一个Map如下：
    
    var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
    m.get('Michael'); // 95
    初始化Map需要一个二维数组，或者直接初始化一个空Map。Map具有以下方法：
    
    var m = new Map(); // 空Map
    m.set('Adam', 67); // 添加新的key-value
    m.set('Bob', 59);
    m.has('Adam'); // 是否存在key 'Adam': true
    m.get('Adam'); // 67
    m.delete('Adam'); // 删除key 'Adam'
    m.get('Adam'); // undefined
    由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉：
    
    var m = new Map();
    m.set('Adam', 67);
    m.set('Adam', 88);
    m.get('Adam'); // 88
###Set###
    Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。
    
    要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set：
    
    var s1 = new Set(); // 空Set
    var s2 = new Set([1, 2, 3]); // 含1, 2, 3
    重复元素在Set中自动被过滤：
    
    var s = new Set([1, 2, 3, 3, '3']);
    s; // Set {1, 2, 3, "3"}
    注意数字3和字符串'3'是不同的元素。
    
    通过add(key)方法可以添加元素到Set中，可以重复添加，但不会有效果：
    
    >>> s.add(4)
    >>> s
    {1, 2, 3, 4}
    >>> s.add(4)
    >>> s
    {1, 2, 3, 4}
    通过delete(key)方法可以删除元素：
    
    var s = new Set([1, 2, 3]);
    s; // Set {1, 2, 3}
    s.delete(3);
    s; // Set {1, 2}
###遍历数组forEach###
    var s=[];
    var arr=[1,2,3,4,5];
    arr.forEach(function(key){
    	s.push(key);
    })
    console.log(s);//1，2，3，4，5
###可迭代ES6+ for...of for...in*###
###对map和set这种和Array不同，不可用数组下标进行遍历的用for--of###
遍历Array可以采用下标循环，遍历Map和Set就无法使用下标。为了统一集合类型，ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。

具有iterable类型的集合可以通过新的for ... of循环来遍历

用for ... of循环遍历集合，用法如下：
    
    
    var a = ['A', 'B', 'C'];
    var s = new Set(['A', 'B', 'C']);
    var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
    for (var x of a) { // 遍历Array
    alert(x);
    }
    for (var x of s) { // 遍历Set
    alert(x);
    }
    for (var x of m) { // 遍历Map
    alert(x[0] + '=' + x[1]);
    }
    你可能会有疑问，for ... of循环和for ... in循环有何区别？
    
    for ... in循环由于历史遗留问题，它遍历的实际上是对象的属性名称。一个Array数组实际上也是一个对象，它的每个元素的索引被视为一个属性。
    
    当我们手动给Array对象添加了额外的属性后，for ... in循环将带来意想不到的意外效果：
    
    var a = ['A', 'B', 'C'];
    a.name = 'Hello';
    for (var x in a) {
    alert(x); // '0', '1', '2', 'name'
    }
    for ... in循环将把name包括在内，但Array的length属性却不包括在内。
    
    for ... of循环则完全修复了这些问题，它只循环集合本身的元素：
    
    var a = ['A', 'B', 'C'];
    a.name = 'Hello';
    for (var x of a) {
    alert(x); // 'A', 'B', 'C'
    }
    这就是为什么要引入新的for ... of循环。
    
    然而，更好的方式是直接使用iterable内置的forEach方法，它接收一个函数，每次迭代就自动回调该函数。以Array为例：
    
    var a = ['A', 'B', 'C'];
    a.forEach(function (element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    alert(element);
    });
    注意，forEach()方法是ES5.1标准引入的，你需要测试浏览器是否支持。
    
    Set与Array类似，但Set没有索引，因此回调函数的前两个参数都是元素本身：
    
    var s = new Set(['A', 'B', 'C']);
    s.forEach(function (element, sameElement, set) {
    alert(element);
    });
    Map的回调函数参数依次为value、key和map本身：
    
    var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
    m.forEach(function (value, key, map) {
    alert(value);
    });
    如果对某些参数不感兴趣，由于JavaScript的函数调用不要求参数必须一致，因此可以忽略它们。例如，只需要获得Array的element：
    
    var a = ['A', 'B', 'C'];
    a.forEach(function (element) {
    alert(element);
    });

###学习到函数###
    javascript 函数就是一个对象，
    函数体内部的语句在执行时，一旦执行到return时，函数就执行完毕，并将结果返回。
	因此，函数内部通过条件判断和循环可以实现非常复杂的逻辑。
    如果没有return语句，函数执行完毕后也会返回结果，只是结果为undefined。
	由于JavaScript的函数也是一个对象，上述定义的abs()函数实际上是一个函数对象，
	而函数名abs可以视为指向该函数的变量

	var abs = function (x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
   		` }`
    };
    
    在这种方式下，function (x) { ... }是一个匿名函数，它没有函数名。但是，这个匿名函数赋值给了变量abs，所以，通过变量abs就可以调用该函数。
    
    上述两种定义完全等价，注意第二种方式按照完整语法需要在函数体末尾加一个;，表示赋值语句结束

	JavaScript允许传入任意个参数而不影响调用，因此传入的参数比定义的参数多也没有问题，虽然函数内部并不需要这些参数：

###arguments###
	javaScript有个关键字 arguments，它只是在函数内部起作用，并且永远指向当前函数的调用者传入的所有参数，
	arguments类似Array，但它不是一个Array;
    
    function foo(x) {
	    alert(x); // 10
	    for (var i=0; i<arguments.length; i++) {
	    alert(arguments[i]); // 10, 20, 30
    }
    }
    foo(10, 20, 30);
    利用arguments，你可以获得调用者传入的所有参数。也就是说，即使函数不定义任何参数，还是可以拿到参数的值：
    
    function abs() {
    if (arguments.length === 0) {
    return 0;
    }
    var x = arguments[0];
    return x >= 0 ? x : -x;
    }
    
    abs(); // 0
    abs(10); // 10
    abs(-9); // 9

####     实际上arguments最常用于判断传入参数的个数。你可能会看到这样的写法： ####
    
    // foo(a[, b], c)
    // 接收2~3个参数，b是可选参数，如果只传2个参数，b默认为null：
    function foo(a, b, c) {
    if (arguments.length === 2) {
    // 实际拿到的参数是a和b，c为undefined
    c = b; // 把b赋给c
    b = null; // b变为默认值
    }
    // ...
    }
    要把中间的参数b变为“可选”参数，就只能通过arguments判断，然后重新调整参数并赋值。

###rest 参数###
	由于JavaScript函数允许接收任意个参数，于是我们就不得不用arguments来获取所有参数：

    function foo(a, b) {
    var i, rest = [];
    if (arguments.length > 2) {
    for (i = 2; i<arguments.length; i++) {
    rest.push(arguments[i]);
    }
    }
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
    }
    为了获取除了已定义参数a、b之外的参数，我们不得不用arguments，并且循环要从索引2开始以便排除前两个参数，这种写法很别扭，只是为了获得额外的rest参数，有没有更好的方法？
    
    ES6标准引入了rest参数，上面的函数可以改写为：
    
    function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
    }
    
    foo(1, 2, 3, 4, 5);
    // 结果:
    // a = 1
    // b = 2
    // Array [ 3, 4, 5 ]
    
    foo(1);
    // 结果:
    // a = 1
    // b = undefined
    // Array []
    rest参数只能写在最后，前面用...标识，从运行结果可知，传入的参数先绑定a、b，多余的参数以数组形式交给变量rest，所以，不再需要arguments我们就获取了全部参数。
    
    如果传入的参数连正常定义的参数都没填满，也不要紧，rest参数会接收一个空数组（注意不是undefined）。、

例子：用rest参数写一个函数 sum 用来对传入任意位参数求和

    	function sum(...rest) {
       var res=0
       for (var i=0; i<arguments.length; i++) {
      res=rest[i]+res
       };
       return res;
    };
    
###js方法###

	在一个对象中绑定函数，称作这个对象的方法，
	在JavaScript中，对象定义是这样的+给对象绑定一个函数例如一个age方法:
	var xiaoming={
		name:"XX",
		birth:1997,
		age:function(){
			var y=new Date().getFullYear();
            return y-this.birth;
		}
	}
	console.log(xiaoming.age());
//this关键字始终指向调用他的这个对象，如果是在gloable里面使用this ，this的操纵者就是window；

上面可以拆开写:

    function getAge() {
    var y = new Date().getFullYear();
    return y - this.birth;
    }
    
    var xiaoming = {
    name: '小明',
    birth: 1990,
    age: getAge
    };

关于this的错误:

    'use strict';
    
    var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
    function getAgeFromBirth() {
    var y = new Date().getFullYear();
    return y - this.birth;
    }
    return getAgeFromBirth();
    }
    };
    
    xiaoming.age(); // Uncaught TypeError: Cannot read property 'birth' of undefined
    结果又报错了！原因是this指针只在age方法的函数内指向xiaoming，在函数内部定义的函数，this又指向undefined了！（在非strict模式下，它重新指向全局对象window！）
    
    修复的办法也不是没有，我们用一个that变量首先捕获this：
    
    'use strict';
    
    var xiaoming = {
    name: '小明',
    birth: 1990,
    age: function () {
    var that = this; // 在方法内部一开始就捕获this
    function getAgeFromBirth() {
    var y = new Date().getFullYear();
    return y - that.birth; // 用that而不是this
    }
    return getAgeFromBirth();
    }
    };
    
    xiaoming.age(); // 25
    用var that = this;，你就可以放心地在方法内部定义其他函数，而不是把所有语句都堆到一个方法中。
###js装饰器###
    
    利用apply()，我们还可以动态改变函数的行为。
    
    JavaScript的所有对象都是动态的，即使内置的函数，我们也可以重新指向新的函数。
    
    现在假定我们想统计一下代码一共调用了多少次parseInt()，可以把所有的调用都找出来，然后手动加上count += 1，不过这样做太傻了。最佳方案是用我们自己的函数替换掉默认的parseInt()：
    
    var count = 0;
    var oldParseInt = parseInt; // 保存原函数
    
    window.parseInt = function () {
    count += 1;
    return oldParseInt.apply(null, arguments); // 调用原函数
    };
    
    // 测试:
    parseInt('10');
    parseInt('20');
    parseInt('30');
    count; // 3

###高阶函数###
> JavaScript的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。
> 
     一个最简单的高阶函数：
    
    function add(x, y, f) {
    return f(x) + f(y);
    }
    当我们调用add(-5, 6, Math.abs)时，参数x，y和f分别接收-5，6和函数Math.abs，根据函数定义，我们可以推导计算过程为：
    
    x = -5;
    y = 6;
    f = Math.abs;
    f(x) + f(y) ==> Math.abs(-5) + Math.abs(6) ==> 11;
    return 11;

###map/reduce###
    map
    
    举例说明，比如我们有一个函数f(x)=x2，要把这个函数作用在一个数组[1, 2, 3, 4, 5, 6, 7, 8, 9]上，就可以用map实现如下：
    
    map
    
    由于map()方法定义在JavaScript的Array中，我们调用Array的map()方法，传入我们自己的函数，就得到了一个新的Array作为结果：
    
    function pow(x) {
    return x * x;
    }
    
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
    map()传入的参数是pow，即函数对象本身。
    
    你可能会想，不需要map()，写一个循环，也可以计算出结果：
    
    var f = function (x) {
    return x * x;
    };
    
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = [];
    for (var i=0; i<arr.length; i++) {
    result.push(f(arr[i]));
    }
    的确可以，但是，从上面的循环代码，我们无法一眼看明白“把f(x)作用在Array的每一个元素并把结果生成一个新的Array”。
    
    所以，map()作为高阶函数，事实上它把运算规则抽象了，因此，我们不但可以计算简单的f(x)=x2，还可以计算任意复杂的函数，比如，把Array的所有数字转为字符串：
    
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    只需要一行代码。
###reduce###
    再看reduce的用法。Array的reduce()把一个函数作用在这个Array的[x1, x2, x3...]上，这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算，其效果就是：
    
    [x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
    比方说对一个Array求和，就可以用reduce实现：
    
    var arr = [1, 3, 5, 7, 9];
    arr.reduce(function (x, y) {
    return x + y;
    }); // 25
###filiter###
    filter也是一个常用的操作，它用于把Array的某些元素过滤掉，然后返回剩下的元素。
    
    和map()类似，Array的filter()也接收一个函数。和map()不同的是，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素。
    
例如，在一个Array中，删掉偶数，只保留奇数，可以这么写：
    
    var arr = [1, 2, 4, 5, 6, 9, 10, 15];
    var r = arr.filter(function (x) {
    return x % 2 !== 0;
    });
    r; // [1, 5, 9, 15]
把一个Array中的空字符串删掉，可以这么写：
    
    var arr = ['A', '', 'B', null, undefined, 'C', '  '];
    var r = arr.filter(function (s) {
    return s && s.trim(); // 注意：IE9以下的版本没有trim()方法
    });
    r; // ['A', 'B', 'C']
    可见用filter()这个高阶函数，关键在于正确实现一个“筛选”函数
####用filter 出去Array中的重复元素####
    'use strict';
    
    var
    r,
    arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
    
    r = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
    });
    
    alert(r.toString());

//sort排序

    var arr=[];
    var bob=['a','C','D','h','B','A','e'];
    bob.forEach(function(key){
    	arr.push(key);
    });
    arr.sort(function(x,y){
    	x1=x.toUpperCase();
    	y1=y.toUpperCase();
    	if(x1<y1){
    		return -1;
    	}
    	if(x1>y1){
    		return 1;
    	}
    	return 0;
    })
    console.log(arr);