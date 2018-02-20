import { FETCH_POSTS, FETCH_POST } from '../actions/index'
import _ from 'lodash'
import { CREATE_POSTS} from '../actions/index'

export default function(state={},action){
  switch(action.type){
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id')
    case FETCH_POST:
      return {...state,[action.payload.data.id]:action.payload.data}
      // const post = action.payload.data;
      // const newState = {...state };
      // newState[post.id]=post;
      // return newState

      // {4: post}
      // This can be done in lodash method
    //case CREATE_POSTS
    default:
      return state;
  }
}