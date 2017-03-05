var http=require('http')
var Promise=require('bluebird')
var basicUrl='http://www.imooc.com/learn'
var cheerio=require('cheerio')
var baseUrl='http://www.imooc.com/learn/348'
//var url='http://www.imooc.com/learn/348'
var coursesIds=[348,259,197,134,75]//要爬取课程IDar pageArr=[]
var pagesArr=[]

coursesIds.forEach(function(id){
	pagesArr.push(getPageAsync(basicUrl+id))
})
//获取界面html并返回准备传入解析函数，利用promise对象进行Async的页面获取
function getPageAsync(url){
	return new Promise(function(resolve,reject){

		http.get(url,function(res){
			console.log('正在爬取'+url)
			var html=''

			res.on('data',function(data){
				html+=data
			})

			res.on('end',function(){
				console.log('页面'+url+'爬取完毕')
				resolve(html)

			})
		}).on('error',function(e){
			reject(e)
			console.log('获取课程数据出错！')
		})
	})
}
//解析函数，用于将传入的页面html代码解析，提取其中所需要的信息，并保存在courseData对象中
function filterChapters(html){
	var $=cheerio.load(html)
	$.fn.mytext=function(){
		return $(this).clone()
		.children()
		.remove()
		.end()
		.text()
	}

	
	var courseTitle=$($($('.course-infos').find('.hd')).find('h2')).mytext().trim()
	var courseLearners=parseInt($($('.statics').children('.static-item')).find('span[class="meta-value js-learn-num"]').mytext())


	var courseData={
		courseTitle:courseTitle,
		courseLearners:courseLearners,
		chapters:[]
	}
	var chapters=$('.chapter')
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

	/*var courseData={
		title:title,
		number:number,
		videos:[]
	}*/

	var $thisChapter,$chapterTitle
	var $videoTitle,$videoId,$thisVideo
	var $videos
	//章节遍历
	chapters.each(function(item){
		$thisChapter=$(this)
		$chapterTitle=$($thisChapter.find('strong')).mytext().replace(/\s/g,'')
		//用于保存信息和最终输出的courseData对象
		var chapterData={
			chapterTitle:$chapterTitle,
			videos:[]
		}

		//完毕
		//获取并保存videos数据
		$videos=$thisChapter.find('.video').children('li')
		
		/*var chapterData={
			chapterTitle:chapterTitle,
			videos:[]
		}*/

		//遍历这一章中的所有视频
		$videos.each(function(item){
			$thisVideo=$(this)
			$videoTitle=$thisVideo.find('.J-media-item').mytext().replace(/\s/g,'')
			//var video=$(this).find('.J-media-item')
			//var videoTitle=video.text()
			//var id=video.attr('href').split('video/')[1]

			$videoId=$thisVideo.find('.J-media-item').attr('href').split('video/')[1]
			//合成一个对象，保存至chapterData的videos数组中
			chapterData.videos.push({
				title:$videoTitle,
				id:$videoId
			})
			//video推入courseData完毕
		})
		//videos存储完毕

		courseData.chapters.push(chapterData)
	})//章节遍历结束
	return courseData
}
//输出函数，按照指定格式输出courseData中保存的信息
function printCourseInfo(courseData){
	console.log('##########课程：'+courseData.courseTitle+'######')
	console.log('          >该课程学习人数：'+courseData.courseLearners+'\n')

	courseData.chapters.forEach(function(item){
		console.log('@@@章节：'+item.chapterTitle+'@@\n')
		//输出章节下的视频信息
		item.videos.forEach(function(item){
			console.log('>课程：【'+item.id+']'+item.title)
		})
	})
	console.log('\n')

	/*courseData.forEach(function(courseData){
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

	})*/
}



//var fetchCourseArray=[]

/*videoIds.forEach(function(id){
	fetchCourseArray.push(getPageAsync(baseUrl+id))
})*/

Promise
	.all(pagesArr)
	.then(function(pages){
		pages.forEach(function(page){
			var courseData=filterChapters(page)
			printCourseInfo(courseData)
		})

		/*var coursesData=[]
		pages.forEach(function(html){
			var course=filterChapters(html)
			coursesData.push(course)
		})
		coursesData.sort(function(a,b){
			return a.number<b.number
		})

		printCourseInfo(coursesData)*/
	})