import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * Hook to save sensitive data to a secured store in app
 *
 * props ={type,key,savingData}
 *
 * type => (save/remove/retrieve)
 *
 * saving data is only if data is saving
 */
const useSecureStore = async (type, key, savingData) => {
  let errorOut = null;
  let dataOut = null;
  switch (type) {
    case 'save':
      try {
        await EncryptedStorage.setItem(key, JSON.stringify(savingData));
      } catch (error) {
        errorOut = error;
      }
      break;

    case 'retrieve':
      try {
        const retrievingData = await EncryptedStorage.getItem(key);

        if (retrievingData) {
          dataOut = retrievingData;
        }
      } catch (error) {
        errorOut = error;
      }
      break;

    case 'remove':
      try {
        await EncryptedStorage.removeItem(key);
      } catch (error) {
        errorOut = error;
      }
      break;

    case 'clear':
      try {
        await EncryptedStorage.clear();
      } catch (error) {
        errorOut = error;
      }
      break;
  }

  return {retrievedData: dataOut, errorOut};
};

export default useSecureStore;
