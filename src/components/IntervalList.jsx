import React from 'react';

export default function IntervalList() {
  return (
     <select name="interval">
      <option value='' disabled>Select</option>
      <option>b.i.d.</option>
      <option>t.i.d.</option>
      <option>q.i.d.</option>
      <option>q.3h</option>
      <option>q.4h</option>
      <option>q.5h</option>
      <option>q.6h</option>
      <option>q.8h</option>
      <option>q.d.</option>
      <option>a.c.</option>
      <option>p.c.</option>
      <option>a.m.</option>
      <option>p.m.</option>
      <option>ante</option>
      <option>h</option>
      <option>h.s.</option>
      <option>p.r.n.</option>
      <option>stat</option>
      <option>Weekly</option>
      <option>Monthly</option>
    </select>
  )
}
