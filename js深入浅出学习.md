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
[JS函数学习](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00143449926746982f181557d9b423f819e89709feabdb4000)