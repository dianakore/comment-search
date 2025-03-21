import React from "react";
import styled from "styled-components";
import { DataComment } from "../types/DataComment";

const ResultsContainer = styled.ul`
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

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: #ff206e;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

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

interface ResultsListProps {
    results: DataComment[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    resultsPerPage: number;
}

const ResultsList: React.FC<ResultsListProps> = ({
    results,
    currentPage,
    setCurrentPage,
    resultsPerPage
}) => {
    const totalPages: number = Math.ceil(results.length / resultsPerPage);
    const startIndex: number = (currentPage - 1) * resultsPerPage;
    const paginatedResults: Array<DataComment> = results.slice(startIndex, startIndex + resultsPerPage);

    return (
        <>
            <ResultsContainer>
                {paginatedResults.map((comment) => (
                    <ResultItem key={comment.id}>
                        <strong>{comment.name}</strong> ({comment.email})
                        <p>{comment.body}</p>
                    </ResultItem>
                ))}
            </ResultsContainer>

            {totalPages > 1 && (
                <PaginationContainer>
                    <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        ⬅ Back
                    </Button>
                    <span> Page {currentPage} di {totalPages} </span>
                    <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next ➡
                    </Button>
                </PaginationContainer>
            )}
        </>
    );
};

export default ResultsList;
