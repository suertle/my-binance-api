import 'tailwindcss/tailwind.css'
import Layout from 'layouts/layout'

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
