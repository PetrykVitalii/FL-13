function countPoints(arr) {
    let count = 0;
    arr.forEach(game => {
        let point = game.split(":");
        if (isBigger(point[0], point[1])) {
            count += 3
        } else if (isBigger(point[1], point[0])) {
            count += 0
        } else {
            count += 1
        }
    });
    return count;
}

function isBigger(big, small) {
    return big > small;
}

countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0'])