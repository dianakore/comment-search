# Comment Search App

## Description
This application allows users to search for comments through the public JSONPlaceholder API.

Users can enter text in the search bar to find comments containing that text. The system displays suggestions while typing (typeahead) and includes pagination to navigate through the results.

The application runs inside a Docker container and can be started following the instructions below.

---

## **Technologies Used**
- **React + TypeScript**
- **Styled Components** for styling
- **Axios** for API calls
- **Vitest** for testing
- **Docker** for containerization

---

## **Installation and Setup**
### **1. Clone the repository**
```sh
git clone <REPO_URL>
cd comment-search
```

### **2. Install dependencies**
```sh
npm install
```

### **3. Start the development server**
```sh
npm run dev
```
The app will be available at `http://localhost:5173/`.

---

## **Running with Docker**
### **1. Build the Docker image**
```sh
docker build -t comment_search:latest .
```

### **2. Run the container**
```sh
docker run -p 8080:8080 comment_search:latest
```
The app will be available at `http://localhost:8080/`.

---

## **Testing**
### **Run unit tests with Vitest**
```sh
npm test
```
If using Docker, run:
```sh
docker exec -it <CONTAINER_ID> sh -c "npm test"
```

---

## **Implemented Features**
✅ Search comments from a public API
✅ Display up to 20 results with **name, email**, and **body (truncated to 64 characters)**
✅ Search is triggered only when clicking the button
✅ Search is only performed with at least **4 characters** (showing an error message if needed)
✅ Real-time suggestions with debounce (Typeahead)
✅ Pagination for results
✅ Unit tests with **Vitest and Testing Library**

---

## **Author**
Diana Lazzarin

