class BaseState {
  nextLight() {
    console.log("Please add ");
  }

  showLight() {
    console.log("Light ...");
  }


}

class Red extends BaseState {
  timeout = 4000;
  nextLight() {
    return new Green();
  }

  showLight() {
    console.log("Red ...");
  }
}

class Green extends BaseState {
  timeout = 5000;
  nextLight() {
    return new Orange();
  }

  showLight() {
    console.log("Green ...");
  }
}

class Orange extends BaseState {
  timeout = 2000;

  nextLight() {
    return new Red();
  }

  showLight() {
    console.log("Orange ...");
  }
}

class TrafficLight {
  #currentState;

  constructor(currentState) {
    this.#currentState = currentState;
  }

  showLight() {
    this.#currentState.showLight();
  }

  nextLight() {
    this.#currentState = this.#currentState.nextLight();
  }

  timeOut() {
    return this.#currentState.timeout;
  }
}

const trafficlight = new TrafficLight(new Green());
/* trafficlight.showLight();
trafficlight.nextLight();
trafficlight.showLight();
trafficlight.nextLight();
trafficlight.showLight();
trafficlight.nextLight(); */

async function tfLight() {
  for (i = 0; i < 10; i++) {
    trafficlight.showLight();
    trafficlight.nextLight();
    console.log(`Delay : ${trafficlight.timeOut()} ms`);
    await new Promise((resolve) =>
      setTimeout(resolve, Number(trafficlight.timeOut()))
    );
  }
}

tfLight();
