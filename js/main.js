const time = document.querySelector('#time'),
	greeting = document.querySelector('#greet'),
	name = document.querySelector('#name'),
	focus = document.querySelector('#focus'),
	weatherOutput = document.querySelector('#weatherOutput'),
	weatherLogo = document.querySelector('#weatherLogo')
	locationOutput = document.querySelector('#locationOutput'),
	quote = document.querySelector('#quote'),
	author = document.querySelector('#author'),
	quotation = document.querySelector('#quotation');

let latitude;
let longitude;

globals = {

}

const getLocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition)
	}
}

function showPosition(position) {
	globals.latitude = position.coords.latitude;
	globals.longitude = position.coords.longitude;

}

const loadWeather = () => {

	let xhr = new XMLHttpRequest();


	xhr.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {
			let data = JSON.parse(this.responseText);
			weatherOutput.innerHTML = ` ${data.weather[0].main} ${data.main.temp} &#8451; `
			weatherLogo.setAttribute('src', "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
			locationOutput.innerHTML = ` ${data.name} , ${data.sys.country}`;
			weatherInfo.style.display = 'none';
			weatherLogo.style.display = 'grid';
		}
	}


	xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?lat=${globals.latitude}&lon=${globals.longitude}&APPID=c3d6b97b5191ae33142bf545e04f2398&units=metric`, true);

	xhr.onerror = function () {
		weatherInfo.textContent = "Error while loading weather"
	}

	xhr.send();
}

const getQuote = () => {
	let xhr = new XMLHttpRequest();


	xhr.onreadystatechange = function () {

		if (this.readyState == 4 && this.status == 200) {

			let data = JSON.parse(this.responseText);

			quote.textContent = data.content;
			author.textContent = data.author;

			quote.style.display = 'block';
			quotation.style.display = 'block';

		}

		xhr.onerror = function () {
			quotation.textContent = "Can not get quote";
		}
	}


	xhr.open("GET", 'https://api.quotable.io/random', true);

	xhr.send();

}

const showTime = () => {
	let today = new Date;
	let hour = today.getHours();
	let minutes = today.getMinutes();
	let seconds = today.getSeconds();
	const amOrPm = hour >= 12 ? 'PM' : 'AM';

	hour = hour % 12 || 12;

	time.innerHTML = `${hour}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)} ${amOrPm}`;

	setTimeout(showTime, 1000);
}

const addZero = (number) => {
	return parseInt(number, 10) < 10 ? '0' + number : '' + number;
}

const setBackground = () => {

	let today = new Date();
	let hour = today.getHours();
	if (hour >= 6 && hour < 12) {

		document.body.style.background = 'url(img/morning.jpg) center/cover';
		greeting.textContent = 'Good morning';
	} else if (hour >= 12 && hour < 17) {

		document.body.style.background = 'url(img/afternoon.jpg) center/cover';
		document.body.style.color = '#eee'
		greeting.textContent = 'Good afternoon'
	} else if (hour >= 17 && hour < 20) {

		document.body.style.background = 'url(img/evening.jpg) center/cover';
		quotation.style.color = '#fff';
		greeting.textContent = 'Good evening'


	} else {

		document.body.style.background = 'url(img/night.jpg) center/cover'
		greeting.textContent = 'Good night'
		document.body.style.color = '#eee'

	}
}

const setName = (e) => {
	if (e.type === 'keypress') {
		if (e.keyCode == 13 || e.which == 13) {
			localStorage.setItem('name', e.target.innerText)
			name.blur();
		}

	} else {
		localStorage.setItem('name', e.target.innerText)
	}
}

const setFocus = (e) => {
	if (e.type === 'keypress') {
		if (e.keyCode == 13 || e.which == 13) {
			localStorage.setItem('focus', e.target.innerText)
			focus.blur();
		}

	} else {
		localStorage.setItem('focus', e.target.innerText)
	}
}

const getName = () => {
	if (localStorage.getItem('name') === null) {
		name.textContent = '[Enter your name]';
	} else {
		name.textContent = localStorage.getItem('name');
	}
}

const getFocus = () => {
	if (localStorage.getItem('focus') === null) {
		focus.textContent = '[Enter focus]';
	} else {
		focus.textContent = localStorage.getItem('focus');
	}
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);


focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


getQuote();
getLocation()
setTimeout(loadWeather, 1200);
showTime();
setBackground();
getName();
getFocus();
setName();
setFocus();
