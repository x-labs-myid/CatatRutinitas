module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@utils': './src/utils',
          '@store': './src/store',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@types': './src/types',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
