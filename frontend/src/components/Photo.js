import React from 'react'

function Photo(props) {
    console.log(props)
  return (
    <div>{props.photo}</div>
  )
}

export default Photo