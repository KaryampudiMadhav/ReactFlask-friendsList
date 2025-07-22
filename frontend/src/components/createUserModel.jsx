import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../App";

const CreateUserModal = ({setUsers}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()
  const [loading,setLoading] = useState(false)

  const [data ,setData] = useState({
    name : "",
    gender : "",
    role : "",
    description : ""
  })

  const handleSubmit = async(e)=>{
    e.preventDefault()
   setLoading(true)
    try {
      const res = await fetch(BASE_URL + "/friends",{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
      });

      const resData  = await res.json()

      if(!res.ok){
          throw new Error(resData.error)
      }
      setUsers((prev) => [...prev, resData]);
      toast({
        status: "success",
        title: "Yayy! 🎉",
        description: "Friend created successfully.",
        duration: 2000,
        position: "top-center",
      });

      onClose();
    } catch (error) {
       console.log(error);
        toast({
          status: "error",
          title: "Error",
          description: "Friend not created successfully.",
          duration: 2000,
          position: "top-center",
        });

    }finally{
      setData({
        name: "",
        role: "",
        description: "",
        gender: "",
      }); 
      setLoading(false)
    }
  }

  return (
    <>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader> My new BFF 😍 </ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>
                {/* Left */}
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="John Doe"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </FormControl>

                {/* Right */}
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="Software Engineer"
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                  />
                </FormControl>
              </Flex>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize={"none"}
                  overflowY={"hidden"}
                  placeholder="He's a software engineer who loves to code and build things."
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
              </FormControl>

              <RadioGroup mt={4}>
                <Flex gap={5}>
                  <Radio
                    value="male"
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }
                    selected={data.gender === "male" ? true : false}
                  >
                    Male
                  </Radio>
                  <Radio
                    value="female"
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }
                    selected={data.gender === "female" ? true : false}
                  >
                    Female
                  </Radio>
                </Flex>
              </RadioGroup>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
export default CreateUserModal;
