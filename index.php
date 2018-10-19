<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
	</head>
	<body>


		<h1>Найти угол между часовой и минутной стрелкой</h1>

		<label>
			Укажите часы и минуты
			<input type="time" name="time" id="input-time"
			       min="0:00" max="24:00" required value="00:00"/>
		</label>
		<h3>Минимальный угол между минутной и часовой стрелкой: <span id="minimal-angle" style="color: #ff0000;">0</span>°</h3>
		<br>
		<br>
		<canvas height="300" width="300" id="myCanvas"></canvas>



		<script src="time-render.js"></script>
		<script>
			// начальный запуск часов
			displayCanvas(0, 0);

			var valueMinimalAngle = document.getElementById('minimal-angle');

			// обновление часов при изменении вводных данных
			document.getElementById("input-time").onchange = function(){
				var arrTime = document.getElementById('input-time').value.split(':');
				valueMinimalAngle.innerHTML = displayCanvas(arrTime[0], arrTime[1]);
			};
		</script>


	</body>
</html>