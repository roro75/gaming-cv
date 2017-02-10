/*
 * ElementConstruct
 */

var ElementConstruct = function(cl, src, num, width, height, top, bottom, coef, start, repeat, decor, bonus, specialHit, delay) {
    this.class = cl;
    this.src = src;
    this.id = this.class + '_' + num;
    this.num = num;
    this.width = width;
    this.height = height;
    this.top = top;
    this.bottom = bottom;
    this.coef = coef; // nbre de pixels de déplacement
    this.start = start;
    this.decor = decor; // reservé pour les images bg et floor
    this.repeat = repeat;
    this.bonus = bonus;
    this.specialHit = specialHit; // pour les zones de hit arbres
    this.delay = delay;

}
var bg = {
    class: 'bg',
    id: 'bg1',
    coef: 1,
    start: 0,
    repeat: true,
    decor: true
};

var floor = {
    class: 'floor',
    id: 'floor1',
    coef: 5, // on change dans level()
    start: 0,
    repeat: true,
    decor: true
};

var starrysky = {
    class: 'starrysky',
    id: 'starrysky1',
    coef: 0,
    start: 0,
    repeat: false,
    decor: true
};


/*
 * ElementConstruct
 */
var _arrayElements = []; // variables pour stocker tous les elements dans un array


var levels = {

    level1: function() {

        var tree_1 = new ElementConstruct('tree', 'img/wood/Tree_2.png', 1, 282, 270, null, 30, 4, '800', false, false, false, true, 200);
        var tree_2 = new ElementConstruct('tree', 'img/wood/Tree_3.png', 2, 275, 250, null, 20, 4, '800', false, false, false, true, 600);
        var tree_3 = new ElementConstruct('tree', 'img/wood/Tree_2.png', 3, 282, 270, null, 30, 4, '800', false, false, false, true, 1100);
        var tree_4 = new ElementConstruct('tree', 'img/wood/Tree_3.png', 4, 275, 250, null, 20, 4, '800', false, false, false, true, 1600);
        var tree_5 = new ElementConstruct('tree', 'img/wood/Tree_2.png', 5, 275, 270, null, 30, 4, '800', false, false, false, true, 2110);
        var tree_6 = new ElementConstruct('tree', 'img/wood/Tree_3.png', 6, 282, 301, null, 20, 4, '800', false, false, false, true, 2320);
        var tree_7 = new ElementConstruct('tree', 'img/wood/Tree_3.png', 7, 282, 280, null, 20, 4, '800', false, false, false, true, 2740);
        var tree_8 = new ElementConstruct('tree', 'img/wood/Tree_3.png', 8, 275, 301, null, 20, 4, '800', false, false, false, true, 2770);
        var tree_9 = new ElementConstruct('tree', 'img/wood/Tree_2.png', 9, 282, 301, null, 20, 4, '800', false, false, false, true, 2800);


        var crate_1 = new ElementConstruct('crate', 'img/wood/Crate.png', 1, 77, 77, null, 30, 4, '800', false, false, false, false, 100);
        var crate_2 = new ElementConstruct('crate', 'img/wood/Crate.png', 2, 77, 77, null, 30, 4, '800', false, false, false, false, 350);
        var crate_3 = new ElementConstruct('crate', 'img/wood/Crate.png', 3, 77, 77, null, 30, 4, '800', false, false, false, false, 500);
        var crate_4 = new ElementConstruct('crate', 'img/wood/Crate.png', 4, 77, 77, null, 107, 4, '800', false, false, false, false, 500);
        var crate_5 = new ElementConstruct('crate', 'img/wood/Crate.png', 5, 77, 77, null, 30, 4, '800', false, false, false, false, 950);
        var crate_6 = new ElementConstruct('crate', 'img/wood/Crate.png', 6, 77, 77, null, 30, 4, '800', false, false, false, false, 1000);
        var crate_7 = new ElementConstruct('crate', 'img/wood/Crate.png', 7, 77, 77, null, 107, 4, '800', false, false, false, false, 1000);
        var crate_8 = new ElementConstruct('crate', 'img/wood/Crate.png', 8, 77, 77, null, 30, 4, '800', false, false, false, false, 1050);
        var crate_9 = new ElementConstruct('crate', 'img/wood/Crate.png', 9, 77, 77, null, 30, 4, '800', false, false, false, false, 2200);
        var crate_10 = new ElementConstruct('crate', 'img/wood/Crate.png', 10, 77, 77, null, 30, 4, '800', false, false, false, false, 2250);
        var crate_11 = new ElementConstruct('crate', 'img/wood/Crate.png', 11, 77, 77, null, 107, 4, '800', false, false, false, false, 2250);
        var crate_12 = new ElementConstruct('crate', 'img/wood/Crate.png', 12, 77, 77, null, 30, 4, '800', false, false, false, false, 2300);
        var crate_13 = new ElementConstruct('crate', 'img/wood/Crate.png', 13, 77, 77, null, 107, 4, '800', false, false, false, false, 2300);
        var crate_14 = new ElementConstruct('crate', 'img/wood/Crate.png', 14, 77, 77, null, 174, 4, '800', false, false, false, false, 2300);


        var stone_1 = new ElementConstruct('stone', 'img/wood/Stone.png', 1, 130, 78, null, 30, 4, '800', false, false, false, false, 750);
        var stone_2 = new ElementConstruct('stone', 'img/wood/Stone.png', 2, 130, 78, null, 30, 4, '800', false, false, false, false, 850);
        var stone_3 = new ElementConstruct('stone', 'img/wood/Stone.png', 3, 130, 78, null, 30, 4, '800', false, false, false, false, 1400);
        var stone_4 = new ElementConstruct('stone', 'img/wood/Stone.png', 4, 130, 78, null, 30, 4, '800', false, false, false, false, 1800);


        var message_1 = new ElementConstruct('message', 'img/messages/danger.png', 1, 70, 69, null, 468, 3, '800', false, false, false, false, 100);
        var message_2 = new ElementConstruct('message', 'img/messages/html5.png', 2, 70, 69, null, 468, 3, '800', false, false, false, false, 900);
        var message_3 = new ElementConstruct('message', 'img/messages/css3.png', 3, 70, 69, null, 468, 3, '800', false, false, false, false, 1450);
        var message_4 = new ElementConstruct('message', 'img/messages/bootstrap.png', 4, 70, 69, null, 468, 3, '800', false, false, false, false, 2400);
        var message_5 = new ElementConstruct('message', 'img/messages/photoshop.png', 5, 70, 69, null, 468, 3, '800', false, false, false, false, 2650);

        var goal = new ElementConstruct('goal', 'img/goal/goal.png', 1, 85, 88, null, 30, 4, '800', false, false, false, false, 2990);

        var electric = new ElementConstruct('electric', 'img/Electric-line.png', 1, 1, 12, null, 0, 1, '0', true, false, false, false, 0);

        _arrayElements.push(tree_1, tree_2, tree_3, tree_4, tree_5, tree_6, tree_7, tree_8, tree_9, stone_1, stone_2, stone_3, stone_4, crate_1, crate_2, crate_3, crate_4, crate_5, crate_6, crate_7, crate_8, crate_9, crate_10, crate_11, crate_12, crate_13, crate_14, electric, message_1, message_2, message_3, message_4, message_5, /*star_1, star_2, star_3, star_4, star_5, star_6, star_7, star_8, star_9, */ goal, bg, floor);

        $('#sun').show();
        $('.starrysky').css('display', 'none');

        $('.bg img').attr('src', 'img/wood/Bg.jpg');
        $('.floor').css({
            background: 'url(img/wood/Floor.jpg)repeat-x'
        })

        $('.floor').attr('data-coef', '4');

    },
    level2: function() {
        var tree_1 = new ElementConstruct('tree', 'img/desert/Tree.png', 1, 282, 270, null, 30, 5, '800', false, false, false, true, 1000);
        var tree_2 = new ElementConstruct('tree', 'img/desert/Tree.png', 2, 275, 250, null, 30, 5, '800', false, false, false, true, 1300);
        var tree_3 = new ElementConstruct('tree', 'img/desert/Tree.png', 3, 282, 270, null, 30, 5, '800', false, false, false, true, 1800);
        var tree_4 = new ElementConstruct('tree', 'img/desert/Tree.png', 4, 275, 250, null, 30, 5, '800', false, false, false, true, 2450);
        var tree_5 = new ElementConstruct('tree', 'img/desert/Tree.png', 5, 275, 270, null, 30, 5, '800', false, false, false, true, 2700);
        var tree_6 = new ElementConstruct('tree', 'img/desert/Tree.png', 6, 282, 280, null, 30, 5, '800', false, false, false, true, 2800);


        var block_1 = new ElementConstruct('block', 'img/desert/StoneBlock.png', 1, 90, 90, null, 30, 5, '800', false, false, false, false, 500);
        var block_2 = new ElementConstruct('block', 'img/desert/StoneBlock.png', 2, 90, 90, null, 30, 5, '800', false, false, false, false, 600);
        var block_3 = new ElementConstruct('block', 'img/desert/StoneBlock.png', 3, 90, 90, null, 30, 5, '800', false, false, false, false, 700);
        var block_4 = new ElementConstruct('block', 'img/desert/StoneBlock.png', 4, 90, 90, null, 119, 5, '800', false, false, false, false, 700);
        var block_5 = new ElementConstruct('block', 'img/desert/StoneBlock.png', 5, 90, 90, null, 30, 5, '800', false, false, false, false, 750);
        var block_6 = new ElementConstruct('block', 'img/desert/StoneBlock.png', 6, 90, 90, null, 119, 5, '800', false, false, false, false, 750);
        var block_7 = new ElementConstruct('block', 'img/desert/StoneBlock.png', 7, 90, 90, null, 208, 5, '800', false, false, false, false, 750);
        var block_8 = new ElementConstruct('block', 'img/desert/StoneBlock.png', 8, 90, 90, null, 30, 5, '800', false, false, false, false, 1100);
        var block_9 = new ElementConstruct('block', 'img/desert/StoneBlock.png', 9, 90, 90, null, 30, 5, '800', false, false, false, false, 2300);
        var block_10 = new ElementConstruct('block', 'img/desert/StoneBlock.png', 10, 90, 90, null, 119, 5, '800', false, false, false, false, 2300);
        var block_11 = new ElementConstruct('block', 'img/desert/StoneBlock.png', 11, 90, 90, null, 208, 5, '800', false, false, false, false, 2300);


        var cactus_1 = new ElementConstruct('cactus', 'img/desert/Cactus_1.png', 1, 200, 206, null, 30, 5, '800', false, false, false, false, 300);
        var cactus_2 = new ElementConstruct('cactus', 'img/desert/Cactus_1.png', 2, 200, 206, null, 30, 5, '800', false, false, false, false, 900);
        var cactus_3 = new ElementConstruct('cactus', 'img/desert/Cactus_1.png', 3, 200, 206, null, 30, 5, '800', false, false, false, false, 1200);


        var skel_1 = new ElementConstruct('skeleton', 'img/desert/Skeleton.png', 1, 150, 51, null, 30, 5, '800', false, false, false, false, 100);


        var stone_1 = new ElementConstruct('stone', 'img/desert/Stone.png', 1, 130, 78, null, 30, 5, '800', false, false, false, false, 1450);
        var stone_2 = new ElementConstruct('stone', 'img/desert/Stone.png', 2, 130, 78, null, 30, 5, '800', false, false, false, false, 1650);


        var message_1 = new ElementConstruct('message', 'img/messages/danger.png', 1, 70, 69, null, 468, 3, '800', false, false, false, false, 200);
        var message_2 = new ElementConstruct('message', 'img/messages/javascript.png', 2, 70, 69, null, 468, 3, '800', false, false, false, false, 1100);
        var message_3 = new ElementConstruct('message', 'img/messages/jquery.png', 3, 70, 69, null, 468, 3, '800', false, false, false, false, 1800);
        var message_4 = new ElementConstruct('message', 'img/messages/angular.png', 4, 70, 69, null, 468, 3, '800', false, false, false, false, 2300);


        var electric = new ElementConstruct('electric', 'img/Electric-line.png', 1, 1, 12, null, 0, 1, '0', true, false, false, false, 0);


        var goal = new ElementConstruct('goal', 'img/goal/goal.png', 1, 85, 88, null, 30, 5, '800', false, false, false, false, 2990);

        _arrayElements.push(electric, cactus_1, cactus_2, cactus_3, skel_1, tree_1, tree_2, tree_3, tree_4, tree_5, tree_6, stone_1, stone_2, block_1, block_2, block_3, block_4, block_5, block_6, block_7, block_8, block_9, block_10, block_11, message_1, message_2, message_3, message_4, goal, bg, floor);

        $('.bg img').attr('src', 'img/desert/Bg.jpg');
        $('.floor').css({
            background: 'url(img/desert/Floor.jpg)repeat-x'
        })

        $('.floor').attr('data-coef', '5');

    },
    level3: function() {
        var tree_1 = new ElementConstruct('tree', 'img/winter/Tree_2.png', 1, 228, 280, null, 20, 6, '800', false, false, false, true, 400);
        var tree_2 = new ElementConstruct('tree', 'img/winter/Tree_2.png', 2, 228, 280, null, 10, 6, '800', false, false, false, true, 600);
        var tree_3 = new ElementConstruct('tree', 'img/winter/Tree_2.png', 3, 228, 280, null, 20, 6, '800', false, false, false, true, 1200);
        var tree_4 = new ElementConstruct('tree', 'img/winter/Tree_2.png', 4, 228, 280, null, 10, 6, '800', false, false, false, true, 1800);
        var tree_5 = new ElementConstruct('tree', 'img/winter/Tree_2.png', 5, 228, 280, null, 20, 6, '800', false, false, false, true, 2100);
        var tree_6 = new ElementConstruct('tree', 'img/winter/Tree_2.png', 6, 228, 280, null, 10, 6, '800', false, false, false, true, 2360);
        var tree_7 = new ElementConstruct('tree', 'img/winter/Tree_2.png', 7, 228, 280, null, 10, 6, '800', false, false, false, true, 2390);
        var tree_8 = new ElementConstruct('tree', 'img/winter/Tree_2.png', 8, 228, 280, null, 10, 6, '800', false, false, false, true, 2600);
        var tree_9 = new ElementConstruct('tree', 'img/winter/Tree_2.png', 9, 228, 280, null, 10, 6, '800', false, false, false, true, 2650);

        var block_1 = new ElementConstruct('IceBox', 'img/winter/IceBox.png', 1, 90, 90, null, 30, 6, '800', false, false, false, false, 500);
        var block_2 = new ElementConstruct('IceBox', 'img/winter/IceBox.png', 2, 90, 90, null, 30, 6, '800', false, false, false, false, 950);
        var block_3 = new ElementConstruct('IceBox', 'img/winter/IceBox.png', 3, 90, 90, null, 30, 6, '800', false, false, false, false, 1000);
        var block_4 = new ElementConstruct('IceBox', 'img/winter/IceBox.png', 4, 90, 90, null, 119, 6, '800', false, false, false, false, 1000);
        var block_5 = new ElementConstruct('IceBox', 'img/winter/IceBox.png', 5, 90, 90, null, 208, 6, '800', false, false, false, false, 1000);
        var block_6 = new ElementConstruct('IceBox', 'img/winter/IceBox.png', 6, 90, 90, null, 30, 6, '800', false, false, false, false, 1030);
        var block_7 = new ElementConstruct('IceBox', 'img/winter/IceBox.png', 7, 90, 90, null, 119, 6, '800', false, false, false, false, 1030);
        var block_8 = new ElementConstruct('IceBox', 'img/winter/IceBox.png', 8, 90, 90, null, 208, 6, '800', false, false, false, false, 1030);
        var block_9 = new ElementConstruct('IceBox', 'img/winter/IceBox.png', 9, 90, 90, null, 30, 6, '800', false, false, false, false, 2300);
        var block_10 = new ElementConstruct('IceBox', 'img/winter/IceBox.png', 10, 90, 90, null, 119, 6, '800', false, false, false, false, 2300);
        var block_11 = new ElementConstruct('IceBox', 'img/winter/IceBox.png', 11, 90, 90, null, 208, 6, '800', false, false, false, false, 2300);

        var snowman_1 = new ElementConstruct('snowman', 'img/winter/SnowMan.png', 1, 143, 210, null, 30, 6, '800', false, false, false, false, 800);
        var snowman_2 = new ElementConstruct('snowman', 'img/winter/SnowMan.png', 2, 143, 210, null, 30, 6, '800', false, false, false, false, 1900);

        var igloo_1 = new ElementConstruct('igloo', 'img/winter/Igloo.png', 1, 511, 201, null, 30, 6, '800', false, false, false, false, 990);

        var crystal_1 = new ElementConstruct('crystal', 'img/winter/Crystal.png', 1, 150, 121, null, 30, 6, '800', false, false, false, false, 100);
        var crystal_2 = new ElementConstruct('crystal', 'img/winter/Crystal.png', 2, 150, 121, null, 30, 6, '800', false, false, false, false, 1350);
        var crystal_3 = new ElementConstruct('crystal', 'img/winter/Crystal.png', 3, 150, 121, null, 30, 6, '800', false, false, false, false, 2910);

        var stone_1 = new ElementConstruct('stone', 'img/winter/Stone.png', 1, 130, 78, null, 30, 6, '800', false, false, false, false, 700);
        var stone_2 = new ElementConstruct('stone', 'img/winter/Stone.png', 2, 130, 78, null, 30, 6, '800', false, false, false, false, 1600);

        var message_1 = new ElementConstruct('message', 'img/messages/danger.png', 1, 70, 69, null, 468, 3, '800', false, false, false, false, 100);
        var message_2 = new ElementConstruct('message', 'img/messages/lol.png', 2, 70, 69, null, 468, 3, '800', false, false, false, false, 960);
        var message_3 = new ElementConstruct('message', 'img/messages/nodejs.png', 3, 70, 69, null, 468, 3, '800', false, false, false, false, 1800);
        var message_4 = new ElementConstruct('message', 'img/messages/wewantu.png', 4, 70, 69, null, 468, 3, '800', false, false, false, false, 2700);

        var electric = new ElementConstruct('electric', 'img/Electric-line.png', 1, 1, 12, null, 0, 1, '0', true, false, false, false, 0);

        var goal = new ElementConstruct('goal', 'img/goal/goal_winter.png', 1, 87, 94, null, 30, 6, '800', false, false, false, false, 2990);

        _arrayElements.push(crystal_1, crystal_2, crystal_3, snowman_1, snowman_2, tree_1, tree_2, tree_3, tree_4, tree_5, tree_6, tree_7, tree_8, tree_9, stone_1, stone_2, block_1, block_2, block_3, block_4, block_5, block_6, block_7, block_8, block_9, block_10, block_11, electric, message_1, message_2, message_3, message_4, goal, starrysky, bg, floor);

        $('#sun').hide();
        $('.starrysky').css('display', 'block');


        $('.bg img').attr('src', 'img/winter/Bg.jpg');
        $('.floor').css({
            background: 'url(img/winter/Floor.jpg)repeat-x'
        })

        $('.floor').attr('data-coef', '6');
    }
}
