//@STCGoal PImage to Base64 for API upload

import org.apache.commons.codec.binary.Base64;
import java.io.*;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
 
void setup() {
  size(1200, 600);
  PImage img = loadImage("http" + "://i.stack.imgur.com/WCveg.jpg");
  image(img, 0, 0);
 
  String encoded = "";
  PImage decoded = createImage(img.width, img.height, RGB);
 
  try {
    encoded = EncodePImageToBase64(img);
    //println(encoded);
  } 
  catch (IOException e) {
    println(e);
  }
  String [] hell = {encoded};
 
  saveStrings("encoded.txt", hell);
 
  try {
    decoded = DecodePImageFromBase64(encoded);
    println(decoded);
  } 
  catch (IOException e) {
    println(e);
  }
 
  image(decoded, img.width, 0);
}
 
 
 
public String EncodePImageToBase64(PImage i_Image) throws UnsupportedEncodingException, IOException
{
  String result = null;
  BufferedImage buffImage = (BufferedImage)i_Image.getNative();
  ByteArrayOutputStream out = new ByteArrayOutputStream();
  ImageIO.write(buffImage, "PNG", out);
  byte[] bytes = out.toByteArray();
  result = Base64.encodeBase64URLSafeString(bytes);
 
  return result;
}
 
 
public PImage DecodePImageFromBase64(String i_Image64) throws IOException
{
  PImage result = null;
  byte[] decodedBytes = Base64.decodeBase64(i_Image64);
 
  ByteArrayInputStream in = new ByteArrayInputStream(decodedBytes);
  BufferedImage bImageFromConvert = ImageIO.read(in);
  BufferedImage convertedImg = new BufferedImage(bImageFromConvert.getWidth(), bImageFromConvert.getHeight(), BufferedImage.TYPE_INT_ARGB);
  convertedImg.getGraphics().drawImage(bImageFromConvert, 0, 0, null);
  result = new PImage(convertedImg);
 
  return result;
}