import './App.css';
import React from 'react';
import axios from 'axios';

function App() {

  const [authors, setAuthors] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("all");
  const [results, setResults] = React.useState([]);
  const [empty, setEmpty] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const buscarResultados = async () => {
    if (authors === "" && title === "") {
      alert("Ambos campos no pueden ser vacíos")
    } else {
      setLoading(true)
      const it = localStorage.getItem(title + " " + authors);
      let response = null;
      if (it){
        response = it;
      } else {
        response = await axios
        .get(
          'https://www.googleapis.com/books/v1/volumes',
          {
            params: {
              q: JSON.stringify(title + " " + authors),
              printType: type
            }
          }
        );
        localStorage.setItem(title + " " + authors, response);
      }
      if (response.data.totalItems > 0) {
        const resultados = response.data.items.map(function (book) {
          return { titulo: book.volumeInfo.title, autores: book.volumeInfo.authors, enlace: book.volumeInfo.infoLink }
        });
        setResults(resultados)
        setEmpty(false)
        setLoading(false)
      } else {
        setEmpty(true)
        setLoading(false)
      }
    }
  }

  return (
    <div className="App">
      <div className="mt-3 mb-3 p-3 bg-dark">
        <h6 className="text-light">Book search</h6>
      </div>
      <div id="inputs">
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="authors" placeholder="Book authors" onChange={e => setAuthors(e.target.value)} />
          <label htmlFor="authors">Book authors</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="title" placeholder="Book title" onChange={e => setTitle(e.target.value)} />
          <label htmlFor="title">Book title</label>
        </div>
        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-secondary" type="button" onClick={() => buscarResultados()}>Search Books</button>
        </div>
        <div className="selectores d-flex justify-content-center mb-5">
          <div className="form-check me-3">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="allRadio" onChange={e => setType("all")} defaultChecked />
            <label className="form-check-label" htmlFor="allRadio">
              All
            </label>
          </div>
          <div className="form-check me-3">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="booksRadio" onChange={e => setType("books")} />
            <label className="form-check-label" htmlFor="booksRadio">
              Books
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="magazinesRadio" onChange={e => setType("magazines")} />
            <label className="form-check-label" htmlFor="magazinesRadio">
              Magazines
            </label>
          </div>
        </div>
      </div>
      <h5 className="mb-3">Results</h5>
      <div id="results">
        {loading ?
          <div className="d-flex justify-content-center mt-3">
            <div className="spinner-border" role="status"></div>
            <span className='ms-3'>Loading results...</span>
          </div>
          :
          !empty ?
            results.map((r, i) =>
              <a href={r.enlace}>
                <div className="card mb-2 p-2" key={i}>
                  <h5 className="card-title">{r.titulo}</h5>
                  <h6 className="autor">{r.autores}</h6>
                  <p className="card-text">{r.enlace}</p>
                </div>
              </a>
            ) :
            <h3>No hay resultados</h3>}

      </div>
    </div>
  );
}

export default App;
