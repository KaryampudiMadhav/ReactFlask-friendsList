import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import UserCard from "./userCard";
import { useEffect, useState } from "react";
import { BASE_URL } from './../App';

const UserGrid = ({users,setUsers}) => {
  
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const getUsers  = async () => {
      setLoading(true)
       try {
        const res = await fetch( BASE_URL +"/friends");
        const data = await res.json()
         
        if(!res.ok){
           throw new Error(data.error);
        }

        setUsers(data)
        
       } catch (error) {
          console.log(error);
       }finally{
         setLoading(false)
       }
    }
    getUsers()
},[setUsers])
    console.log(users);
  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {users.map((item,idx) => (
          <UserCard key={idx} user={item} setUsers={setUsers} />
        ))}

      </Grid>

      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!loading && users.length === 0 && (
        <Flex justifyContent={"center"}>
          <Text fontSize={"xl"}>
            <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
              Poor you! 🥺
            </Text>
            No friends found.
          </Text>
        </Flex>
      )}
    </>
  );
};
export default UserGrid;
