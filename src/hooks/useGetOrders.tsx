import React from 'react'
import { axiosInstance } from '../lib/axios';

export default function useGetOrders() {
  
   const getOrders = async () => {
    try {
        const result = await axiosInstance.get("/order/")
        return result.data
    } catch {}
  };
  
    return  getOrders
}
