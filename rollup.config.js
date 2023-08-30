import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import image from 'rollup-plugin-image';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
const packageJson = require('./package.json');
export default {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    image(),
    copy({
      targets: [
        { src: 'src/assets/images/*', dest: 'public/assets/images' },
        //  { src: 'src/assets/fonts/*', dest: 'public/assets/fonts' },
      ],
    }),
    typescript({ useTsconfigDeclarationDir: true }),

    postcss({
      extensions: ['.css'],
    }),
  ],
};
