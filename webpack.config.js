var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('./config/webpack/HtmlWebpackPlugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var SriPlugin = require('webpack-subresource-integrity');
var InlineCSP = require('./config/webpack/InlineCSP');
var package = require('./package.json');

var NODE_ENV = process.env.npm_lifecycle_event === 'build' ?
  'production' :
  'development';
var isDev = NODE_ENV === 'development';
var srcPath = path.join(__dirname, 'src');
var distPath = isDev ? path.join(__dirname, 'dist') : path.join(__dirname, 'docs');
var homepage = isDev ? '' : package.homepage;

var extractInlineCss = new ExtractTextPlugin({
  filename: 'inline.css',
  disable: isDev,
  allChunks: true
});
var extractMainCss = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: isDev,
  allChunks: true
});

var common = {
  context: srcPath,

  entry: {
    main: path.join(srcPath, 'main.js')
  },

  output: {
    path: distPath,
    publicPath: homepage + '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: 'chunk.[chunkhash].js',
    crossOriginLoading: 'anonymous'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'preprocess-loader',
            options: {
              'NODE_ENV': NODE_ENV
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  loose: true,
                  modules: false
                }],
                'react'
              ],
              plugins: [
                'transform-react-jsx-img-import',
                'transform-object-rest-spread'
              ]
            }
          }
        ]
      },

      {
        test: /inline\.css$/,
        use: extractInlineCss.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: false,
                minimize: false,
                camelCase: true,
                localIdentName: '[local]--[hash:base64:5]', // [path][name]__
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: require('./config/webpack/PostCSSOptions')()
              }
            }
          ]
        })
      },

      {
        test: /\.css$/,
        exclude: [
          /inline\.css$/
        ],
        use: extractMainCss.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: false,
                minimize: false,
                camelCase: true,
                localIdentName: '[local]--[hash:base64:5]', // [path][name]__
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: require('./config/webpack/PostCSSOptions')()
              }
            }
          ]
        })
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
		    use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:8].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },

      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              name: '[hash:8].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'img-loader'
          }
        ]
      },

      {
        test: /\.(txt)$/i,
        use: [
          'raw-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([
      isDev ? 'dist/**/*' : 'docs/**/*'
    ], { verbose: true }),
    (isDev ? null : new BundleAnalyzerPlugin({ analyzerMode: 'static' })),
    (isDev ? null : new webpack.optimize.OccurrenceOrderPlugin()),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) },
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        var context = module.context;
        return context && context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'Marvel',
      short_name: 'Marvel',
      description: 'Marvel',
      background_color: '#9cf1fa',
      theme_color: '#9cf1fa',
      display: 'minimal-ui',
      lang: 'en-US',
      orientation: 'any',
      scope: '/',
      start_url: '/?utm_source=web_app_manifest',
      icons: [{
        src: path.join(srcPath, 'images', 'avatar.png'),
        sizes: [96, 128, 192, 256, 512],
        destination: 'manifest/'
      }]
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(srcPath, 'images', 'avatar.png'),
      prefix: 'icons-[hash:8]/',
      persistentCache: true,
      inject: true,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        windows: false,
        yandex: false
      }
    }),
    (isDev ? null : new SWPrecacheWebpackPlugin({
      cacheId: 'marvel',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'sw.js',
      minify: !isDev,
      navigateFallback: homepage + '/index.html',
      staticFileGlobsIgnorePatterns: [
        /\.map$/,
        /\.cache$/,
        /\.webapp$/,
        /\.xml$/,
        /\.txt$/,
        /manifest.*\.json$/
      ]
    })),
    new HtmlWebpackPlugin({
      title: 'Marvel',
      chunks: ['main', 'vendor'],
      filename: 'index.html',
      template: 'main.ejs',
      inject: false,
      hash: isDev,
      cache: true,
      chunksSortMode: 'dependency',
      appMountId: 'app',
      mobile: true,
      lang: 'en-US',
      alwaysWriteToDisk: true,
      baseHref: homepage,
      reInlineCss: /inline\.css$/
    }, {
      isDev: isDev
    }),
    (isDev ? new HtmlWebpackHarddiskPlugin() : null),
    extractInlineCss,
    extractMainCss,
    new InlineCSP({ disable: isDev }),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: !isDev
    })
  ].filter(function (item) {
    return item !== null;
  })
};

if (isDev) {
  common.devServer = {
    contentBase: distPath,
    compress: false,
    port: 9000
  };
}

module.exports = [
  common
];
