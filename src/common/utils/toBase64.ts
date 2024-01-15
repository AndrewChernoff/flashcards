import { ChangeEvent } from 'react'

import { UseFormSetValue } from 'react-hook-form'

export const onImgChange = (
  ///function for adding images as files and transfering it into base64
  e: ChangeEvent<HTMLInputElement>,
  inputName: string,
  setPreviewCallback: (value: string) => void,
  setValue: UseFormSetValue<any>
) => {
  const file = e.target.files ? e.target.files[0] : null

  if (e.target.files && e.target.files.length) {
    setValue(inputName, e.target.files[0], {
      shouldDirty: true,
      shouldTouch: true,
    })

    if (file && file.size < 4000000) {
      const reader = new FileReader()

      reader.onloadend = () => {
        const file64 = reader.result as string

        setPreviewCallback(file64)
      }
      reader.readAsDataURL(file)
    } else {
      console.error('Error: ', 'Файл слишком большого размера')
    }
  }
}
