import React from 'react'
import WeeklyOrder from './WeeklyOrder'
import WeeklySales from './WeeklySales'
import './SaleOrder.css'

export default function SaleOrder() {
  return (
    <div className='charts'>
      <WeeklySales/>
      <WeeklyOrder/>
    </div>
  )
}
