import { useState, useEffect} from 'react';
import { retriveActivities } from '../storage';
import { errorWrapper } from '../errorHelpers';



export default function useLocalStorage() {
  const [activities, setActivity] = useState({});
  const [loadingState, setLoadingState] = useState('loading');

  useEffect(() => {
    if (localStorage) {
      // retrive all activities
      const categories = errorWrapper(retriveActivities);

      if (categories && Object.keys(categories).length > 0) {
        setActivity(categories);
      }

      setLoadingState('loaded');
    } else {
      loadingState('error');
    }
  },[]);



  return {activities, setActivity, loadingState };
}





