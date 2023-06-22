
import {DOCTOR_URL, USERS_URL} from "../constants/constants";
import { apiSlice } from "./apiSlice";



export const DoctorsApiSlice=apiSlice.injectEndpoints({

    endpoints:(builder)=>({


        getDoctorAppointments: builder.query({
            query: () => ({
              url: `${DOCTOR_URL}/get-appointments-by-doctor-id`,
            }),   
      keepUnusedDataFor: 5,  
       
    }),


    changeAppointmentStatus:builder.mutation({
        query:(data)=>({
            url:`${DOCTOR_URL}/change-appointment-status`,
            method:'POST',
            body:data
            
        }),
    
      
    }),



        getDoctorzProfile: builder.query({
            query: () => ({
              url: `${DOCTOR_URL}/get-doctor-info-by-user-id`,
            }),   
      keepUnusedDataFor: 5,  
       
    }),


  


        updateDoctorprofile: builder.mutation({
            query: (data) => ({
              url: `${DOCTOR_URL}/update-doctor-profile`, 
              method: "PATCH",
              body:data
             
            }),
      
      
          }),    

         

          getDoctorBlogz: builder.query({
            query: () => ({
              url: `${DOCTOR_URL}/getdoctorblog`,
            }),   
      keepUnusedDataFor: 5,  
       
    }),

   
 

      
    createNotes:builder.mutation({
      query:(data)=>({
          url:`${DOCTOR_URL}/create`,
          method:'POST',
          body:data
          
      }),
  }),




    DeleteNote: builder.mutation({     
      query: (blogId) => ({
        url: `${DOCTOR_URL}//deleteBlog/${blogId}`, 
        method: "DELETE",
       
      }),
    }),  

  

    getDetailedBlog: builder.query({
      query: (blogId) => ({
        url: `${USERS_URL}/getdetailedblog/${blogId}`, 
      }),   
keepUnusedDataFor: 5,  
 
}),




        updateNotes: builder.mutation({
          query: (data) => ({
            url: `${DOCTOR_URL}/editBlog/${data.blogId}`,   
            method: "PATCH",
            body:data
           
          }),   
    
    
        }), 


})    
    
})


export const {

useGetDoctorAppointmentsQuery,useChangeAppointmentStatusMutation,useGetDoctorzProfileQuery,useUpdateDoctorprofileMutation,
useGetDoctorBlogzQuery,useCreateNotesMutation,useDeleteNoteMutation,useGetDetailedBlogQuery,useUpdateNotesMutation


}=DoctorsApiSlice