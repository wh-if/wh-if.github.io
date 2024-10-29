## 核心要点

### 箭头函数与普通函数区别
1. 箭头函数不绑定arguments，取而代之用rest参数...解决。
2. this的作用域不同，箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值。
3. 箭头函数没有原型属性，不能作为构造函数，不能使用`new`。
4. 箭头函数不能当做Generator函数，不能使用`yield`关键字。

> [箭头函数与普通函数区别](https://segmentfault.com/a/1190000040016702#item-2-1)

### 关于setTimeout
1. 浏览器下setTimeout由window对象调用。
2. 传递的一般延迟函数最终在window调用，this指向window（箭头函数除外）。

> [setTimeout详解 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/110274000)   
> [谈谈setTimeout的作用域以及this的指向问题 - 博客园 (cnblogs.com)](https://www.cnblogs.com/yuqingfamily/p/5816560.html) 

### 注意`new`调用和常规调用函数内`this`指向的区别
```javascript
function Fn() {
    this.hello = "world"
    console.log(this);
}
Fn(); // Window
new Fn() // Fn {hello: 'world'}
```

### 区分var、let、cosnt
- 变量提升（函数的优先级更高）

    ```javascript
    function fn() {
        console.log('a', a);
        
        function a () {
            console.log('I am a function');
        }

        var a = 1;
    }
    fn() // ƒ a () {console.log('I am a function');}
    ```
- let、const暂时性死区
- let禁止重复声明变量且不会成为全局对象的属性

- let 声明的变量拥有块级作用域，在 for 循环或 if 中用 let 定义变量，在外面是访问不到的。形如`for (let i...)`的循环在每次迭代时都为i创建一个新变量，并以之前迭代中同名变量的值将其初始化，所以上面的代码实际上相当于：

    ```javascript
    for (let i = 0) {
    const log = () => {
        console.log(i)
    }
    setTimeout(log, 100)
    }
    for (let i = 1) {
    const log = () => {
        console.log(i)
    }
    setTimeout(log, 100)
    }
    for (let i = 2) {
    const log = () => {
        console.log(i)
    }
    setTimeout(log, 100)
    }
    ```
> [总结下var、let 和 const 的区别 - SegmentFault 思否](https://segmentfault.com/a/1190000016491581)   
> [前端基石：一段代码隐含了多少基础知识？ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzUzNjk5MTE1OQ==&mid=2247517857&idx=1&sn=ed632d39cc2fe260ec8f64782b295b1c&chksm=faef0279cd988b6f345733dec0fd3aff203cb573ad5bea106f46b3345cb1ca14bffe38931fba&mpshare=1&scene=24&srcid=0607xr7eE1wjJ68nvkRslnBD&sharer_sharetime=1654588547040&sharer_shareid=d51a6f66e5bd5b4dc17352e2012bcfe0#rd) 

### 实现new操作符
```javascript
function create(Con,...args){
    //1、创建一个空的对象
    let obj = {}; // let obj = Object.create({});
    //2、将空对象的原型指向构造函数的原型
    Object.setPrototypeOf(obj,Con.prototype); // obj.__proto__ = Con.prototype
    //3、构造函数初始化对象
    let result = Con.apply(obj,args);
    //4、在构造函数有返回值的情况进行判断
    return result instanceof Object ? result : obj;
}
```

### 数组的sort方法
该方法传入一个用来进行排序的函数。
如果不传入排序函数，sort函数会将每个元素转换成字符串，然后根据各个字符的Unicode值排序。特别注意数字情况：
```javascript
var arr = [5, 22, 14, 9];
console.log(arr.sort()); // [14, 22, 5, 9]
```
如果传了排序函数，那么数组会按照调用该函数的返回值排序。即a和b是两个将要被比较的元素：
- 如果`compareFunction(a,b)`返回的结果小于0，那么a会被排列到b之前；
- 如果`compareFunction(a,b)`返回的结果等于0，那么a和b的相对位置不变；
- 如果`compareFunction(a,b)`返回的结果大于0，那么b会被排列到a之前。


### 数据类型

- 特殊情况

    ```javascript
    +0===-0 // true
    NaN===NaN // false
    +Infinity===-Infinity // false
    ```

- 隐式转换

    | Raw       | Number | String            | Boolean |
    | --------- | ------ | ----------------- | ------- |
    | "0"       | 0      | "0"               | true    |
    | ""        | 0      | ""                | false   |
    | []        | 0      | ""                | true    |
    | { }       | NaN    | "[object Object]" | true    |
    | null      | 0      | "null"            | false   |
    | undefined | NaN    | "undefined"       | false   |

> [细说 JavaScript 七种数据类型 - 一像素 - 博客园 (cnblogs.com)](https://www.cnblogs.com/onepixel/p/5140944.html)   
> [Symbol类型的应用场景（意义）和使用方法 - 前端开发博客 (nblogs.com)](https://www.nblogs.com/archives/489/)   
> [判断JS数据类型的四种方法 - 一像素 - 博客园 (cnblogs.com)](https://www.cnblogs.com/onepixel/p/5126046.html)   
> [js隐式类型转换_51CTO博客_js类型转换](https://blog.51cto.com/u_15100527/2617182) 


### 短句
1. js对象的key类型：字符串（number会转成string）、Symbol。
2. `length = 0`可将数组清空，再访问内部的元素如`arr[0]`的值为`undefined`。

## 参考阅读
