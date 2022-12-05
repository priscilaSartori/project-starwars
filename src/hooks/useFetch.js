import { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';

export default function useFetch() {
  const [planetas, setPlanetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setPlanetas(data.results);
      act(() => { setLoading(false); });
    };
    fetchData();
  }, []);

  return { loading, planetas };
}
