import { useEffect, useState } from 'react';

export default function useFetch() {
  const [planetas, setPlanetas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      console.log(data.results);
      setPlanetas(data.results);
    };
    fetchData();
  }, []);

  return { planetas };
}
