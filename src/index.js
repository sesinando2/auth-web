import React from 'react';
import {render} from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

// Global CSS
import './index.css';

import Root from './container/Root'

library.add(faStroopwafel);

render(
    <Root/>,
    document.getElementById('root')
);

registerServiceWorker();
