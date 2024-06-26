import { View } from "react-native-animatable";
import Drawdown from "../../../../components/custom/drawdown/drawdown";

type Props = {
  route: any;
  navigation: any;
};

export default function MiniDrawDown({ route, navigation }: Props) {
  return (
    <View style={{ height: "100%", paddingVertical: 20 }}>
      <Drawdown navigation={navigation} isHorizontal={true} />
    </View>
  );
}
