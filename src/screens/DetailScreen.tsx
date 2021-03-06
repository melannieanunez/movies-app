import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  Text,
  Dimensions,
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import { MovieDetails } from '../components';
import useMovieDetails from '../hooks/useMovieDetails';

import { RouteStackParams } from '../navigation/Navigation';

const { height } = Dimensions.get('screen');

interface Props extends StackScreenProps<RouteStackParams, 'Detail'> {}
const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  imageContainer: {
    width: '100%',
    height: height * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.5
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 10
  }
});

const DetailScreen = ({ route, navigation }: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const { loading, cast, movieFull } = useMovieDetails(movie.id);
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image style={styles.image} source={{ uri }} />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
      {loading ? (
        <ActivityIndicator color="grey" />
      ) : (
        <MovieDetails movieFull={movieFull!} cast={cast} />
      )}

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { top }]}>
        <Icon size={60} color="white" name="arrow-back" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailScreen;
