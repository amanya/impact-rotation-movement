ig.module(
    'plugins.rotationmovement'
)

.requires('impact.impact')


.defines(function () {
    RotationMovement = ig.Class.extend({
        moving:false,
        destination:null,
        clockwise:true,
        anims:[],
        speed:0.2,

        update:function () {
            if(!this.isMoving() && this.destination !== null) {
                this.startMoving();
            }
            else if (this.isMoving()) {
                this.setCurrentAngle();
            }
        },

        addAnim:function (anim) {
            this.anims.push(anim);
        },

        startMoving:function () {
            this.moving = true;
            // Pick angle from first registered animation
            var startingAngle = this.anims[0].angle;
            if (startingAngle < this.destination) {
                if(startingAngle == 0 && this.destination == 3 * Math.PI / 2) {
                    startingAngle = 2 * Math.PI;
                    this.clockwise = false;
                }
                else {
                    this.clockwise = true;
                }
            }
            else {
                if(startingAngle == 3 * Math.PI / 2 && this.destination == 0) {
                    this.destination = 2 * Math.PI;
                    this.clockwise = true;
                }
                else {
                    this.clockwise = false;
                }
            }
            this.setCurrentAngle();
        },

        stopMoving:function () {
            this.destination = null;
            this.moving = false;
        },

        isMoving:function () {
            return this.moving == true;
        },

        setCurrentAngle: function() {
            var currAngle = this.anims[0].angle;
            if (this.clockwise == false) {
                if (currAngle == 0) {
                    currAngle = Math.PI * 2;
                }
                if (currAngle > this.destination) {
                    currAngle -= this.speed;
                }
                if (currAngle <= this.destination) {
                    currAngle = this.destination;
                    this.stopMoving();
                }
            }
            else {
                if (currAngle == Math.PI * 2) {
                    currAngle = 0;
                }
                if (currAngle < this.destination) {
                    currAngle += this.speed;
                }
                if (currAngle >= this.destination) {
                    currAngle = this.destination;
                    this.stopMoving();
                }
            }
            if (currAngle == Math.PI * 2) {
                currAngle = 0;
            }
            // Update the angle on each registered animation
            for(var n = 0; n < this.anims.length; n++) {
                this.anims[n].angle = currAngle;
            }
        },
    });

    RotationMovement.moveType = {
        'NORTH': 3 * Math.PI / 2,
        'WEST': Math.PI,
        'SOUTH': Math.PI / 2,
        'EAST': 0
    }
});
