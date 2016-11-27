import fetch from "fetch";

// const dataService = store => next => action => {
//     switch (action.action.type) {
//         case 'GET_TODO_DATA':
//             request
//                 .get('/todo')
//                 .end((err, res) => {
//                     if (err) {
//                         return next({
//                             type: 'GET_TODO_DATA_ERROR',
//                             err
//                         })
//                     }
//                     const data = JSON.parse(res.text);
//                     next({
//                         type: 'GET_TODO_DATA_RECEIVED',
//                         data
//                     })
//                 });
//             break;
//         default:
//             console.log("Helped");
//             next(action);
//             break;
//     }
//
// };


// returns a function and will be called in the Redux-Thunk middleware
function dataService() {
    return function(dispatch, getState) {
        var state = getState();
        var url = "/todo";
        dispatch({
            type: 'GET_TODO_LOADING'
        });

        return fetch(url)
            .then(function(result) {

                if (result.status === 200) {
                    return result.json();
                }

                throw "request failed";
            })
            .then(function(data) {
                dispatch({
                    type: 'GET_TODO_DATA_RECEIVED',
                    data
                });
            })
            .catch(function(err) {
                dispatch({
                    type: 'GET_TODO_DATA_ERROR',
                    err
                })
            });
    }
}

export default dataService;
