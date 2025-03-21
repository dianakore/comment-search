import React from "react";
import styled from "styled-components";

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
  background-color: #ff206e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

 
   &:hover {
    background-color: #981342;
  }
   
  &:focus {
    outline: 2px solid white; 
}

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  fetchComments: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery, fetchComments }) => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Search comments..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button 
        onClick={fetchComments}
        disabled={query.trim() === ""}>Search</Button>
    </div>
  );
};

export default SearchInput;
