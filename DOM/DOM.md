###DOM
HTML文档被浏览器解析后就是一棵DOM树，

针对dom的操作

> 更新：更新该DOM节点的内容，相当于更新了该DOM节点表示的HTML的内容；
> 
> 遍历：遍历该DOM节点下的子节点，以便进行进一步操作；
> 
> 添加：在该DOM节点下新增一个子节点，相当于动态增加了一个HTML节点；
> 
> 删除：将该节点从HTML中删除，相当于删掉了该DOM节点的内容以及它包含的所有子节点。

	// 返回ID为'test'的节点：
	var test = document.getElementById('test');
	
	// 先定位ID为'test-table'的节点，再返回其内部所有tr节点：
	var trs = document.getElementById('test-table').getElementsByTagName('tr');
	
	// 先定位ID为'test-div'的节点，再返回其内部所有class包含red的节点：
	var reds = document.getElementById('test-div').getElementsByClassName('red');
	
	// 获取节点test下的所有直属子节点:
	var cs = test.children;
	
	// 获取节点test下第一个、最后一个子节点：
	var first = test.firstElementChild;
	var last = test.lastElementChild;

###更新dom
代码实例:update.html
###插入dom
代码实例：insert.html
###删除dom
removeChild
获得该节点本身以及它的父级节点然后调用父节点的removeChild删掉该节点

例如:

	// 拿到待删除节点:
	var self = document.getElementById('to-be-removed');
	// 拿到父节点:
	var parent = self.parentElement;
	// 删除:
	var removed = parent.removeChild(self);
	removed === self; // true