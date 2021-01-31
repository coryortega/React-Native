# React-Native
ヽ༼◉ل͜◉༽ﾉ

## This project is an improvement on a previous project, [Sound Drip](https://github.com/coryortega/SoundDripFE), and is a work in progress

### TODO:
- [x] Replace current state management (useContext) with Redux
- [x] Get dynamic visualization chart working
- [] Currently handeling auth client-side, need to move code/token exchange server-side
- [x] Bring in DS songs, concatenate them and collectively fetch track data from Spotify
- [] Define more Spotify functionality in api/index (prevTrack, nextTrack, createPlaylist, like/unlike, etc.)
- [x] Set up refresh token functionality when token is about to expire
- [] Swap AsyncStorage with [expo-secure-store](https://docs.expo.io/guides/authentication/#storing-data)
- [] Create linear determinate that hovers above nav
- [] Refactor file structure, put all player components inside ./Components/Player/{components here}
- [] Find a way to have the songs play in order, one after another... maybe create a queue with Spotify? I'm not sure yet
- [] Define SoundDrip as it's own player and set that is the playback device
- [] Upon player initialization, fetch currentPlayback... if it doesn't exist, fetch the last song played and load that into the player 

