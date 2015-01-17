$(document).ready(function() {
  
   $("table tr:nth-child(3)").click(function() {
       var ret = prompt("Please add a class name: ");
       alert("You have entered: " +  ret);
   });
});