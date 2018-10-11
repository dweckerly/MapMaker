const arrayLength = 800;
const arrayHeight = 600;

var mapArray = [
    []
];

function generateMapArray() {
    for (let i = 0; i < arrayHeight; i++) {
        for (let j = 0; j < arrayLength; j++) {
            if (oceanPerimeter(i, j)) {
                mapArray[i][j] = 0;
            } else {
                mapArray[i][j] = 1;
            }
        }
    }
    console.log(mapArray);
}

function oceanPerimeter(i, j) {
    if (i == 0) {
        return true;
    } else if (i == arrayHeight) {
        return true;
    } else if (j == 0) {
        return true;
    } else if (j == arrayLength) {
        return true;
    }
    return false;
}

generateMapArray();