const gulp = require('gulp');

const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");
const less = require('gulp-less');
const connect = require('gulp-connect');

// gulp babel  执行
gulp.task('babel', () => {
  return gulp
    .src('src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist/js'))
});

// gulp browserify  执行
gulp.task('browserify', function () {
  return gulp
    .src('dist/js/index.js')
    .pipe(browserify())
    .pipe(rename('dist.js')) // npm i gulp-rename 下载
    .pipe(gulp.dest('dist/js'))
});

gulp.task("less", function () {
  return gulp
    .src("src/less/*.less")
    .pipe(less()) // 将less编译成css
    .pipe(gulp.dest("dist/css"))
});

gulp.task("html", function () {
  return gulp
    .src("src/index.html")
    .pipe(gulp.dest("dist"))
});

// 配置自动化任务
gulp.task('watch', () => {
  gulp.watch("./src/js/*.js", gulp.series("js"));
  gulp.watch("./src/less/*.less", gulp.series("less"));
  gulp.watch("./src/index.html", gulp.series("html"));
})

// 自动刷新浏览器
// 自动打开浏览器

gulp.task("js", gulp.series(["babel", "browserify"])); // 同步  gulp js 执行
// gulp.task('js', gulp.parallel(['babel', 'browserify'])); //异步 （慎用）
gulp.task("dev", gulp.parallel(["js", "less", "html"])); // js同步、less异步  gulp dev 执行
gulp.task("start", gulp.parallel(["dev", "watch"])); // js同步、less异步  gulp dev 执行