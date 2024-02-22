import "./Pagination.css";

function Pagination({  goToPreviousPage, goToNextPage, currentPage, totalPages}) {
    return (
    <div className="pagination">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    &lt;
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                &gt;
                </button>
            </div>
    )
}

export default Pagination;