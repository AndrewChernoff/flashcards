import Header from './components/ui/header/header'
import Input from './components/ui/input/input'
import SelectDemo from './components/ui/select/select'

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
        name="email"
        isSearch={false}
        type={'text'}
        label={'email'}
        placeholder={'Input'}
        /* error={'false'} */
        isDisabled={true}
      />

      {/* <Card>Card</Card> */}
      <div style={{ position: 'absolute', padding: '10px', width: '300px' }}>
        <SelectDemo />
      </div>

      {/* <CheckboxDemo label={'Label'} id={'nothing'} />

      <EditableSlider value={[25, 75]} /> */}
    </div>
  )
}

export default App
