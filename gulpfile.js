var fs = require("fs");
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

var demo_config_list = ['dom/example','dom/default','dom/default2','dom/demo_with_navigator','dom/slide_with_btn','dom/vertical_slide','dom/with-plugins-dot-button','dom/with-plugin-zoom','picture/default','picture/picture_with_button','picture/picture_with_dots','picture/zoom','picture/card','effect/card','effect/depth','effect/fade','effect/flip','effect/flow','effect/rotate','effect/jyxs','effect/kpfy','effect/jhfy','effect/phyc','effect/yrks','effect/sxhd','effect/zxfd'];
var demo_config = ['effect/jhfy'];

var b = watchify(browserify(assign({}, watchify.args, {
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    entries: ['./src/islider.js'],
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
        .pipe(uglify())
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
}

function sassTask() {
    // Serve files from the root of this project
    gulp.src(['src/*.scss'])
        .pipe(sass())
        .on('error', gutil.log) // 在这里捕捉编译错误
        .pipe(rename('islider.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('build'))
        .pipe(gulp.dest('demo/public/css'))
        .pipe(notify('islider.css to build complete'));
}


function browserifyTask(){
    for (var conf of demo_config) {
        browserifyJsFn(conf);
    }
}

function browserifyJsFn(conf){
    browserify("./demo/"+ conf +"/main.js", { debug: true })
        .transform(babelify)
        .bundle()
        .on("error", function (err) { console.log("Error : " + err.message); })
        .pipe(fs.createWriteStream("./demo/"+ conf +"/bundle.js"));
}

function watchTask() {
    gulp.watch(['demo/*/*/main.js'], function () {
        browserifyTask();
    });

    gulp.watch(['src/**/*.js'], function () {
        browserifyTask();
    });

    gulp.watch(['src/*.scss'], function () {
        sassTask();
    });
}

gulp.task('watch', gulp.series(
    'browserifyTask',
    browserSyncTask,
    gulp.parallel(sassTask,watchTask,browserifyTask)
));


