import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useLocation, useParams, useOutletContext } from 'react-router-dom';
import { BiSolidError } from 'react-icons/bi';

import { saveTolocalStorage } from '../storage';
import unSlugifyUrl from '../unSlugifyUrl';


const ActivityRow = React.lazy(() => import('./ActivityRow'));
const Form = React.lazy(() => import('./Form'));

export default function Activity() {
  const location = useLocation();
  let { id } = useParams(location.pathname);

  id = unSlugifyUrl(id)
  const [activities, setActivity] = useOutletContext();

  const currentActivities = activities[id];

  let number_of_activities_remaining = 0;

  if (typeof currentActivities == 'undefined') {
    return (
      <>
        <div className='activity-error'>
          <BiSolidError />
          <h2>Invalid Category</h2>
        </div>
      </>
    );
  } else {
    number_of_activities_remaining = currentActivities.filter((activity) => !activity.completed)
      .length;
  }

  //functions

  function addActivity(name) {
    const newActivity = {
      id: uuidv4(),
      title: name,
      completed: false,
    };

    const updatedActivities = {
      ...activities,
      [id]: [...currentActivities, newActivity],
    };

    saveTolocalStorage(updatedActivities);

    setActivity(updatedActivities);
  }

  function toggleCompletion(activityId, event) {
    let updatedActivities = currentActivities.map((activity) => {
      if (activity.id == activityId) {
        return {
          ...activity,
          completed: event.target.checked,
        };
      }

      return activity;
    });

    updatedActivities = {
      ...activities,
      [id]: updatedActivities,
    };

    saveTolocalStorage(updatedActivities);

    setActivity(updatedActivities);
  }

  /**
   * Remove all completed tasks for the current activity category
   */
  function removeCompletedActivities() {
    let updatedActivities = currentActivities.filter(({ completed }) => {
      return !completed;
    });

    updatedActivities = {
      ...activities,
      [id]: updatedActivities,
    };
    saveTolocalStorage(updatedActivities);

    setActivity(updatedActivities);
  }

  /**
   * clear all task for the current activity category
   */
  function clearAllTasks() {
    const updatedActivities = {
      ...activities,
      [id]: [],
    };
    saveTolocalStorage(updatedActivities);

    setActivity(updatedActivities);
  }

  return (
    <>
      <div className='col-right'>
        <div className='header'>
          <h2>{id}</h2>
          <p>
            <span>{number_of_activities_remaining}</span>
            <span>activity remaining</span>
          </p>
        </div>
        <hr />

        <ul className='activity-list'>
          {currentActivities.length > 0
            ? currentActivities.map((activity) => (
                <ActivityRow activity={activity} key={activity.id} callback={toggleCompletion} />
              ))
            : ''}
        </ul>

        <Form placeholder={'Enter a new activity'} callback={addActivity} />
        <div className='footer'>
          <button className='remove-completed-tasks' onClick={removeCompletedActivities}>
            Remove completed Tasks
          </button>
          <button className='delete-list' onClick={clearAllTasks}>
            Delete entire list
          </button>
        </div>
      </div>
    </>
  );
}
