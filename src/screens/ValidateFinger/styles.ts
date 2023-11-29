import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: Dimensions.get('window').height * 0.2, // Adjust the percentage as needed
  },

  containerCapture: {
    height: Dimensions.get('window').height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerTitle: {
    width: 350,
    height: 100,
    borderRadius: 80,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },

  containerShowCamera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: `center`,
  },

  containerCameraView: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: `rgba(173, 216, 230, 0)`,
    position: `absolute`,
    alignSelf: 'center',
    marginTop: '35%',
    alignItems: `center`,
    justifyContent: `center`,
  },

  cameraView: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.3,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'yellow',
    marginLeft: 40,
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    transform: [{ scaleX: 2 }],
  },
});
