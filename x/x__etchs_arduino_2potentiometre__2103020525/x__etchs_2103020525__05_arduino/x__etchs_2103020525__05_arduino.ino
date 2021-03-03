//This Sketch will be using a previous experience that was sending a specific way thru serial the readings from a sensor.  It will send coordinate from 2 potentiometers.
// On the next step, I am wondering if Session 5 of Rebecca F. course on ML (Sensors and feature) might not be relevant to create this system. (https://www.kadenze.com/courses/machine-learning-for-musicians-and-artists-v/sessions/sensors-and-features-generating-useful-inputs-for-machine-learning)
//WHat do we want.
/*
Etch a sketch button turn infinite and draw a small line in x or y depending which button you turn.  You can turn both.
The output we want : Have fun :)
Limits of potentiometers (the one I have thought) : Limited to a fixed range / You can not turn them.
What can we do : 
* Master the capture and transformation of features.
* The Wekinator input helper could transform what we sample and produce a form of alternative movement in X  
The Wekinator Input Helper will be of great use to receive, transform and output again to the ML engine well organized features.  The output produced by the model can be sent back to Processing to move and draw lines according to data.

In short, it resume on an arduino inputs of potentiometers transmitted through serial port to processing which retransmit raw features via Open Sound Control (OSC) to Wekinator Input Helper (WIH).  WIH transform these features adequatly for the learning algorithm and transmit these newly prepared features to Wekinator through OSC where is being learned the patterns mapped to their outputs which are sent back to processing via OSC where the drawing is made and interpreted by an AI agent stylizing the Etch a sketch using the desired painter stylistic AI modeling.

*/

void setup() {
  // put your setup code here, to run once:

}

void loop() {
  // put your main code here, to run repeatedly:

}
