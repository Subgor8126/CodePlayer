import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const VideoDetail = () => {
  // const [videoDetail, setVideoDetail] = useState(
  //   {
  //     snippet: {title: '', channelId: '', channelTitle: ''},
  //     statistics: {viewCount: 0, likeCount: 0}
  //   }
  // );

  const [videoDetail, setVideoDetail] = useState(null);

  // I have initialzed the videoDetail state like this because originally it was set
  // to null and whenever this VideoDetail component loaded, the state was set to null
  // and the code below was trying to destructure the null value even before the videoDetail
  // state received its data object from the useEffect hook below, and that was generating an
  // error, taking the whole webapp down with it.
  // Hence I created somewhat of a dummy object with all of the necessary keys, and set their
  // values to empty string or 0 (depending on what they are originally supposed to be) and let
  // the code destructure the dummy object first so that it doesn't try to destructure the null
  // value and has something to destructure before the actual data object is received and destructured.
  // I can maybe do it with something else like async await or something, but that is sommething to do
  // later. For now this is OK.

  const [videos, setVideos] = useState(null)

  const {id} = useParams();

  // console.log(videoDetail);

  

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]));

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items));
  }, [id]);

  if (!videoDetail?.snippet) return 'Loading...';
  // This also works for the videoDetail null problem I guess :(
  // All of the dummy object thing seems to be a little unnecessary now.
  // This basically returns a loader if videoDetail.snippet doesn't exist currently.
  // Hence it probably prevents the further code from running, or somthing like that.
  // Google it, or ChatGPT it.


  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
    <Stack direction={{ xs: "column", md: "row" }}>
      <Box flex={1}>
        <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
          <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
            {title}
          </Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
            <Link to={`/channel/${channelId}`}>
              <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                {channelTitle}
                <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
              </Typography>
            </Link>
            <Stack direction="row" gap="20px" alignItems="center">
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                {parseInt(likeCount).toLocaleString()} likes
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
        <Videos videos={videos} direction="column" />
      </Box>
    </Stack>
  </Box>
  )
}

// the "controls" keyword in <ReactPlayer /> enables the youtube player 
// on the website to have controls like seek or mute (normal youtube controls).

export default VideoDetail