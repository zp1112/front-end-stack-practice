// If you want to use some of the most recent ES features in your client code,
// like Promises, you need to include the Babel Polyfill in your client code.
// 在节点环境中，您可以自由导入不同的文件，Node将使用您的文件系统解析这些文件。
// 在浏览器中，没有文件系统，因此您的导入指向无处。为了让我们的入口点文件app.js检索它需要的导入树，我们将把整个依赖关系树“捆绑”到一个文件中。 Webpack是一个工具。
import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux-immutable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import dogReducer from './reducers/dog';
import BarkMessage from './containers/barkmessage';
import BarkButton from './containers/barkbutton';

const store = createStore(combineReducers({
  dog: dogReducer
}));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BarkMessage />
      <BarkButton />
    </div>
  </Provider>
  , document.querySelector('.app')
);
