/*
 * Initialisation des sons
 */

var mainSound = new Audio('sounds/Reggae9_90.mp3');

          mainSound.addEventListener('ended', function() {
              this.currentTime = 0;
              this.play();
          }, false);

          mainSound.play();


var sounds = {
    homeSound:function(){

    },
    level1: function() {

        mainSound = new Audio('sounds/Reggae9_90.mp3');
        mainSound.loop = true;
    },
    level2: function() {

        mainSound = new Audio('sounds/Reggae8_84.mp3');
        mainSound.loop = true;
    },
    level3: function() {

        mainSound = new Audio('sounds/Reggae4_90.mp3');
        mainSound.loop = true;
    },
    bonusSound: function() {
        var bonusSnd = new Audio('sounds/bonus.mp3');
        bonusSnd.play();
    },
    hitSound: function() {
        var hitSnd = new Audio('sounds/hit.mp3');
        hitSnd.play();

    },
    displayScoreSound: function() {
        var displayScoreSnd = new Audio('sounds/displayScore.mp3');
        displayScoreSnd.play();
    },
    burstSound: function(){
      var burstSnd = new Audio('sounds/burst.mp3');
      burstSnd.play();
    }

}
