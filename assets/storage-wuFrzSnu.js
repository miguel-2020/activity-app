const e="activities";function i(){let t=localStorage.getItem(e);return t&&(t=JSON.parse(t)),t}function a(t){localStorage.setItem("activities",JSON.stringify(t))}export{i as r,a as s};
