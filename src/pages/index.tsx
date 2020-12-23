import React, { useEffect, useState } from "react"

export default function Home() {
  const [myData, setData] = useState({ name: "", age: 0 })

  useEffect(() => {
    (async () => {
      console.log("useEffect Called")
      const response = await fetch(`/.netlify/functions/hello`)
      const data = await response.json()
      setData(data)
      console.log("Data = ", JSON.stringify(data))
    })()
  }, [])

  if (!myData.name) {
    return <h2 style={{ textAlign: "center" }}>Loading..!!</h2>
  }

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Hello from Gatsby, Netlify & MongoDB</h1>
      <h2>Name: {myData.name}</h2>
      <h2>Age: {myData.age}</h2>
    </div>
  )
}
