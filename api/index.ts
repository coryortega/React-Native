import * as React from 'react';
import SpotifyWebApi from "spotify-web-api-js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';
import { AuthContext } from '../components/context';

// const TOKEN_ENDPOINT = "http://127.0.0.1:5000/token";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export type Device = {
    id: string | null;
    name: string;
    type:
      | "Computer"
      | "Tablet"
      | "Smartphone"
      | "Speaker"
      | "TV"
      | "AVR"
      | "STB"
      | "AudioDongle"
      | "GameConsole"
      | "CastVideo"
      | "CastAudio"
      | "Automobile"
      | "Unknown";
    isActive: boolean;
    isRestricted: boolean;
  };

// export async function fetchToken(code: object) {
//     const headers = {
//         headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         auth: {
//         username: '5d228af4d8fe45d5b1bb9702187643c0',
//         password: '2e64ed63024a402d81fde645767a3680',
//         },
//     };
//     const data = {
//         grant_type: 'client_credentials',
//         code: code,
//         scopes:"streaming user-read-currently-playing user-read-playback-state user-library-read user-library-modify user-modify-playback-state user-read-email user-read-private playlist-modify-public playlist-modify-private"
//     };

//     // try {
//         const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), headers);
//         return await response;
// }

export async function fetchTokenAsync(code: string) {
  const headers = {
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    }
  };
  const data = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: 'http://localhost:19006/',
      client_id: '5d228af4d8fe45d5b1bb9702187643c0',
      client_secret: '2e64ed63024a402d81fde645767a3680',
  };

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), headers)
    return await response;
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
}

  export async function fetchDevicesAsync(): Promise<any> {
    const client = await _getClientAsync();
    const result = await client.getMyDevices();
    return result.devices
      .map(
        (d: typeof result.devices[0]) =>
          ({
            id: d.id,
            name: d.name,
            isActive: d.is_active,
            isRestricted: d.is_restricted,
            type: d.type,
          } as Device)
      )
      .sort((a: Device, b: Device) => (a.isActive && b.isActive ? 0 : -1));
  }

  export async function playTrackAsync({
    uri,
    deviceId,
    time,
  }: {
    uri: string;
    deviceId: string;
    time?: number;
  }) {
    const client = await _getClientAsync();
    return await client.play({
      uris: [uri],
      device_id: deviceId,
      position_ms: time ?? 0,
    });
  }

  export async function pauseAsync(): Promise<void> {
    const client = await _getClientAsync();
    return await client.pause();
  }

  export async function getUsersTopTracks(type: object) {
    const client = await _getClientAsync();
    return client.getMyTopTracks(type);
  }

  async function _getClientAsync() {
    const newToken = await AsyncStorage.getItem('token')
    const client = new SpotifyWebApi();
    client.setAccessToken(newToken);
    return client;
  }
