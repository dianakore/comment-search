import React from "react";
import styled from "styled-components";
import { DataComment } from "../types/DataComment";

// Il container della lista ha una larghezza dinamica (uguale all'input)
const SuggestionsWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SuggestionsContainer = styled.ul<{ visible: boolean }>`
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
  display: ${({ visible }) => (visible ? "block" : "none")};
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

interface SuggestionsListProps {
    suggestions: DataComment[];
    setQuery: (query: string) => void;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({ suggestions,  setQuery }) => {

    const [visible, setVisible] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setVisible(suggestions.length > 0);
      }, [suggestions]);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setVisible(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

      const handleSelect = (suggestion: DataComment) => {
        setQuery(suggestion.body); // Imposta il valore dell'input
        setVisible(false); // Nasconde i suggerimenti
      };
    
    

  return (
    <SuggestionsWrapper ref={containerRef}>
    <SuggestionsContainer visible={visible}>
      {suggestions.map((comment, index) => (
        <SuggestionItem key={index} onClick={() => handleSelect(comment)}>
          <strong>{comment.body}</strong>
        </SuggestionItem>
      ))}
    </SuggestionsContainer>
    </SuggestionsWrapper>
  );
};

export default SuggestionsList;
