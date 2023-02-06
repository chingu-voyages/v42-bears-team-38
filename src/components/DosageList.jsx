import React from 'react';

export default function DosageList() {
  return (
      <select name="dosage">
        <option value='' disabled>Select</option>
        <option>mg</option>
        <option>mb/1cc</option>
        <option>mg/2cc</option>
        <option>mg/3cc</option>
        <option>mg/4cc</option>
        <option>mg/5cc</option>
        <option>mcg</option>
        <option>grams</option>
        <option>mL</option>
      </select>
  )
}
