const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const  sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')


const del = require('del');

const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },

    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/images/*'
    }

}

function clean() {
    return del(['dist'])
}

function styles() {
    //search files
    return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    //compilation to css
    .pipe(less())
    .pipe(autoprefixer({
        cascade: false
    }))
    //clean css
    .pipe(cleanCSS( {
        level:2
    }))
    //rename files
    .pipe(rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    //folder destination
    .pipe(gulp.dest(paths.styles.dest))
}


function scripts() {
    return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))

}

function img()  {
   return gulp.src('')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
}

function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
    
}

const build = gulp.series(clean, gulp.parallel(styles,scripts) , watch)


exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build



