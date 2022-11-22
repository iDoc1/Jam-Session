import JamBand from '../../assets/jamband-cropped.jpg'
import { useState, useEffect } from 'react';
import './LandingPage.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';

import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const seekingOptions = [
        'Musician looking for band',
        'Band looking for members'
    ]
    
    const [instrumentOptions, setInstrumentOptions] = useState([]);
    const [seeking, setSeeking] = useState('');
    const [instrument, setInstrument] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [searchRadius, setSearchRadius] = useState('25');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    
    const onSubmit = async () => {
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
        
        const res = await fetch( url,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        })
        const resJSON = await res.json()

        if (res.ok) {
            navigate(`/search`, {state: {resJSON, 'searchParams': `${zipcode} | ${searchRadius} ${searchRadius === '1'? 'mile': 'miles'}`}});
        }

        
        if (res.status === 400) {
            setError(capitalize(resJSON.detail))
            setTimeout(() =>{
                setError('');
            }, 4000)
        }
        
    }

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

      const capitalize = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    
      const uncapitalize = (string: string) => {
          return string.charAt(0).toLowerCase() + string.slice(1)
      }

    useEffect(() => {
      getInstrumentOptions();
    },[])
    return (
        <div className="container">
            <img src={JamBand} alt="" className='landing-image' />
            <h3 className='landing-slogan'>Connect with fellow musicians</h3>
            <div className='landing-inputs'>
                <div>
                    <label htmlFor="seeking">I am:</label>
                    <Dropdown options={seekingOptions} className="landing-seeking" onChange={(option)=>{setSeeking(option.value)}} placeholder={'Select...              '}/>
                </div>
                <div>
                    <label htmlFor="instruments">Instrument:</label>
                    <Dropdown options={instrumentOptions.length > 0? instrumentOptions.map((i:any) => capitalize(i.name)): []} className="landing-instrument" onChange={(option)=>{setInstrument(uncapitalize(option.value))}} placeholder='Select an instrument'/>
                </div>
                <div>
                    <label htmlFor="zipcode">Zip Code: *</label>
                    <input type="text" name='zipcode' className='landing-zipcode' placeholder='e.g., 99999' onChange={(option) => {setZipcode(option.target.value)}}/>
                </div>
                <div >
                    <label htmlFor="search-area">Radius: {searchRadius} {searchRadius === '1'? 'mile': 'miles'}</label>
                    <Dropdown options={['1','5', '10','25','50','75','100']} onChange={({value}) => setSearchRadius(value)} />
                </div>
                <button onClick={onSubmit} className="landing-search">
                    Search
                </button>
            </div>
            <div className="search-error">
                {error? error: ''}
            </div>
        </div>
    )
}