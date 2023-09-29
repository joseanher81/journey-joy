import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from './GeoFeatures';
import { tokens } from "../../../theme";
import { calculateCountryVisits } from "../../../helpers/formatOverviewData";

const GeoMap = ({ isDashboard = false, mapData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if(!mapData) return;
  
  return (
    <ResponsiveChoropleth
      data={mapData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 8]}
      unknownColor="#ffffff"
      label="properties.name"
      valueFormat=".0f"
      projectionScale={isDashboard ? 40 : 250}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.7]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#666666"
    />
  );
};

export default GeoMap;