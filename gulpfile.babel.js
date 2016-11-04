// eslint不知道哪些js文件是用来build的，所有会报一些不必要的错误，比如build文件gulpfile是用来打包的，所以引入的包模块是dev安装的
/* eslint-disable import/no-extraneous-dependencies */
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';
import mocha from 'gulp-mocha';
import webpackConfig from './webpack.config.babel';

const paths = {
  allSrcJs: 'src/**/*.js',
  gulpFile: 'gulpfile.babel.js',
  allLibTests: 'lib/test/**/*.js',
  libDir: 'lib',
  distDir: 'dist',
  webpackFile: 'webpack.config.babel.js',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'src/client/app.js',
  clientBundle: 'dist/client-bundle.js?(.map)'
};
// 配置eslint的检查范围，包括源码文件和gulpfile执行文件
gulp.task('lint', () =>
    gulp.src([paths.allSrcJs, paths.gulpFile, paths.webpackFile])
   .pipe(eslint())
   .pipe(eslint.format())
   .pipe(eslint.failAfterError())
);
// 编译之前清除原编译文件夹
gulp.task('clean', () =>
   del([paths.libDir, paths.clientBundle])
);
// 开始编译，编译源码文件到lib静态文件，在这之前需要检查语法
gulp.task('build', ['clean', 'lint'], () =>
   gulp.src(paths.allSrcJs)
          .pipe(babel())
          .pipe(gulp.dest(paths.libDir))
);
gulp.task('test', ['build'], () =>
  gulp.src(paths.allLibTests)
    .pipe(mocha())
);
// 执行文件，执行之前需要编译，然后执行lib下编译好的文件
// 我们的构建任务目前将ES6代码转换为位于src下的每个.js文件的ES5。现在我们已经将代码分成了服务器，共享和客户端代码，
// 我们可以使这个任务只编译服务器和共享（因为Webpack照顾客户端）。但是，在测试章节中，我们将需要Gulp编译客户端代码
// 以在Webpack外部进行测试。所以，直到你到达那一章，有一点无用的重复构建正在做。我相信我们都可以同意，现在是好的。
// 我们实际上甚至不再使用构建任务和lib文件夹，直到那一章，因为我们现在关心的是客户端bundle。
gulp.task('main', ['test'], () => {
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir));
});
// 实时监控文件改变
gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main']); // 文件改变的时候执行main任务
});
// 开启gulp任务监控和启动项目
gulp.task('default', ['watch', 'main']);
