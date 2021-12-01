const { src, dest, parallel, series } = require('gulp');
const gulpEsbuild = require('gulp-esbuild');
const rename = require('gulp-rename');
const streamToPromise = require('stream-to-promise');
const clean = require('gulp-clean');

// 版本信息
const pck = require('./package.json');
const pckName = 'hotkey-focus' || `${pck.name}`;
const Name = pckName.replace(/^\S/, (s) => s.toUpperCase());
const outDir = 'lib';

// 清除文件
function cleanFile(blob) {
  return () => streamToPromise(src(blob, { allowEmpty: true }).pipe(clean())).then(() => dest(blob));
}

// 构建函数
function build() {
  return Promise.all(
    ['iife', 'cjs', 'esm'].map((format) => {
      const esConfig = {
        outfile: `${pckName}.js`,
        // outdir: outDir,
        bundle: true,
        loader: {
          '.ts': 'ts',
        },
        tsconfig: 'tsconfig.json',
        // globalName: 'KeyFocus',
        format: format,
        sourcemap: false,
        minify: false,
        minifySyntax: false,
        treeShaking: true,
      };
      if (format == 'iife') {
        esConfig.globalName = 'KeyFocus';
      }
      return streamToPromise(
        src(['src/**/*.ts'])
          .pipe(gulpEsbuild(esConfig))
          // .pipe(uglify())
          // .pipe(
          //   babel({
          //     presets: ['es2015'],
          //   }),
          // )
          .pipe(
            rename({
              suffix: `.${format}`,
            }),
          )
          .pipe(dest(outDir)),
      );
    }),
  );
}

exports.default = series(cleanFile(outDir), build);
