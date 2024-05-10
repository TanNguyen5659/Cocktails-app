import React, { useState, useEffect } from 'react';


function useFetchDataAndTable(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });


        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }


        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const jsonData = await response.json();
          setData(jsonData);
          setLoading(false);
        } else {
          const textData = await response.text();
          throw new Error(`Unexpected response: ${textData}`);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Fetch Error:", err);
      }
    };


    fetchData();
  }, [url]);


  if (loading) {
    return <p>Loading...</p>;
  }


  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.body}</td>
            <td>{item.author.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


export default useFetchDataAndTable;
