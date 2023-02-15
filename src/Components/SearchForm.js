import { useDispatch, useSelector, getState} from "react-redux"
import { useState, useEffect } from "react"
import { useSearchParams, useParams } from "react-router-dom";
import connectstyles from './ConnectRoom.module.css'
import SeCount from './SeCount'
import current from "../GetStore";
import MaxOfArray from '../MaxOfArray'
function SearchForm(props){
    const opts = useSelector(state => state);

    function myentries(params){
      const obj = {}
      for (const key of params.keys()) {
          obj[key] = params.getAll(key)
      }
      return obj
    }

    function handleSubmit(value, action){
      let params = Object.assign({}, myentries(props.searchParams))
      if(params[action].includes(value)){
        if(params[action].length-1){
        let result = params[action].filter(n => n !== value)
        params[action] = result
        props.setSearchParams(params)
        }
      }
      else{
        params[action].push(value)
        props.setSearchParams(params)
      }
    }
      return (
        <div>
              <p>
              Deck size?
              </p>
              <input type='checkbox' name='decksize' checked={props.searchParams.getAll('size').includes('24')} value={24} onChange={(e)=>{handleSubmit(e.target.value, 'size')}}></input>24
              <input type='checkbox' name='decksize' checked={props.searchParams.getAll('size').includes('36')} value={36} onChange={(e)=>{handleSubmit(e.target.value, 'size')}}></input>36
              <input type='checkbox' name='decksize' checked={props.searchParams.getAll('size').includes('52')} value={52} onChange={(e)=>{handleSubmit(e.target.value, 'size')}}></input>52
              <p>Count of Players?</p>
              <SeCount count={Math.floor(MaxOfArray(props.searchParams.getAll('size'))/6)} changer={props.changer} cnt={props.searchParams.getAll('count')} handleSubmit={handleSubmit}/><br></br>
              <p>
              Type of game?
              </p>
              <input type="checkbox" name="gametype" checked={props.searchParams.getAll('tp').includes('подкидной')} value='подкидной' onChange={(e)=>{handleSubmit(e.target.value, 'tp')}}></input>Подкидной
              <input type="checkbox" name="gametype" checked={props.searchParams.getAll('tp').includes('переводной')} value='переводной' onChange={(e)=>{handleSubmit(e.target.value, 'tp')}}></input>Переводной
        </div>
      );
      //props.changer(SearchSize(e.target.value))//
      //props.changer(SearchType(e.target.value))//

}
export default SearchForm