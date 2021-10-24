import { Marker, Popup } from 'react-leaflet';
import React from 'react';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { MarkerType } from '../../services/MapService';

interface IProps {
    markers: MarkerType[];
}

const MarkerList = ({ markers }: IProps) => {
    return (
        <MarkerClusterGroup>
            {markers.map((marker) => {
                return (
                    <Marker position={[marker.position[0], marker.position[1]]} key={marker.popup}>
                        <Popup>{marker.popup}</Popup>
                    </Marker>
                );
            })}
        </MarkerClusterGroup>
    );
};

export default MarkerList;
