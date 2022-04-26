function Model({ message, onDialog, listTitle }) {
  return (
    <div className="model-box" onClick={() => onDialog(false)}>
      <div className="model-inner" onClick={(e) => e.stopPropagation()}>
        <h3 stlye={{ color: "#111", fontSize: "16px" }}>{message}</h3>
        <h4 stlye={{ color: "#111", fontSize: "16px" }}>{listTitle}</h4>
        <div className="btn-content">
          <button className="btn btn-success" onClick={() => onDialog(true)}>
            Yes
          </button>
          <button
            className="btn btn-warning ms-2"
            onClick={() => onDialog(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
export default Model;
