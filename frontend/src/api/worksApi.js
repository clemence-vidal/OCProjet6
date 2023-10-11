async function getWorks() {
  const response = await fetch(`http://localhost:5678/api/works`);
  const works = await response.json();
  return works;
}

async function getFilter() {
  const response = await fetch(`http://localhost:5678/api/categories`);
  const filters = await response.json();
  return filters;
}
