import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if(searchTerm){
      navigate(`/search/${searchTerm}`)
      setSearchTerm('');
      // The above code resets the search term to be an empty string.
    }
  }

  return (
    <Paper
     component="form"
     onSubmit={handleSubmit}
     sx={{
        borderRadius:20,
        border:'1px solid #e3e3e3',
        pl:2,
        // pl means padding-left
        boxShadow:'none',
        mr:{ sm:5, md:42 },
        width: '600px',
        
        // sm:5 means that the mr (margin-right) for small devices (sm) would be 5
     }}
    >
        <input
        className="search-bar"
        placeholder="Search..."
        value={searchTerm}
        onChange={(event)=>setSearchTerm(event.target.value)}
        width="500px"
        />
    <IconButton type="submit"
    sx={{
        p:'10px',
        color:'red',
        ml: '200px'
    }}>
        <Search/>
    </IconButton>
    </Paper>
  )
}

export default SearchBar