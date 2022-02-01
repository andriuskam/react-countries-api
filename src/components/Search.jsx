import React from 'react';

export default function Search({searchCountries,searchInp}) {
  return(
  <div className='search'>
      <input className="input" type="search" name='search' id='search' placeholder='Search country...' value={searchInp} onChange={(e)=>searchCountries(e.target.value)} />
  </div>
  )
};