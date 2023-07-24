import React from 'react';
import{ BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import {Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed} from './components';
// The above import statement is made possible because of the index.js file in the components folder.
function App() {
  //Route component explanation
  //<Route path="if you go to this path" element={render this component}/>
  // We can see that only the "/" path has the exact keyword. That is because
  // if we only add the "/" to the path, we can see that all of the paths have
  // a / in them. If we don't add the exact keyword, the router may just see the
  // forward slash / and directly go to the homepage, ignoring anything after the /
  // This can result in incorrect routing. Hence the exact keyword specifies that
  // the router needs to look for just the /
  return (
    <div>
    <BrowserRouter>
      <Box sx={{ backgroundColor: '#000'}}>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Feed/>}/>
          <Route path='/video/:id' element={<VideoDetail/>}/>
          <Route path='/channel/:id' element={<ChannelDetail/>}/>
          <Route path='/search/:searchTerm' element={<SearchFeed/>}/>
        </Routes>
      </Box>
    </BrowserRouter>
    
    </div>
  );
}

export default App;

