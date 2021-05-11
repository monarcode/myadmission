

// initial dependencies
const { src, dest, watch, series, parallel} = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');

// file path
const files = {
    scssPath: 'assets/style/**/*.scss',
    cssPath: 'assets/style',
    jsPath: 'assets/js/**/*.js'
}

// scss compile
function scssTask() {
        return src(files.scssPath)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(files.cssPath))
        .pipe(browserSync.stream()
    );
}

// live reload
function watchTask() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
//    watch([files.scssPath], parallel(scssTask))
    watch(files.scssPath, scssTask);
    watch('./**/*.html').on('change', browserSync.reload);
    watch('./js/**/*.js').on('change', browserSync.reload);
    watch(files.jsPath).on('change', browserSync.reload);
}

exports.watchTask = watchTask;