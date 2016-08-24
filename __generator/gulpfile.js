// get gulp and modules
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var nested = require('postcss-nested');
var mixins = require('precss');
var extend = require('postcss-simple-extend');
var media = require('postcss-custom-media');
var autoprefixer = require('autoprefixer');
var variables = require('postcss-simple-vars');
var rename = require("gulp-rename");
var plumber = require('gulp-plumber');
var theimport = require('postcss-import');
var lost = require('lost');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gutil = require('gulp-util');
var pxtorem = require('postcss-pxtorem');
var pixrem = require('pixrem');
var sourcemaps = require('gulp-sourcemaps');
var math = require('postcss-math');



// error handler
var onError = function (err) {
    gutil.beep();
    console.log(err);
    this.emit('end'); // this is the key
};

/*-------------------------------------
 Compile and process CSS
 -------------------------------------*/
gulp.task('css', function () {
    var processors = [
        theimport(), // At begin for correct before/after settings
        nested(),
        mixins(),
        extend(),
        variables(),
        math(),
        lost(),
        autoprefixer({browsers: ['last 3 versions', 'iOS >= 7']}),
        media(),
        pxtorem({
            prop_white_list: []
        }),
        pixrem()

    ];
    return gulp.src('./scss/style.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(postcss(processors))
        .pipe(plumber.stop())
        .pipe(rename("index.css"))
        .pipe(gulp.dest('../assets/css'))
        .pipe(reload({stream: true}));
});

gulp.task('reload-view', reload);


gulp.task('watch', function () {
    gulp.watch(['./**/*.scss', '../partials/**/*.scss', '../views/pages/**/*.scss'], ['css']);
    gulp.watch(['../index.html', '../assets/js/index.js'], ['reload-view']);
});


gulp.task('build', function () {
    gulp.start('css');
});

gulp.task('browser-sync', function () {
    browserSync({
        proxy: 'mobilly.dev',
        port: 8080,
        open: false,
        notify: false
    });
});

/*-------------------------------------
 default tasks
 -------------------------------------*/
gulp.task('default', ['css', 'browser-sync', 'watch']);