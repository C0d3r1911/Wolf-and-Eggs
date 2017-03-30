var gulp = require( "gulp" );

//PLUGINS
var autoprefixer = require( "gulp-autoprefixer" ),
    concat = require( "gulp-concat" ),
    rename = require( "gulp-rename" ),
    uglify = require( "gulp-uglify" );

// autoprefixer
gulp.task( "ap", ap );
// concat rename uglify
gulp.task( "cru", cru );
// watch all
gulp.task( "watch", watch );

function ap() {
    return gulp.src( "../../assets/css/styles.css" )
        .pipe( autoprefixer() )
        .pipe( gulp.dest( "../../assets/css" ) )
}

function cru() {
    var wolf = "../js/wolf.js",
        egg = "../js/egg.js",
        app = "../js/app.js",
        external = "../js/external/*.js",
        jsDest = "../../assets/js";

    return gulp.src( [ wolf, egg, app, external ] )
        .pipe( concat( "scripts.js" ) )
        .pipe( gulp.dest( jsDest ) )
        .pipe( rename( "scripts.min.js" ) )
        .pipe( uglify() )
        .pipe( gulp.dest( jsDest ) );
}

function watch() {
    gulp.watch( "../js/*.js", [ "cru", ] );
    gulp.watch( "../../assets/css/styles.css", [ "ap", ] );
}
