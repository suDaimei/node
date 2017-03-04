var pet={
	words:'222',
	speak:function(say){
		console.log(say+''+this.words)
	}
}
//pet.speak('Speak')

var dog={
	words:'Wang'
}
pet.speak.call(dog,'Speak')//使用才拥有继承的方法