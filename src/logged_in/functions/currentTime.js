function currentTime() {

  const today = new Date();
  const minute = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
  const hour = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month = today.getMonth()+1 < 10 ? `0${today.getMonth()+1}` : today.getMonth()+1 ;
  const year = today.getFullYear();

  const date = `${year}-${month}-${day}T${hour}:${minute}`;

  return date;
}

export default currentTime;
