var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var minifycss = require('gulp-clean-css');
var gutil = require('gulp-util');
var connectPHP = require('gulp-connect-php');

var serverPath = "./build/";

var docker_host_ip = function(){
  var i = process.argv.indexOf("--host");
  
  if(i>-1){
    return (process.argv[i + 1]);
  } else {
    return ('localhost');
  }
}();


gulp.task('clear', function(){
  return del.sync([serverPath + '**/*'], {force:true});
})

//--------Joga os arquivos html para a pasta dist ----
gulp.task('php', function(){
  gulp.src(['./src/pages/**/*.php'])
  .pipe(gulp.dest(serverPath))
});

// ------ Css separados cada um em um arquivo -----
gulp.task('css:sass', function(){
  gulp.src(['./src/sass/*.sass'])
  .pipe(plumber())
  .pipe(sass())
  //.pipe(concat('main.css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest(serverPath + 'css'))
});

gulp.task('css:vendor', function(){
  gulp.src(['./src/vendor/css/*.css'])
  .pipe(gulp.dest(serverPath + 'css/vendor'))
});

// ------ Js separados cada um em um arquivo -----
gulp.task('js:uglify', function(){
  return gulp.src([
    './src/js/*.js'
  ])
//   .pipe(concat('main.js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('src/maps'))
  .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(gulp.dest(serverPath + 'js'))
});

gulp.task('js:vendor', function(){
  gulp.src(['./src/vendor/js/*.js'])
  .pipe(gulp.dest(serverPath + 'js/vendor'))
});


gulp.task('img', function(){
  gulp.src(['./src/img/**/*'])
  .pipe(gulp.dest(serverPath + 'img'))
});

gulp.task('fonts', function(){
  gulp.src(['./src/fonts/**/*'])
  .pipe(gulp.dest(serverPath + 'fonts'))
});

gulp.task('browser-sync', function(){
  connectPHP.server({}, function(){
    browserSync.init({
      proxy: docker_host_ip + ':8000'      
    });
  });
  
  gulp.watch(serverPath + '**/*', function(){
    browserSync.reload();
  });
});


gulp.task('build', ['php', 'css:sass', 'css:vendor', 'js:uglify', 'js:vendor', 'img', 'fonts'], function(){
  gulp.watch("./src/sass/**/*.sass", ["css:sass"]);
  gulp.watch("./src/js/*.js", ["js:uglify"]);
  gulp.watch("./src/pages/**/*.php", ["php"]);
  gulp.watch("./src/img/**/*", ["img"]);
});

gulp.task('default', function(){
  runSequence('clear', 'build', 'browser-sync');  
})