/**
 * @license
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var webpack = require('webpack');
var path = require('path');

module.exports = function(config) {
  config.set({
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-structured-json-reporter',
      'karma-webpack',
      require(path.resolve(__dirname, '../__shared__/karma-plugins/karma-custom-html-reporter'))
    ],
    browsers: ['ChromeHeadless', 'Firefox'], // run in Chrome and Firefox
    singleRun: true, // set this to false to leave the browser open
    frameworks: ['mocha'], // use the mocha test framework
    files: [
      { pattern: path.resolve(__dirname, './node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'), watched: false },
      { pattern: path.resolve(__dirname, './node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js'), watched: false },
      'tests.webpack.ts' // just load this file
    ],
    preprocessors: {
      'tests.webpack.ts': ['webpack', 'sourcemap'] // preprocess with webpack and our sourcemap loader
    },
    mime: {
      'text/x-typescript': ['ts']
    },
    reporters: ['dots', 'custom-html', 'json-result'], // report results in these formats
    htmlReporter: {
      outputFile: path.resolve(__dirname, './results/results.html'),
      pageTitle: 'Dojo 2 + Custom Elements',
      groupSuites: true,
      useCompactStyle: true
    },
    jsonResultReporter: {
      outputFile: path.resolve(__dirname, './results/results.json')
    },
    webpack: {
      resolve: {
        extensions: ['.js', '.ts'],
        modules: [
          path.resolve(__dirname, '../__shared__/webcomponents/src'),
          path.resolve(__dirname, './node_modules')
        ]
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
          },
          { test: /\.js?$/, loader: 'umd-compat-loader' },
          {
            test: /.*\.ts(x)?$/, use: [
              'umd-compat-loader',
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true
                }
              }
            ]
          }
        ]
      }
    },
    webpackServer: {
      // noInfo: true // please don't spam the console when running in karma!
    }
  });
};