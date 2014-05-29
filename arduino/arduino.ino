/*

  Arduino Yun Phantom Pebble

 This sketch can be controlled through the REST API of the arduino yun.

 Possible commands created in this shetch:

 * "/arduino/led/black"      -> Turns LED off
 * "/arduino/led/red"        -> Turns LED Red
 * "/arduino/led/yellow"     -> Turns LED Yellow
 * "/arduino/led/green"      -> Turns LED Green

 * "/arduino/digit/[number]" -> Shows the number inserted on the 7-segment digit
   You can also set e (for error) in the digit!

 */

#include <Bridge.h>
#include <YunServer.h>
#include <YunClient.h>

// Output
int redPin = 11;   // Red LED,   connected to digital pin 9
int grnPin = 10;  // Green LED, connected to digital pin 10
int bluPin = 9;  // Blue LED,  connected to digital pin 11

int A = 12;
int B = 8;
int C = 2;
int D = 3;
int E = 4;
int F = 6;
int G = 5;
int dot = 7;

// Color arrays
int black[3]  = { 0, 0, 0 };
int red[3]    = { 100, 0, 0 };
int green[3]  = { 0, 100, 0 };
int yellow[3] = { 60, 40, 0 };

// Set initial color
int redVal = black[0];
int grnVal = black[1];
int bluVal = black[2];

// Initialize color variables
int prevR = redVal;
int prevG = grnVal;
int prevB = bluVal;

// Options
int wait = 10;      // 10ms internal crossFade delay; increase for slower fades
int hold = 0;       // Optional hold when a color is complete, before the next crossFade

// Listen on default port 5555, the webserver on the Yun
// will forward there all the HTTP requests for us.
YunServer server;

void setup() {

  // Startup
  pinMode(redPin, OUTPUT);
  pinMode(grnPin, OUTPUT);
  pinMode(bluPin, OUTPUT);
  pinMode(A, OUTPUT);
  pinMode(B, OUTPUT);
  pinMode(C, OUTPUT);
  pinMode(D, OUTPUT);
  pinMode(E, OUTPUT);
  pinMode(F, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(dot, OUTPUT);

  // Initial values
  crossFade(black);

  digitalWrite(A, LOW);
  digitalWrite(B, LOW);
  digitalWrite(C, LOW);
  digitalWrite(D, LOW);
  digitalWrite(E, LOW);
  digitalWrite(F, LOW);
  digitalWrite(G, LOW);
  digitalWrite(dot, LOW);

  Bridge.begin();
  // Set the LED to red, because we are starting!
  crossFade(red);
  // Set the Digit to 0, because there certainly ain't no other pebbles 
  // discovered by this time yet!
  digit_0();

  // Listen for incoming connection only from localhost
  // (no one from the external network could connect)
  server.listenOnLocalhost();
  server.begin();
}

void loop() {
  // Get clients coming from server
  YunClient client = server.accept();

  // There is a new client?
  if (client) {
    // Process request
    process(client);

    // Close connection and free resources.
    client.stop();
  }

  delay(50); // Poll every 50ms
}

void process(YunClient client) {

  // read the command
  String command = client.readStringUntil('/');

  // Switch to the correct method according to the command
  if (command == "led") {
    ledCommand(client);
  }
  if (command == "digit") {
    digitCommand(client);
  }
}

void digitCommand(YunClient client) {
  
  String digit = client.readStringUntil('\r');
  
  if(digit == "e") {
    digit_E();
    client.print("LED DIGIT set to E");
    return;
  }
  
  if(digit == "1") {
    digit_1();
    client.print("LED DIGIT set to 1");
    return;
  }
  
  if(digit == "2") {
    digit_2();
    client.print("LED DIGIT set to 2");
    return;
  }
  
  if(digit == "3") {
    digit_3();
    client.print("LED DIGIT set to 3");
    return;
  }
  
  if(digit == "4") {
    digit_4();
    client.print("LED DIGIT set to 4");
    return;
  }
  
  if(digit == "5") {
    digit_5();
    client.print("LED DIGIT set to 5");
    return;
  }
  
  if(digit == "6") {
    digit_6();
    client.print("LED DIGIT set to 6");
    return;
  }
  
  if(digit == "7") {
    digit_7();
    client.print("LED DIGIT set to 7");
    return;
  }
  
  if(digit == "8") {
    digit_8();
    client.print("LED DIGIT set to 8");
    return;
  }
  
  if(digit == "9") {
    digit_9();
    client.print("LED DIGIT set to 9");
    return;
  }
  
  if(digit == "0") {
    digit_0();
    client.print("LED DIGIT set to 0");
    return;
  }
  
  client.print(F("error: invalid digit "));
  client.print(digit);
  
}

void ledCommand(YunClient client) {
  
  String color = client.readStringUntil('\r');
  
  if(color == "red") {
    crossFade(red);
    client.print("LED Faded to red!");
    return;
  }
  
  if(color == "yellow") {
    crossFade(yellow);
    client.print("LED Faded to yellow!");
    return;
  }
  
  if(color == "green") {
    crossFade(green);
    client.print("LED Faded to green!");
    return;
  }
  
  if(color == "black") {
    crossFade(black);
    client.print("LED Faded to black!");
    return;
  }
  
  client.print(F("error: invalid color "));
  client.print(color);
}

/*
* DIGIT LED
*
* These methods are used to show a specific number or char on the 7-segment LED digit
*/
void digit_E()
{
  //Displays E
  digitalWrite(D, HIGH);
  digitalWrite(E, HIGH);
  digitalWrite(F, HIGH);
  digitalWrite(G, HIGH);
  digitalWrite(A, HIGH);
  digitalWrite(B, LOW);
  digitalWrite(C, LOW);
  digitalWrite(dot, HIGH);
}
void digit_1()
{
  //Displays 1
  digitalWrite(D, LOW);
  digitalWrite(E, HIGH);
  digitalWrite(F, HIGH);
  digitalWrite(G, LOW);
  digitalWrite(A, LOW);
  digitalWrite(B, LOW);
  digitalWrite(C, LOW);
  digitalWrite(dot, HIGH);
}

void digit_2()
{
  //Displays 2
  digitalWrite(D, HIGH);
  digitalWrite(E, HIGH);
  digitalWrite(F, LOW);
  digitalWrite(G, HIGH);
  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, LOW);
  digitalWrite(dot, LOW);
}

void digit_3()
{
  //Displays 3
  digitalWrite(D, HIGH);
  digitalWrite(E, LOW);
  digitalWrite(F, LOW);
  digitalWrite(G, HIGH);
  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(dot, HIGH);
}

void digit_4()
{
  //Displays 4
  digitalWrite(D, LOW);
  digitalWrite(E, LOW);
  digitalWrite(F, HIGH);
  digitalWrite(G, HIGH);
  digitalWrite(A, LOW);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(dot, LOW);
}

void digit_5()
{
  //Displays 5
  digitalWrite(D, HIGH);
  digitalWrite(E, LOW);
  digitalWrite(F, HIGH);
  digitalWrite(G, HIGH);
  digitalWrite(A, HIGH);
  digitalWrite(B, LOW);
  digitalWrite(C, HIGH);
  digitalWrite(dot, LOW);
}

void digit_6()
{
  //Displays 6
  digitalWrite(D, HIGH);
  digitalWrite(E, HIGH);
  digitalWrite(F, HIGH);
  digitalWrite(G, HIGH);
  digitalWrite(A, HIGH);
  digitalWrite(B, LOW);
  digitalWrite(C, HIGH);
  digitalWrite(dot, HIGH);
}

void digit_7()
{
  //Displays 7
  digitalWrite(D, LOW);
  digitalWrite(E, LOW);
  digitalWrite(F, LOW);
  digitalWrite(G, LOW);
  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(dot, LOW);
}

void digit_8()
{
  //Displays 8
  digitalWrite(D, HIGH);
  digitalWrite(E, HIGH);
  digitalWrite(F, HIGH);
  digitalWrite(G, HIGH);
  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(dot, LOW);
}

void digit_9()
{
  //Displays 9
  digitalWrite(D, HIGH);
  digitalWrite(E, LOW);
  digitalWrite(F, HIGH);
  digitalWrite(G, HIGH);
  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(dot, HIGH);
}

void digit_0()
{
  //Displays 0
  digitalWrite(D, HIGH);
  digitalWrite(E, HIGH);
  digitalWrite(F, HIGH);
  digitalWrite(G, LOW);
  digitalWrite(A, HIGH);
  digitalWrite(B, HIGH);
  digitalWrite(C, HIGH);
  digitalWrite(dot, LOW);
}

/*
* LED CROSSFADE
*
* The program works like this:
* Imagine a crossfade that moves the red LED from 0-10,
*   the green from 0-5, and the blue from 10 to 7, in
*   ten steps.
*   We'd want to count the 10 steps and increase or
*   decrease color values in evenly stepped increments.
*   Imagine a + indicates raising a value by 1, and a -
*   equals lowering it. Our 10 step fade would look like:
*
*   1 2 3 4 5 6 7 8 9 10
* R + + + + + + + + + +
* G   +   +   +   +   +
* B     -     -     -
*
* The red rises from 0 to 10 in ten steps, the green from
* 0-5 in 5 steps, and the blue falls from 10 to 7 in three steps.
*
* In the real program, the color percentages are converted to
* 0-255 values, and there are 1020 steps (255*4).
*
* To figure out how big a step there should be between one up- or
* down-tick of one of the LED values, we call calculateStep(),
* which calculates the absolute gap between the start and end values,
* and then divides that gap by 1020 to determine the size of the step
* between adjustments in the value.
*/

int calculateStep(int prevValue, int endValue) {
  int step = endValue - prevValue; // What's the overall gap?
  if (step) {                      // If its non-zero,
    step = 1020 / step;            //   divide by 1020
  }
  return step;
}

/* The next function is calculateVal. When the loop value, i,
*  reaches the step size appropriate for one of the
*  colors, it increases or decreases the value of that color by 1.
*  (R, G, and B are each calculated separately.)
*/

int calculateVal(int step, int val, int i) {

  if ((step) && i % step == 0) { // If step is non-zero and its time to change a value,
    if (step > 0) {              //   increment the value if step is positive...
      val += 1;
    }
    else if (step < 0) {         //   ...or decrement it if step is negative
      val -= 1;
    }
  }
  // Defensive driving: make sure val stays in the range 0-255
  if (val > 255) {
    val = 255;
  }
  else if (val < 0) {
    val = 0;
  }
  return val;
}

/* crossFade() converts the percentage colors to a
*  0-255 range, then loops 1020 times, checking to see if
*  the value needs to be updated each time, then writing
*  the color values to the correct pins.
*/

void crossFade(int color[3]) {

  // Convert to 0-255
  int R = (color[0] * 255) / 100;
  int G = (color[1] * 255) / 100;
  int B = (color[2] * 255) / 100;

  int stepR = calculateStep(prevR, R);
  int stepG = calculateStep(prevG, G);
  int stepB = calculateStep(prevB, B);

  for (int i = 0; i <= 1020; i++) {
    redVal = calculateVal(stepR, redVal, i);
    grnVal = calculateVal(stepG, grnVal, i);
    bluVal = calculateVal(stepB, bluVal, i);

    analogWrite(redPin, redVal);   // Write current values to LED pins
    analogWrite(grnPin, grnVal);
    analogWrite(bluPin, bluVal);

    delay(wait); // Pause for 'wait' milliseconds before resuming the loop
  }
  // Update current values for next loop
  prevR = redVal;
  prevG = grnVal;
  prevB = bluVal;
  delay(hold); // Pause for optional 'wait' milliseconds before resuming the loop
}

