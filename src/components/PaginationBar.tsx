import Link from "next/link";
import { FcLeft, FcRight } from "react-icons/fc";
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

  return (
    <div>
      <div className="join hidden sm:block">{numberedPageItems}</div>
      <div className="join block sm:hidden">
        {currentPage > 1 && (
          <Link href={"?page=" + (currentPage - 1)} className="btn join-item">
            <FcLeft />
          </Link>
        )}

        <Link href={"?page=" + currentPage} className="btn join-item">
          Page {currentPage}
        </Link>

        {currentPage < totalPages && (
          <Link href={"?page=" + (currentPage + 1)} className="btn join-item">
            <FcRight />
          </Link>
        )}
      </div>
    </div>
  );
};

export default PaginationBar;
