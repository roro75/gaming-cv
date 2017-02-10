'use strict';
$(document).ready(function() {
    //
    var init = {
        initSound1: function() {
            $.ajax({
                url: "sounds/Reggae9_90.mp3",
                success: function() {
                    init.initBg1();
                }
            });
        },
        initSound2: function() {
            $.ajax({
                url: "sounds/Reggae8_84.mp3",
                success: function() {
                    init.initSound3()
                }
            });
        },
        initSound3: function() {
            $.ajax({
                url: "sounds/Reggae4_90.mp3",
                success: function() {
                    init.initBg2();
                }
            });
        },
        initSound4: function() {
            $.ajax({
                url: "sounds/displayScore.mp3",
                success: function() {
                    init.initSound5();
                }
            });
        },
        initSound5: function() {
            $.ajax({
                url: "sounds/burst.mp3",
                success: function() {
                    init.initSound6();
                }
            });
        },
        initSound6: function() {
            $.ajax({
                url: "sounds/hit.mp3",
                success: function() {
                    init.initSprite();
                }
            });
        },
        initSprite: function() {
            $.ajax({
                url: "img/sprite/Sprite.png",
                success: function() {
                    init.showInterface();
                    init.initSound2();

                }
            });
        },
        initBg1: function() {
            $.ajax({
                url: "img/wood/Bg.jpg",
                success: function() {
                    init.initSound4()
                }
            });
        },
        initBg2: function() {
            $.ajax({
                url: "img/desert/Bg.jpg",
                success: function() {
                    init.initBg3()
                }
            });
        },
        initBg3: function() {
            $.ajax({
                url: "img/winter/Bg.jpg",
                success: function() {

                }
            });
        },
        showBg: function() {
            $('.wrapper').fadeIn('slow', function() {

            });

        },
        showInterface: function() {
            $('.interface').fadeIn('slow', function() {
                $('.loader').fadeOut();
                game.initGame();
                console.log('loaded!');
            })
        }
    }

    $.ajax({
        url: "img/home/Cloudy-sky-cartoon.jpg",
        success: function() {
            init.initSound1();
            init.showBg();
        }
    });

    var game = {

        initGame: function() {

            var _pause = false;
            var _isActive = false; // Si le jeu est lancé
            var _hitIsActive = true; // Si le hit est activé
            var _gameIsOver = false; // game over
            var _gameOverIsActive = false; // game over actif
            var _isPress = false; // test si une touche est pressée
            var _goal = false;
            var _messageIsActive = true;
            var _endDistance = false;
            var _distanceTotal = 3000; // temps pour chaque round
            var _valMoveDown = 16; // valeur en pixels de descente du hero par defaut
            var _valUp = 35; // valeur en pixels de monté lorsque on appuie sur la fleche du haut
            var _stamp = 30; // valeur du frame rate
            var _i = 0; // pour calculer une fin au jeu
            var _coef = 3; // valeur de deplacement en px
            var _level = 1;

            var _levelArray = [];
            var _pressedKey = {}; // pour les touches


            var _distanceLeft;
            var _timeStampInitial; // timeStamp de départ
            var _reqAnim; // var requestAnimationFrame pour les elements
            var _reqAnimHero; // var requestAnimationFrame pour le hero
            var _hitInterval;
            var _score; // pour le score


            var HeroConstruct = function() {
                this.startTop = '-200'; // position top du containerHero en px
                this.startLeft = '100'; // position left du containerHero en px
                this.imgStartX = '0'; // position de l'image sprite en left ($hero.css('left', '0');)
                this.imgStartY = '0'; // position de l'image sprite en top ($hero.css('top', '0');)
                this.heroWidth = $('#hero').width(); //
                this.heroHeight = $('#hero').height(); //
                this.gap = 14; // px de déplacement du containerHero
                this.sprites = 150; //this.heroWidth / 9; //150;//// 9 images dans la largeur de la sprite
                this.containerHeroW = this.sprites; // largeur d'une image de la sprite -> 150
                this.containerHeroH = this.sprites;
                this.imgMaxWidth = this.heroWidth - this.sprites; // largeur max avant la derniere sprite pour repositionner à 0 -> 1350 -150
                this.containerStartX = this.startTop;
                this.containerStartY = this.startLeft;
                this.containerHeroX = undefined;
                this.containerHeroY = undefined;
            };

            var hero = new HeroConstruct();


            var level1 = function() {

                levels.level1();
                sounds.level1();
                app.displayMessage('Level&nbsp;' + _level + ' <br> <span>- Easy -</span> ', 'cornflowerblue', 2);

            };

            //
            var level2 = function() {

                levels.level2();
                sounds.level2();
                app.displayMessage('Level&nbsp;' + _level + '<br><span>- medium -</span>', 'coral', 2);
            };


            var level3 = function() {

                levels.level3();
                sounds.level3();
                app.displayMessage('Level&nbsp;' + _level + '<br><span>- Hard -</span>', 'magenta', 2);
            };


            _levelArray.push(null, level1, level2, level3);

            /*
             * Initialisation des elements
             */
            var initElements = function() {

                if (_isActive) {
                    app.removeElements().clearArray();
                }

                _isActive = false;

                $('.bg, .floor').animate({ // anim remise à zero
                    'left': '0'
                }, 1000, "easeInCubic");

                $('#containerHero').width(hero.sprites) + 'px';
                $('#containerHero').height(hero.sprites) + 'px';
                $('#containerHero').css('top', hero.startTop + 'px');
                $('#containerHero').css('left', hero.startLeft + 'px');

            };
            /*
             * moveElements
             */
            var addElements = function() {

                for (var i = 0; i < _arrayElements.length; i++) {
                    var el = $('#' + _arrayElements[i].id);
                    var id = _arrayElements[i].id;
                    var cl = _arrayElements[i].class;
                    var num = _arrayElements[i].num;
                    var width = _arrayElements[i].width;
                    var height = _arrayElements[i].height;
                    var src = _arrayElements[i].src;
                    var bottom = _arrayElements[i].bottom;
                    var coef = _arrayElements[i].coef;
                    var bonus = _arrayElements[i].bonus;
                    var start = _arrayElements[i].start;
                    var delay = _arrayElements[i].delay;
                    var decor = _arrayElements[i].decor;
                    var repeat = _arrayElements[i].repeat;
                    var $div;



                    if (_i == delay + 1) { // + 1 pour afficher les elements en start 0

                        if (!decor) { // si different de decor

                            $div = "<div class='" + cl + "' id='" + id + "' data-delay='" + delay + "' data-decor='" + decor + "' data-repeat='" + repeat + "' data-coef='" + coef + "' data-el='elements'> <div class='" + cl + "Hit' id='" + cl + "Hit" + num + "'></div><img src=" + src + " alt='" + id + "' width='" + width + "' height= '" + height + "'/> </div>";

                            $($div).appendTo('#displayInterface'); // on ajoute les éléments dans le DOM

                            $('#' + id).css({ // on applique un css
                                position: 'absolute',
                                bottom: bottom + 'px',
                                left: start + 'px',
                                overflow: 'hidden',
                                zIndex: '1000'
                            });
                        };
                    };
                };
            }

            var moveElements = function() {

                addElements(); // fonction pour ajouter les elements au DOM

                $("div[data-el='elements']").each(function() {

                    var delay = $(this).attr('data-delay');
                    var repeat = $(this).attr('data-repeat');
                    var decor = $(this).attr('data-decor');
                    var coef = $(this).attr('data-coef');

                    var el = $(this);

                    if (!_pause) {

                        var posX = el.width() / 2;

                        if (decor == 'true') {
                            el.css('left', '-=' + coef); // on déplace

                            if (el.position().left < -posX) {
                                el.css('left', '0px');
                            }
                        } else {

                            if (repeat == 'true') {;
                                el.css('left', '-=' + coef); // on déplace
                                if (el.position().left < -posX) {
                                    el.css('left', '0px');
                                }
                            } else {


                                if (el.position().left + el.width() < -posX) {

                                    el.css('left', '-=0');
                                    el.remove();

                                } else {
                                    // el.css('left', '-=' + coef + 'px'); // on déplace
                                    if (_i > delay) {
                                        el.css('left', '-=' + coef + 'px'); // on déplace
                                    }
                                }
                            }
                        }
                    } else {
                        el.css('left', '-=0');
                    };

                })
                _reqAnim = requestAnimationFrame(moveElements);

            };
            /*
             *  game
             */
            var moveHero = function(evt) {
                _isActive = true; // Si le jeu est lancé
                if (!_pause) {
                    /*
                     * je recupere la position top et left du containerHero et du hero
                     */
                    hero.containerHeroX = $('#containerHero').position().left;
                    hero.containerHeroY = $('#containerHero').position().top;
                    var containerCurrentPosY = hero.containerHeroY + _valMoveDown;
                    //
                    var heroX = $('#hero').position().left;
                    var heroY = $('#hero').position().top;
                    //
                    if (!_timeStampInitial) {
                        _timeStampInitial = evt;
                    };
                    var differentiel = evt - _timeStampInitial;
                    if (differentiel > _stamp) {
                        _timeStampInitial = evt;
                        /*
                         * LEFT
                         */
                        if (_pressedKey[37]) {
                            //alert('left');
                            if (hero.containerHeroX > (-hero.containerHeroX / 2)) { // point d'arret de l'image a gauche
                                hero.containerStartX = $('#containerHero').position().left - hero.gap;
                                $('#containerHero').css('left', hero.containerStartX + 'px');
                            }
                        } // end Key 37
                        /*
                         * UP
                         */
                        if (_pressedKey[38]) {
                            //alert('up');
                            if (hero.heroWidth > -hero.imgMaxWidth) {
                                hero.imgStartX = hero.heroWidth - hero.sprites;
                            } else {
                                hero.imgStartX = 0;
                            }
                            if (hero.containerHeroY > (0 - (hero.containerHeroH / 3))) { // point d'arret de l'image en hauteur
                                hero.containerStartY = hero.containerHeroY - (hero.gap * 2);
                                containerCurrentPosY -= _valUp;
                                $('#containerHero').css('top', hero.containerStartY + 'px');
                            };
                        }; // end Key 38
                        /*
                         * RIGHT
                         */
                        if (_pressedKey[39]) {
                            //alert('right');
                            if (hero.containerHeroX < ($('#container').width() - (hero.containerHeroW * 1.5))) { // point d'arret de l'image a droite
                                hero.containerStartX = $('#containerHero').position().left + hero.gap;
                                $('#containerHero').css('left', hero.containerStartX + 'px');
                            }
                        }; // end Key 39
                        /*
                         * DOWN
                         */
                        if (_pressedKey[40]) {
                            //alert('down');
                            hero.containerStartY = hero.containerHeroY + hero.gap;
                            if (heroX > -hero.imgMaxWidth) {
                                hero.imgStartX = heroX - hero.sprites;
                            } else {
                                hero.heroX = 0;
                            }
                            if (hero.containerHeroY < ($('#container').height() - ((hero.heroHeight / 2) + 30))) { // point d'arret de l'image en bas
                                hero.containerStartY = hero.containerHeroY + hero.gap;
                                containerCurrentPosY += hero.gap;
                                $('#containerHero').css('top', hero.containerStartY + 'px');
                            }
                        }; // end Key 40


                        if (_pause == true) return; // check if pause
                        if (heroX > -hero.imgMaxWidth) {
                            hero.imgStartX = heroX - hero.sprites;
                        } else {
                            hero.imgStartX = 0;
                        }
                        /*
                         *  le deplacement du hero est mis à jour ici
                         */
                        $('#hero').css('left', hero.imgStartX + 'px');
                        $('#hero').css('top', hero.imgStartY + 'px');
                        if (hero.containerHeroY < ($('#container').height() - ((hero.heroHeight / 2) + 30))) {
                            $('#containerHero').css('top', containerCurrentPosY + 'px');
                        }

                        /*
                         *  if hitTest gameOver ici
                         */
                        if (_gameIsOver) {
                            if (!_gameOverIsActive) {
                                $('#hero').css('left', '0')
                                _gameOverIsActive = true;
                                if (!_goal) {
                                    app.hitHero();
                                }
                            }
                            setTimeout(function() {
                                cancelAnimationFrame(_reqAnimHero);
                                app.gameOver();
                            }, 10);

                        } else {
                            $('#hero').css('top', '0');
                        } // end if gameIsOver
                    }
                }
                app.hitTest().goal(_distanceTotal).distanceLeft().warningDistance(); // <- chainage !! fonction pour detecter les collisions, fonction pour la distance restante et fonction pour la win !

                _reqAnimHero = requestAnimationFrame(moveHero);
            };

            /////////////
            //   app   //
            /////////////
            var app = {

                /*
                 * gameStart
                 */
                gameStart: function() {

                    if (_isActive) { // on supprime les elements si le jeu est deja lancé
                        app.hideDistance().removeElements().clearArray().hideCursor();
                    }
                    setTimeout(function() {
                        moveHero();
                        moveElements();
                        app.showDistance();
                        addElements();
                    }, 3000)

                    app.initStart().levelArray()

                    initElements();
                    _i = 0;

                    mainSound.currentTime = 0;
                    mainSound.play();


                    return this
                },
                initStart: function() {

                    _i = 0;
                    _score = 0;
                    _pause = false;
                    hero.startTop = '-200';

                    $('#board').fadeOut();

                    $('#hero').css('top', '0');

                    _pause = false;
                    _hitIsActive = true;
                    _isActive = false;
                    _isPress = false;
                    _gameIsOver = false;
                    _gameOverIsActive = false;
                    _goal = false;

                    app.removeElements().hideCursor().initColorDistance();
                    // removeElements: on supprime les divs ajoutées avec 'append()' | hideCursor: on cache le curseur | on initialise la couleur de texte de la distance restante
                    mainSound.pause();


                    $('#displayScore').delay(300).fadeOut('slow', function() {
                        $(this).remove();
                    });

                    return this
                },
                levelArray: function() {
                    _levelArray[_level]();

                    return this;
                },

                /*
                 * removeElements
                 */
                removeElements: function() {
                    $("div[class*='Hit']").parent().each(function() {
                        $(this).remove();
                    });

                    return this
                },
                /*
                 * clearLevel
                 */
                clearLevel: function() {

                    app.gamePause().displayScore().stopSound().hideDistance().removeElements().clearArray();
                    _i = 0;

                    return this
                },
                /*
                 * clearArray
                 */
                clearArray: function() {
                    _arrayElements = [];

                    return this
                },
                /*
                 *  hitTest
                 */
                hitTest: function() {
                    var cw = hero.containerHeroW;
                    var ch = hero.containerHeroH;
                    var xw = (hero.containerHeroX + hero.containerHeroW);
                    var yh = (hero.containerHeroY + hero.containerHeroH);
                    /*
                     * obliger d'utiliser un each pour les collisions sinon kedal
                     */
                    $("div[class*='Hit']").each(function() {

                        var hitLeft = $(this).offsetParent().position().left;
                        var hitTop = $(this).offsetParent().position().top;
                        var parentHeight = $(this).offsetParent().height();
                        var hitWidth = $(this).width(); // pour les Hit special avec custom Width (ex: trees)
                        var hitHeight = $(this).height(); // pour les Hit special avec custom Height (ex: trees)
                        var checkHit;
                        var parent = $(this).parent().attr('class');

                        switch (parent) {

                            case 'tree':

                                checkHit = xw >= hitLeft + 110 &&
                                    xw <= ((hitLeft + 110) + hitWidth + cw) &&
                                    yh - (ch / 2) >= hitTop &&
                                    yh - (ch / 2) <= hitTop + hitHeight;

                                break;
                            case 'electric':

                                checkHit = _i > 100 &&
                                    hero.containerHeroY < -20;

                                break;
                            case 'message':

                                checkHit = hero.containerHeroY < (hitTop - 40) + parentHeight && xw >= hitLeft && xw <= (hitLeft + hitWidth + cw);

                                break;
                            case 'goal':

                                // rien nothing nada nienté lucky bird !!

                                break;

                            default:

                                checkHit = xw >= hitLeft &&
                                    xw <= (hitLeft + hitWidth + cw) &&
                                    yh >= (hitTop + 40); // 40 -> env espace entre bottom div et le hero

                                break;
                        }

                        // if (checkHit) {
                        //
                        //     _gameIsOver = true;
                        //
                        // }
                        if (checkHit) {
                            if (parent == "bonus") {
                                var bonusGap = 140;
                                var $bonus = $(this).parent().find('img');
                                var bonusImgWidth = $bonus.width();
                                var snd = true;
                                var bonusInterval;

                                bonusInterval = setInterval(function() {
                                    if ($bonus.position().left > -bonusImgWidth) {
                                        $bonus.css('left', '-=140px');

                                        // snd = true;
                                    } else {
                                        cancelAnimationFrame(bonusInterval);
                                        //  snd = false;
                                    }
                                }, 10);

                                if (snd) {
                                    sounds.bonusSound();
                                    snd = false;

                                }
                            } else {
                                _gameIsOver = true;
                            }
                            //  DEBUG : $containerHero.css('border', 'red 2px solid');
                        } else {
                            //  DEBUG : $containerHero.css('border', 'none');
                        }

                    }); // end each
                    return this
                },
                /*
                 * gamePause
                 */
                gamePause: function() {

                    _pause = true;
                    cancelAnimationFrame(_reqAnimHero);
                    cancelAnimationFrame(_reqAnim);

                    return this
                },
                gameResume: function() {
                    _pause = false;

                    moveHero();
                    moveElements();


                    return this
                },
                /*
                 * togglePause
                 */
                togglePause: function() {

                    if (_isActive && !_pause) {
                        app.gamePause();
                    } else {
                        if (_pause) {
                            app.gameResume();
                        }
                    }

                    return this
                },
                /*
                 * hitHero
                 */
                hitHero: function() {

                    sounds.hitSound();

                    $('#hero').css({
                        'top': -hero.containerHeroH + 'px',
                        'left': '0'
                    });

                    mainSound.pause();

                    return this
                },
                /*
                 * gameOver
                 */
                gameOver: function() {

                    cancelAnimationFrame(_reqAnim);
                    $('#board').fadeIn();
                    app.showCursor();

                    return this
                },
                /*
                 * goal
                 */
                goal: function(timer) {
                    if ((_i) >= timer) {
                        _goal = true;
                        app.displayMessage('Goal', 'magenta', 3);
                    };

                    return this
                },
                stopSound: function() {
                    mainSound.pause();
                    return this;
                },
                distanceLeft: function() {
                    _i++;

                    _distanceLeft = Math.floor(_distanceTotal / 3) - parseInt(_i / 3);

                    if (_distanceLeft > 0) {
                        _distanceLeft++;
                    } else {
                        _distanceLeft = 0;
                    }

                    $('#distance').html('<div>Goal<br/>' + _distanceLeft + 'm</div>');

                    return this

                },
                /*
                 * displayScore
                 */
                displayScore: function() {

                    var currentLevel = _level;

                    if (_level >= _levelArray.length - 1) {
                        _level = 1;
                    } else {
                        _level++;
                    }

                    var $divScore;

                    switch (currentLevel) {

                        case 1:
                            var src1 = 'img/skills/html5.jpg';
                            var src2 = 'img/skills/css3.jpg';
                            var src3 = 'img/skills/bootstrap.jpg';
                            var src4 = 'img/skills/photoshop.jpg';

                            $divScore = "<div id='displayScore'> <p> Congratulations!</p><div class='skills'>  <ul><li><img src='" + src1 + "' alt='' /></li><li><img src='" + src2 + "' alt='' /></li><li><img src='" + src3 + "' alt='' /></li><li><img src='" + src4 + "' alt='' /></li></ul></div> <br> <div class='start' data-level='" + _level + "'><button>Level " + _level + "</button></div> </div>";

                            break;
                        case 2:
                            var src1 = 'img/skills/javascript.jpg';
                            var src2 = 'img/skills/jquery.jpg';
                            var src3 = 'img/skills/angular.jpg';

                            $divScore = "<div id='displayScore'> <p> Excellent!</p><div class='skills'>  <ul><li><img src='" + src1 + "' alt='' /></li><li><img src='" + src2 + "' alt='' /></li><li><img src='" + src3 + "' alt='' /></li></ul></div> <br> <div class='start' data-level='" + _level + "'><button>Level " + _level + "</button></div> </div>";

                            break;
                        case 3:
                            var src1 = 'img/skills/nodejs.jpg';

                            $divScore = "<div id='displayScore'> <p> Awesome! <br/>You have reached the final level!</p><div class='skills'>  <ul><li><img src='" + src1 + "' alt='' /></li> </ul></div> <br> <div class='start' data-level='" + _level + "'><button> restart? </button></div> </div>";

                            break;

                    };

                    $($divScore).appendTo('#container').css({
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '0',
                        left: 'left',
                        zIndex: '1000',
                        fontFamily: "'Fontdiner Swanky', cursive",
                        textAlign: 'center',
                        background: 'rgba(0,0,0,0.5)'
                    }).find('.score').css({
                        color: '#fff',
                        fontSize: '3.5em',
                        padding: '50px'
                    });

                    $('#displayScore p').css({
                        color: 'gold',
                        margin: '20px',
                        opacity: '0',
                        fontSize: '0em'
                    });

                    $('.skills').css({
                        width: '80%',
                        margin: '0 auto',
                        padding: '2%'

                    });

                    $('.skills ul li').css({
                        display: 'inline-block',
                        width: '50%',
                        margin: '0 0 10px 0'

                    });

                    $('.skills ul li img').css({
                        width: '200%',
                        opacity: '0',
                        verticalAlign: 'top'

                    });

                    $('.skills ul li img').delay(600).each(function(li) {
                        var delay = li * 300 + 500;
                        $(this).delay(delay).animate({
                            width: '130px',
                            opacity: '1'
                        }, 300, 'easeInQuart', function() {
                            sounds.burstSound();
                        })
                    });

                    $('#displayScore > p').animate({
                        fontSize: '2.2em',
                        opacity: '1'
                    }, 500, 'easeOutBack');


                    app.showCursor();
                    sounds.displayScoreSound();

                    return this
                },
                /*
                 * displayMessage
                 */
                displayMessage: function(msg, color, fSize) {
                    if (_messageIsActive) {

                        _messageIsActive = false;

                        setTimeout(function() {
                            var $divMsg = "<div id='displayMessage'><div id='message'>" + msg + " </div> </div>";
                            $('#container').append($divMsg);

                            $('#displayMessage').css({
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                textAlign: 'center',
                                fontFamily: "'Fontdiner Swanky', cursive",
                                fontSize: fSize + 'em',
                                color: color,
                                zIndex: '9999'
                            });

                            $('#message').css({
                                position: 'absolute',
                                top: '40%',
                                left: '50%',
                                width: '200%',
                                transform: 'translate(-50%, -75%)'
                            }).animate({
                                fontSize: fSize + 'em'
                            }, 500, "easeOutBack");

                            $('#message span').css({
                                fontSize: '0.6em'
                            });


                            setTimeout(function() {

                                $('#message').animate({
                                    fontSize: '10em',
                                    top: '60%',
                                    opacity: '0'
                                }, 2000, "easeOutBack", function() {
                                    $('#displayMessage').html('').remove();
                                    _messageIsActive = true;

                                    if (_goal) {
                                        app.clearLevel();
                                    }
                                })
                            }, 2000);
                        }, 1200);
                    } // end if
                    return this
                },
                showDistance: function() {
                    $('#distance').animate({
                        left: '-15px'
                    }, 1000, 'easeOutBack');
                    return this
                },
                hideDistance: function() {
                    $('#distance').animate({
                        left: '-100px'
                    }, 500, 'easeOutBack');
                    return this
                },
                warningDistance: function() {

                    if (_i > ((_distanceTotal * 80) / 100)) {
                        if (!_endDistance) {
                            _endDistance = true;

                            $('#distance').stop().animate({
                                fontSize: '20px',
                                color: '#ff0000 '
                            }, 800, 'easeInOutBack', function() {
                                $(this).stop().animate({
                                    fontSize: '14px'
                                }, 500, 'easeInQuart');

                            });
                        }
                    }
                    return this
                },
                initColorDistance: function() {
                    $('#distance').css('color', 'purple');
                    return this;
                },
                showCursor: function() {
                    $('#container').css('cursor', 'default');
                    return this;
                },
                hideCursor: function() {
                    $('#container').css('cursor', 'none');
                    return this;
                }

            }; // end app


            /*
             * listener keys
             */
            $(document).on('keydown', function(e) {
                _pressedKey[e.keyCode || e.which] = true;
            });
            $(document).on('keyup', function(e) {
                _pressedKey[e.keyCode || e.which] = false;
            });

            $('html.touch').css('color', 'red')
            /*
             * action click
             */
            $('#reqanim').html('<span>' + _i + '</span>');

            $(document).on('click', '.start', function() {

                app.gameStart();

            });

            $('#reset').on('click', app.gameReset);
            $(document).on('keydown keyup', function(evt) {
                if (!_isPress) {
                    _isPress = true;
                    if (_pressedKey[32]) {
                        //app.spaceBar();
                    }
                    if (_pressedKey[13]) {
                        if ($('#board, #displayScore, .start').is(":visible")) {
                            app.gameStart();
                        }
                    }
                }
                evt.preventDefault();
            });
            $(document).on('keyup', function(evt) {
                _isPress = false;
                evt.preventDefault();
            });
            $('#collisions').click(function() {
                $("div[id*='Hit']").toggleClass('collision');
                $("#containerHero").toggleClass('collisionHero');
            });
            $('#keepup').click(function() {
                _valMoveDown = 0;
            });

            $('#about').click(function() {
                $('#aboutInterface').slideToggle();
                $('#skillsInterface').hide();

                if ($('#displayScore').not(':visible')) {
                    app.togglePause();
                }

            });
            $('#skills').click(function() {
                $('#skillsInterface').slideToggle();
                $('#aboutInterface').hide();
                if ($('#displayScore').not(':visible')) {
                    app.togglePause();
                }

            });

            $('#cv').click(function() {
                if ($('#displayScore').not(':visible')) {
                    app.togglePause();
                }
            });

            $('.close').click(function() {
                $('#aboutInterface, #skillsInterface').slideUp();
                if ($('#displayScore').not(':visible')) {
                    app.togglePause();
                }


            });

        }
    }

}); //end ready
