import { Button } from './components/ui/button'
import Card from './components/ui/card/card'
import CheckboxDemo from './components/ui/chekbox/checkbox'
import Header from './components/ui/header/header'
import Input from './components/ui/input/input'
import SelectDemo from './components/ui/select/select'
import EditableSlider from './components/ui/slider/slider'

function App() {
  return (
    <div>
      <Header isAuth={true} />
      {/*  <div>
        <a href={'http://localhost:5173/hello'}>Link</a>
      </div>
      <Button as={'a'} href={'http://localhost:5173/hello'}>
        Link
      </Button> */}
      <Input
        isSearch={true}
        type={'text'}
        label={'Input'}
        placeholder={'Input'}
        error={false}
        isDisabled={true}
      />

      {/* <Card>Card</Card> */}

      <SelectDemo />

      {/* <CheckboxDemo label={'Label'} id={'nothing'} />

      <EditableSlider value={[25, 75]} /> */}
    </div>
  )
}

export default App
