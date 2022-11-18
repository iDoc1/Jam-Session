import './IndividualPostPage.css'

import React from 'react'

function IndividualPostPage() {
  return (
    <div className='content-container'>
        <div className="post-banner">
            <h2>Drummer looking for casual group</h2>
            <div className="post-name-location">
                <h2>Nick Bowden</h2>
                <h4><span className='normal-weight'>Sequim, WA 98382</span></h4>
            </div>
        </div>
        <hr />
        <div className="post-content">
            <div className="post-genres-instruments">
                <h4>Genres: <span className='normal-weight'>Rock, Jazz, Hip-hop</span></h4>
                <h4>Instruments: <span className='normal-weight'>Drums, Guitar, Bass guitar</span></h4>
            </div>
            <div className="post-content-body">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum aspernatur esse 
                dolore maxime asperiores? Quibusdam in a sunt laboriosam rerum saepe aspernatur expedita 
                consequuntur pariatur. Eaque dolore, veritatis totam ab quibusdam nam officia architecto, 
                laudantium facere eos nulla officiis eum fugit. Facere laudantium, consectetur perferendis 
                ipsum nihil praesentium laborum sequi.
                <br/>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum aspernatur esse 
                dolore maxime asperiores? Quibusdam in a sunt laboriosam rerum saepe aspernatur expedita 
                consequuntur pariatur. Eaque dolore, veritatis totam ab quibusdam nam officia architecto, 
                laudantium facere eos nulla officiis eum fugit. Facere laudantium, consectetur perferendis 
                ipsum nihil praesentium laborum sequi.
                
                </p>
            </div>
            <div className="comments">
                <h3>Comments</h3>
                <hr />
                <textarea name="" id="" cols={30} rows={3}></textarea>
                <button className="post-comment">Post</button>
            </div>
        </div>
    </div>
  )
}

export default IndividualPostPage