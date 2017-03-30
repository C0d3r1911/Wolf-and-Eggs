var Wolf = ( function() {

    var WolfClass = function( element ) {
        this.element = element
    };

    WolfClass.prototype.changeElement = function( className, imageSrc ) {
        this.element.setAttribute( 'src', imageSrc );
        this.element.removeAttribute( 'class' );
        this.element.setAttribute( 'class', className );
    };

    WolfClass.prototype.leftTop = function() {
        this.changeElement( "left-top", "assets/img/left-top.png" );
    };

    WolfClass.prototype.leftBottom = function() {
        this.changeElement( "left-bottom", "assets/img/left-bottom.png" );
    };

    WolfClass.prototype.rightTop = function() {
        this.changeElement( "right-top", "assets/img/right-top.png" );
    };

    WolfClass.prototype.rightBottom = function() {
        this.changeElement( "right-bottom", "assets/img/right-bottom.png" );
    };

    return WolfClass;

}() );
