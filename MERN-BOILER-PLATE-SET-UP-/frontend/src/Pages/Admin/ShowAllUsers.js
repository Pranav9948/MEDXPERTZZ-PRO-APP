import React from 'react'
import '../../styles/pages/admin/showallusers.css'
import LayoutAdmin from '../../components/Admin/LayoutAdmin'
import { Button, Container, Table } from 'react-bootstrap'

import { useBlockUserMutation, useDeleteProductMutation, useGetAllUsersQuery, useUnblockUserMutation } from '../../redux/slices/AdminSlices'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify'
import Gif from '../../components/Gif'
import Message from '../../components/Message'

const ShowAllUsers = () => {

    const dispatch=useDispatch()

  const {data:showalluserz,isLoading,isError,refetch} = useGetAllUsersQuery()
const [deleteUsers,{isLoading:deleteuserLoad,isError:deleteUserErr}]=useDeleteProductMutation()
const [blockUser,{isLoading:blockuserLoad,isError:blockUserErr}]=useBlockUserMutation()
const [unblockUser,{isLoading:unblockuserLoad,isError:unblockUserErr}]=useUnblockUserMutation()
  

const unBlockUserApiRequest = async(userId) => {
    
  console.log("1sd",userId);
   
   try{

   

     const {data}=  await unblockUser({userId})
    
     if(data.success){
       
           toast.success(data.message)
           refetch()
     }

     else {
       
      toast.error('error unblocking user')
     }
   
  }

   catch(err){

      console.log(err)
      toast(err?.data?.message || err.error);
   }

     
     
};



    
   const BlockUserApiRequest = async(userId) => {
    
    console.log("1sd",userId);
     
     try{

     

       const {data}=  await blockUser({userId})

       console.log('ds',data)
      
       if(data.success){
         
             toast.success(data.message)
             refetch()
       }

       else {
         
        toast.error('error blocking user')
       }
     
    }

     catch(err){

        console.log(err)
        toast(err?.data?.message || err.error);
     }

       
       
  };




   const deleteUser = async(userId) => {
    console.log("1sd",userId);
     
     try{

       const {data}=  await deleteUsers(userId)
       if(window.confirm('are you sure to delete')){

     
       if(data.success){
         
             toast.success(data.message)
             refetch()
       }

       else {
         
        toast.error('error deleting using user')
       }
     }
    }

     catch(err){

        console.log(err)
        toast(err?.data?.message || err.error);
     }

       
       
  };
  
  return (

   
    <div>
     <LayoutAdmin>




    <>
    { deleteuserLoad && <Gif />}
    {blockuserLoad   && <Gif />}
    {unblockuserLoad && <Gif />}
    

    {isLoading ? (
      <Gif />
    ) : isError ? (
      <Message variant="danger">
        {isError?.data.message || isError.error}
      </Message>
    ) : (





  <>
    
    
     <h1 className="text-center mb-5 fs-1 fw-bold">ALL USERS</h1>
        <div className="mt-5 w-0.5">
          
          {/* <div>{loading && <Loader />}</div> */}
          
          <Table striped bordered hover className="bordered" style={{background:'white'}}>
            <thead>
              <tr>
                <th>Sl no</th>
                <th>UserName</th>
                <th>email</th>
                <th>isDoctor</th>
                <th>isAdmin</th>
                <th>ProfileImage</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Block/Unblock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              { showalluserz?.map((user, idx) => {

                return (
                  <tr key={user.name}>
                    <td style={{ paddingTop: "35px" }}>{idx + 1}</td>
                    <td style={{ paddingTop: "35px" }}>{user.name}</td>
                    <td style={{ paddingTop: "35px" }}>{user.email}</td>
                     <td>
                      {user.isDoctor ? (
                        <i
                          class="fa-solid fa-check text-center mt-4"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          class="fa-solid fa-xmark text-center mt-4 "
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>

                    <td>
                      {user.isAdmin ? (
                        <i
                          class="fa-solid fa-check text-center mt-4"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          class="fa-solid fa-xmark text-center mt-4 "
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>

                    <td>
                      <img
                        src={user.ProfileImage} 
                        style={{
                          height: "50px",
                          width: "50px",
                          margin: "10px",
                        }}
                      ></img>
                    </td> 
                     <td style={{ paddingTop: "30px", paddingLeft: "20px" }}>
                      {" "}
                      <Link to={`/admin/editusers/${user._id}`}>
                        {" "}
                        <Button className='bg-green-700 text-white'>Edit</Button>{" "}
                      </Link>
                    </td>
                    <td style={{ paddingTop: "30px", paddingLeft: "20px" }}>
                      {" "}
                      <Button
                        className='bg-red-600 text-white'
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </Button>{" "}
                    </td> 
                   

<td style={{ paddingTop: "30px", paddingLeft: "20px" }}>
  {user.isBlocked ? (
    <Button
     className='bg-teal-300 text-white'
    onClick={() => {
      confirmAlert({
        title: 'Confirm',
        message: 'Are you sure you want to unblock?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => unBlockUserApiRequest(user._id)
          },
          {
            label: 'No'  
          }
        ]
      });
    }}
  >
    Click To unblock
  </Button>
  ) : (
    <Button
      className='bg-yellow-300 text-black'
      onClick={() => {
        confirmAlert({
          title: 'Confirm',
          message: 'Are you sure you want to block?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => BlockUserApiRequest(user._id)
            },
            {
              label: 'No'
            }
          ]
        });
      }}
    >
      Click To Block
    </Button>
  )}
</td>


                     <td style={{ paddingTop: "30px", paddingLeft: "20px" }}>
                      <h3>
                        {" "}
                        {user.isBlocked ? (
                          <i
                            class="fa-solid fa-xmark text-center mt-4 "
                            style={{ color: "red" }}
                          ></i>
                        ) : (
                          <i
                            class="fa-solid fa-check text-center mt-4"
                            style={{ color: "green" }}
                          ></i>
                        )}
                      </h3>
                    </td>


                  </tr>
                );
              })}
            </tbody>
          </Table>
          </div>
          
     
     
</>

    
    
      )}
     
    </>
    </LayoutAdmin>
    </div>
  );
};

export default ShowAllUsers
