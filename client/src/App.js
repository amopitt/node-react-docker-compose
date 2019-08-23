import React, {  Suspense, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';


import './App.css';

const App = () => {
  const [people, setPeople] = useState([]);
  const [activePerson, setActivePerson] = useState({});
  const [films, setFilms] = useState([]);
  const [activeFilm, setActiveFilm] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Loading = () => {
    return <Spinner animation="grow" />
  }

 useEffect(() => {
    callSongs().then((resp) => {
      console.log('what is data', resp);
      setPeople(resp.results); 
      setIsLoading(false);
    }); 
  }, []);
 

  const callSongs = async () => { 
    const response = await fetch('/api/songs'); 
    if (response.status !== 200) {
      throw Error(response ? response.message : 'No data');
    } 
    // only proceed once promise is resolved
    return await response.json();  
  }; 

  const getFilms = async (p) => {  
    setActivePerson(p);
    setFilms(p.films); 
    handleShow();
    const response = await fetch(p.films[0]);
    const film = await response.json();
    console.log(film);
    setActiveFilm(film); 
  }
  return (
    <div className="App">
    {isLoading ? <Loading /> :
    
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Birth</th>
          <th>Films</th> 
        </tr>
      </thead>
      <tbody>
        {people.map((p) => {
            return <tr key={p.name}> 
              <td>{p.name}</td>
              <td>{p.birth_year}</td>
              <td><div className='films' onClick={() => getFilms(p)}>Films</div></td> 
            </tr>
          })} 
      </tbody>
    </Table>       
}
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Films: {activePerson.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {isLoading && <Loading />}
      {!isLoading &&
        <>
        {activeFilm.title} <br />
        {activeFilm.opening_crawl} <br />
        Total number of films: {films.length}
        </>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> 
      </Modal.Footer>
    </Modal>
    </div>
  ); 
}
 

export default App;
