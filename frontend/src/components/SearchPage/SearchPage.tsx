import React, { useEffect, useState } from 'react'
import './SearchPage.css'
import Dropdown from 'react-dropdown'



const Search = () => {
  const [instrumentOptions, setInstrumentOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [seeking, setSeeking] = useState('');
  const [genre, setGenre] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [instrument, setInstrument] = useState('');
  const [searchRadius, setSearchRadius] = useState(25);



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
  },[])

  return (
    <>
      <div className='search-banner'>
          <h2>Search Results</h2>
          <span>99999 | 50 mi</span>
      </div>
      <div className="search-results">
        <div className="card-placeholder">
          card
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
            <label htmlFor="search-zipcode">Location</label>
            <input type="text" placeholder='Zip Code' onChange={(event) => setZipcode(event.target.value)}/>
          </div>
          <div className="search-control">
            <label htmlFor="search-area">Radius: {searchRadius} Miles</label>
            <Dropdown options={['1','5', '10','25','50','75','100']} onChange={({value}) => setSearchRadius(parseInt(value))} />
          </div>
          <button className='update-search-button' onClick={() => console.log(seeking, genre, instrument, zipcode, searchRadius)}>Update Search</button>
        </div>
      </div>
    </>
  )
}

export default Search