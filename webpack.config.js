var webpack = require('webpack');
var path = require('path');
var distPath = path.resolve(__dirname, 'dist');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

// webpack.config.js
module.exports = {
  entry: [
    path.join(__dirname, 'index.js')
  ],
  output: {
    path: distPath,
    filename: 'block.user.js'
  },
  resolve: {
    extensions: ['', '.coffee', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015'],
          plugins: []
        }
      },
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /.*\.svg$/,
        loaders: [
          'file-loader',
          'svgo-loader?useConfig=svgoConfig1'
        ]
      }
    ]
  },
  svgoConfig1: {
    plugins: [
      {removeTitle: true},
      {convertColors: {shorthex: false}},
      {convertPathData: false}
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),

    //js文件的压缩
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   mangle: {
    //     except: ['$super', '$', 'exports', 'require']
    //   }
    // }),

    // 添加banner
    new webpack.BannerPlugin((function () {
      return `// ==UserScript==
// @name    Block somebody
// @author  burningall
// @description 在贴吧屏蔽某人,眼不见心不烦
// @version     2016.05.11
// @include     *tieba.baidu.com/p/*
// @include     *tieba.baidu.com/*
// @include     *tieba.baidu.com/f?*
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @run-at      document-start
// @compatible  chrome  两个字，破费
// @compatible  firefox  两个字，破费
// @license     The MIT License (MIT); http://opensource.org/licenses/MIT
// @supportURL      http://www.burningall.com
// @contributionURL troy450409405@gmail.com|alipay.com
// @namespace https://greasyfork.org/zh-CN/users/3400-axetroy
// ==/UserScript==
      `;
    })(), {
      raw: true,
      entryOnly: false
    }),

    // 删除重复的代码
    new webpack.optimize.DedupePlugin(),
    // new webpack.DllPlugin({
    //   path: path.join(__dirname, "manifest.json"),
    //   name: "[name]_[hash]",
    //   context: __dirname
    // }),

    // 生成source map
    new webpack.SourceMapDevToolPlugin({
      // asset matching
      test: /\.(jsx|js)?$/,
      exclude: /(node_modules|bower_components)/,
      // include: string | RegExp | Array,

      // file and reference
      filename: 'block.user.map',
      append: false,

      // sources naming
      moduleFilenameTemplate: 'block.user.map',
      fallbackModuleFilenameTemplate: 'block.user.map',

      // quality/performance
      module: true,
      columns: true,
      lineToLine: true
    }),

    //允许错误不打断程序
    new webpack.NoErrorsPlugin(),

    // //把指定文件夹下的文件复制到指定的目录
    // new TransferWebpackPlugin([
    //   {
    //     from: 'src',
    //     to: 'src'
    //   }
    // ], __dirname)
  ]
};