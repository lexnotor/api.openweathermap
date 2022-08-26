import React from 'react'
import { useState } from 'react'
import './style.css'

const Header = ( {changeVille} ) => {

    const [ville, setVille] = useState('Goma');
    
    return (
        <div className='header'>
            <input
                type="text"
                className='region-input'
                placeholder='Goma'
                value={ville}
                onChange={(e)=> setVille(e.target.value) }
            />

            <button
                className='region-submit'
                onClick={()=>changeVille(ville)}
            >Search</button>
        </div>
    )
}

export default Header