# 进阶

## Vue
### vue的nextTick
1. vue会收集多次dom操作统一到一起进行，避免频繁操作dom。
2. 基于事件循环实现，vue2考虑兼容性会尝试promise、mutationObserver、setImmediate、setTimeout，vue3不考虑兼容性使用promise。
3. 类比
	- mounted之前，初始化正常顺序输出nextTick、promise。
	```vue
	nextTick(()=>{
		console.log("nextTick")
	})

	Promise.resolve().then(()=>{console.log("promise")})
	```
	- mounted之后，nextTick的内容会被放到一个proimse.then里，输出promise、nextTick。
	```vue
	onMounted(()=>{
		nextTick(()=>{
			console.log("nextTick")
		})
		Promise.resolve().then(()=>{console.log("promise")})
	})
	
	// 类似于
	Promise.resolve().then(()=>{
		// 处理jobs
	}).then(()=>{
		console.log("模拟nexttick")
	})
	Promise.resolve().then(()=>{console.log("promise")})
	console.log("current")
	```
4. 源码路径`vuejs/core/packages/runtime-core/src/scheduler.ts`

## 综合

### 其他
1. 浏览器对相同域的连接数量有限制
2. 