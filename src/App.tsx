import CheckEmail from './components/ui/check-email/check-email'
import Header from './components/ui/header/header'
import Input from './components/ui/input/input'
import { LoginForm } from './components/ui/login-form/login-form'
import SelectDemo from './components/ui/select/select'
import SignUp from './components/ui/sign-up/sign-up'

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
      {/* <Input
        name="email"
        isSearch={false}
        type={'text'}
        label={'email'}
        placeholder={'Input'}
        isDisabled={true}
      /> */}

      {/* <Card>Card</Card> */}
      {/* <div style={{ position: 'absolute', padding: '10px', width: '300px' }}>
        <SelectDemo label={'Select label'} items={['Item 1', 'Item 2', 'Item 3', 'Item 4']} />
      </div> */}

      {/* <CheckboxDemo label={'Label'} id={'nothing'} />

      <EditableSlider value={[25, 75]} /> */}

      {/* <SignUp />
      <LoginForm /> */}
      <CheckEmail />
    </div>
  )
}

export default App
