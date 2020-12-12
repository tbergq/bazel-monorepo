// @flow

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpackBase = require('@tbergq/webpack-config');

const templateContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Trainingjournal</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/png" href="/favicon.ico"/>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

module.exports = {
  ...webpackBase,
  plugins: [
    (new CleanWebpackPlugin() /*: Object */),
    (new HtmlWebpackPlugin({
      title: 'Trainingjournal',
      hash: true,
      scriptLoading: 'defer',
      templateContent,
    }) /*: Object */),
    (new CopyPlugin({
      patterns: [{ from: './src/trainingjournal/src/favicon.ico', to: 'favicon.ico' }],
    }) /*: Object */),
  ],
};
