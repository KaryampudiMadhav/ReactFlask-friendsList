import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from './EditModel';
import { BASE_URL } from './../App';

const UserCard = ({ user ,setUsers}) => {
   const toast = useToast()
  const handleDelete = async(id)=>{
    try {
       const res = await fetch(BASE_URL + `/friends/${id}`, {
         method: "DELETE",
       });

       const data = await res.json();

       setUsers((prev) => prev.filter((item) => item.id !== id));

       toast({
         status: "success",
         title: "Yayy! 🎉",
         description: "Friend Deleted successfully.",
         duration: 2000,
         position: "top-center",
       });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src={user.image_url} />

            <Box>
              <Heading size="sm">{user.name}</Heading>
              <Text>{user.role}</Text>
            </Box>
          </Flex>

          <Flex>
            <EditModal user = {user} setUsers={setUsers}  />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size={"sm"}
              aria-label="See menu"
              icon={<BiTrash size={20} />}
              onClick={() => handleDelete(user.id)}
            />
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <Text>{user.description}</Text>
      </CardBody>
    </Card>
  );
};
export default UserCard;
