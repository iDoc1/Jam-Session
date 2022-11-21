import React, { useEffect, useState, useCallback } from 'react'
import './SearchPage.css'
import Dropdown from 'react-dropdown'
import PostCard from '../PostCard/PostCard'
import { useLocation } from 'react-router-dom'



const Search = () => {
  const [instrumentOptions, setInstrumentOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [seeking, setSeeking] = useState('');
  const [genre, setGenre] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [instrument, setInstrument] = useState('');
  const [searchRadius, setSearchRadius] = useState('25');
  const [searchParams, setSearchParams] = useState('');
  const [posts, setPosts] = useState<any>([]);
  const { state } = useLocation();

  const getPosts =  useCallback(() => {
    const { resJSON, searchParams } = state || {};
    if (resJSON) {
        setPosts(resJSON)
        setSearchParams(searchParams)
    }
    console.log('search results posts: ', resJSON)
  },[state])

  const getInstrumentOptions = async () => {
    const res = await fetch('/api/instruments/', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`
        }
      });
    const resJSON = await res.json();
    setInstrumentOptions(resJSON);
  }

  const getGenreOptions = async () => {
    const res = await fetch('/api/genres/', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`
        }
      });
    const resJSON = await res.json();
    setGenreOptions(resJSON);
  }

  const capitalize = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

  const uncapitalize = (string: string) => {
      return string.charAt(0).toLowerCase() + string.slice(1)
  }

  useEffect(() => {
    getInstrumentOptions();
    getGenreOptions();
    getPosts()
  },[getPosts])

  return (
    <>
      <div className='search-banner'>
          <h2>Search Results</h2>
          <span>{searchParams? searchParams: ''}</span>
      </div>
      <div className="search-results">
        <div className="card-view">
          {posts.length > 0? posts.map((post:any) => 
            <React.Fragment key={post.id}>
              <PostCard post={post} />
            </React.Fragment>
          ): <div className='no-results'>No Results Found!</div>}

        </div>
        <div className="search-options">
          <h3>Search Options</h3>
          <div className="search-control">
            <label htmlFor="search-seeking">I'm Looking For:</label>
            <Dropdown options={['Musicians', 'Band to Join']} onChange={({value}) => setSeeking(uncapitalize(value))}/>
          </div>
          <div className="search-control">
            <label htmlFor="search-seeking">Genre:</label>
            <Dropdown options={genreOptions? genreOptions.map((i:any) => capitalize(i.genre)): []} onChange={({value}) => setGenre(uncapitalize(value))}/>
          </div>
          <div className="search-control">
            <label htmlFor="search-instruments">Instrument:</label>
            <Dropdown options={instrumentOptions? instrumentOptions.map((i:any) => capitalize(i.name)): []} onChange={({value}) => setInstrument(uncapitalize(value))}/>
          </div>
          <div className="search-control">
            <label htmlFor="search-zipcode">Zip Code:</label>
            <input type="text" placeholder='e.g., 99999' onChange={(event) => setZipcode(event.target.value)}/>
          </div>
          <div className="search-control">
            <label htmlFor="search-area">Radius: {searchRadius} {searchRadius === '1'? 'mile': 'miles'}</label>
            <Dropdown options={['1','5', '10','25','50','75','100']} onChange={({value}) => setSearchRadius(value)} />
          </div>
          <button className='update-search-button' onClick={() => console.log(posts)}>Update Search</button>
        </div>
      </div>
    </>
  )
}

export default Search