import { ComponentProps } from 'react'

import classNames from 'classnames'

import s from './table.module.scss'

type RootType = ComponentProps<'table'>

const Root = ({ className, ...rest }: RootType) => {
  const tagClassName = {
    table: classNames(className, s.table),
  }

  return <table className={tagClassName.table} {...rest} />
}

type HeadType = ComponentProps<'thead'>

const Head = ({ className, ...rest }: HeadType) => {
  const tagClassName = {
    table: classNames(className, s.table),
  }

  return <thead className={tagClassName.table} {...rest} />
}

type RowType = ComponentProps<'tr'>

const Row = ({ className, ...rest }: RowType) => {
  const tagClassName = {
    table: classNames(className, s.table),
  }

  return <tr className={tagClassName.table} {...rest} />
}

type HeadCellType = ComponentProps<'th'>

const HeadCell = ({ className, ...rest }: HeadCellType) => {
  return <th className={className} {...rest} />
}

type BodyType = ComponentProps<'tbody'>

const Body = ({ className, ...rest }: BodyType) => {
  const tagClassName = {
    body: classNames(className, s.body),
  }

  return <tbody className={tagClassName.body} {...rest} />
}

type DataCellType = ComponentProps<'td'>

const DataCell = ({ className, ...rest }: DataCellType) => {
  return <td className={className} {...rest} />
}

export const Table = { Root, Head, Row, HeadCell, Body, DataCell }
