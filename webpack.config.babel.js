// We need this file to export stuff for Webpack to read. output.filename is the name of the bundle
// we want to generate. devtool: 'source-map' will enable source maps for a better debugging
// experience in your browser. In module.loaders, we have a test, which is the JavaScript regex
// that will be used to test which files should be processed by the babel-loader. Since we will
// use both .js files and .jsx files (for React) in the next chapters, we have the following
// regex: /\.jsx?$/. The node_modules folder is excluded because there is no transpilation to do
// there.This way, when your code imports packages located in node_modules, Babel doesn't bother
// processing those files, which reduces build time. The resolve part is to tell Webpack what kind
// of file we want to be able to import in our code using extension-less paths like import Foo
// from './foo' where foo could be foo.js or foo.jsx for instance.
export default {
  output: {
    filename: 'client-bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
