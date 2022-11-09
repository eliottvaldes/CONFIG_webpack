'use strict';

// import the styles for this component
import '../css/functions.css';

const sayHello = (name) => {

    console.log('Creating h1 element');

    // create and h1 element and insert in the body
    const h1 = document.createElement('h1');
    h1.innerHTML = `Hello ${name}`;

    // insert the h1 element in the body
    document.body.append(h1);

}

// export the module
export { sayHello };