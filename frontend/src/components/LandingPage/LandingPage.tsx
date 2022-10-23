import JamBand from '../../assets/jamband-cropped.jpg'
import { useState } from 'react';
import './LandingPage.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';

export default function LandingPage() {
    const seekingOptions = [
        'Musician looking for band',
        'Band looking for members'
    ]
    const instrumentOptions = [
        'Vocals',
        'Backup vocals',
        'Guitar',
        'Bass Guitar',
        'Drums',
        'Percussion',
        'Keys',
        'Strings',
        'Woodwinds',
        'Brass'
    ]
    const [seeking, setSeeking] = useState(seekingOptions[0]);
    const [instrument, setInstrument] = useState('');
    const [zipcode, setZipcode] = useState('');
    const onSubmit = () => {
      console.log(seeking, instrument, zipcode)
    }
    return (
        <div className="container">
            <img src={JamBand} alt="" className='landing-image' />
            <h3 className='landing-slogan'>Connect with fellow musicians</h3>
            <div className='landing-inputs'>
                <div>
                    <label htmlFor="seeking">I am</label>
                    <Dropdown options={seekingOptions} className="landing-seeking" onChange={(option)=>{setSeeking(option.value)}} placeholder={seekingOptions[0]}/>
                </div>
                <div>
                    <label htmlFor="instruments">Instrument</label>
                    <Dropdown options={instrumentOptions} className="landing-instrument" onChange={(option)=>{setInstrument(option.value)}} placeholder='Select an instrument'/>
                </div>
                <div>
                    <label htmlFor="zipcode">Zip Code</label>
                    <input type="text" name='zipcode' className='landing-zipcode' onChange={(option) => {setZipcode(option.target.value)}}/>
                </div>
                <button onClick={onSubmit} className="landing-search">
                    Search
                </button>
            </div>
        </div>
    )
}