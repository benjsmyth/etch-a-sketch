66,74d65
< int startX = 500;
< int startY = 310;
< 
< //So we dont draw outside the box
< int maxX = startX + (startX/2);
< int maxY = startY + (startY/2);
< int minX = startX - (startX/2);
< int minY = startY - (startY/2);
< 
90c81,107
< void setup() {
---
> 
> 
> int startX = 700;
> int startY = 360;
> 
> //So we dont draw outside the box
> int maxX = startX + (startX/2);
> int maxY = startY + (startY/2);
> int minX = startX - (startX/2);
> int minY = startY - (startY/2);
> 
> 
> 
> int cX = 860; int cY = 500; // New canvas desired size
> int mgX = 30; int mgY = 50; //new Desired Margin around each image
> 
> 
> 
> void setupCanvasSize()
> {
> // Trying to get that relative to the whole canvas size
>   //Run after the size of surface is def
>   //@STCStatus : NOT WORKING - I have to find another way to increase the canvas size
>   maxX =  mgX + cX;
>   maxY =  mgY + cY;
>   minX =  mgX;
>   minY =  mgY;
91a109,110
>   startX = mgX + cX / 2;
>   startY = mgY + cY / 2;
92a112,114
> }
> void setup() {
>     
95c117,118
<   size(1600, 768, P3D);
---
>   size(1900, 700, P3D);
>   setupCanvasSize();
97a121,122
>  
>   
144,146d168
< int recSizeX = 5;
< int recSizeY = 5;
< 
148a171,172
> //------------------------------------------------------------------
> //------------------------------------------------------DRAW--------
154c178,179
<  drawRunwayResult();
---
>  //if (!updating)
>    drawRunwayResult();
156,157c181,182
<  //counting++;
<   //delay(1);
---
>   if (!updating)  setStatus(_curStatus);
>  //delay(1);
164c189
<  
---
> 
204c229
<     runway.query(contentImage,ModelUtils.IMAGE_FORMAT_JPG,"contentImage");  
---
>   runway.query(contentImage,ModelUtils.IMAGE_FORMAT_JPG,"contentImage");  
210c235
<     image(runwayResult,maxX+100,minY);
---
>     image(runwayResult,maxX+mgX,minY);
211a237
>   //else println("probably updating");
222c248
<   contentImage = loadImage("content.png");;
---
>   contentImage = loadImage("content.png");
247c273
<     saveContentImage();
---
>     thread("saveContentImage");
250a277
> int countTime = 0;
286a314,321
> int countingTime()
> {
>   int s = second(); 
>   int m = minute(); 
>   int h = hour(); 
>   //text(h+":"+m+":"+s, 15, 50);
>   return h + m +s;
> }
289,290c324,327
< 
< void startInferencing(int _newServerPort,String _painter)
---
> String curStylePrefix = " Current style is from : ";
> String _curStatus = "";
> boolean updating = false;
> void completeInferenceProcessThread()
292,297c329,334
< 
< 
<   currentPainter = _painter;
<    serverPort = _newServerPort;
<    inferencePreview(0);
<    runwayInference(serverPort);
---
>   _curStatus = curStylePrefix + currentPainter;
>   
>     println("Entering sub:completeInferenceProcessThread()");
>     runwayInference(serverPort);
>   
>     println("exiting runwayInference(serverPort): " + countingTime());
301,302c338,342
<    {     
<      saveTlid();
---
>    {
>      
>     println("entering saveTlid(): " + countingTime());
>      saveTlid(); 
>      println("exiting saveTlid(): " + countingTime());
304,305d343
<    String _curStatus = "Current style is from : " + currentPainter;
<   setStatus(_curStatus);
307c345,346
<     updateStrokeColor();
---
>   
>   updateStrokeColor();
309a349,367
>   println("ending startInferencing(): " + countingTime());
> }
> void startInferencing(int _newServerPort,String _painter)
> {
>   updatingStarted();
>   println("-------------------------------------------");
>   countTime = 0;
>   println("Counting started: " + countingTime());
>   currentPainter = _painter;
>    serverPort = _newServerPort;
>     println("entering inferencePreview(): " + countingTime());
>    inferencePreview(0);
>     println("exiting inferencePreview(): " + countingTime());
>     
>     println("entering runwayInference(serverPort): " + countingTime());
>    
>    //chg for trying to run in a thread
>     thread("completeInferenceProcessThread");
>    
315c373
< int picassoPort = 8001;
---
> int picassoPort = 8000;
317,321c375
< int monetPort = 8001;
< char monetKey='4';
< int vangoghPort = 8002;
< char vangoghKey = '3';
< int kandinskyPort = 8000;
---
> int kandinskyPort = 8001;
322a377,380
> int monetPort = 8002;
> char monetKey='3';
> int vangoghPort = 8003;
> char vangoghKey = '4';
483a542,543
>   if (runwayResult == null) runwayResult = loadImage("result.png");
>   
485a546
>   saveTlid();
511c572
<        // v=2;
---
>         v=2;
543a605,606
>        // println("parsing OSC etch");
>         
619c682,683
<     
---
> 
> int statusR = 244;int statusG = 200; int statusB = 188;
623c687,688
<   fill(bgR, bgG, bgB);
---
>   //fill(bgR, bgG, bgB);
>   fill(statusR,statusG,statusB);
664c729,736
< 
---
> void updatingCompleted()
> {
>   updating = false;
> }
> void updatingStarted()
> {
>   updating = true;
> }
676a749
>     
680a754
>   updatingCompleted();
