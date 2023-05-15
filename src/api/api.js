export async function fetchCat(id) {
  const response = await fetch('https://reqres.in/api/users?page=2');
  const jsonData = await response.json();
  return jsonData.data[id];
}