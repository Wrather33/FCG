import {store} from './Store/store'
export default function current(){
    return store.getState()
  }