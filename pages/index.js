import Head from 'next/head'

export async function getStaticProps() {
  return {
    props: {
      host: process.env.DB_HOST || '127.0.0.1'
    },
  }
}

export default function Home(props) {
  function handleFetch() {
    fetch('/api/v3/exchangeInfo?ssss=2222&total=sum')
    .then(response => {
      return response.json()
    })
    .then(response => {
      console.log(response)
    })
  }

  return (
    <>
      <div>Home Page</div>
      <div className="py-2">
        <button className="rounded-full px-4 py-1 bg-black hover:bg-yellow-300 hover:text-black" onClick={handleFetch}>Test Fetch</button>
      </div>
    < />
  )
}
