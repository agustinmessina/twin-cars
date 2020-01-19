const potentiometerEventListener = (event, game) => {
  const newValues = JSON.parse(event.data);

  if (game.potentiometerValues !== newValues)
    game.potentiometerValues = newValues;

  const mapValue = (value, outMin, outMax) => value * (outMax - outMin) / 1023 + outMin;

  const positionCar = (trackNumber, value) => {
    const track = game.tracks[trackNumber];
    const background = track.road.background;
    const car = track.car;

    const mappedValue = mapValue(value, background.leftX, background.rightX);

    car.fixValue(mappedValue);
  }

  positionCar(0, game.potentiometerValues.p1);
  positionCar(1, game.potentiometerValues.p2);
}

export default potentiometerEventListener;