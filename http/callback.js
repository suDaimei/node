function learn(something){
	console.log(something)
}

function we(callback,something){
	something+=' is coll'
	callback(something)
}
we(learn,'Nodejs')

we(function(something){
	console.log(something)
},'Jade')