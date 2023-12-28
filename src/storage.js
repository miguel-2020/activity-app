const key = 'activities';

export function retriveActivities() {
  let items = localStorage.getItem(key);

  if (items) {
    items = JSON.parse(items);
  }

  return items;
}

export function saveTolocalStorage(activities){
  localStorage.setItem("activities",JSON.stringify(activities))

}

