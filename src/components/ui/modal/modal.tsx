import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import Card from '../card/card'
import CheckboxDemo from '../chekbox/checkbox'
import Input from '../input/input'
import SelectDemo from '../select/select'

type ModalType = {
  isOpen: boolean
}

const Modal = ({ isOpen }: ModalType) => {
  return (
    /*   <div>
      <Card> */
    /* <h2>asfdfvds</h2> */
    <Dialog.Root open={isOpen} /* onOpenChange={setOpen} */>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <form>
            <SelectDemo
              items={['1', '2', '3', '4', '5']}
              callback={function (value: string): void {
                throw new Error('Function not implemented.')
              }}
            />

            <Input
              isSearch={false}
              name={'input'}
              label={'Input'}
              placeholder={'Input'}
              type={'text'}
              isDisabled={false}
            />
            <Input
              isSearch={false}
              name={'input'}
              label={'Input'}
              placeholder={'Input'}
              type={'text'}
              isDisabled={false}
            />

            <CheckboxDemo
              label={'Check-box'}
              id={'checkbox'}
              checked={false}
              onCheckedChange={function (value: boolean): void {
                throw new Error('Function not implemented.')
              }}
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    /* </Card>
    </div> */
  )
}

export default Modal
