module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@modules': './src/modules',
          '@shared': './src/shared',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
