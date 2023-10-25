import classnames from 'classnames'

import { PaginationType, usePagination, DOTS } from '../../../common/hooks/usePagination'
import SelectDemo from '../select/select'
import { Select } from '../select/select.stories'

import s from './pagination.module.scss'

type PropsType = PaginationType & {
  onPageChange: (value: number) => void
  className: string
}

const Pagination = (props: PropsType) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props

  console.log(siblingCount)

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
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const getValueFromSelect = (value: string) => onPageChange(Number(value))

  let lastPage = paginationRange[paginationRange.length - 1]

  //console.log(totalCount)

  //const arr = totalCount.map((el: number) => el.toString())
  const arr = Array.from({ length: totalCount }, (_, index) => index + 1).map((el: any) =>
    String(el)
  )

  return (
    <>
      <ul className={classnames(s.pagination__container, { [className]: className })}>
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
                /* key={i}  */ className={`${s.pagination__item} ${s.dots}`} /* "pagination-item dots" */
              >
                &#8230;
              </li>
            )
          }

          return (
            // eslint-disable-next-line react/jsx-key
            <li
              /*  key={pageNumber} */ ////
              className={
                /* classnames(s.pagination__item, {
              selected: pageNumber === currentPage,
            }) */ pageNumber === currentPage
                  ? `${s.pagination__item_selected} ${s.pagination__item}`
                  : s.pagination__item
              }
              onClick={() => onPageChange(pageNumber)}
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

      <SelectDemo callback={getValueFromSelect} items={arr} label="Label" />
    </>
  )
}

export default Pagination
