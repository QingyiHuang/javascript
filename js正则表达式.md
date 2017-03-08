##js正则表达式 由RegExp对象支持##
####修饰符####
    g:gloable匹配
    i:忽略大小写
    m:多行搜索

    var reg = /\bis\b/gi;
    'he is a boy,this IS a dog,where IS she'.replace(reg,'0')
    //'he 0 a boy,this 0 a dog,where 0 she'
###使用单个字符串来描述，匹配一系列·符合某个句法规则的字符串###
    通过规则去匹配字符串
    \bIS\b  IS是单词
    . 任意字符
    \是转义

/*替换is*/

    var reg = /\bis\b/;
    'he is a boy,this is a dog,where is she'.replace(reg,'IS')
    //'he IS a boy,this is a dog,where is she'

    var reg = /\bis\b/g;
    'he is a boy,this is a dog,where is she'.replace(reg,'IS')
    //'he IS a boy,this IS a dog,where IS she'

###js中\是特殊字符，想使用它要进行转义\\###
	在创建RegExp对象
	var reg = new RegExp('\\bis\\b','g')
    'he is a boy,this is a dog,where is she'.replace(reg,'IS')
    //'he IS a boy,this IS a dog,where IS she'	