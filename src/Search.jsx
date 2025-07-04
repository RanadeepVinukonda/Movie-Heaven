import React from 'react'

 const Search = ({searchTerm , setSearchTerm}) => { 
  return (
    <div className="search">
        <div>
            <img src="/Vector.svg" alt="Search Icon"/>

            <input 
                type="text" 
                placeholder="Search for a movie, tv show, person, etc."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

        </div>
    </div>
  )
}
export default Search