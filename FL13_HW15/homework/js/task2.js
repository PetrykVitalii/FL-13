const CreateVehicle = function (transport, engine, color, model = 'unknown model') {

    this.engine = engine;
    this.color = color;
    this.maxSpeed = 70
    this.model = model;
    this.transport = transport
    this.speed = 0
    this.yourMaxSpeed = 0
    this.change
    let time 

    this.upgradeEngine = function (engine, maxSpeed) {
        if (this.speed === 0) {
            this.engine = engine;
            this.maxSpeed = maxSpeed
        } else {
            console.log('stop!!!');
        }
    }

    this.getInfo = function () {
        return {
            engine: this.engine,
            color: this.color,
            maxSpeed: this.maxSpeed,
            model: this.model
        }
    }

    this.drive = function () {
        if (this.change !== 'drive') {
            console.log('lets drive');
            this.change = 'drive'
            clearInterval(time)
            time = setInterval(() => {
                this.speed += 20
                if (this.speed >= this.yourMaxSpeed) {
                    this.yourMaxSpeed = this.speed
                }
                console.log(this.speed);
                if (this.maxSpeed <= this.speed) {
                    console.log('speed is too high, SLOW DOWN!');
                    if (this.maxSpeed + 30 <= this.speed && transport === 'motorcycle') {
                        console.log('Engine overheating');
                        this.stop()
                    }
                }
            }, 2000)
        } else {
            console.log('already driving');
        }
    }

    this.stop = function () {
        if (this.change !== 'stop') {
            this.change = 'stop'
            if (this.speed === 0) {
                console.log('you are standing');
            } else {
                clearInterval(time)
                time = setInterval(() => {
                    this.speed -= 20
                    if (this.speed === 0) {
                        clearInterval(time)
                        console.log(`${transport} is stopped. Maximum speed during the drive was ${this.yourMaxSpeed}`);
                    } else{
                        console.log(this.speed)
                    }
                }, 1500)
            }
        } else {
            console.log('Already slows down');
        }
    }
}

const VENICLE = new CreateVehicle('venicle', 'v4', 'orange')

const CAR = new CreateVehicle('car', 'v8', 'black', 'Ford Mustang')
CAR.maxSpeed = 80
CAR.changeColor = function (newColor) {
    this.color !== newColor 
        ?this.color = newColor 
        :console.log('the selected color is the same as the previous, please choose another one');
}

const MOTORCYCLE = new CreateVehicle('motorcycle', 'v6', 'green', 'Kawasaki')
MOTORCYCLE.maxSpeed = 90