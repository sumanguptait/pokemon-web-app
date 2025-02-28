export default async function handler(req, res) {
  const { Id } = req.query;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Id}`);
  const data = await response.json();
  res.status(200).json(data);
}
