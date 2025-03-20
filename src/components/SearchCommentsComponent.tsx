import { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";
import { DataComment } from "../types/DataComment";
import styled from "styled-components";
import SearchInput from "./SearchInput";
import SuggestionsList from "./SuggestionsList";
import ResultsList from "./ResultsList";

const API_URL = "https://jsonplaceholder.typicode.com/comments";

const Container = styled.div`
  width: 400px;
  margin: auto;
  font-family: Arial, sans-serif;
`;

const SearchCommentsComponent = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<DataComment[]>([]);
  const [results, setResults] = useState<DataComment[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length < 4) {
      setSuggestions([]);
      return;
    }

    axios.get(API_URL).then(response => {
      const filtered = response.data
        .filter((comment: DataComment) =>
          comment.body.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
        .slice(0, 5);

      setSuggestions(filtered);
    }).catch(() => setError("Errore nel recupero dei dati"));
  }, [debouncedQuery]);

  const fetchComments = async () => {
    if (query.length < 4){
      setResults([]);
      return;

    } 

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL);
      setResults(response.data.filter((comment: DataComment) =>
        comment.body.toLowerCase().includes(query.toLowerCase())
      ));
      setCurrentPage(1);
    } catch {
      setError("Errore nel recupero dei dati");
    } finally {
      setLoading(false);
    }
  };
  
//if input is empty, clear results and suggestions
  useEffect(() => {
    if (query === "") {
      setResults([]);
      setSuggestions([]);
    }
  }, [query]);

  return (
    <Container>
      <h2>Comments search</h2>
      <SearchInput query={query} setQuery={setQuery} fetchComments={fetchComments} />
      <SuggestionsList suggestions={suggestions} setQuery={setQuery}/>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ResultsList 
        results={results} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        resultsPerPage={resultsPerPage} />
    </Container>
  );
};

export default SearchCommentsComponent;
