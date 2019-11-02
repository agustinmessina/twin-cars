#define POT_1 0
#define POT_2 1

void setup() {
  Serial.begin(9600);
  pinMode(POT_1, INPUT);
  pinMode(POT_2, INPUT);
}

void loop() {
  int valueOne = analogRead(POT_1);
  int valueTwo = analogRead(POT_2);

  String output = convertInputToOutputStr(valueOne, valueTwo);

  Serial.println(output);
}

String convertInputToOutputStr(int valueOne, int valueTwo) {
  char output[16];

  sprintf(output, "P1:%d P2:%d", valueOne, valueTwo);
  
  return String(output);
}
