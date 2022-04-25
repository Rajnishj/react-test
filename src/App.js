import "./App.css";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [lists, setLists] = useState([]);
  const fetchPost = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    setLists(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 10;
  const pageVisited = pageNumber * userPerPage;
  const displayUsers = lists
    .slice(pageVisited, pageVisited + userPerPage)
    .filter((value) => {
      if (searchTerm === "") {
        return value;
      } else if (value.title.includes(searchTerm)) {
        return value;
      }
      return value;
    })
    .map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.body}</td>
        <td>{item.title}</td>
        <td>{item.userId}</td>
      </tr>
    ));

  const pageCount = Math.ceil(lists.length / userPerPage);
  const onPageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="container">
      <h1 className="text-center">Posts</h1>
      <div>
        <input
          className="form-control"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <td>ID</td>
            <td>Body</td>
            <td>Title</td>
            <td>UserId</td>
          </tr>
        </thead>
        <tbody>{displayUsers}</tbody>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={"PaginationBttns"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default App;
