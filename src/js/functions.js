'use strict';

import '../css/functions.css';

const sayHello = (name) => {
    const h1 = document.createElement('h1');
    h1.innerHTML = `Hello ${name}`;

    document.body.append(h1);
}

// export the module
export { sayHello };