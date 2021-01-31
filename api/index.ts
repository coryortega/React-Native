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
      console.error(err);
  }
}

export async function fetchRefreshTokenAsync(refreshToken: string) {
  const headers = {
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    }
  };
  const data = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: '5d228af4d8fe45d5b1bb9702187643c0',
      client_secret: '2e64ed63024a402d81fde645767a3680',
  };

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), headers)
    return await response;
  } catch (err) {
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
    // deviceId,
    // time,
  }: {
    uri: string;
    // deviceId: string;
    // time?: number;
  }) {
    const client = await _getClientAsync();
    return await client.play({
      uris: [uri],
      // device_id: deviceId,
      // position_ms: time ?? 0,
    });
  }

  const stagingUrl = "http://sounddrip-staging2.us-east-1.elasticbeanstalk.com/request"
  const productionUrl = "http://Sounddrip-prod2.us-east-1.elasticbeanstalk.com/request"

  export function postDSSong() {
    const token = localStorage.getItem('token');
    return axios.post(stagingUrl, {"token": token})
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err)
        return err;
      })
  }

  export async function getTracks(trackIds: any) {
    const client = await _getClientAsync();
    return await client.getTracks([trackIds]);
  }

  export async function pauseAsync(): Promise<void> {
    const client = await _getClientAsync();
    return await client.pause();
  }

  export async function getUsersTopTracks() {
    const client = await _getClientAsync();
    return await client.getMyTopTracks({"limit":50});
  }

  export async function getAudioInfo(trackId: string) {
    const client = await _getClientAsync();
    return client.getAudioFeaturesForTrack(trackId);
  }

  export async function getCurrentPlaybackState() {
    const client = await _getClientAsync();
    return client.getMyCurrentPlaybackState();
  }

  async function _getValidTokenAsync() {
    const newToken = await AsyncStorage.getItem("token");
    const lastRefreshed = await AsyncStorage.getItem("tokenTime");
    const refreshToken = await AsyncStorage.getItem("refresh");
    const currentSeconds = new Date().getTime() / 1000;
    try {
      if (
        //the token expires after 3600 sec, so we check if there's 600
        //seconds left or less, fetch a new token
        currentSeconds > parseInt(lastRefreshed) + 3000
      ) {
        const result = await fetchRefreshTokenAsync(refreshToken);
        await AsyncStorage.setItem("tokenTime", `${currentSeconds}`);
        await AsyncStorage.setItem("token", result?.data.access_token);
        return result?.data.access_token;
      }
    } catch (e) {
      console.log(e);
    }
    return newToken;
  }

  async function _getClientAsync() {
    const token = await _getValidTokenAsync();
    const client = new SpotifyWebApi();
    client.setAccessToken(token);
    return client;
  }
