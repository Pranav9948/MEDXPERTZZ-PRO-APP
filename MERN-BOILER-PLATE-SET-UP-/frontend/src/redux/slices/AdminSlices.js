import { ADMIN_URL,USERS_URL} from "../constants/constants";
import { apiSlice } from "./apiSlice";


export const adminApiSlice=apiSlice.injectEndpoints({

    endpoints:(builder)=>({


        getAllUsers: builder.query({
            query: () => ({
              url: `${ADMIN_URL}/showUserList`,
            }),   
      keepUnusedDataFor: 5,  
      providesTags: ['Users'],   
    }),
     
  
    


    DeleteProduct: builder.mutation({     
      query: (userId) => ({
        url: `${ADMIN_URL}/deleteUsers/${userId}`, 
        method: "DELETE",
       
      }),
    }),  



    getUserById: builder.query({
      query: (userId) => ({

        url: `${ADMIN_URL}/users/${userId}`,   
      }),

      keepUnusedDataFor: 5,
      invalidatesTags: ['Users'],
    }),  


    updateUserById: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/updateUser/${data.userId}`,   
        method: "PATCH",
        body:data
       
      }),
    }),         



    blockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/block/${data.userId}`,   
        method: "PATCH",
        body:data
       
      }),


    }), 


    unblockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/unblock/${data.userId}`,   
        method: "PATCH",
        body:data
       
      }),


    }), 

    getUserProfile: builder.query({
            query: () => ({
              url: `${ADMIN_URL}/profile`,
            }),   
      keepUnusedDataFor: 5,  
    }),
     


    


    getdoctorApplyAccDetails: builder.query({
            query: (doctorId) => ({
              url: `${ADMIN_URL}/detailedDoctorsVerifyPage/${doctorId}`,
            }),   
      keepUnusedDataFor: 5,  
    }),



  



    approveDoctorAccount: builder.mutation({
      query: (docId) => ({
        url: `${ADMIN_URL}/approveDoctorAccount/${docId}`,   
        method: "PATCH",
        
       
      }),


    }), 


    


    getApprovedDoctors: builder.query({
            query: () => ({
              url: `${ADMIN_URL}/viewAllDoctors`,
            }),   
      keepUnusedDataFor: 5,  
    }),

    

    rejectDoctorAccount: builder.mutation({
      query: (docId) => ({
        url: `${ADMIN_URL}/RejectDoctorAccount/${docId}`,   
        method: "DELETE",
        
       
      }),


    }), 


  

    

     markAsSeen: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/mark-all-notifications-as-seen`,   
        method: "POST",
        
       
      }),


    }),  


    clearAll: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/delete-all-notifications`,   
        method: "POST",
        
       
      }),


    }),



})

})

export const {
    useGetAllUsersQuery,
    useDeleteProductMutation,
    useGetUserByIdQuery,
    useUpdateUserByIdMutation,
    useBlockUserMutation,
    useUnblockUserMutation,
    useGetUserProfileQuery,
    useGetdoctorApplyAccDetailsQuery,
    useApproveDoctorAccountMutation,
    useGetApprovedDoctorsQuery,
    useRejectDoctorAccountMutation,
    useMarkAsSeenMutation,
    useClearAllMutation

}=adminApiSlice