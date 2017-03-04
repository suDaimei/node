var globalVariable='This is global variable'

function globalFunction(){
	var localVariable='This is locat veriable'

	console.log('Visit global/local variable')
	console.log(globalVariable)
	console.log(localVariable)

	globalVariable='This is changed variable'

	console.log(globalVariable)

	function localFunction(){
		var innerLocalVariable='This is innerLocalVariable'

		console.log('Visit global/local/inner variable')
		console.log(globalVariable)
		console.log(localVariable)
		console.log(innerLocalVariable)
	}

	localFunction()
}
globalFunction()
