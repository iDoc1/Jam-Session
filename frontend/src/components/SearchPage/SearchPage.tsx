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
  
  const offset = 10;
  const [pageOffset, setPageOffset] = useState(offset)
  const [pagesButtons, setPagesButtons] = useState<any>([]);
  const [error, setError] = useState('');
  const { state } = useLocation();

  const seekingOptions = [
    'Musician looking for band',
    'Band looking for members'
  ]

  const getPosts =  useCallback(() => {
    const { resJSON, searchParams } = state || {};
    if (resJSON) {
        setPosts(resJSON)
        setSearchParams(searchParams)
        getPages(resJSON.length)
    }
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

  const handleUpdateSearch = async () => {
    if (!zipcode) {
      setError('Zip code is required!')
      setTimeout(() =>{
          setError('');
      }, 4000)
      return
  }
    let url = `/api/posts/?zipcode=${zipcode}&radius=${searchRadius}`
    if (seeking) {
        url += `&seeking=${seeking === seekingOptions[0]? 'musicians': 'bands'}`
    }

    if (instrument) {
        url += `&instrument=${instrument}`
    }
    
    if (genre) {
      url += `&genre=${genre}`
    }
    const res = await fetch( url,{
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`
      }
  })
  const resJSON = await res.json()

  if (res.ok) {
    setPosts(resJSON)
    setSearchParams(`${zipcode} | ${searchRadius} ${searchRadius === '1'? 'mile': 'miles'}`)
    getPages(resJSON.length);
    setPageOffset(offset);
  }

  
  if (res.status === 400) {
      setError(capitalize(resJSON.detail))
      setTimeout(() =>{
          setError('');
      }, 4000)
  }
    
  }

  const getPages = (length:any) => {
    const totalPages = Math.ceil(length / offset);
    const result = [];

    for (let i = 0; i < totalPages; i++) {
      result.push(<button className='number-buttons' key={`page ${i+1}`} onClick={()=> setPageOffset((i+1)*offset)}>{i+1}</button>)
    }

    setPagesButtons(result)
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
      <div className="search-page-buttons">
        <button onClick={()=>setPageOffset(Math.max(10, pageOffset-10))} className='arrow-buttons'>&#8678;</button>
        {pagesButtons.map((page:any) => page)}
        <button onClick={()=>{setPageOffset(pageOffset < posts.length? pageOffset+10: pageOffset)}} className='arrow-buttons'>&#8680;</button>
      </div>
      <div className="search-results">
        <div className="card-view">
          {posts.length > 0? posts.slice(pageOffset-offset, pageOffset).map((post:any) => 
            <React.Fragment key={post.id}>
              <PostCard post={post} />
            </React.Fragment>
          ): <div className='no-results'>No Results Found!</div>}

        </div>
        <div className="search-options">
          <h3>Search Options</h3>
          <div className="search-control">
            <label htmlFor="search-seeking">I am:</label>
            <Dropdown options={seekingOptions} onChange={({value}) => setSeeking(value)}/>
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

          {error? <span className='error-message'>{error}</span>: ''}

          <button className='update-search-button' onClick={handleUpdateSearch}>Search</button>
        </div>
      </div>
    </>
  )
}

export default Search