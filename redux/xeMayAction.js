import { createAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api_url="http://172.19.200.130:3000/XeMays";

export const addXeMay= createAction('thietbi/addXeMay');
export const cleanXeMay= createAction('thietbi/cleanXeMay');
export const updateXeMay=createAction('thietbi/updateXeMay')

export const fetchXeMay=()=>{
    return async dispatch=>{
        try {
            const response=await fetch(api_url);
            const result=await response.json();
            dispatch(cleanXeMay());
            result.forEach(item => {
                dispatch(addXeMay(item));
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export const addXeMayApi=createAsyncThunk(
    'xeMay/addXeMay',
    async(objXeMay , thunkApi)=>{
        try {
            const response=await fetch(api_url,{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(objXeMay)
            })

            const data=await response.json();
            if (response.ok) {
                return data
            }else{
                const errorData=await response.json();
                return thunkApi.rejectWithValue(errorData);
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const updateXeMayApi=createAsyncThunk(
    'xeMay/updateXeMay',
    async(objXe, thunkApi)=>{
          try {
            const response=await fetch(`${api_url}/${objXe.id}`, {
                method:'PUT',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(objXe)
            })

            const data=await response.json();
            if (response.ok) {
                return data
            }else{
                const dataError=response.json();
                return thunkApi.rejectWithValue(dataError);
            }
          } catch (error) {
            return thunkApi.rejectWithValue(error)
          }
    }
)

export const deleteXeMayApi=createAsyncThunk(
    'xeMay/deleteXeMay',
    async(id, thunkApi)=>{
        try {
            const response=await fetch(`${api_url}/${id}`, {
                method:'DELETE',
            })
            if ( response.ok) {
                return id
            }else{
                const dataError=await response.json();
                return thunkApi.rejectWithValue(dataError);
            }
        } catch (error) {
           return thunkApi.rejectWithValue(error); 
        }
    }
)