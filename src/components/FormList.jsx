import React from 'react';

export default function FormList() {
  return (
      <select name="form">
        <option value='' disabled>Select</option>
        <option>suspension</option>
        <option>tablet</option>
        <option>capsule</option>
        <option>solution</option>
        <option>tsp</option>
        <option>ml</option>
        <option>units</option>
        <option>inhalations</option>
        <option>gtts (drops)</option>
        <option>cream</option>
        <option>ointment</option>
        <option>puff</option>
      </select>
  )
}
