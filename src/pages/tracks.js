import React, {useEffect} from 'react';
import { useQuery, gql } from '@apollo/client';
import TrackCard from '../containers/track-card';
import { Layout, QueryResult } from '../components';

/** TRACKS gql query to retreive all tracks */
export const TRACKS = gql`
  query getTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        name
        photo
      }
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { loading, error, data } = useQuery(TRACKS);

  // Tracking page load events to segment
  useEffect(() => {
    if(!loading && data && data.tracksForHome) {
      window.analytics.page('Track Cards', {
        totalCatstonauts: data.tracksForHome.length
      });
    }

  }, [loading, data]);
  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome?.map((track, index) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
