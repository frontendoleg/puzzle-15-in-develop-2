function init() {
	console.time("draw");
	var browserWidth = window.innerWidth; // ширина окна
	var browserHeight = window.innerHeight; // высота окна
	var fooW = 20*Math.floor(browserWidth/20); // ширина окна с округлением в меньшую сторону с шагом 20
	var fooH = 20*Math.floor(browserHeight/20);  // высота окна с округлением в менбшую сторону с шагом 20
	var bar = Math.min(fooW, fooH );  // выбираем меньшее значение из ширины и высоты
	var FieldSize;
	if (bar>480){ fieldSize = 480}
		else {fieldSize = bar};  // выбираем размер игрового поля
	var boneSize = Math.floor(fieldSize/4);  // размер костяшки

makeGameField(fieldSize+20); // создаем игровое поле

var field = new game15(); 	// создаем объект пятнашек

field.draw(boneSize);
console.timeEnd("draw"); // рисуем наши пятнашки

function event(x,y){
	field.move(x,y);
	field.draw(boneSize);
}

$(function(){ // обработчик кликов мыши
	var fieldSpace = $('#fff');
	fieldSpace.click(function(e){
		/*console.log("e= ",e);*/
		var x = ( e.pageX - fieldSpace.offset().left) / boneSize | 0;
		console.log("x= ",x);
		var y = ( e.pageY - fieldSpace.offset().top) / boneSize | 0;
		console.log("y= ",y);
		event(x,y); // вызов функции действия

	});
});

$(function(){ // обработчик клавиатуры
	var button = $('#mybutton');
	button.focus();
	button.keydown(function(e){
		switch (e.which) {
			case 37 : console.log('left');break;
			case 39 : console.log('right');break;
			case 38 : console.log('up');break;
			case 40 : console.log('down');
		}
	});

});


}


function game15(){
	var cellView = null;
	var numView = null;
	var arr = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
	var cliks = 0;
			function getNull(){	//функция возвращает координату пустой клетки
				for (var yi = 0;  yi < 4; yi++) {
					for (var xj = 0; xj < 4; xj++) {
						if (arr[yi][xj] === 0) {
							return{"x":xj,"y":yi};
						}
					}
				}
			}
	// метод, рисующий наши пятнашки на экране
	this.draw = function(boneSize) {
		console.log('arr',arr);
		for (var yi = 0; yi < 4; yi++) {
			for (var xj = 0; xj < 4; xj++) {
				if (arr[yi][xj] > 0) {
											$("<div></div>",{
													'width': boneSize+"px",
													'height': boneSize+"px",})		// создаем костяшки
												.css({
													'background-color':'green',
													'border':'10px solid #999',
													/*'border-radius': '15px',*/
													'position' : 'absolute',
													'left': xj*boneSize+"px",
													'top': yi*boneSize+"px",})			// стили костяшки
												.toggleClass("bones")
												.appendTo('.wrapperr')
												.append($('<p></p>')).text(arr[yi][xj])			// пишем цифры
												.css({
													'text-align':'center',
													'color':'white',
													'text-weight':'bold',
													'font-family':'arial',
													'line-height':boneSize+"px",
													'font-size':Math.floor(boneSize/3)+"px",
													'color':'white',});									// размер шрифта 1/3
				}
				else{
											$("<div></div>",{
													'width': boneSize+"px",
													'height': boneSize+"px",})		// создаем костяшки
												.css({
													'background-color':'#999',
													'border':'10px solid #999',
													/*'border-radius': '15px',*/
													'position' : 'absolute',
													'left': xj*boneSize+"px",
													'top': yi*boneSize+"px",
													'margin-left':'auto',
													'margin-right':'auto',})			// стили костяшки
												.toggleClass("bones")
												.appendTo('.wrapperr') 	// цифру на ней не пишем -  маленький костыль
				}
			/*alert('xj= ' + xj + ' yi= ' + yi + ' bone= '+ arr[yi][xj]);*/
			}
		}
	}; // --> end of this.draw method
	// метод перемещает "пятнашку" в пустую клетку
	this.move = function(x,y) {
		var nullX = getNull().x;
		var nullY = getNull().y;
		console.log ('x=',x,'y=',y,'nullx=',nullX,'nully=',nullY);
		if(((x-1 == nullX || x+1 == nullX) && y == nullY) || ((y-1 == nullY || y+1 == nullY) && x == nullX)) {

				arr[nullY][nullX] = arr[y][x];
				arr[y][x] = 0;
				//clicks++;
		}
	}; 	//  --> end of this.move method
}

function makeGameField(fieldSize) {
	$("<div></div>",{
		'width': fieldSize+"px",
		'height': fieldSize+"px",})
	.addClass('wrapperr')			// присваиваем класс
	.css({
		'background-color': '#999',
	 	'margin': '0 auto',
	 	'position': 'relative',}).attr('id','fff')		// стили поля
	.appendTo('body');
}