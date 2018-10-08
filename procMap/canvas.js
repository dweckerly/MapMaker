const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

var cOffset = { x: 0, y: 0 };
var mouseOffset = { x: 0, y: 0 };
var mousePos;

var dragging = false;

var wildImg = new Image();
wildImg.src = 'img/wildIcon.png';