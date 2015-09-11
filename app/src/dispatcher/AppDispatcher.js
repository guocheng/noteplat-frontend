// var Dispatcher = require('flux').Dispatcher;

// module.exports = new Dispatcher();

import {Dispatcher} from 'flux';

const AppDispatcher = new Dispatcher();
export {AppDispatcher};

// const flux = new Dispatcher();

// export function register(callback) {
//     return flux.register(callback);
// }

// export function dispatch(type, action = {}) {
//     if (!type) {
//         throw new Error('You forgot to specify type.');
//     }

//     if (process.env.NODE_ENV !== 'production') {
//         if (action.error) {
//             console.error(type, action);
//         } else {
//             console.log(type, action);
//         }
//     }

//     flux.dispatch({type, ...action});
// }
