import Link from "next/link";

interface PaginationBarPros {
  currentPage: number;
  totalPages: number;
}
const PaginationBar = ({ currentPage, totalPages }: PaginationBarPros) => {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems: JSX.Element[] = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={"?page=" + page}
        key={page}
        className={`btn join-item ${
          page === currentPage ? "btn-active pointer-events-none" : ""
        } `}
      >
        {page}
      </Link>,
    );
  }

  return <div className="join content-center">{numberedPageItems}</div>;
};

export default PaginationBar;
