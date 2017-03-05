var http=require('http')
var Promise=require('bluebird')
var cheerio=require('cheerio')
var baseUrl='http://www.imooc.com/learn/348'
//var url='http://www.imooc.com/learn/348'
var videoIds=[348,259,197,134,75]
function filterChapters(html){
	var $=cheerio.load(html)
	var chapters=$('.chapter')
	var title=$('.path span').text()
	var number=$('.js-learn-num').text()

	// courseData={
	// 	title:'',
	// 	number:number,
	// 	videos:[{
	// 		chapterTitle:'',
	// 			videos:[
	// 				title:'',
	// 				id:''
	// 			]
	// 	}]
		
	// }
//}

	var courseData={
		title:title,
		number:number,
		videos:[]
	}

	chapters.each(function(item){
		var chapter=$(this)
		var chapterTitle=chapter.find('strong').text()
		var videos=chapter.find('.video').children('li')
		var chapterData={
			chapterTitle:chapterTitle,
			videos:[]
		}
		videos.each(function(item){
			var video=$(this).find('.J-media-item')
			var videoTitle=video.text()
			var id=video.attr('href').split('video/')[1]

			chapterData.videos.push({
				title:videoTitle,
				id:id
			})
		})

		courseData.videos.push(chapterData)
	})
	return courseData
}

function printCourseInfo(courseData){
	courseData.forEach(function(courseData){
		console.log(courseData.number+'人学过'+courseData.title+'\n')
	})

	courseData.forEach(function(courseData){
		console.log('###'+courseData.title+'\n')

		courseData.videos.forEach(function(item){

			var chapterTitle=item.chapterTitle
			console.log(chapterTitle+'\n')

			item.videos.forEach(function(video){
				console.log(' 【'+video.id+ '】'+video.title+'\n')
			})
		})

	})
}

function getPageAsync(url){
	return new Promise(function(resolve,reject){
		console.log('正在爬取'+url)

		http.get(url,function(res){
			var html=''

			res.on('data',function(data){
				html+=data
			})

			res.on('end',function(){
				resolve(html)

			})
		}).on('error',function(){
			reject(e)
			console.log('获取课程数据出错！')
		})
	})
}

var fetchCourseArray=[]

videoIds.forEach(function(id){
	fetchCourseArray.push(getPageAsync(baseUrl+id))
})

Promise
	.all([])
	.then(function(pages){
		var courseData=[]
		pages.forEach(function(html){
			var course=filterChapters(html)

			courseData.push(course)
		})
		courseData.sort(function(a,b){
			return a.number<b.number
		})

		printCourseInfo(courseData)
	})
