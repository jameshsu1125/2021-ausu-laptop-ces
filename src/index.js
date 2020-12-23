import React from 'react';
import ReactDOM from 'react-dom';
import Apps from './index/main.js';
import Dom2Json from 'lesca-dom2json';

const data = Dom2Json(document.querySelector('.index'));

ReactDOM.render(<Apps data={data.index} />, document.querySelector('.index'));
