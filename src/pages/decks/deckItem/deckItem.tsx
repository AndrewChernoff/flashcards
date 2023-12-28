import defaultCover from '../../../common/imgs/default-cover.png'
import Delete from '../../../common/svg/delete'
import Edit from '../../../common/svg/edit'
import PlayCircle from '../../../common/svg/play-circle'
import { formatDate } from '../../../common/utils/time-transfering'
import { Table } from '../../../components/ui/table/table'
import s from '../decks.module.scss'

type DeckItemProps = {
  deck: any
  myId: string
  openDeleteDialog: (id: string) => void
  openEditDialog: (id: string) => void
}

const DeckItem = ({ deck, myId, openDeleteDialog, openEditDialog }: DeckItemProps) => {
  const openDeleteDialogHandler = (id: string) => openDeleteDialog(id)
  const openEditDialogHandler = (id: string) => openEditDialog(id)

  return (
    <Table.Row className={s.dataRow} key={deck.id}>
      <Table.DataCell className={s.dataCell}>
        <img className={s.dataCell__img} src={deck.cover || defaultCover} />
      </Table.DataCell>
      <Table.DataCell className={s.dataCell}>{deck.name}</Table.DataCell>
      <Table.DataCell className={s.dataCell}>{deck.cardsCount}</Table.DataCell>
      <Table.DataCell className={s.dataCell}>{formatDate(deck.updated)}</Table.DataCell>
      <Table.DataCell className={`${s.dataCell} ${s.decks__createdBy}`}>
        {deck.author.name}

        <div className={s.decks__createdBy_buttons}>
          <PlayCircle />

          {deck.author.id === myId && (
            <>
              <button onClick={() => openEditDialogHandler(deck.id)}>
                <Edit />
              </button>
              <button onClick={() => openDeleteDialogHandler(deck.id)}>
                <Delete />
              </button>
            </>
          )}
        </div>
      </Table.DataCell>
    </Table.Row>
  )
}

export default DeckItem
