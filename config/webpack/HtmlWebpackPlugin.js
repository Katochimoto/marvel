var fs = require('fs');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (config, options) {
  config = config || {};

  if (!options.isDev) {
    config.minify = {
      minimize: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: false,
      minifyJS: true,
      removeScriptTypeAttributes: true,
      removeStyleTypeAttributes: true
    };
  }

  config.links = [
    {
      rel: 'preconnect',
      href: 'https://gateway.marvel.com:443'
    }
  ];

  config.meta = [
    {
      'http-equiv': 'Content-Security-Policy',
      content: options.isDev ? "default-src 'self' 'unsafe-inline' data: *" :
        "default-src 'self';" +
        "connect-src 'self' https://gateway.marvel.com:443;" +
        "script-src 'self';" +
        "img-src 'self' http://i.annihil.us;" +
        "object-src 'none';" +
        "child-src 'none';" + // deprecated
        "frame-src 'none';" +
        "form-action 'self';" +
        "base-uri " + config.baseHref || '/'
    },
    {
      'http-equiv': 'X-XSS-Protection',
      content: '1;mode=block'
    },
    {
      'http-equiv': 'Strict-Transport-Security',
      content: 'max-age=31536000; includeSubDomains; preload'
    },
    {
      'http-equiv': 'X-Content-Type-Options',
      content: 'nosniff'
    },
    {
      name: 'description',
      content: 'Marvel'
    },
    {
      name: 'google',
      content: 'notranslate'
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes'
    }
  ];

  return new HtmlWebpackPlugin(config);
};
