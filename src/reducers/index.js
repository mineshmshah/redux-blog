import { combineReducers } from 'redux';
import PostReducer from './reducer_posts'
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  posts: PostReducer,
  //This is essential to get key form correct
  form: formReducer

});

export default rootReducer;
