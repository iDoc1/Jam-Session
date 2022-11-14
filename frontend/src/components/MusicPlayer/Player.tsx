import React, { useState, useEffect, useRef, useCallback } from 'react'
import { styled, Typography, Slider, Paper, Stack, Box} from '@mui/material'
import { Profile } from '../../types'

import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeMuteIcon from '@mui/icons-material/VolumeMute'

import PauseIcon from '@mui/icons-material/Pause'
import FastRewindIcon from '@mui/icons-material/FastRewind'
import FastForwardIcon from '@mui/icons-material/FastForward'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'


const Div = styled('div')(({theme}) => ({
    width: '100%',
}))

const CustomPaper = styled(Paper) (({theme}) => ({
    backgroundColor: '#4c4c4c',
    padding: theme.spacing(2)
}))

const PSlider:any = styled(Slider)(({theme, ...props}:any) => ({
    color: 'silver',
    height: 2,
    '&:hover': {
        cursor: 'auto'
    },
    '& .MuiSlider-thumb': {
        width: '13px',
        height: '13px',
        display: props.thumbless === 1 ? 'none': 'block'
    }
}))
const loggedProfileString = window.localStorage.getItem('loggedJamSessionProfile');
let profileJSON:Profile = JSON.parse(loggedProfileString? loggedProfileString: '')


let playlist = profileJSON? profileJSON.music_samples.map((x:any) => x.music_file): [];

const Player = () => {
    const audioPlayer = useRef<any>(null);
    const [index, setIndex] = useState(0);

    const [currentSong, setcurrentSong] = useState(playlist? playlist[index]: '');
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(30);
    const [mute, setMute] = useState(false);

    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);
    

    const getCurrentMusic = useCallback(async () => {
        const loggedProfileString = window.localStorage.getItem('loggedJamSessionProfile');
        let profileJSON:Profile = await JSON.parse(loggedProfileString? loggedProfileString: '')
        playlist = profileJSON.music_samples? profileJSON.music_samples.map((x:any) => x.music_file): [];
    },[])

    useEffect(() => { 
        getCurrentMusic();
      if (audioPlayer) {
        audioPlayer.current.volume = volume / 100;
      }

      if (isPlaying){
        setInterval(() => {
            const _duration = Math.floor(audioPlayer?.current?.duration);
            const _elapsed = Math.floor(audioPlayer?.current?.currentTime);
      
            setDuration(_duration);
            setElapsed(_elapsed);
        }, 100)
      }
     

    }, [volume, isPlaying, getCurrentMusic])

    const formatTime = (time:any) => {
        if (time && !isNaN(time)){
            const minutes = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}`: Math.floor(time / 60);
            const seconds = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}`: Math.floor(time % 60);
            
            return `${minutes}:${seconds}`
        }
        else {
            return '00:00'
        }
      }

    const togglePlay = () => {
        if (!playlist) return
        if (!isPlaying) {
            audioPlayer.current.play();
        }
        else {
            audioPlayer.current.pause();
        }
        setIsPlaying(prev => !prev)
    }

    const toggleForward = () => {
      audioPlayer.current.currentTime += 10
    }

    const toggleBackward = () => {
        audioPlayer.current.currentTime -= 10
    }

    const toggleSkipForward = () => {
      if(index >= playlist.length - 1) {
        setIndex(0)
        audioPlayer.current.src = playlist[0]
      }
      else {
        setIndex(prev => prev + 1)
        audioPlayer.current.src = playlist[index+1]
    }
    if (isPlaying) {
        audioPlayer.current.play()
    }
    }

    const toggleSkipBackward = () => {
        if(index > 0) {
            setIndex(prev => prev - 1)
            audioPlayer.current.src = playlist[index-1]
          }
        if (isPlaying) {
            audioPlayer.current.play()
        }
    }
    const VolumeBtns = () => {
      return mute
        ? <VolumeOffIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={()=> setMute(!mute)} />
        : volume <= 20 ? <VolumeMuteIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={()=> setMute(!mute)} />
        : volume <= 75 ? <VolumeDownIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={()=> setMute(!mute)} />
        : <VolumeUpIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={()=> setMute(!mute)} />
    }
    return(
        <Div>
        <audio src={currentSong} ref={audioPlayer} muted={mute} />
        <CustomPaper>   
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>

                <Stack direction='row' spacing={1} 
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <SkipPreviousIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={toggleSkipBackward} />
                    <FastRewindIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={toggleBackward} />
                    {
                        !isPlaying
                        ? <PlayArrowIcon fontSize={'large'} sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={togglePlay} />
                        : <PauseIcon fontSize={'large'} sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={togglePlay} />
                         
                    }
                    

                    <FastForwardIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={toggleForward} />
                    <SkipNextIcon sx={{color: 'silver', '&:hover': {color: 'white'}}} onClick={toggleSkipForward} />
                </Stack>
                <Stack direction='row' spacing={1} 
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                />
            </Box>
            <Stack direction='row' spacing={1} 
                    sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center'
                    }}
            >
                <Typography sx={{color: 'silver'}}>{formatTime(elapsed)}</Typography>
                <PSlider thumbless={1} value={elapsed? elapsed: 0} max={duration? duration: 0}/>
                <Typography sx={{color: 'silver'}}>{formatTime(duration - elapsed)}</Typography>
            </Stack>
            <Stack direction='row' spacing={1} 
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: '25%',
                        alignItems: 'center'
                    }}
                >
                    <VolumeBtns />
                    <PSlider min={0} max={100} value={volume} 
                        onChange={(e:any, v:any) => setVolume(v)}
                    />
                </Stack>
        </CustomPaper>
    </Div>
  )
}

export default Player