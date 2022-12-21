import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cnsAssignent';
  enc="enc"
  dec="dec"
  method="AES"
 
  ek="YourSecretKeyForEncryption"
  dk = "YourSecretKeyForDescryption";
  constructor() { }



  encrypt(value : string) {
    
    if(this.method == "AES")
    this.enc = CryptoJS.AES.encrypt(value, this.ek.trim()).toString();
    else
    if(this.method == "3DES")
    this.enc = CryptoJS.TripleDES.encrypt(value, this.ek.trim()).toString();
    
    else
    if(this.method == "OTP")
    this.enc = this.encryptO(value, this.ek.trim());
  }

  decrypt(textToDecrypt : string){
    
    if(this.method == "AES")
    this.dec = CryptoJS.AES.decrypt(textToDecrypt, this.dk.trim()).toString(CryptoJS.enc.Utf8);
    else
    if(this.method == "3DES")
    this.dec = CryptoJS.TripleDES.decrypt(textToDecrypt, this.dk.trim()).toString(CryptoJS.enc.Utf8);
    else
    if(this.method == "OTP")
    this.dec = this.decryptO(textToDecrypt, this.dk.trim());
  }


  
 encryptO(str: any , key: any) {
  var result = "";
  var keylen = 0;
  for (var i = 0; i < key.length; i++) {
    keylen+= key.charCodeAt(i);
  }

  for (var i = 0; i < str.length; i++) {
    var charCode = (str.charCodeAt(i) + keylen) % 256;
    console.log(i+charCode)
    result += String.fromCharCode(charCode);
  }
  console.log(1234)
  console.log(result)
  return result;
}

 decryptO(str:any, key:any) {
  var result = "";
  var keylen = 0;
  for (var i = 0; i < key.length; i++) {
    keylen+= key.charCodeAt(i);
  }
  for (var i = 0; i < str.length; i++) {
    var charCode = (str.charCodeAt(i) - keylen + 256) % 256;
    result += String.fromCharCode(charCode);
  }
  return result;
}
}