import classnames from 'classnames'

import { PaginationType, usePagination, DOTS } from '../../../common/hooks/usePagination'
import { getMultiplesOfTen } from '../../../common/utils/pagination-utils'
import SelectDemo from '../select/select'

import s from './pagination.module.scss'

type PropsType = Omit<PaginationType, 'currentPage'> & {
  className?: string
  totalCount: number
  currentPage: number
  onNextPage: () => void
  onPreviousPage: () => void
  setCurrentPageFunc: (value: string) => void
  totalPages: number
}

const Pagination = (props: PropsType) => {
  const {
    totalCount,
    siblingCount = 1,
    onNextPage,
    onPreviousPage,
    setCurrentPageFunc,
    currentPage,
    pageSize,
    className,
    totalPages,
  } = props

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onNextPage()
  }

  const onPrevious = () => {
    onPreviousPage()
  }

  const getValueFromSelect = (value: string) => setCurrentPageFunc(value)

  let lastPage = paginationRange[paginationRange.length - 1]

  const arr = getMultiplesOfTen(totalPages) ////function for getting the first and each 10th and 100th element

  return (
    <div className={classnames(s.pagination, className)}>
      <ul className={s.pagination__container}>
        <button
          className={classnames(s.pagination__item, {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          <div className={s.arrow__left}> {'<'}</div>
        </button>
        {paginationRange.map((pageNumber: any, i: number) => {
          if (pageNumber === DOTS) {
            return (
              // eslint-disable-next-line react/jsx-key
              <li
                key={i}
                className={`${s.pagination__item} ${s.dots}`} /* "pagination-item dots" */
              >
                &#8230;
              </li>
            )
          }

          return (
            // eslint-disable-next-line react/jsx-key
            <li
              key={pageNumber + 'asd'} ////
              className={
                pageNumber === currentPage
                  ? `${s.pagination__item_selected} ${s.pagination__item}`
                  : s.pagination__item
              }
              onClick={() => setCurrentPageFunc(pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}
        <button
          className={classnames(s.pagination__item, {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
          disabled={currentPage === lastPage}
        >
          <div className={s.arrow__right}> {'>'}</div>
        </button>
      </ul>

      {totalCount > 100 && (
        <div className={s.pagination__select}>
          <p>Показать</p>
          <SelectDemo
            className={s.pagination__select_tab}
            callback={getValueFromSelect}
            items={arr}
          />
          <p>на странице</p>
        </div>
      )}
    </div>
  )
}

export default Pagination
