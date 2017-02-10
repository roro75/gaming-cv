$(document).ready(function(){

  /*
   * Canvas
   */

  var canvas = (function(color, blur, x, y, r) {

      // Sun
      var sun = document.getElementById("sun");
      var ctx = sun.getContext("2d");
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.filter = blur;
      ctx.fill();
   
  })('#fffbb0', 'blur(3px)', 100, 100, 50);

})
