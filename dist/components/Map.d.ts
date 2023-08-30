import * as React from "react";
import { MapContainerProps } from "react-leaflet";
import "leaflet/dist/leaflet.css";
interface MapElementProps {
    width?: string;
    height?: string;
    minWidth?: string;
    minHeight?: string;
}
declare const Map: React.FunctionComponent<MapElementProps & MapContainerProps>;
export default Map;
