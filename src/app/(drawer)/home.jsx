import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useAuth } from "../../context/authContext";
import Images from "../../constants/images";
import { useNavigation } from "expo-router";

export default function LionelStatsScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const icons = { ball: "🥅​", asist: "🏃‍♂️", minutesPlayed: "⏱️", matchesPlayed: "⚽​" };

//   const StatCard = ({ title, value, icon }) => (
//     <View style={[styles.statCard]}>
//       <View style={styles.statHeader}>
//         <Text style={styles.statIcon}>{icon}</Text>
//         <Text style={styles.statTitle}>{title}</Text>
//       </View>
//       <Text style={styles.statValue}>{value}</Text>
//     </View>
//   );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Hola, {user.name}</Text>
          <Text style={styles.waveEmoji}>👋</Text>
        </View>
        <Image
          source={user.avatar ? { uri: user.avatar } : Images.avatarDefault}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>

          <View style={[styles.statCard]}>
            <View style={styles.statHeader}>
              <Text style={styles.statIcon}>{icons.ball}</Text>
              <Text style={styles.statTitle}>Goles</Text>
            </View>
            <Text style={styles.statValue}>{user.statistics.goals}</Text>
          </View>

          <View style={[styles.statCard]}>
            <View style={styles.statHeader}>
              <Text style={styles.statIcon}>{icons.asist}</Text>
              <Text style={styles.statTitle}>Asistencias</Text>
            </View>
            <Text style={styles.statValue}>{user.statistics.assists}</Text>
          </View>

        </View>
        <View style={styles.statsRow}>

          <View style={[styles.statCard]}>
            <View style={styles.statHeader}>
              <Text style={styles.statIcon}>{icons.minutesPlayed}</Text>
              <Text style={styles.statTitle}>Minutos</Text>
            </View>
            <Text style={styles.statValue}>{user.statistics.minutesPlayed}</Text>
          </View>

          <View style={[styles.statCard]}>
            <View style={styles.statHeader}>
              <Text style={styles.statIcon}>{icons.matchesPlayed}</Text>
              <Text style={styles.statTitle}>Partidos</Text>
            </View>
            <Text style={styles.statValue}>{user.statistics.matchesPlayed}</Text>
          </View>

        </View>
      </View>

      <TouchableOpacity
        style={styles.viewStatsButton}
        onPress={() => navigation.navigate("profile")}
      >
        <Text style={styles.viewStatsText}>Ver estadísticas</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Image
          source={Images.oneXbet}
          style={{
            width: 330,
            height: 230,
            resizeMode: "contain",
            borderRadius: 20,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#000",
    marginRight: 8,
  },
  waveEmoji: {
    fontSize: 25,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e0e0e0",
  },
  statsContainer: {
    marginBottom: 40,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    width: "47%",
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  statValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  viewStatsButton: {
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 20,
  },
  viewStatsText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    backgroundColor: "#2c2c2c",
    width: "100%",
    borderRadius: 12,
  },
  betwayText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "System",
  },
});
