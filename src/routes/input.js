import React from 'react';

export default function Input ({id, label, onChange }) {
  return (
    <div className="mb-4">
      <label>{label}</label>
      <input id={id} className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md" type="text" onChange={onChange} required/>
    </div>
  )
}
