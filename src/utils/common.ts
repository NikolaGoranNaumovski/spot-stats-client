import * as qs from "qs";

const SPOTIFY_CLIENT_ID = "787400c8f51d42a28fc8b56fe54e00fb";
const SPOTIFY_REDIRECT_URI = "https://nikolannaumovski.com/";

export const getSpotifyAuthUrl = () => {
  const scopes = [
    "user-top-read",
    "user-read-email",
    "user-read-recently-played",
    "user-read-private",
  ].join(" ");

  const params = qs.stringify({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: SPOTIFY_REDIRECT_URI,
  });

  console.log({ params });

  return `https://accounts.spotify.com/authorize?${params}`;
};
