let gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    //browserSync = require('browser-sync'),
    reload      = browserSync.reload;

var paths = {
    html:['app/index.html'],
    css:['app/sass/*.sass'],
    script:['app/js/*.js']
};

gulp.task('sass', ()=> {
    return gulp.src('app/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(reload({stream:true}));
});

gulp.task('compress', function() {
    return gulp.src('app/min-js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/min-js'))
        .pipe(reload({stream:true}));
});

gulp.task('concat', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app/min-js'))
        .pipe(reload({stream:true}));
});

gulp.task("all-js", gulp.series('concat', 'compress'));

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
        port: 3000,
        open: true,
        notify: false
    });
    browserSync.watch('build', reload)
});

gulp.task('html', function(){
    gulp.src(paths.html)
        .pipe(reload({stream:true}));
});

gulp.task('watcher', function(){
    gulp.watch(paths.css, gulp.series('sass'));
    gulp.watch(paths.script, gulp.series('all-js'));
    gulp.watch(paths.html, gulp.series('html'));
});

gulp.task('default', gulp.parallel('watcher', 'browserSync'));
