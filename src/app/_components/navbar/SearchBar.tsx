import React from 'react'
const SearchBar = () => {
  return (
    <div>
        <div className="formItem">
            <label>Search Book</label>
            <input type='text' placeholder='search Your book'/>
            <button>submit</button>
        </div>
    </div>
  )
}
export default SearchBar