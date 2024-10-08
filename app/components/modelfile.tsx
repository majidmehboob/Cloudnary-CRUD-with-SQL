"use client"
import React,{useEffect,useState} from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { MdCancel } from "react-icons/md";
import { editFile, putNewFile } from '@/app/services/index';
const Model = ({setModel,editData,setEditData,HandleEditFunction}:any) => {
     useEffect(()=>{
         if(editData.status){
          HandleEditFunction(editData)
         }
     },[editData.status])
  return (
    <div className='fixed z-20 top-0 right-0 left-0 bottom-0 w-full h-full backdrop-blur-sm bg-black/35 flex justify-center items-center'>
    <div className='text-black  bg-white shadow-xl w-96  p-5 flex flex-col gap-3 relative'>
    <h1   >Edit items</h1>
    <MdCancel
    onClick={()=>setModel(false)}
    className='absolute -right-3 -top-3 text-4xl  text-red-500 bg-white rounded-full hover:rotate-180 duration-300 delay-100 cursor-pointer' 
    />
    <div className='w-full h-52'>
    {
      editData.data.format=='image'?(
      <img src={editData.data.url} alt="brhbh" className='w-full object-cover'
      />
      ):
      (
       <video className='w-full h-full'  controls autoPlay loop>
      <source src={editData.data.url} type="video/mp4" className='object-cover' />
       </video>
      )
    }
    </div>
    <CldUploadWidget 
      uploadPreset="todo_app"
     onSuccess={({event,info}:any)=>{
    if(event === "success"){
      
      setEditData({data:{id:editData.data.id,url:info?.secure_url,format:info?.resource_type},status:true})
     }
}}>
  {({ open }) => {
    return (
      <button 
      className="w-full p-2 bg-green-300 group transition duration-300"
      onClick={() => open()}>
       Edit File
      </button>
    );
  }}
      </CldUploadWidget> 
     
    </div>
    </div>
  )
}

export default Model