import dispatcher from '../Dispatcher';


export const homeAction = function () {
        dispatcher.dispatch({
            type: 'HOME_ACTION'
        })
}
