import { UPLOAD_URL, USERS_URL,DOCTOR_URL} from "../constants/constants";
import { apiSlice } from "./apiSlice";



export const usersApiSlice=apiSlice.injectEndpoints({

    endpoints:(builder)=>({


         
        userLogin:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/login`,
                method:'POST',
                body:data
                
            }),

          
        }),



          
        Logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',
                
                
            }),

          
        }),



        userRegister:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/register`,
                method:'POST',
                body:data
                
                
            }),

          
        }),


        userLogin:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/login`,
                method:'POST',
                body:data
                
            }),

          
        }),


       applyForDoctorAccount:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/apply-doctor-account`,
                method:'POST',
                body:data
                
            }),

          
        }),


        uploadImage: builder.mutation({
            query: (data) => ({
              url: `${UPLOAD_URL}`, 
              method: "POST",
              body:data,
            }),
      
          }),  
        
          

          getAllApprovedDoctors: builder.query({
            query: () => ({
              url: `${USERS_URL}/getAllApprovedDoctors`,
            }),   
      keepUnusedDataFor: 5,  
       
    }),
     
  
  



    getDoctorById: builder.query({
        query: (id) => ({
          url: `${USERS_URL}/get-doctor-info-by-id/${id}`,
        }),   
  keepUnusedDataFor: 5,  
   
}),


checkAvailiabilty:builder.mutation({
    query:(data)=>({
        url:`${USERS_URL}/check-booking-avilability`,
        method:'POST',
        body:data
        
    }),

  
}),


         bookAppointment:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/book-appointment`,
                method:'POST',
                body:data
                
            }),
        
          
        }), 



            
         onlinebookAppointment:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/onlinebook-appointment`,
                method:'POST',
                body:data
                
            }),
        
          
        }),



    


        getAppointmentData: builder.query({
            query: () => ({
              url: `${USERS_URL}/get-appointments-by-user-id`,
            }),   
      keepUnusedDataFor: 5,  
       
    }),
    


    cancelAppointments: builder.mutation({     
        query: (data) => ({
          url: `${USERS_URL}/cancelappointment`, 
          method: "DELETE",
          body:data

         
         
        }),
       
      }),  

    //   post("/search-doctors  



          
            
         searchDoctors:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/search-doctors`, 

                method:'POST',
                body:data
                
            }),
        
          
        }),
        
        



        getBlogzUser: builder.query({
            query: () => ({
              url: `${USERS_URL}/getBlogs`,
            }),   
      keepUnusedDataFor: 5,  
       
    }),
     
    
    
    getDetailedBlog: builder.query({
        query: (blogid) => ({
          url: `${USERS_URL}/getdetailedblog/${blogid}`,
        }),   
  keepUnusedDataFor: 5,  
   
}),



getUserProfile: builder.query({
    query: () => ({
      url: `${USERS_URL}/profile`,
    }),   
keepUnusedDataFor: 5,  

}),

 


 userUpdateprofile: builder.mutation({
    query: (data) => ({
      url: `${USERS_URL}/profile`,   
      method: "PATCH",
      body:data
     
    }),


  }), 


       
    })
})


export const {useUserLoginMutation,useLogoutMutation,useUserRegisterMutation,useApplyForDoctorAccountMutation,
useUploadImageMutation,useGetAllApprovedDoctorsQuery,useGetDoctorByIdQuery,useCheckAvailiabiltyMutation,
useBookAppointmentMutation,useOnlinebookAppointmentMutation,useGetAppointmentDataQuery,useCancelAppointmentsMutation,
useSearchDoctorsMutation,useGetBlogzUserQuery,useGetDetailedBlogQuery,useGetUserProfileQuery,useUserUpdateprofileMutation



}=usersApiSlice