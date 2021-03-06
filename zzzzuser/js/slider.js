$(function() {
	'use strict';

	var slider = $('#slider'),
	sliderList = $('<ul></ul>'),
	bulletList = $('<ul></ul'),
	sliderJSON = [
	{
		"imagePath": "images/banner02.jpg",
		"order": "2",
		"url": "#",
		"slideText": "Fresh fruits and vegetables"
	},
	{
		"imagePath": "images/banner03.jpg",
		"order": "3",
		"url": "#",
		"slideText": "Choose you like"
	}, 
	{
		"imagePath": "images/banner01.jpg",
		"order": "1",
		"url": "#",
		"slideText": "Thank you, Egor!"
	},
	{
		"imagePath": "images/banner04.jpg",
		"order": "4",
		"url": "#",
		"slideText": "eks dee"
	}
];

	sliderJSON.sort(function(a, b) {
		return a.order - b.order;
	});


	$.each(sliderJSON, function(index, element) {
		sliderList.append("<li><a href='"+ element.url +"'><img src='" + element.imagePath + "' alt=''></a>" +
			"<div class='content'>"+ element.slideText +"</div></li>");
		bulletList.append("<li id='bullet_"+ (index + 1) +"'></li>");
	});

	sliderList.addClass('sliderList');
	bulletList.addClass('bulletList');
	slider.append(sliderList);
	slider.append(bulletList);

	bulletList.find("li:first-child").addClass('bulletActive');

	var firstSlide = sliderList.find("li:first-child"),
	lastSlide = sliderList.find("li:last-child"),
	buttonPrev = $(".button-prev"),
	buttonNext = $(".button-next"),
	sliderCount = sliderList.children().length,
	sliderWidth = 100.0 / sliderCount,
	slideIndex = 0,
	intervalID;

	lastSlide.clone().prependTo(sliderList);
	firstSlide.clone().appendTo(sliderList);

	//Рассчитываем ширину листа
	sliderList.css({"width": (100 * sliderCount) + "%"});
	sliderList.css({"margin-left": "-100%"});

	//Рассчитываем позицию слайдов
	sliderList.find("li").each(function(index) {
		var leftPercent = (sliderWidth * index) + "%";
		$(this).css({"left": leftPercent});
		$(this).css({"width": sliderWidth + "%"});
	});

	//А вот и обработчики подъехали
	buttonPrev.on('click', function() {
		slide(slideIndex - 1);
	});
	buttonNext.on('click', function() {
		slide(slideIndex + 1);
	});
	$('.bulletList li').on('click', function() {
		var id = ($(this).attr('id').split('_')[1]) - 1;
		slide(id);
	});

	//Запускаем таймер и обрабатываем его остановку
	startTimer();
	slider.on('mouseenter mouseleave', function(e){ 
    	var onMouEnt = (e.type === 'mouseenter') ?  
        clearInterval(intervalID) : startTimer();               
	});

	function slide(newSlideIndex) {

		var marginLeft = (newSlideIndex * (-100) - 100) + "%";
		sliderList.animate({"margin-left": marginLeft}, 400, function() {
			if ( newSlideIndex < 0 ) {
				$(".bulletActive").removeClass('bulletActive');
				bulletList.find("li:last-child").addClass("bulletActive");
				sliderList.css({"margin-left": ((sliderCount) * (-100)) + "%"});
        		newSlideIndex = sliderCount - 1;
        		slideIndex = newSlideIndex;
        		return;
			} else if ( newSlideIndex >= sliderCount ) {
				$(".bulletActive").removeClass('bulletActive');
				bulletList.find("li:first-child").addClass("bulletActive");
				sliderList.css({"margin-left": "-100%"});
				newSlideIndex = 0;
				slideIndex = newSlideIndex;
				return;
			}
			$(".bulletActive").removeClass('bulletActive');
			bulletList.find('li:nth-child('+ (newSlideIndex + 1) +')').addClass('bulletActive');
			slideIndex = newSlideIndex;
		});
	};

	function startTimer() {
		intervalID = setInterval(function() { buttonNext.click(); }, 5000);
		return intervalID;
	};
});


