const gulp = require('gulp')
const yaml = require('gulp-yaml')
const through = require('through2')
const spawn = require('gulp-spawn')
const nunjucks = require('gulp-nunjucks')
const inject = require('gulp-inject')
const browserSync = require('browser-sync').create()

gulp.task('default', ['build', 'html'])

gulp.task('build', () => {
  return gulp.src('./*.yml')
    // Transform to JSON
    .pipe(yaml({ space: 2 }))
    .pipe(through.obj((file, enc, cb) => {
      var data = JSON.parse(String(file.contents))

      // Load Template
      gulp.src('template.dot')
        // Compile Template with JSON data
        .pipe(nunjucks.compile(data, {
          autoescape: false,
          lstripBlocks: true,
          trimBlocks: true
        }))
        // Convert DOT to SVG
        .pipe(spawn({
          cmd: 'dot',
          args: ['-Tsvg'],
          filename: function (base, ext) {
            return data.name + '.svg'
          }
        }))
        // Save to FS
        .pipe(gulp.dest('./build'))

      cb(null, file)
    }))
})

gulp.task('html', () => {
  return gulp.src('./index.html')
    .pipe(inject(
      gulp.src('./build/*.svg', { read: false }), {
        transform: function (filepath, file) {
          return '<object data=".' + filepath + '" type="image/svg+xml">\n\
            <img src=".' + filepath + '"/>\n\
          </object>'
        }
      }
    ))
    .pipe(gulp.dest('./'))
})

gulp.task('watch', ['build', 'html'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  gulp.watch('./build/*.svg').on('change', browserSync.reload)
  return gulp.watch('./*.yml', ['build'])
})
