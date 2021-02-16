import { combineReducers } from 'redux';
import canvas from './canvas/reducers';

export default combineReducers<AppRootState>({
    canvas,
})
