import React, { ChangeEvent, useEffect, } from "react";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../../../redux/reducers/userSlice";
import { createOrganizer } from "../../../api/userAuth/userApis";
import { useNavigate } from "react-router-dom";
import { getAllOrgCategories } from "../../../api/adminAuth/admin";
   
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Option,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";



export default function OrgCreationModal() {
  const [open, setOpen] = React.useState(false);
  const [orgName, setOrgName] = React.useState("");
  const [orgType, setOrgType] = React.useState("");
  const [categories,setCategories]= React.useState()
  const navigate = useNavigate()
  // const user = useSelector(selectUser)
  const fetchCategories = async ()=>{
    const data = await getAllOrgCategories()
    
    if(data){
      console.log(data.data.data)
      setCategories(data.data.data)
    }

  }

  useEffect(()=>{
    fetchCategories()
  },[])

  const handleOpen = () => setOpen(!open);
  const handleOrgTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setOrgType(type);
  };
  const handleSubmit = async () => {
    const data: { orgName: string; orgType: string } = { orgName, orgType };
    const res = await createOrganizer(data)
    if(res){
      handleOpen()
      navigate('/organization/home')
    }
  };

  return (
    <React.Fragment>
      <form className="grid gap-6">
        <Button variant="text" onClick={handleOpen}>
          Create Organization
        </Button>
        <Dialog open={open} handler={handleOpen}>
          <div className="flex items-center justify-between">
            <DialogHeader>Are you ready for more..?</DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={handleOpen} />
          </div>
          <DialogBody divider>
            <Input
              value={orgName}
              onChange={(e) => {
                setOrgName(e.target.value);
              }}
              label="Organization name"
            />
            <div className="w-72 mt-3">
              <label className="mr-2">choose type</label>
              <select
                className="w-2/3 h-10 border border-spacing-4"
                id="orgType"
                value={orgType}
                onChange={handleOrgTypeChange}
              >
                {categories && categories.map((option) => (
                  <option key={option.categoryName} value={option.categoryName}>
                    {option.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              size="sm"
              variant="outlined"
              color="red"
              onClick={handleOpen}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="gradient"
              color="green"
              type="submit"
              onClick={handleSubmit} 
            >
              Create
            </Button>
          </DialogFooter>
        </Dialog>
      </form>
    </React.Fragment>
  );
}
