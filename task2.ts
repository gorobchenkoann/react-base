// Интерфейсы
interface Car {
  color: string,
  brand: string,
  fuelLevel: number,
  maxFuelLevel: number,
  speed: number,
  maxSpeed: number,
  wheels: Wheel[],
  radio?: Radio,
  checkWheels(): void,
  fixWheel(): void,
  paint(color: string): void,
  fill(fuelAmount: number): void,
  go(speed: number): void,
  stop(): void,
  getInfo(): void,
}

interface Wheel {
  position: string,
  isBroken: boolean,
}

interface Radio {
  isPlaying: boolean,
  song?: string,  
  play(song: string): void,
  stop(): void,
}
// --Интерфейсы

// Переменные, реализующие интерфейсы
const radio: Radio = {
  isPlaying: false,
  play(song: string): void {
    this.isPlaying = true;
    this.song = song;
    console.log(`Играет песня ${this.song}`);
  },
  stop(): void {
    this.isPlaying = false;
    console.log('Радио выключено');
  }
}

const wheels: Wheel[] = [
  {position: 'Левое переднее', isBroken: false},
  {position: 'Правое переднее', isBroken: false},
  {position: 'Левое заднее', isBroken: true},
  {position: 'Правое заднее', isBroken: false},
]

const car: Car = {
  radio,
  wheels,
  color: 'Красный',
  brand: 'Жигули',
  maxFuelLevel: 39,
  speed: 0,
  maxSpeed: 100,
  fuelLevel: 3,
  checkWheels() { // Вывод информации о состоянии колес
    let hasBrokerWheels = this.wheels.some((wheel: Wheel) => wheel.isBroken);
    if (hasBrokerWheels) {
      this.wheels.forEach((wheel: Wheel) => {
        if (wheel.isBroken) {
          console.log(`${wheel.position} колесо требует замены.`)
        }
      });
    } else {
      console.log('Все колеса в порядке.')
    }    
  },
  fixWheel() { // Обновление информации о состоянии колес
    const broken: Wheel[] = this.wheels.filter((wheel: Wheel) => wheel.isBroken);
    
    if (broken.length === 0) {
      console.log('Все колеса в порядке.');
      return;
    }

    broken.forEach((wheel: Wheel) => {
      wheel.isBroken = false;
      console.log(`${wheel.position} колесо заменено.`);
    })
  },
  paint(color: string) { // Обновление цвета
    this.color = color;
    console.log(`Машина перекрашена в ${color} цвет.`)
  },
  fill(fuelAmount: number) { // Обновление уровня топлива
    const newFuelAmount = this.fuelLevel + fuelAmount;
    this.fuelLevel = newFuelAmount > this.maxFuelLevel ? this.maxFuelLevel : newFuelAmount;
    console.log(`Бак пополнен, количество топлива составляет ${fuelAmount}л.`);
  },
  go(speed: number) { // Функция управления скоростью
    if (speed > this.maxSpeed) {
      console.log(`Максимальная скорость превышена, значение не должно превышать ${this.maxSpeed}км/ч.`)
    } else {
      this.speed = speed;
      console.log(`Автомобиль движется со скоростью ${this.speed}км/ч.`)
    }
  },
  stop() { // Функция остановки автомобиля
    this.speed = 0;
    console.log('Автомобиль остановлен.')
  },
  getInfo(): void { // Вывод общей информации об автомобиле
    console.log(`Марка машины: ${this.brand}, цвет: ${this.color}, уровень топлива: ${this.fuelLevel}`);
    this.checkWheels();
  }
}
// --Переменные, реализующие интерфейсы
    
// Вызов функций
car.getInfo();
car.fixWheel();
car.fill(20);
car.paint('Зеленый');
car.radio?.play('AC/DC - Highway to hell');
if (car.radio && car.radio.isPlaying) car.radio.stop();
// --Вызов функций