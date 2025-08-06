import { Container, Hr, Img } from '@react-email/components'

export const EmailHeader = () => {
  return (
    <Container
      className='full-width'
      style={{
        backgroundColor: '#ffffff'
      }}
    >
      <Img
        width={125}
        src={`${process.env.APP_URL}/logo.png`}
        alt={`${process.env.APP_NAME} Logo`}
        className="mx-auto"
      />
      <Hr className="border border-solid border-[#eaeaea] mt-[24px] mb-[12px] mx-0 w-full" />
    </Container>
  )
}
