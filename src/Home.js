/* eslint-disable no-unused-vars */
import React, { useEffect , useReducer} from 'react';
import { useGlobalContext } from './Context';
import './Home.css';
const Home = () => {
  const { query, searchPost } = useGlobalContext();
  return (
    <nav className='home'>
      <div className='home-div'>
      <h1 className='home-news'>DAILY NEWS</h1>
         <p>Read the trending news</p>
      </div>
        <form onSubmit={(e) => e.preventDefault()} className='search'>
        <input type="text" placeholder='Search Here' value={query} onChange={(e) => searchPost(e.target.value)}/>
        </form>
    </nav>
  )
}

export default Home