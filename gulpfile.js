import gulp from 'gulp';
const { src, desc, series, dest } = gulp;
import ts from 'gulp-typescript';

export default function test() {
  return src(['src/*.ts', 'src/**/*.ts']).pipe(ts.createProject('tsconfig.json')).pipe(gulp.dest('dist'));
}
