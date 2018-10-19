/* https://habr.com/post/275353/ */
function displayCanvas(srcHours, srcMinutes) {
	var canvasHTML = document.getElementById('myCanvas');
	var contextHTML = canvasHTML.getContext('2d');
	contextHTML.strokeRect(0, 0, canvasHTML.width, canvasHTML.height);

	//Расчет координат центра и радиуса часов
	var radiusClock = canvasHTML.width / 2 - 10;
	var xCenterClock = canvasHTML.width / 2;
	var yCenterClock = canvasHTML.height / 2;

	//Очистка экрана.
	contextHTML.fillStyle = "#ffffff";
	contextHTML.fillRect(0, 0, canvasHTML.width, canvasHTML.height);

	//Рисуем контур часов
	contextHTML.strokeStyle = "#000000";
	contextHTML.lineWidth = 1;
	contextHTML.beginPath();
	contextHTML.arc(xCenterClock, yCenterClock, radiusClock, 0, 2 * Math.PI, true);
	contextHTML.moveTo(xCenterClock, yCenterClock);
	contextHTML.stroke();
	contextHTML.closePath();

	//Рисуем рисочки часов
	var radiusNum = radiusClock - 10; //Радиус расположения рисочек
	var radiusPoint;
	for (var tm = 0; tm < 60; tm++) {
		contextHTML.beginPath();
		if (tm % 5 == 0) {
			radiusPoint = 5;
		} else {
			radiusPoint = 0;
		} //для выделения часовых рисочек
		var xPointM = xCenterClock + radiusNum * Math.cos(-6 * tm * (Math.PI / 180) + Math.PI / 2);
		var yPointM = yCenterClock - radiusNum * Math.sin(-6 * tm * (Math.PI / 180) + Math.PI / 2);
		contextHTML.arc(xPointM, yPointM, radiusPoint, 0, 2 * Math.PI, true);
		contextHTML.stroke();
		contextHTML.closePath();
	}


	//Рисуем стрелки
	var lengthMinutes = radiusNum - 15;
	var lengthHour = lengthMinutes / 1.5;
	var t_min = 6 * parseInt(srcMinutes) % 360; //Определяем угол для минут
	var t_hour = 30 * (parseInt(srcHours) + (1 / 60) * srcMinutes) % 360; //Определяем угол для часов
	var minimalAngle = Math.abs(t_min - t_hour);


	// вычисляем направление сектора для получения наименьшего угла
	startAngle = t_hour;
	endAngle = t_min;
	if (minimalAngle > 180) {
		minimalAngle = 360 - minimalAngle;
		if (t_hour < t_min) {
			// меняем местами для отрисовки в наименьшую сторону
			startAngle = t_min;
			endAngle = t_hour;
		}
	} else {
		if (t_hour >= t_min) {
			// меняем местами для отрисовки в наименьшую сторону
			startAngle = t_min;
			endAngle = t_hour;
		}
	}

	// рисуем сектор
	contextHTML.beginPath();
	contextHTML.fillStyle = "#ff0000";
	contextHTML.moveTo(xCenterClock, yCenterClock);
	contextHTML.arc(xCenterClock, yCenterClock, radiusNum - 10, (Math.PI / 180) * (startAngle - 90) , (Math.PI / 180) * (endAngle - 90));
	contextHTML.lineTo(xCenterClock, yCenterClock);
	contextHTML.fill();
	contextHTML.closePath();

	//Рисуем минуты
	contextHTML.beginPath();
	contextHTML.strokeStyle = "#000000";
	contextHTML.lineWidth = 1;
	contextHTML.moveTo(xCenterClock, yCenterClock);
	contextHTML.lineTo(xCenterClock + lengthMinutes * Math.cos(Math.PI / 2 - t_min * (Math.PI / 180)),
		yCenterClock - lengthMinutes * Math.sin(Math.PI / 2 - t_min * (Math.PI / 180)));
	contextHTML.stroke();
	contextHTML.closePath();

	//Рисуем часы
	contextHTML.beginPath();
	contextHTML.lineWidth = 3;
	contextHTML.moveTo(xCenterClock, yCenterClock);
	contextHTML.lineTo(xCenterClock + lengthHour * Math.cos(Math.PI / 2 - t_hour * (Math.PI / 180)),
		yCenterClock - lengthHour * Math.sin(Math.PI / 2 - t_hour * (Math.PI / 180)));
	contextHTML.stroke();
	contextHTML.closePath();

	return minimalAngle;
}