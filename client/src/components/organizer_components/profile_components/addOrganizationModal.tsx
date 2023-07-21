import React, { ChangeEvent, useEffect, } from "react";
import { createOrganizer } from "../../../api/userAuth/userApis";
import { useNavigate } from "react-router-dom";
import { getAllOrgCategories } from "../../../api/adminAuth/admin";
   
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { OrganizationCategoriesInterface } from "../../../types/adminInterface";

interface AddOrganizationModalProps{
    updated: boolean;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddOrganizationModal :React.FC <AddOrganizationModalProps>=({updated,setUpdated})=> {
  const [open, setOpen] = React.useState(false);
  const [orgName, setOrgName] = React.useState("");
  const [orgType, setOrgType] = React.useState("");
  const [categories,setCategories]= React.useState<OrganizationCategoriesInterface[]>()
  const fetchCategories = async ()=>{
    const data = await getAllOrgCategories()
    
    if(data){
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
      setUpdated(!updated)
    }
  };

  return (
    <React.Fragment>
      <form className="grid gap-6">
        <Button variant="outlined" size="sm" color="gray" onClick={handleOpen}>
          Add Organization
        </Button>
        <Dialog open={open} handler={handleOpen}>
          <DialogBody className="mt-10" >
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
                className="w-2/3 h-10 border border-spacing-4 rounded-md"
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


export default AddOrganizationModal
