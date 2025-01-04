import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [locations, setLocations] = useState([]);
  const [filterCategory, setFilterCategory] = useState('')

  const fetchAllLocations = () => {
    fetch('http://localhost:8080/api/locations')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error('Error: ', err));
  }

  const handleFilterClick = () => {
    if(!filterCategory.trim()) {
      alert('Please enter a ctegory before filtering!');
      return;
    }

    fetch(`http://localhost:8080/api/locations/category?category=${filterCategory}`)
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error('Error filtering locations: ', err));
  }

  const handleClearClick = () => {
    setFilterCategory('');
    fetchAllLocations(); //revert it back to the full list
  }

  useEffect(() => {
    fetchAllLocations();
  }, [])

  return (
    <>
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
        <header style={{ padding: '1rem', background: '#eee', marginBottom: '1rem' }}>
          <h1>Local Adventure Finder</h1>
        </header>
        <main style={{ padding: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <input 
              type="text" 
              placeholder='Enter category (e.g. hiking)'
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style = {{ marginRight: '0.5rem', padding: '0.3rem' }}
            />
            <button onClick={handleFilterClick} style={{padding: '0.3rem 0.6rem'}}>
              Filter
            </button>
            <button onClick={handleClearClick} style={{padding: '0.3rem 0.6rem', marginLeft: '0.5rem'}}>
              Clear
            </button>
          </div>
          <h2>Discover Adventures Near You</h2>
          {locations.length === 0 ? (
            <p>No adventures yet - try adding some via Postman!</p>
          ) : (
            <ul style={{ listStyleType: '-moz-initial', paddingLeft: 0}}>
              {locations.map(loc => (
                <li key={loc.id} style={{ margin: '0.5rem 0', borderBottom: '1px solid #ccc'}}>
                  <strong>{loc.name}</strong> - {loc.category}
                  <br />
                  <span style={{ fontSize: '0.9rem', color: '#555'}}>
                    Coordinates: {loc.latitude}, {loc.longitude}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  )
}

export default App
