ig.module(
    'game.entities.tank'
)
.requires(
    'impact.entity',
    'plugins.rotationmovement'
)
.defines(function() {

EntityTank = ig.Entity.extend({
    size: {x: 32, y: 26},
    animSheet: new ig.AnimationSheet('media/tank.png', 32, 26),
    offset: {x:0, y: 0},
    flip: false,
    direction: RotationMovement.moveType.EAST,

    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.rotation = new RotationMovement();
        this.addAnim('move', 0.1, [0, 1, 2, 3, 4, 5, 6, 7]);
        this.addAnim('idle', 1, [0]);
        this.rotation.addAnim(this.anims.move);
        this.rotation.addAnim(this.anims.idle);
        this.currentAnim = this.anims.idle;
    },

    update: function() {
        this.parent();
        this.rotation.update();
        if(ig.input.pressed('turnLeft')) {
            switch(this.direction){
                case RotationMovement.moveType.NORTH:
                    this.rotation.destination = RotationMovement.moveType.WEST;
                    this.direction = RotationMovement.moveType.WEST;
                    break;
                case RotationMovement.moveType.WEST:
                    this.rotation.destination = RotationMovement.moveType.SOUTH;
                    this.direction = RotationMovement.moveType.SOUTH;
                    break;
                case RotationMovement.moveType.SOUTH:
                    this.rotation.destination = RotationMovement.moveType.EAST;
                    this.direction = RotationMovement.moveType.EAST;
                    break;
                case RotationMovement.moveType.EAST:
                    this.rotation.destination = RotationMovement.moveType.NORTH;
                    this.direction = RotationMovement.moveType.NORTH;
                    break;
            }
        }
        else if(ig.input.pressed('turnRight')) {
            switch(this.direction){
                case RotationMovement.moveType.NORTH:
                    this.rotation.destination = RotationMovement.moveType.EAST;
                    this.direction = RotationMovement.moveType.EAST;
                    break;
                case RotationMovement.moveType.EAST:
                    this.rotation.destination = RotationMovement.moveType.SOUTH;
                    this.direction = RotationMovement.moveType.SOUTH;
                    break;
                case RotationMovement.moveType.SOUTH:
                    this.rotation.destination = RotationMovement.moveType.WEST;
                    this.direction = RotationMovement.moveType.WEST;
                    break;
                case RotationMovement.moveType.WEST:
                    this.rotation.destination = RotationMovement.moveType.NORTH;
                    this.direction = RotationMovement.moveType.NORTH;
                    break;
            }
        }
        else if(ig.input.pressed('move')){
            this.currentAnim = this.anims.move;
            switch(this.direction){
                case RotationMovement.moveType.NORTH:
                    this.vel.y = -100;
                    break;
                case RotationMovement.moveType.WEST:
                    this.vel.x = -100;
                    break;
                case RotationMovement.moveType.SOUTH:
                    this.vel.y = 100;
                    break;
                case RotationMovement.moveType.EAST:
                    this.vel.x = 100;
                    break;
            }
        }
        else if(ig.input.released('move')){
            this.vel.x = 0;
            this.vel.y = 0;
            this.currentAnim = this.anims.idle;
        }

    }

});

});
