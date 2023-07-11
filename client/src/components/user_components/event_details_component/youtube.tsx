import React from 'react';
import YouTube from 'react-youtube';

type VideoPlayerProps = {
  videoId: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  return (
    <div className='w-full md:w-1/2'>
      <YouTube  videoId={videoId} />
    </div>
  );
};

export default VideoPlayer;
