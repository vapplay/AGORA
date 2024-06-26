import { ActivityIndicator, Dimensions, View } from "react-native";

import CustomScreen from "../components/custom/CustomScreen";
import { gql, useQuery } from "@apollo/client";
import { FlashList } from "@shopify/flash-list";
import RenderUpcoming from "../components/screenComponets/UpcomingScreen/RenderUpcoming";
import MenuUpciming from "../components/screenComponets/UpcomingScreen/MenuUpciming";
import { CustomCoors } from "../constants/colors";

const UPCOMING_MOVIES = gql`
  query{
    upcommingMovies{
      id
      trailer {
        url
      }
      title
      release_date
      backdrop_path
      overview
      keywords {
        name
      }
    }
  }
`;

const { width } = Dimensions.get("window");

const UpcomingScreen = () => {
  const { data, loading, refetch } = useQuery(UPCOMING_MOVIES, {
    variables: {
      page: 1,
    },
  });

  return (
    <CustomScreen refetch={refetch} loading={loading}>
      <MenuUpciming />

      <FlashList
        focusable
        estimatedItemSize={334}
        scrollEventThrottle={16}
        data={data?.upcommingMovies}
        keyExtractor={(item: { id: string }) => item.id.toString()}
        renderItem={({ item }: any) => {
          return <RenderUpcoming item={item} />;
        }}
      />
    </CustomScreen>
  );
};

export default UpcomingScreen;
