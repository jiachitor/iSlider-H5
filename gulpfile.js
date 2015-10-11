var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var fecs = require('fecs-files');
var browserSync = require('browser-sync');
var watchify = require('watchify');
var browserify = require('browserify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var assign = require('lodash.assign');
var buffer = require('vinyl-buffer');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');

var b = watchify(browserify(assign({}, watchify.args, {
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    entries: ['./src/islider_core.js'],
    debug: true
})));

// 在这里加入变换操作
b.transform(babelify.configure({stage: 1}));

gulp.task('browserifyTask', bundle); // 这样你就可以运行 `gulp browserifyTask` 来编译文件了
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('islider.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest('./build'));
}

function browserSyncTask(callback) {
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    callback();
};

function sassTask() {
    // Serve files from the root of this project
    gulp.src(['src/*.scss'])
        .pipe(sass())
        .pipe(rename('islider.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('build'))
        .pipe(gulp.dest('demo/public/css'))
        .pipe(notify('islider.css to build complete'));
};

function watchTask() {
    gulp.watch(['src/*.scss'], function () {
        sassTask();
    });
};

gulp.task('watch', gulp.series(
    'browserifyTask',
    browserSyncTask,
    gulp.parallel(sassTask,watchTask)
));


