const { src, dest, parallel, series } = require('gulp');
const gulpEsbuild = require('gulp-esbuild');
const rename = require('gulp-rename');
const streamToPromise = require('stream-to-promise');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');

// 版本信息
const pck = require('./package.json');
const pckName = `${pck.name}`;
const Name = pck.name.replace(/^\S/, (s) => s.toUpperCase());
const outDir = 'dist';

// 清除文件
function cleanFile(blob) {
  return () => streamToPromise(src(blob, { allowEmpty: true }).pipe(clean())).then(() => dest(blob));
}

// 构建函数
function build() {
  return Promise.all(
    ['iife', 'cjs', 'esm'].map((format) => {
      return streamToPromise(
        src(pck.main)
          .pipe(
            gulpEsbuild({
              outfile: `${pckName}.js`,
              // outdir: outDir,
              bundle: true,
              loader: {
                '.ts': 'ts',
              },
              tsconfig: 'tsconfig.json',
              globalName: Name,
              format: format,
              sourcemap: false,
              minify: false,
              minifySyntax: false,
              treeShaking: true,
            }),
          )
          // .pipe(uglify())
          .pipe(
            rename({
              suffix: `.${format}.min`,
            }),
          )
          .pipe(dest(outDir)),
      );
    }),
  );
}

exports.default = series(cleanFile('dist'), build);
