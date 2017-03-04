//es6
// const EventEmitter=require('events')

// class MyEmitter extends EventEmitter{}

// const myEmitter=new MyEmitter()

// myEmitter.on('event',(a,b)=>{
// 	console.log(a,b,this)
// })

// myEmitter.emit('event','a','b')

// myEmitter.on('event',() =>{
// 	console.log('an event occurred!')
// })

// myEmitter.emit('event')


var EventEmitter=require('events').EventEmitter

var life=new EventEmitter()

life.setMaxListeners(11)

//addEventListener

function water(who){
	console.log(who+' at the school1')
}

life.on('running',water)
life.on('running',function(who){
	console.log(who+' at the school2')
})

life.on('running',function(who){
	console.log(who+' at the school3')
})

life.on('running',function(who){
	console.log(who+' at the school4')
})

life.on('running',function(who){
	console.log(who+' at the school5')
})

life.on('running',function(who){
	console.log(who+' at the school6')
})

life.on('running',function(who){
	console.log(who+' at the school7')
})

life.on('running',function(who){
	console.log(who+' at the school8')
})

life.on('running',function(who){
	console.log(who+' at the school9')
})

life.on('running',function(who){
	console.log(who+' at the school10')
})
life.on('running',function(who){
	console.log(who+' at the school11')
})

life.on('yun',function(who){
	console.log(who+' at the home')
})
life.on('yun',function(who){
	console.log(who+' at the home')
})

life.removeListener('running',water)
life.removeAllListeners('yun')//移除多个监听事件

var hasConfortListener=life.emit('running','gg')
var hasYunListener=life.emit('yun','mm')

console.log(life.listeners('running').length)
//console.log(EventEmitter.listenerCount(life,'yun'))//监听事件个数

// var hasWhatListener=life.emit('what','gg&mm')

// console.log(hasConfortListener)
// console.log(hasYunListener)
// console.log(hasWhatListener)
