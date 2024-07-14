import MobileMenu from './component/navigation/mobileMenu'
import Nav from './component/navigation/nav'
import './css/globals.css'
import '/public/fonts/font.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  return (
    <html>
      <body>
        {children}
        <Nav/>
        <MobileMenu page={0}/>
      </body>
    </html>
  )
}
