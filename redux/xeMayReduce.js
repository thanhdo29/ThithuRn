import { createReducer } from "@reduxjs/toolkit";
import { addXeMay, addXeMayApi, cleanXeMay, deleteXeMayApi, updateXeMayApi } from "./xeMayAction";

const initialState={xemays:[]};

const xeMayReduce=createReducer(initialState, (builde)=>{
    builde
        .addCase(addXeMay, (state, action)=>{
            state.xemays.push(action.payload);
        })
        .addCase(cleanXeMay, (state,action)=>{
            state.xemays=[];
        })

    builde
        .addCase(addXeMayApi.fulfilled, (state, action)=>{
            state.xemays.push(action.payload)
        })
    
    builde
        .addCase(updateXeMayApi.fulfilled, (state,action)=>{
            const{id, ten_xe, mau_sac, gia_ban, mo_ta, hinh_anh}=action.payload;
            const xeMay=state.xemays.find(item=>item.id===id);
            if (xeMay) {
                xeMay.ten_xe=ten_xe,
                xeMay.mau_sac=mau_sac,
                xeMay.gia_ban=gia_ban,
                xeMay.mo_ta=mo_ta,
                xeMay.hinh_anh=hinh_anh
            }
        })

    builde
        .addCase(deleteXeMayApi.fulfilled, (state, action)=>{
            state.xemays=state.xemays.filter(item=>item.id!==action.payload)
        })
})
export default xeMayReduce;
