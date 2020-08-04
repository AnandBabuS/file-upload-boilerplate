// const path = require('path');

// const clientConfig = {
//   entry: './src/client/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'client.js'
//   },
//   module: {
//     rules: [
//         {
//             test: /\.(js|jsx)$/,
//             use: 'babel-loader',
//             options: {
//                 presets: ['@babel/preset-env', '@babel/preset-react']
//             }
//         },
//         {
//             test: /\.css$/,
//             use: ExtractTextPlugin.extract({
//                 fallback: "style-loader",
//                 use: ["css-loader", "sass-loader"]
//             })
//         }
//     ]
//   },
//   plugins: [
//     new ExtractTextPlugin("styles.css"),
//   ]
// };

// const serverConfig = {
//     entry: './src/server/index.js',
//     output: {
//       path: path.resolve(__dirname, 'dist'),
//       filename: 'server.js'
//     },
//     module: {
//       rules: [
//           {
//               test: /\.(js|jsx)$/,
//               use: 'babel-loader',
//               options: {
//                   presets: ['@babel/preset-env', '@babel/preset-react']
//               }
//           },
//           {
//               test: /\.css$/,
//               use: 'css-loader/locals'
//           }
//       ]
//     }
//   };

// module.exports = [clientConfig, serverConfig]

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin')

const clientConfig = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js'
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: process.env.NODE_ENV === 'development',
                },
              },
              'css-loader',
            ]
        }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({template: './index.html'}) ,
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
  ]
};

module.exports = clientConfig;