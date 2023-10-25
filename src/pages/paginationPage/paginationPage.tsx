import { useState } from 'react'

import Pagination from '../../components/ui/pagination/pagination'

import s from './paginationPage.module.scss'

function PaginationPage() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={1000}
        pageSize={10}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>
  )
}

export default PaginationPage
