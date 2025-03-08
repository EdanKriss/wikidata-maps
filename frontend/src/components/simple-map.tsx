import { useState, type FunctionComponent } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

import topoJson from "../../public/contryTopo.json";

const coordinates = [
    [-6.2603, 53.3498], // Dublin
    [-8.4751, 51.8985], // Cork
    [-9.0568, 53.2707], // Galway
];

type GeographiesPassedProps = {
    geographies: Array<{
        rsmKey: string;
        // properties depend on the contents of the json file
        properties: {
            name: string; // country name
            code?: string; // country wikidata q code
        };
    }>;
};

export const SimpleMap: FunctionComponent = () => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    return (
        <ComposableMap
            projection="geoMercator"
            style={{ width: "100%", height: "100%" }}
            projectionConfig={{
                scale: 150,
                // center: [-8, 53], // Center on Ireland (approx. lon/lat)
            }}
        >
            {/* Render the countries */}
            <Geographies geography={topoJson}>
                {({ geographies }: GeographiesPassedProps) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#EAEAEC"
                            stroke="#D6D6DA"
                            onClick={(event) => {console.log(geo.properties.name, geo.properties.code)}}
                            style={{
                                // default: { fill: "#06F" },
                                hover: { fill: "#04D" },
                                pressed: { fill: "#02A" },
                            }}
                        />
                    ))
                }
            </Geographies>

            {/* Render custom UI dots */}
            {coordinates.map(([lon, lat], index) => (
                <Marker key={index} coordinates={[lon, lat]}>
                    {/* Custom dot: a red circle with a label */}
                    <circle r={5} fill="red" stroke="#fff" strokeWidth={1} />
                    <text
                        textAnchor="middle"
                        y={-10}
                        style={{ fontSize: "12px", fill: "#000" }}
                    >
                        {`Point ${index + 1}`}
                    </text>
                </Marker>
            ))}
        </ComposableMap>
    );
};
