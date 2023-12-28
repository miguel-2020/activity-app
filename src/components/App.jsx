import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import Spinner from './Spinner';

const Navigation = React.lazy(() => import('./Navigation'));

function App() {
  let ref = useRef(0);
  const { activities, setActivity, loadingState } = useLocalStorage();
  const [show, setShow] = useState(false);

  // controls the scroll to top button
  useEffect(() => {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setShow(true);
        } else {
          setShow(false);
        }
      });
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
  });

  if (loadingState == 'loading') {
    return <Spinner/>
  }

  return (
    <>
      <div className='container'>
        {
          //show or hide scroll top button
          show ? (
            <button
              className='scroll-button'
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 100,
                  behavior: 'smooth',
                });
              }}
            >
              Top
            </button>
          ) : (
            ''
          )
        }

        <header>
          <h1>Daily Activities</h1>
        </header>

        <main>
          <div className='col-left'>
            <h2 ref={ref}>Categories</h2>
            <Navigation activities={activities} setActivity={setActivity} />
          </div>

          <Outlet context={[activities, setActivity]} />
        </main>
      </div>

      <footer>&copy; 2023 Miguel O.</footer>
    </>
  );
}

export default App;
