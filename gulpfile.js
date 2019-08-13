'use strict';

var gulp            = require('gulp');
var babel           = require('gulp-babel');
var browserSync     = require('browser-sync');
var rename          = require('gulp-rename');
/*var sass            = require('gulp-sass');*/
var vueComponent    = require('gulp-vue-single-file-component');
var rigger          = require('gulp-rigger');

gulp.task('html', function () {
    gulp.src('./public/*.html')
        .pipe(gulp.dest('.build/public/'))
        .pipe(rigger())
        .pipe(browserSync.stream())
});

gulp.task('scripts', () => gulp.src('./src/*.js')
    .pipe(babel({ plugins: ['@babel/plugin-transform-modules-amd'] }))
    .pipe(rigger())
    .pipe(gulp.dest('.build/src/'))
    .pipe(browserSync.stream())
);

gulp.task('vue', () => gulp.src('./src/components/*.vue')
    .pipe(vueComponent({ debug: true }))
    .pipe(babel({ plugins: ['@babel/plugin-transform-modules-amd'] }))
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('.build/src/components'))
    .pipe(browserSync.stream())
);

gulp.task('vue-main', () => gulp.src('./src/*.vue')
    .pipe(vueComponent({ debug: true }))
    .pipe(babel({ plugins: ['@babel/plugin-transform-modules-amd'] }))
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('.build/src/'))
    .pipe(browserSync.stream())
);

/*gulp.task('sass', function () {
    gulp.src('.src/style/!*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.build/src/style/css'));
});*/

gulp.task('watch', () => {
/*    var files = [
        '.build/public/!*.html',
        '.build/src/!**!/!*.js',
    ];*/

    browserSync.init(/*files, */{
        server: {
            baseDir: './.build/public'
        }
    });

    gulp.watch('./src/*.js', gulp.parallel('scripts'));
    gulp.watch('./src/components/*.vue', gulp.parallel('vue'));
    gulp.watch('.src/style/*.scss', gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('html', 'scripts', 'vue-main', 'vue', 'watch'));
