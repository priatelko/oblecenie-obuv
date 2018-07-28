import gulp from 'gulp';
import gutil from 'gulp-util';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import connect from 'gulp-connect-php';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import jshint from 'gulp-jshint';
import rename from 'gulp-rename';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import dirSync from 'gulp-directory-sync';

function error(err) {
  console.error(err);
  this.emit('end');
}

let vendors = [
  /*'./bower_components/jquery/dist/jquery.js',
  './bower_components/jquery-ui/jquery-ui.js',
  './bower_components/bootstrap/js/collapse.js',
  './bower_components/bootstrap/js/dropdown.js',
  './bower_components/bootstrap/js/modal.js',
  './bower_components/bootstrap/js/tab.js',
  './bower_components/bootstrap/js/tooltip.js',
  './bower_components/bootstrap/js/transition.js',
  './bower_components/owl.carousel/dist/owl.carousel.js',
  './bower_components/jquery.cookie/jquery.cookie.js',
  './bower_components/moment/min/moment.min.js',
  './bower_components/moment/locale/sk.js',
  './bower_components/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
  './bower_components/bootstrap-select/js/bootstrap-select.js',
  './bower_components/bootstrap-select/js/i18n/defaults-sk_SK.js',
  './bower_components/bootstrap-star-rating/js/star-rating.js',
  './bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.js',
  './bower_components/underscore/underscore.js',
  './web/bundles/punkavefileuploader/js/jquery.fileupload.js',
  './web/bundles/punkavefileuploader/js/jquery.iframe-transport.js',
  './web/bundles/punkavefileuploader/js/FileUploader.js',*/
];

let app = [
  /*'./src/GoodJob/TemplateBundle/Resources/public/src/js/plugins/common.js',
  './src/GoodJob/TemplateBundle/Resources/public/src/js/plugins/bootstrap-tokenfield.js',
  './src/GoodJob/TemplateBundle/Resources/public/src/js/plugins/FileUploader-profile.js',
  './src/GoodJob/TemplateBundle/Resources/public/src/js/plugins/jquery.lettering.js',
  './src/GoodJob/TemplateBundle/Resources/public/src/js/plugins/triggers.js',
  './src/GoodJob/TemplateBundle/Resources/public/src/js/config.js',*/
];

let fonts = [
  './bower_components/components-font-awesome/webfonts/*',
];

let images = [
  './bower_components/bootstrap-star-rating/img/*',
];

/* !Watch tasks */
/*gulp.task('css', () => {
  return gulp.src('src/GoodJob/TemplateBundle/Resources/public/src/less/app.less')
  .pipe(sourcemaps.init())
  .pipe(less()).on('error', error)
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(cssnano())
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write())
  //.pipe(concat('bower_components/normalize-css/normalize.css'))
  .pipe(gulp.dest('src/GoodJob/TemplateBundle/Resources/public/assets/css'))
});*/
gulp.task('css', () => {
    gulp.src('src/GoodJob/TemplateBundle/Resources/public/src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/GoodJob/TemplateBundle/Resources/public/assets/css'))
});

gulp.task('js', () => {
  gulp.src(app)
  .pipe(concat('app.min.js'))
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(uglify()).on('error', error)
  // .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('src/GoodJob/TemplateBundle/Resources/public/assets/js'))
});

// Synchronize
gulp.task('sync', function() {
  gulp.src('')
    .pipe(dirSync( 'src/GoodJob/TemplateBundle/Resources/public/assets', 'web/bundles/template', { printSummary: true } ))
    .on('error', gutil.log);
} );


/*! Installer commands */
gulp.task('fontBuild', () => {
  gulp.src(fonts)
  .pipe(gulp.dest('src/GoodJob/TemplateBundle/Resources/public/assets/fonts'))
});
gulp.task('imgBuild', () => {
  gulp.src(images)
  .pipe(gulp.dest('src/GoodJob/TemplateBundle/Resources/public/assets/img'))
});
gulp.task('jsBuild', () => {
  gulp.src(vendors)
  .pipe(concat('vendors.min.js'))
  .pipe(sourcemaps.init())
  .pipe(uglify()).on('error', error)
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('src/GoodJob/TemplateBundle/Resources/public/assets/js'));
});
// global installer task
gulp.task('publish', ['fontBuild', 'imgBuild', 'jsBuild', 'js', 'css', 'sync']);



/*! Watches */
gulp.task('default', ['css', 'js'], () => {
  gulp.watch('src/GoodJob/TemplateBundle/Resources/public/src/scss/**', ['css']);
  gulp.watch('src/GoodJob/TemplateBundle/Resources/public/src/js/**', ['js']);
  gulp.watch('src/GoodJob/TemplateBundle/Resources/public/**/*', ['sync']);
});
