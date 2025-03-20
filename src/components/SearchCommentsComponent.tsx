import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";
import { DataComment } from "../types/DataComment";
import React from "react";
import styled from "styled-components";

const API_URL = "https://jsonplaceholder.typicode.com/comments";

// Styled Components
const Container = styled.div`
  width: 400px;
  margin: auto;
  font-family: Arial, sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SuggestionsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  background: white;
  position: absolute;
  width: 100%;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ResultsList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
`;

const ResultItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const PaginationContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;


const SearchCommentsComponent = () => {
  const [query, setQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<Array<DataComment>>(new Array<DataComment>());
  const [results, setResults] = React.useState<Array<DataComment>>(new Array<DataComment>());
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const resultsPerPage = 5;

  // Debounce suggestions (typeahead)
  const debouncedQuery = useDebounce(query, 500);

  // SYNCRONOUS DEBOUNCE FETCH
  React.useEffect(() => {
    if (debouncedQuery.length < 4) {
      setSuggestions([]);
      return;
    }

    axios
      .get(API_URL)
      .then((response) => {
        const filtered = response.data
          .filter((comment:DataComment) =>
            comment.body.toLowerCase().includes(debouncedQuery.toLowerCase())
          )
          .slice(0, 5) // only show 5 suggestions
          .map((comment:DataComment) => ({
            body: comment.body,
            email: comment.email,
            id: comment.id,
            name: comment.name,
            postId: comment.postId
          }));

        setSuggestions(filtered);
      })
      .catch(() => setError("Errore nel recupero dei dati"));
  }, [debouncedQuery]);

  // Funzione per la ricerca principale (solo al click)
  const fetchComments = async () => {
    if (query.length < 4) {
      setError("Inserisci almeno 4 caratteri");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL);
      const filteredResults = response.data
        .filter((comment: DataComment) =>
          comment.body.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 20) // Mostriamo massimo 20 risultati
        .map((comment:DataComment) => ({
          name: comment.name,
          email: comment.email,
          body:
            comment.body.length > 64
              ? comment.body.substring(0, 64) + "..."
              : comment.body,
        }));

      setResults(filteredResults);
      setCurrentPage(1);
    } catch (err) {
      setError("Errore nel recupero dei dati");
    } finally {
      setLoading(false);
    }
  };

   // OPTIMIZATION CALCULATE RESULTS ONLY IF CHANGE
   const paginatedResults = React.useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return results.slice(startIndex, startIndex + resultsPerPage);
  }, [results, currentPage]);

  
  const totalPages = Math.ceil(results.length / resultsPerPage);


  console.log("SUGGESTIONS", suggestions);
  console.log("results", results);
  return (
    <Container>
      <h2>Ricerca Commenti</h2>
      <Input
        type="text"
        placeholder="Cerca nei commenti..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={fetchComments}>Cerca</Button>

      {/* Mostra suggerimenti mentre si digita */}
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((comment, index) => (
            <SuggestionItem key={index}>
              <strong>{comment.body}</strong> ({comment.email})
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Caricamento...</p>}

      {/* Mostra i risultati della ricerca */}
      <ResultsList>
        {paginatedResults.map((comment, index) => (
          <ResultItem key={index}>
            <strong>{comment.name}</strong> ({comment.email})
            <p>{comment.body}</p>
          </ResultItem>
        ))}
      </ResultsList>

      {/* Controlli di paginazione */}
      {totalPages > 1 && (
        <PaginationContainer>
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ⬅️ Indietro
          </Button>
          <span> Pagina {currentPage} di {totalPages} </span>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Avanti ➡️
          </Button>
        </PaginationContainer>
      )}
    </Container>
  );
};

export default SearchCommentsComponent;
