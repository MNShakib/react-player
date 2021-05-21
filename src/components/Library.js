import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setSongs, setCurrentSong, libraryStatus, audioRef, isPlaying}) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => 
                    <LibrarySong 
                        audioRef={audioRef} 
                        isPlaying={isPlaying} 
                        songs={songs} song={song}
                        setSongs={setSongs}
                        setCurrentSong={setCurrentSong} 
                        id={song.id} key={song.id}/>
                )}
            </div>
        </div>
    )
}

export default Library;