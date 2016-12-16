const gulp = require("gulp");
const ts = require("gulp-typescript");
const mocha = require("gulp-mocha");
const sourcemaps = require("gulp-sourcemaps");
const istanbul = require("gulp-istanbul");
const remapIstanbul = require("remap-istanbul/lib/gulpRemapIstanbul");
const del = require("del");
const __coverageThreshold = 60;
const tsProject = ts.createProject("./tsconfig.json");
const tslint = require("gulp-tslint");
const browserify = require("browserify");
const tsify = require("tsify");
const source = require('vinyl-source-stream');
const fs = require('fs');
const babelify = require('babelify');
const open = require('gulp-open');
const connect = require('gulp-connect');
const nodemon = require('gulp-nodemon');
const os = require('os');

gulp.task("build:lint", function () {
    return gulp.src(["./**/*.ts", "!./node_modules/**/*", "!./test/**/*"])
        .pipe(tslint({
            configuration: {
                rules: {
                    "variable-name": false,
                    "quotemark": [true, "single", "avoid-escape"],
                    "max-file-line-count": false
                }
            }
        }))
        .pipe(tslint.report())
});

gulp.task("build:clean", function () {
    return del([
        "./dist",
        "./coverage",
        "./coverage-report"
    ]);
});

gulp.task("build", ["build:clean"], function () {
    return gulp.src([
        "./src/**/*.ts",
        "./src/**/*.tsx",
        "./test/**/*.ts"
    ], { base: "." })
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist"));
})

gulp.task("test:instrument", ["build"], function () {
    return gulp.src("./dist/src/**/*.js")
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task("test:cover", ["test:instrument"], function () {
    return gulp.src("./dist/**/*Tests.js")
        .pipe(mocha({ ui: "bdd" }))
        .pipe(istanbul.writeReports({
            reporters: ["json", "html"]
        })).on("end", remapCoverageFiles);
});

function remapCoverageFiles() {
    return gulp.src("./coverage/coverage-final.json")
        .pipe(remapIstanbul({
            basePath: ".",
            reports: {
                "html": "./coverage",
                "text-summary": null,
                "lcovonly": "./coverage/lcov.info"
            }
        }));
}
gulp.task('bundle', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.tsx'],
        cache: {},
        packageCache: {},
        insertGlobals: true
    })
        .plugin(tsify)
        .bundle()
        .on('error', function (error) { console.error(error.toString()); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist/src"));
});

gulp.task('connect', function() {
  connect.server({
    root: ['./'],
    port: 4000
  });
});

gulp.task('open', function(){
  var options = {
    uri: 'http://localhost:4000'
  };
  gulp.src(__filename)
  .pipe(open(options));
});

gulp.task('start', function () {
    nodemon({
        script: 'server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' }
    })
})

gulp.task('stop', function () {
    nodemon({
        script: 'server.stop.js',
        env: { 'NODE_ENV': 'development' }
    })
})

gulp.task("test", ["test:cover"]);
gulp.task("default", ["build:lint", "build", "test", "bundle"]);
gulp.task("run", ["start", "connect", 'open', 'stop']);