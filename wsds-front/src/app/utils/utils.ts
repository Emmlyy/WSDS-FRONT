export function generateObjectId() : string{
  const date = new Date();
  const dateString = date.getFullYear().toString() +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2) +
    date.getHours() + '-' +
    ('0' + date.getMinutes()).slice(-2) +
    date.getSeconds() + '-';

  return dateString + uuidv4();
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const formatDate = (fecha: string) => {
  if (fecha === ""){
    return ""
  }
  const dateObj: Date = new Date(fecha);

  const year: number = dateObj.getFullYear();
  const month: number = dateObj.getMonth() + 1;
  const day: number = dateObj.getDate();
  const formattedDate: string = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return formattedDate;
}
