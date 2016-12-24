const gulp = require('gulp')
const watch = require('gulp-watch')
const yaml = require('gulp-yaml')
const through = require('through2')
const spawn = require('gulp-spawn')
const nunjucks = require('gulp-nunjucks')

gulp.task('default', ['build'])

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
            return data.name + ".svg"
          }
        }))
        // Save to FS
        .pipe(gulp.dest('./build'))

      cb(null, file)
    }))
})

gulp.task('watch', ['build'], () => {
  return gulp.watch('./*.yml', ['build'])
})
