import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

const NavLink = React.lazy(() => import('./NavLink'));
const Form = React.lazy(() => import('./Form'));

export default function Navigation({ activities, setActivity }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams(pathname);

  const activityLinks = Object.keys(activities);
  const numberOfActivityLinks = activityLinks.length;

  function addLink(name) {
    const existing = activityLinks.find((c) => c == name.toLowerCase());

    if (!existing) {
      localStorage.setItem(
        'activities',
        JSON.stringify({
          ...activities,
          [name]: [],
        })
      );

      setActivity(JSON.parse(localStorage.getItem('activities')));
    }
  }

  function deleteLink(category) {
    const updatedActivities = {};

    for (const [key, value] of Object.entries(activities)) {
      if (key == category) {
        continue;
      }

      updatedActivities[key] = value;
    }

    localStorage.setItem('activities', JSON.stringify(updatedActivities));
    setActivity(updatedActivities);
    navigate('/activity-app',{replace: true});
  }
  return (
    <>
      <nav>
        {numberOfActivityLinks > 0 ? (
          <ul>
            {activityLinks.map((category) => (
              <li key={category} className='nav-item'>
                <NavLink to={category} path={id} />
                <MdDelete onClick={() => deleteLink(category)} />
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}

        <Form callback={addLink} placeholder={'Enter a category'} />
      </nav>
    </>
  );
}
