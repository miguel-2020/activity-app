import { useEffect, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';

import { BiSolidError } from 'react-icons/bi';

export default function Form({ placeholder, callback }) {
  const [error, setError] = useState(false);
  //only letters and numbers are allow in this regex
  const regex = /^(?:\s*[a-zA-Z]+\s*[a-zA-Z0-9]+\s*)+$/g;

  useEffect(() => {
    let id = null;

    // clear the error message after 10 seconds
    if (error) {
      setTimeout(() => setError(false), 10000);
    }

    //clear the timer if component is destroy
    return () => clearTimeout(id);
  });

  function validateInput(e) {
    e.preventDefault();
    const name = e.target?.name.value;

    if (!name || !regex.test(name)) {
      setError(true);
    } else {
      // pass the name value to the function that needs the input
      callback(name);
      if (error) {
        setError(false);
      }

      // clear the form input field(s)
      e.target.reset();
    }
  }
  return (
    <form className='form' onSubmit={validateInput}>
      <input type='text' name='name' id='name' placeholder={placeholder} />
      <button type='submit'>
        <IoAddCircleOutline />
      </button>

      {error ? (
        <p className='error'>
          <small>
            {<BiSolidError />}Must start with letters. Combinations of letters and numbers are
            allow.
          </small>
        </p>
      ) : (
        ''
      )}
    </form>
  );
}
