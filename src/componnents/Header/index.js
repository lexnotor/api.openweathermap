import React from 'react'

const Header = () => {

    return (
        <div className='header'>
            <input
                type="text"
                className='region-input'
                placeholder='Goma'
            />

            <button
                className='region-submit'
            >Search</button>
        </div>
    )
}

export default Header