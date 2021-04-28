66d65
< 
81a81,82
> 
> 
112d112
< 
114,115c114
<   
<   
---
>     
121a121
>  
169,171d168
< int recSizeX = 5;
< int recSizeY = 5;
< 
173a171,172
> //------------------------------------------------------------------
> //------------------------------------------------------DRAW--------
179c178,179
<  drawRunwayResult();
---
>  //if (!updating)
>    drawRunwayResult();
181,182c181,182
<  //counting++;
<   //delay(1);
---
>   if (!updating)  setStatus(_curStatus);
>  //delay(1);
189c189
<  
---
> 
229c229
<     runway.query(contentImage,ModelUtils.IMAGE_FORMAT_JPG,"contentImage");  
---
>   runway.query(contentImage,ModelUtils.IMAGE_FORMAT_JPG,"contentImage");  
235c235
<     image(runwayResult,maxX+100,minY);
---
>     image(runwayResult,maxX+mgX,minY);
236a237
>   //else println("probably updating");
247c248
<   contentImage = loadImage("content.png");;
---
>   contentImage = loadImage("content.png");
272c273
<     saveContentImage();
---
>     thread("saveContentImage");
275a277
> int countTime = 0;
311a314,321
> int countingTime()
> {
>   int s = second(); 
>   int m = minute(); 
>   int h = hour(); 
>   //text(h+":"+m+":"+s, 15, 50);
>   return h + m +s;
> }
314,315c324,327
< 
< void startInferencing(int _newServerPort,String _painter)
---
> String curStylePrefix = " Current style is from : ";
> String _curStatus = "";
> boolean updating = false;
> void completeInferenceProcessThread()
317,322c329,334
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
326,327c338,342
<    {     
<      saveTlid();
---
>    {
>      
>     println("entering saveTlid(): " + countingTime());
>      saveTlid(); 
>      println("exiting saveTlid(): " + countingTime());
329,330d343
<    String _curStatus = "Current style is from : " + currentPainter;
<   setStatus(_curStatus);
332c345,346
<     updateStrokeColor();
---
>   
>   updateStrokeColor();
334a349,367
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
351d383
< 
510a543
>   
539c572
<        // v=2;
---
>         v=2;
571a605,606
>        // println("parsing OSC etch");
>         
648c683
<  int statusR = 244;int statusG = 200; int statusB = 188;
---
> int statusR = 244;int statusG = 200; int statusB = 188;
651a687
>   //fill(bgR, bgG, bgB);
693c729,736
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
705a749
>     
709a754
>   updatingCompleted();
