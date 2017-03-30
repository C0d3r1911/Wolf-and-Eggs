var App = ( function( Egg, Wolf ) {
    var AppClass = function() {
        this.eggs = [];
        this.elements = {};
        this.wolf = null;
        this.points = 0;
        this.lostPoints = 0;
        this.isPlayingNow = false;
        this.init();

    };

    AppClass.prototype.init = function() {
        this.storeElements();
        this.changeWolfPosition();
        this.addMouseListeners();
    };

    AppClass.prototype.storeElements = function() {
        this.elements = {
            roosts: {
                "left-top": document.getElementById( "roost-1" ),
                "left-bottom": document.getElementById( "roost-2" ),
                "right-top": document.getElementById( "roost-3" ),
                "right-bottom": document.getElementById( "roost-4" )
            },
            wolf: document.getElementById( "wolf" ),
            rabbit: document.getElementById( "rabbit" ),
            buttons: {
                leftTop: document.getElementById( "button-left-top" ),
                leftBottom: document.getElementById( "button-left-bottom" ),
                rightTop: document.getElementById( "button-right-top" ),
                rightBottom: document.getElementById( "button-right-bottom" ),
                start: document.getElementById( "button-start" )
            },
            points: {
                plus: document.getElementById( "points" ),
                lost: document.getElementById( "lost-points" )
            }
        }
    };

    AppClass.prototype.changeWolfPosition = function() {
        this.wolf = new Wolf( this.elements.wolf );
    };

    AppClass.prototype.addMouseListeners = function() {

        this.elements.buttons.leftTop.addEventListener( "click", this.wolf.leftTop.bind( this.wolf ) );
        this.elements.buttons.leftBottom.addEventListener( "click", this.wolf.leftBottom.bind( this.wolf ) );
        this.elements.buttons.rightTop.addEventListener( "click", this.wolf.rightTop.bind( this.wolf ) );
        this.elements.buttons.rightBottom.addEventListener( "click", this.wolf.rightBottom.bind( this.wolf ) );
        this.elements.buttons.start.addEventListener( "click", this.start.bind( this ) );
    };

    AppClass.prototype.showGameElements = function() {
        this.elements.wolf.classList.remove( "hide" );
        this.elements.points.plus.classList.remove( "hide" );
    }

    AppClass.prototype.start = function() {
        if ( !this.isPlayingNow ) {
            this.isPlayingNow = true;
            this.resetResults();
            this.showGameElements();
            this.play();
            this.elements.buttons.start.setAttribute( "value", "Playing" );
        }
    }

    AppClass.prototype.play = function() {
        console.log( this.updateFrequency( this.eggs.length ) )
        this.createNewEgg();
        this.createEgg = setTimeout( this.play.bind( this ), this.updateFrequency( this.eggs.length ) );
        this.startFromBeginning();
    }

    AppClass.prototype.playAgain = function() {
        this.isPlayingNow = false;
        this.elements.buttons.start.setAttribute( "value", "Play Again" );
    }

    AppClass.prototype.startFromBeginning = function() {
        if ( this.eggs.length > 999 ) {
            this.eggs.length = 0;
            this.points = 0;
            this.elements.points.plus.textContent = 0;
        }
    }

    AppClass.prototype.createNewEgg = function() {
        this.newEgg = new Egg( this.elements.roosts, this.elements.wolf, this.onFail.bind( this ), this.onSuccess.bind( this ) )
        this.eggs.push( this.newEgg );
    };

    AppClass.prototype.updateFrequency = function( createdEggs ) {
        var frequency = 3500;

        if ( createdEggs > 10 && createdEggs < 25 ) {
            frequency = 2500;
        } else if ( createdEggs >= 25 && createdEggs < 50 ) {
            frequency = 1500;
        } else if ( createdEggs >= 50 && createdEggs < 75 ) {
            frequency = 1200;
        } else if ( createdEggs >= 75 ) {
            frequency = 1000;
        }

        this.showRabbitwhenFrequencyChanged( createdEggs );
        return frequency;
    }


    AppClass.prototype.showRabbitwhenFrequencyChanged = function( createdEggs ) {
        if ( createdEggs === 10 || createdEggs === 25 || createdEggs === 50 || createdEggs === 75 ) {
            this.elements.rabbit.classList.add( "rabbit" );
        } else {
            this.elements.rabbit.classList.remove( "rabbit" );
        }
    }

    AppClass.prototype.onFail = function( lostPoint ) {
        this.lostPoints = this.lostPoints + lostPoint;
        this.showLostPoints( this.elements.points.lost );
        this.finishGame();
    }

    AppClass.prototype.onSuccess = function( point ) {
        this.points = this.points + point;
        this.elements.points.plus.textContent = this.points;
    }

    AppClass.prototype.showLostPoints = function( container ) {
        var lostPointContainer = container;;

        function showBrokenEgg( className ) {
            var brokenEgg = document.createElement( "img" );
            brokenEgg.setAttribute( "src", "assets/img/minuspoint.png" );
            lostPointContainer.appendChild( brokenEgg );
            brokenEgg.setAttribute( "class", className );
        }

        for ( var z = 1; z < 4; z++ ) {
            if ( this.lostPoints === z || this.lostPoints === 3.5 ) {
                this.elements.points.lost.textContent = "";
                for ( var i = 0; i < z; i++ ) {
                    showBrokenEgg( "" );
                }
            }
        }
        if ( this.lostPoints === 0.5 ) {
            showBrokenEgg( "animateEgg" );
        }
        if ( this.lostPoints === 1.5 ) {
            this.elements.points.lost.textContent = "";
            showBrokenEgg( "" );
            showBrokenEgg( "animateEgg" );
        }

        if ( this.lostPoints === 2.5 ) {
            this.elements.points.lost.textContent = "";
            showBrokenEgg( "" );
            showBrokenEgg( "" );
            showBrokenEgg( "animateEgg" );
        }

    }
    AppClass.prototype.finishGame = function() {
        if ( this.lostPoints >= 3 ) {
            clearTimeout( this.createEgg );
            this.eggs.forEach( stopEgg );
            this.playAgain();

            function stopEgg( egg ) {
                clearTimeout( egg.timer );
            }
        }
    }

    AppClass.prototype.resetResults = function() {
        if ( this.eggs.length > 0 ) {
            this.points = 0;
            this.lostPoints = 0;
            this.elements.points.plus.textContent = 0;
            this.elements.points.lost.textContent = "";
            this.eggs.forEach( removeEggs );

            function removeEggs( egg ) {
                egg.removeEgg();
            }
            this.eggs.length = 0;
        }
    }

    return new AppClass();

}( Egg, Wolf ) );
