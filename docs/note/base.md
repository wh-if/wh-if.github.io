# JavaScript基础

## 要点归纳

### 箭头函数与普通函数
1. 箭头函数不绑定arguments，取而代之用rest参数...解决。
2. this的作用域不同，箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值。
3. 箭头函数没有原型属性，不能作为构造函数，不能使用`new`。
4. 箭头函数不能当做Generator函数，不能使用`yield`关键字。
5. 注意`new`调用和常规调用函数内`this`指向的区别。

    ```js
    function Fn() {
        this.hello = "world"
        console.log(this);
    }
    Fn(); // Window
    new Fn() // Fn {hello: 'world'}
    ```

::: info
- [箭头函数与普通函数区别](https://segmentfault.com/a/1190000040016702#item-2-1)
:::

### 关于setTimeout
1. 浏览器下setTimeout由window对象调用。
2. 传递的一般延迟函数最终在window调用，this指向window（箭头函数除外）。

::: info
- [setTimeout详解 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/110274000)   
- [谈谈setTimeout的作用域以及this的指向问题 - 博客园 (cnblogs.com)](https://www.cnblogs.com/yuqingfamily/p/5816560.html) 
:::

### 区分var、let、cosnt
- 变量提升（函数的优先级更高）

    ```js
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

    ```js
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
::: info
- [总结下var、let 和 const 的区别 - SegmentFault 思否](https://segmentfault.com/a/1190000016491581)   
- [前端基石：一段代码隐含了多少基础知识？ (qq.com)](https://mp.weixin.qq.com/s?__biz=MzUzNjk5MTE1OQ==&mid=2247517857&idx=1&sn=ed632d39cc2fe260ec8f64782b295b1c&chksm=faef0279cd988b6f345733dec0fd3aff203cb573ad5bea106f46b3345cb1ca14bffe38931fba&mpshare=1&scene=24&srcid=0607xr7eE1wjJ68nvkRslnBD&sharer_sharetime=1654588547040&sharer_shareid=d51a6f66e5bd5b4dc17352e2012bcfe0#rd) 
:::

### 实现new操作符
```js
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
```js
var arr = [5, 22, 14, 9];
console.log(arr.sort()); // [14, 22, 5, 9]
```
如果传了排序函数，那么数组会按照调用该函数的返回值排序。即a和b是两个将要被比较的元素：
- 如果`compareFunction(a,b)`返回的结果小于0，那么a会被排列到b之前；
- 如果`compareFunction(a,b)`返回的结果等于0，那么a和b的相对位置不变；
- 如果`compareFunction(a,b)`返回的结果大于0，那么b会被排列到a之前。


### 数据类型

- 特殊情况

    ```js
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

::: info
- [细说 JavaScript 七种数据类型 - 一像素 - 博客园 (cnblogs.com)](https://www.cnblogs.com/onepixel/p/5140944.html)   
- [Symbol类型的应用场景（意义）和使用方法 - 前端开发博客 (nblogs.com)](https://www.nblogs.com/archives/489/)   
- [判断JS数据类型的四种方法 - 一像素 - 博客园 (cnblogs.com)](https://www.cnblogs.com/onepixel/p/5126046.html)   
- [js隐式类型转换_51CTO博客_js类型转换](https://blog.51cto.com/u_15100527/2617182) 
:::

### 闭包

闭包是由捆绑起来（封闭的）的函数和函数周围状态（词法环境）的引用组合而成。换言之，闭包让函数能访问它的外部作用域。

函数内包含函数，内部函数引用了外部的变量，导致外部函数在执行结束后不回收这部分变量，因此使用闭包需要注意内存泄漏。

::: info
- [闭包 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures) 
:::

### 迭代遍历

1. `for in`和`for of`遍历
- `for in`遍历的是数组的索引（即键名），而`for of`遍历的是数组元素值。
- 通常用`for in`来遍历对象。`for in`循环会遍历对象自身的和继承的可枚举属性（不含`Symbol`属性），因此在使用时注意判断某属性是否是该对象的实例属性。

2. 迭代器
- `Symbol.iterator`即为迭代器，是一个函数，返回一个迭代器对象。可以自定义实现，Array等具有默认实现。
    ```js
    let obj1 = {
        'name': '前端小鹿',
        'age': '18',
        'sex': '男'
    }
    for (let i of obj1) {
        console.log(i); // obj1 is not iterable,obj不是可迭代对象
    }

    //对obj改造
    let obj = {
        data: ['name:小鹿', 'age:18', 'sex:男'],
        [Symbol.iterator]: function () {
            const self = this
            let index = 0;
            return {
                next: function () {
                    console.log(this);

                    if (index < self.data.length) {
                        return {
                            value: self.data[index++],
                            done: false
                        };
                    }
                    return { value: undefined, done: true };
                }
            }
        }
    }
    for (let i of obj) {
        console.log(i); // "name:前端小鹿" "age:18" "sex:男"
    }
    ```
::: info
- [for in 和for of的区别 - 零度从容 - 博客园 (cnblogs.com)](https://www.cnblogs.com/zjx304/p/10687017.html)   
- [js中的迭代器(Iterator) - 掘金 (juejin.cn)](https://juejin.cn/post/7018850645226569758) 
:::

### 继承

```js
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
Cat.prototype = new Animal();

Cat.prototype.constructor = Cat; // 修复构造函数指向的。
```
::: info
- [JS实现继承的几种方式 - 幻天芒 - 博客园 (cnblogs.com)](https://www.cnblogs.com/humin/p/4556820.html) 
:::

### 深浅拷贝

```js
function deepClone(target) {
    // 创建一个 WeakMap 来保存已经拷贝过的对象，以防止循环引用
    const map = new Map();

    // 辅助函数：判断一个值是否为对象或函数
    function isObject(target) {
        return (
            (typeof target === "object" && target) || // 检查是否是非null的对象
            typeof target === "function" // 或者是函数
        );
    }

    // 主要的拷贝函数
    function clone(data) {
        // 基本类型直接返回
        if (!isObject(data)) {
            return data;
        }

        // 对于日期和正则对象，直接使用它们的构造函数创建新的实例
        if ([Date, RegExp].includes(data.constructor)) {
            return new data.constructor(data);
        }

        // 对于函数，创建一个新函数并返回
        if (typeof data === "function") {
            return new Function("return " + data.toString())();
        }

        // 检查该对象是否已被拷贝过
        const exist = map.get(data);
        if (exist) {
            return exist; // 如果已经拷贝过，直接返回之前的拷贝结果
        }

        // 如果数据是 Map 类型
        if (data instanceof Map) {
            const result = new Map();
            map.set(data, result); // 记录当前对象到 map
            data.forEach((val, key) => {
                // 对 Map 的每一个值进行深拷贝
                result.set(key, clone(val));
            });
            return result; // 返回新的 Map
        }

        // 如果数据是 Set 类型
        if (data instanceof Set) {
            const result = new Set();
            map.set(data, result); // 记录当前对象到 map
            data.forEach((val) => {
                // 对 Set 的每一个值进行深拷贝
                result.add(clone(val));
            });
            return result; // 返回新的 Set
        }

        // 获取对象的所有属性，包括 Symbol 类型和不可枚举的属性
        const keys = Reflect.ownKeys(data);
        // 获取对象所有属性的描述符
        const allDesc = Object.getOwnPropertyDescriptors(data);
        // 创建新的对象并继承原对象的原型链
        const result = Object.create(Object.getPrototypeOf(data), allDesc);

        map.set(data, result); // 记录当前对象到 map

        // 对象属性的深拷贝
        keys.forEach((key) => {
            result[key] = clone(data[key]);
        });

        return result; // 返回新的对象
    }

    return clone(target); // 开始深拷贝
}
```

### call、apply和bind

```js
Function.prototype.imitateCall = function (context) {
    // 赋值作用域参数，如果没有则默认为 window，即访问全局作用域对象
    context = context || window
    // 绑定调用函数（.call之前的方法即this，前面提到过调用call方法会调用一遍自身，所以这里要存下来）
    context.invokFn = this
    // 截取作用域对象参数后面的参数
    let args = [...arguments].slice(1)
    // 执行调用函数，记录拿取返回值
    let result = context.invokFn(...args)
    // 销毁调用函数，以免作用域污染
    Reflect.deleteProperty(context, 'invokFn')
    return result
}

Function.prototype.imitateApply = function (context) {
    // 赋值作用域参数，如果没有则默认为 window，即访问全局作用域对象
    context = context || window
    // 绑定调用函数（.call之前的方法即this，前面提到过调用call方法会调用一遍自身，所以这里要存下来）
    context.invokFn = this
    // 执行调用函数，需要对是否有参数做判断，记录拿取返回值
    let result
    if (arguments[1]) {
        result = context.invokFn(...arguments[1])
    } else {
        result = context.invokFn()
    }
    // 销毁调用函数，以免作用域污染
    Reflect.deleteProperty(context, 'invokFn')
    return result
}

Function.prototype.imitateBind = function (context) {
    // 获取绑定时的传参
    let args = [...arguments].slice(1),
        // 定义中转构造函数，用于通过原型连接绑定后的函数和调用bind的函数
        F = function () { },
        // 记录调用函数，生成闭包，用于返回函数被调用时执行
        self = this,
        // 定义返回(绑定)函数
        bound = function () {
            // 合并参数，绑定时和调用时分别传入的
            let finalArgs = [...args, ...arguments]

            // 改变作用域，注:aplly/call是立即执行函数，即绑定会直接调用
            // 这里之所以要使用instanceof做判断，是要区分是不是new xxx()调用的bind方法
            return self.call((this instanceof F ? this : context), ...finalArgs)
        }

    // 将调用函数的原型赋值到中转函数的原型上
    F.prototype = self.prototype
    // 通过原型的方式继承调用函数的原型
    bound.prototype = new F()

    return bound
}
``` 
::: info
- [call、apply、bind的原理剖析及实现 - 渣渣逆天 - 博客园 (cnblogs.com)](https://www.cnblogs.com/zhazhanitian/p/11400898.html) 
:::

### 防抖节流

- 防抖：`n`秒后在执行该事件，若在`n`秒内被重复触发，则重新计时。
- 节流：`n`秒内只运行一次，若在`n`秒内重复触发，只有一次生效。

```js
function debounce(func, wait, immediate) {

    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout); // timeout 不为null
        if (immediate) {
            let callNow = !timeout; // 第一次会立即执行，以后只有事件执行后才会再次触发
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)
            if (callNow) {
                func.apply(context, args)
            }
        }
        else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
    }
}

function throttled(fn, delay) {
    let timer = null
    let starttime = Date.now()
    return function () {
        let curTime = Date.now() // 当前时间
        let remaining = delay - (curTime - starttime)  // 从上一次到现在，还剩下多少多余时间
        let context = this
        let args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
            fn.apply(context, args)
            starttime = Date.now()
        } else {
            timer = setTimeout(fn, remaining);
        }
    }
}
```
::: info
- [防抖节流的实现](https://vue3js.cn/interview/JavaScript/debounce_throttle.html)
:::
### 短句
1. js对象的key类型：字符串（number会转成string）、Symbol。
2. `length = 0`可将数组清空，再访问内部的元素如`arr[0]`的值为`undefined`。

## 参考阅读
