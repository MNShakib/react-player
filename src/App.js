import React, { useState, useRef } from 'react';
//Import Styles
import './styles/app.scss';
//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
//Import Util
import data from './data';

function App() {
  //Ref
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] =useState(data());
  const [currentSong, setCurrentSong] =useState(songs[0]);
  const [isPlaying, setIsPlaying] =useState(false);
  const [songInfo, setSongInfo] =useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) => {
    const current  =  e.target.currentTime;
    const duration  =  e.target.duration;
    //calculate percentage = Math.round(current)
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration)*100);
    
    setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation});
  };
  const songEndedHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav  libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} />
      <Player songs={songs} setSongs={setSongs} audioRef={audioRef} setIsPlaying={setIsPlaying} isPlaying={isPlaying} songInfo={songInfo} setSongInfo={setSongInfo} currentSong={currentSong} setCurrentSong={setCurrentSong}/>
      <Library libraryStatus={libraryStatus} audioRef={audioRef} isPlaying={isPlaying} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} />
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} onEnded={songEndedHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
