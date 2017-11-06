var root = './assets/';

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var del          = require('del');
var less         = require('gulp-less');
var concat       = require('gulp-concat');
var rollup       = require('gulp-rollup');
var buble        = require('rollup-plugin-buble');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var plumber      = require('gulp-plumber');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss    = require('gulp-clean-css');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync').create();

// Compile Our less
gulp.task('less', function() {
	return gulp.src(root+'styles/*.less')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['> 3%', 'last 5 version', 'ie 8-11']
		}))
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(root+'styles'))
		.pipe(browserSync.stream());
});

// Concatenate & Minify JS

gulp.task('scripts', function() {
	return gulp.src([root+'scripts/**/*.js', '!'+root+'scripts/bundle.js', '!'+root+'scripts/bundle.min.js'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(rollup({
			entry: root+'scripts/main.js',
  			plugins: [ buble() ]
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest(root))
		.pipe(rename('bundle.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(root+'scripts/'))
		.pipe(browserSync.stream());
});

gulp.task('bundle', function() {
  gulp.src('./src/**/*.js')
    .pipe(sourcemaps.init())
      // transform the files here.
      .pipe(rollup({
        entry: './src/main.js'
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

// Images compression

gulp.task('clean', function () {
  return del([root+'images/*', '!'+root+'images/sources']);
});

gulp.task('images', ['clean'], function(){
	return gulp.src(root+'images/sources/**/*')
		.pipe(plumber())
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(root+'images'));
});

// Watch Files For Changes
gulp.task('watch', function() {

	browserSync.init({
		server: {
            baseDir: './',
        }
	});

	gulp.watch(root+'styles/*.less', ['less']);
	gulp.watch([root+'scripts/**/*.js', '!'+root+'scripts/bundle.js', '!'+root+'scripts/bundle.min.js'], ['scripts']);
	gulp.watch(root+'images/sources/**/*', ['images']);
	gulp.watch(['*.html']).on('change', browserSync.reload);
});
