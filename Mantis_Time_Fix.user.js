// ==UserScript==
// @name        Mantis Time Fix
// @author      phija
// @namespace   http://www.phiworld.de
// @description Sets the time of an input field in Mantis changed by a javascript calendar or so automatically to a specified value.
// @include     *://trackerUrl/*
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version      0.1.1
// ==/UserScript==

var timeToSet = "20:00";

var focusedValue = "";
//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function()
{
  //alert("jQuery is loaded");
});


function plantEventFunction() {
  
  // focus out is only happening when user has "hands on" manually: in this case restore the buffered date time value
  $("#due_date").focusout(function() {
    this.value = focusedValue;
    console.log("focus out on input --> reset value to " + focusedValue);
  });
  
  var element = document.getElementById("due_date");
  // on every change, set the time to "timeToSet"
  element.onchange = function() {    
    focusedValue = this.value;
    var dateAndTime = this.value.split(" ");
    if (dateAndTime.length == 2)
    {
      dateAndTime[1] = timeToSet;
      this.value = dateAndTime.join(" ");
      console.log("fixed time to " + timeToSet);
    }
  }  
}

plantEventFunction();
