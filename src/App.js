import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import Model from "./components/Model";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [lists, setLists] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const fetchPost = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    setLists(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    listTitle: "",
  });
  const idListRef = useRef();
  const handleDialog = (message, isLoading, listTitle) => {
    setDialog({
      message,
      isLoading,
      listTitle,
    });
  };

  const handleDelete = (id) => {
    const index = lists.findIndex((p) => p.id === id);
    handleDialog("Are you sure you want to delete?", true, lists[index].title);
    idListRef.current = id;
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      setLists(lists.filter((p) => p.id !== idListRef.current));
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const userPerPage = 5;
  const pageVisited = pageNumber * userPerPage;
  const displayUsers = lists
    .slice(pageVisited, pageVisited + userPerPage)
    .filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.body}</td>
        <td>{item.title}</td>
        <td>{item.userId}</td>
        <td>
          <button
            className="btn btn-outline-dark"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(lists.length / userPerPage);
  const onPageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="container">
      <h1 className="text-center">Posts</h1>
      <div className="mb-4">
        <input
          className="form-control"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-hover">
        <thead className="text-white bg-dark text-center">
          <tr>
            <td>ID</td>
            <td>Body</td>
            <td>Title</td>
            <td>UserId</td>
            <td></td>
          </tr>
        </thead>
        <tbody>{displayUsers}</tbody>
      </table>
      {dialog.isLoading && (
        <Model
          listTitle={dialog.listTitle}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}
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
