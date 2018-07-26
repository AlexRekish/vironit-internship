'use strict';

const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const server = require('browser-sync').create();
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webpack = require('webpack-stream');
const mocha = require('gulp-mocha');
const cleancss = require('gulp-clean-css');
const notify = require('gulp-notify');

gulp.task('style', function () {
    return gulp.src('sass/**/main.sass')
      .pipe(sass({ outputStyle: 'expanded' }).on('error', notify.onError()))
      .pipe(autoprefixer( {
        browsers: ['last 2 versions'],
        cascade: true
      }))
	    .pipe(gulp.dest('build/css'))
	    .pipe(rename({ suffix: '.min', prefix : '' }))
	    .pipe(cleancss( {
			level: { 1: { specialComments: 0 } },
			compatibility: 'ie11'
		  })) // Opt., comment out when debugging
      .pipe(gulp.dest('build/css'))
      .pipe(server.stream());
});

gulp.task('scripts', function () {
    return gulp.src('js/Application.js')
        .pipe(webpack({
            output: {
                filename: 'scripts.js',
            },
            module: {
                rules: [{
                    test: /\.(js)$/,
                    exclude: /(node_modules)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['env']
                    }
                }]
            },
            mode: 'development'
        }))
        // .pipe(uglify())
        .pipe(plumber())
        .pipe(gulp.dest('build/js/'))
        ;
});

gulp.task('test', function () {
});

gulp.task('imagemin', ['copy'], function () {
    return gulp.src('build/img/**/*.{jpg,png,gif}')
        .pipe(imagemin([
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.jpegtran({ progressive: true })
        ]))
        .pipe(gulp.dest('build/img'));
});


gulp.task('copy-html', function () {
  return gulp.src('*.{html,ico}')
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

gulp.task('copy', ['copy-html', 'scripts', 'style'], function () {
    return gulp.src([
        'fonts/**/*.{woff,woff2}',
        'img/*.*'
    ], { base: '.' })
        .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
    return del('build');
});

gulp.task('js-watch', ['scripts'], function (done) {
    server.reload();
    done();
});

gulp.task('serve', ['assemble'], function () {
    server.init({
        server: './build',
        notify: false,
        open: true,
        port: 3000,
        ui: false
    });

    gulp.watch('sass/**/*.{scss,sass}', ['style']);
    gulp.watch('*.html').on('change', (e) => {
        if (e.type !== 'deleted') {
            gulp.start('copy-html');
        }
    });
    gulp.watch('js/**/*.js', ['js-watch']);
});

gulp.task('assemble', ['clean'], function () {
    gulp.start('copy', 'style');
});

gulp.task('build', ['assemble'], function () {
    gulp.start('imagemin');
});

gulp.task('test', function () {
    return gulp
        .src(['js/**/*.test.js'], {
            read: false
        })
        .pipe(mocha({
            compilers: ['js:babel-register'], // Включим поддержку "import/export" в Mocha тестах
            reporter: 'nyan',
            require: ['mock-local-storage'],
        }));
});
