import React from 'react'
import Navbar from '../_components/Navbar/Navbar'

const Sharedlayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}

export default Sharedlayout