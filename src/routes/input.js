import React from 'react';

export default function Input ({ label, onChange }) {
  return (
    <div className="mb-4">
      <label>{label}</label>
      <input className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md" type="text" onChange={onChange} />
    </div>
  )
}
