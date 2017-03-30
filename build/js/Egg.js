var Egg = ( function() {

    var EggClass = function( containers, wolf, onFail, onSuccess ) {
        this.containers = containers;
        this.eggLocation = 28;
        this.birdLocation = 3;
        this.wolf = wolf;
        this.fail = onFail;
        this.success = onSuccess;
        this.startMove();
        this.isHaveBird = this.withOrWithoutBird();
        this.initialRoost = this.getContainer( this.getRandomRoost() );
        this.singleEgg = this.createElement( this.initialRoost.container );
    };

    EggClass.roost = {
        LEFT_TOP: 1,
        LEFT_BOTTOM: 2,
        RIGHT_TOP: 3,
        RIGHT_BOTTOM: 4
    };

    EggClass.prototype.getRandomRoost = function() {
        var randomIndex = Math.floor( ( Math.random() * 4 ) + 1 );
        return randomIndex;
    }

    EggClass.prototype.getContainer = function( rand ) {
        var roost;

        switch ( rand ) {
            case EggClass.roost.LEFT_TOP:
                roost = {
                    container: this.containers[ 'left-top' ],
                    roostSide: 'left',
                    roostName: 'left-top'
                }
                break;
            case EggClass.roost.LEFT_BOTTOM:
                roost = {
                    container: this.containers[ 'left-bottom' ],
                    roostSide: 'left',
                    roostName: 'left-bottom'
                }
                break;
            case EggClass.roost.RIGHT_TOP:
                roost = {
                    container: this.containers[ 'right-top' ],
                    roostSide: 'right',
                    roostName: 'right-top'
                }
                break;
            case EggClass.roost.RIGHT_BOTTOM:

                roost = {
                    container: this.containers[ 'right-bottom' ],
                    roostSide: 'right',
                    roostName: 'right-bottom'
                }
                break;
        }
        return roost;
    }

    EggClass.prototype.createElement = function( container ) {
        var img = document.createElement( 'img' );
        img.setAttribute( 'src', 'assets/img/egg.png' );
        var eggElement = document.createElement( "div" );
        eggElement.appendChild( img );
        container.appendChild( eggElement );
        return eggElement;
    };

    EggClass.prototype.startMove = function() {
        this.timer = setInterval( this.moveEgg.bind( this ), 580 );
    };

    EggClass.prototype.moveEgg = function() {

        //Egg was created on left roost
        if ( this.initialRoost.roostSide === 'left' ) {
            this.moveLeftEgg();
        } //Egg was created on right roost
        else {
            this.moveRightEgg();
        }

        //Egg was cought
        if ( this.eggLocation === 103 && this.wolf.classList[ 0 ] === this.initialRoost.roostName ) {
            this.success( 1 );
            this.removeEgg();
        }

        //Egg was not cought
        if ( this.eggLocation > 103 ) {
            if ( this.singleEgg.firstChild ) {
                this.singleEgg.removeChild( this.singleEgg.firstChild );
            }

            this.singleEgg.style.top = 230 + 'px';

            //Egg is broken
            this.isBroken();

            //Broken egg has bird
            if ( this.isHaveBird === true ) {
                if ( this.eggLocation === 118 ) {
                    this.fail( 0.5 );
                }
                if ( this.birdLocation > 120 ) {
                    this.removeEgg();
                }
            } //Broken egg has no bird
            else {
                if ( this.eggLocation === 118 ) {
                    this.fail( 1 );
                }
                if ( this.birdLocation > 23 ) {
                    this.removeEgg();

                }

            }
        }
    };

    EggClass.prototype.moveLeftEgg = function() {
        this.eggLocation += 15;
        if ( this.eggLocation < 103 ) {
            this.singleEgg.style.left = this.eggLocation + 'px';
            this.singleEgg.setAttribute( "class", "egg left-egg-" + this.eggLocation );
        }
    }

    EggClass.prototype.moveRightEgg = function() {
        this.eggLocation += 15;
        if ( this.eggLocation < 103 ) {
            this.singleEgg.style.right = this.eggLocation + 'px';
            this.singleEgg.setAttribute( "class", "egg right-egg-" + this.eggLocation );
        }
    }

    EggClass.prototype.withOrWithoutBird = function() {
        var index = Math.round( ( Math.random() * 2 ) ),
            frequency = [ true, false, true ],
            withOrWithoutBird = frequency[ index ];

        return withOrWithoutBird;
    }

    EggClass.prototype.isBroken = function() {
        if ( this.eggLocation > 103 ) {
            this.moveBirdOnLeft();
            this.moveBirdOnRight();
            this.birdLocation += 20;
        }
    }

    EggClass.prototype.moveBirdOnLeft = function() {
        if ( this.initialRoost.roostSide === 'left' ) {
            this.singleEgg.setAttribute( "class", "left-egg-bird-" + this.birdLocation );
            this.singleEgg.style.left = ( 100 - this.birdLocation ) + 'px';
        }
    }

    EggClass.prototype.moveBirdOnRight = function() {
        if ( this.initialRoost.roostSide === 'right' ) {
            this.singleEgg.setAttribute( "class", "right-egg-bird-" + this.birdLocation );
            this.singleEgg.style.right = ( 100 - this.birdLocation ) + 'px';
        }
    }

    EggClass.prototype.removeEgg = function() {
        if ( this.singleEgg.parentNode ) {
            this.singleEgg.parentNode.removeChild( this.singleEgg );
        }
        clearInterval( this.timer );
    }

    return EggClass;

}( Egg ) );
