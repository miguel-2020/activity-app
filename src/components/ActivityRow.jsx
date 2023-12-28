export default function ActivityRow({ activity, callback }) {
  return (
    <li>
      <label className='customCheckbox' htmlFor={activity.id}>
        <input
          type='checkbox'
          name={activity.id}
          id={activity.id}
          checked={activity.completed}
          onChange={(e) => callback(activity.id, e)}
        />

        <span className="title">{activity.title}</span>
        <span className='checkmark'></span>
      </label>
    </li>
  );
}
