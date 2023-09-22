import React from 'react'

const General = ({ data }) => {
  return (
    <div>
      {data && <div>
        <ul>
            <ll><label>Name :</label> {data?.name}</ll> <br />
            <ll><label>Email :</label> {data?.email}</ll> <br />
        </ul>
      </div>}
      {!data && <div>
        <label>No Details are avilable</label>
      </div>}
    </div>
  )
}

export default General
